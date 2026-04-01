from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import models, database
from fastapi.middleware.cors import CORSMiddleware  # <-- IMPORT THIS
app = FastAPI()


origins = [
    "http://localhost:5173",  # Your React Dev Server
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, DELETE, etc.
    allow_headers=["*"],  # Allows all headers
)
# Create tables
models.Base.metadata.create_all(bind=database.engine)

# --- 1. THE DATA MODEL ---
class ShapeSchema(BaseModel):
    shape_name: str
    raw_image_url: str
    example_1_url: str
    example_2_url: str
    description: str

# --- 2. INSERT CODE ---
@app.post("/api/add-shape")
def add_new_shape(data: ShapeSchema, db: Session = Depends(database.get_db)):
    new_row = models.ShapeLearning(
        shape_name=data.shape_name,
        raw_image_url=data.raw_image_url,
        example_1_url=data.example_1_url,
        example_2_url=data.example_2_url,
        description=data.description
    )
    db.add(new_row)
    db.commit()
    db.refresh(new_row) # This fetches the ID back from the DB
    return {"status": "Success", "id": new_row.id}

# --- 3. PRINT CODE ---
@app.get("/api/get-shapes")
def show_all_shapes(db: Session = Depends(database.get_db)):
    all_shapes = db.query(models.ShapeLearning).all()
    return all_shapes

# --- 4. DELETE CODE (NEW) ---
# This allows you to remove duplicates like your Hexagon!
@app.delete("/api/delete-shape/{shape_id}")
def delete_shape(shape_id: int, db: Session = Depends(database.get_db)):
    # 1. Find the shape by ID
    shape_to_delete = db.query(models.ShapeLearning).filter(models.ShapeLearning.id == shape_id).first()
    
    # 2. Check if it exists
    if not shape_to_delete:
        raise HTTPException(status_code=404, detail=f"Shape with ID {shape_id} not found!")
    
    # 3. Delete and save
    db.delete(shape_to_delete)
    db.commit()
    
    return {"status": "Success", "message": f"Shape {shape_id} deleted forever!"}