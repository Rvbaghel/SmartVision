from sqlalchemy import Column, Integer, String, Text
from database import Base

class ShapeLearning(Base):
    __tablename__ = "shape_learning"

    id = Column(Integer, primary_key=True, index=True)
    shape_name = Column(String(50), nullable=False)
    # These will store your GitHub Raw URLs
    raw_image_url = Column(Text, nullable=False)
    example_1_url = Column(Text, nullable=False)
    example_2_url = Column(Text, nullable=False)
    description = Column(Text)