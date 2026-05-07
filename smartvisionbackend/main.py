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
    "http://localhost:5173",             # Local development (Vite)
    "http://127.0.0.1:5173",            # Local development (Alternative)
    "https://smart-vision-wine.vercel.app", # Your official production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auto-create tables
models.Base.metadata.create_all(bind=database.engine)

# --- SCHEMAS ---

class PinSetupSchema(BaseModel):
    user_email: str
    pin: constr(min_length=4, max_length=4) 

class PinVerifySchema(BaseModel):
    user_email: str
    pin: str

class PoemSchema(BaseModel):
    id: int
    title: str
    image_name: str
    youtube_link: str

    class Config:
        from_attributes = True

# --- HELPER FUNCTIONS ---
def hash_pin(pin: str):
    return pwd_context.hash(pin)

def verify_pin(plain_pin, hashed_pin):
    return pwd_context.verify(plain_pin, hashed_pin)

# --- POEM ENDPOINTS ---

@app.get("/api/poems", response_model=list[PoemSchema])
def get_poems(db: Session = Depends(database.get_db)):
    return db.query(models.Poem).all()

@app.post("/api/admin/add-poem")
def add_poem(poem: PoemSchema, db: Session = Depends(database.get_db)):
    new_poem = models.Poem(
        title=poem.title,
        image_name=poem.image_name,
        youtube_link=poem.youtube_link
    )
    db.add(new_poem)
    db.commit()
    return {"message": "Poem added successfully"}           

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

@app.get("/api/get-all-usage")
def get_all_usage(db: Session = Depends(database.get_db)):
    return db.query(models.UserStats).all()


# --- UPDATE POEM ---
@app.put("/api/admin/update-poem/{poem_id}")
def update_poem(poem_id: int, data: PoemSchema, db: Session = Depends(database.get_db)):
    poem = db.query(models.Poem).filter(models.Poem.id == poem_id).first()
    
    if not poem:
        raise HTTPException(status_code=404, detail="Poem not found")
    
    # Update the fields
    poem.title = data.title
    poem.youtube_link = data.youtube_link
    poem.image_name = data.image_name # Keeping this in case you change the image
    
    db.commit()
    return {"status": "Success", "message": f"Poem '{poem.title}' updated successfully"}

# --- DELETE POEM BY TITLE ---
@app.delete("/api/admin/delete-poem/{title}")
def delete_poem_by_title(title: str, db: Session = Depends(database.get_db)):
    # We use .filter() with the title string
    poem = db.query(models.Poem).filter(models.Poem.title == title).first()
    
    if not poem:
        raise HTTPException(status_code=404, detail=f"No poem found with title: {title}")
    
    db.delete(poem)
    db.commit()
    return {"status": "Success", "message": f"Deleted poem: {title}"}