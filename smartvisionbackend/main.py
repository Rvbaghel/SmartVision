from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel  # This helps us "read" data from the browser
import models, database

app = FastAPI()

# This tells the database to create the 'shape_learning' table automatically
models.Base.metadata.create_all(bind=database.engine)

# --- 1. THE DATA MODEL (The "Template") ---
# This tells FastAPI what fields to show in the Swagger UI for inserting
class ShapeSchema(BaseModel):
    shape_name: str
    raw_image_url: str
    example_1_url: str
    example_2_url: str
    description: str

# --- 2. INSERT CODE (The "Writer") ---
# This is where you write data to PostgreSQL
@app.post("/api/add-shape")
def add_new_shape(data: ShapeSchema, db: Session = Depends(database.get_db)):
    # Create a new row using your models.py structure
    new_row = models.ShapeLearning(
        shape_name=data.shape_name,
        raw_image_url=data.raw_image_url,
        example_1_url=data.example_1_url,
        example_2_url=data.example_2_url,
        description=data.description
    )
    db.add(new_row)      # Add to database
    db.commit()          # Save changes
    return {"status": "Success", "data": data}

# --- 3. PRINT CODE (The "Reader") ---
# This is where you see the data in your browser
@app.get("/api/get-shapes")
def show_all_shapes(db: Session = Depends(database.get_db)):
    # Ask the database to give us everything in the table
    all_shapes = db.query(models.ShapeLearning).all()
    return all_shapes