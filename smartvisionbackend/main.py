from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, constr
import models, database
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from passlib.context import CryptContext

app = FastAPI()

# Setup hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- CORS CONFIGURATION ---
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://smart-vision-wine.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auto-create tables (Make sure Feedback is now in models.py)
models.Base.metadata.create_all(bind=database.engine)

# --- SCHEMAS ---

class PinSetupSchema(BaseModel):
    user_email: str
    pin: constr(min_length=4, max_length=4) 

class PinVerifySchema(BaseModel):
    user_email: str
    pin: str

class FeedbackSchema(BaseModel):
    user_email: str
    rating: int
    milestone: str = "general" # Default value

# --- HELPER FUNCTIONS ---
def hash_pin(pin: str):
    return pwd_context.hash(pin)

def verify_pin(plain_pin, hashed_pin):
    return pwd_context.verify(plain_pin, hashed_pin)

# --- PARENT SECURITY ENDPOINTS ---

@app.post("/api/set-pin")
def set_parent_pin(data: PinSetupSchema, db: Session = Depends(database.get_db)):
    hashed = hash_pin(data.pin)
    parent = db.query(models.ParentSecurity).filter(models.ParentSecurity.user_email == data.user_email).first()
    
    if parent:
        parent.hashed_pin = hashed
        parent.updated_at = datetime.utcnow()
        db.commit()
        return {"status": "Updated", "message": "PIN updated"}
    
    new_parent = models.ParentSecurity(
        user_email=data.user_email,
        hashed_pin=hashed,
        is_pin_set=True
    )
    db.add(new_parent)
    db.commit()
    return {"status": "Success", "message": "PIN created"}

@app.post("/api/verify-pin")
def verify_parent_pin(data: PinVerifySchema, db: Session = Depends(database.get_db)):
    parent = db.query(models.ParentSecurity).filter(models.ParentSecurity.user_email == data.user_email).first()
    if not parent:
        raise HTTPException(status_code=404, detail="No PIN found.")
    
    if verify_pin(data.pin, parent.hashed_pin):
        return {"status": "Success", "verified": True}
    return {"status": "Error", "verified": False, "message": "Incorrect PIN"}

@app.get("/api/get-all-pins")
def get_all_parent_records(db: Session = Depends(database.get_db)):
    return db.query(models.ParentSecurity).all()

@app.delete("/api/delete-pin/{email}")
def delete_parent_pin(email: str, db: Session = Depends(database.get_db)):
    record = db.query(models.ParentSecurity).filter(models.ParentSecurity.user_email == email).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    db.delete(record)
    db.commit()
    return {"status": "Success", "message": f"Deleted {email}"}

# --- USAGE & TRACKING ENDPOINTS ---

@app.post("/api/update-usage")
def update_usage(email: str, db: Session = Depends(database.get_db)):
    stats = db.query(models.UserStats).filter(models.UserStats.user_email == email).first()
    
    if not stats:
        stats = models.UserStats(user_email=email, total_minutes_played=1, next_reminder_at=30)
        db.add(stats)
    else:
        stats.total_minutes_played += 1
    
    db.commit()

    show_popup = False
    if not stats.has_rated and stats.total_minutes_played >= stats.next_reminder_at:
        show_popup = True
        stats.next_reminder_at += 30
        db.commit()
            
    return {
        "total_minutes": stats.total_minutes_played,
        "show_rating_popup": show_popup
    }

@app.post("/api/submit-rating")
def submit_rating(data: FeedbackSchema, db: Session = Depends(database.get_db)):
    # 1. Update user stats to stop reminders
    stats = db.query(models.UserStats).filter(models.UserStats.user_email == data.user_email).first()
    if stats:
        stats.has_rated = True
        
    # 2. Save feedback entry
    new_feedback = models.Feedback(
        user_email=data.user_email, 
        rating=data.rating, 
        milestone=data.milestone
    )
    db.add(new_feedback)
    db.commit()
    return {"status": "success", "message": "Thank you for your rating!"}

# --- ADMIN DASHBOARD GETTERS (Fixed 404s) ---

@app.get("/api/get-all-feedback")
def get_all_feedback(db: Session = Depends(database.get_db)):
    return db.query(models.Feedback).all()

@app.get("/api/get-all-usage")
def get_all_usage(db: Session = Depends(database.get_db)):
    return db.query(models.UserStats).all()