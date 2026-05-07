from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from database import Base

# ... (your existing ShapeLearning class)

class ParentSecurity(Base):
    __tablename__ = "parent_security"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(255), unique=True, nullable=False)
    hashed_pin = Column(String(255), nullable=False)
    is_pin_set = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


    
    
# models.py
class UserStats(Base):
    __tablename__ = "user_stats"
    
    user_email = Column(String, primary_key=True, index=True)
    total_minutes_played = Column(Integer, default=0)
    has_rated = Column(Boolean, default=False)
    # This stores the minute mark for the next reminder (e.g., 30, 60, 90...)
    next_reminder_at = Column(Integer, default=30)


# Add this to your models.py
class Feedback(Base):
    __tablename__ = "user_feedback"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    rating = Column(Integer)  # 1 to 5
    milestone = Column(String)  # e.g., "30m", "60m"
    created_at = Column(DateTime, default=datetime.utcnow)


  # models.py

class Poem(Base):
    __tablename__ = "poems"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    image_name = Column(String(255), nullable=False)  # Stores "poem1.png"
    youtube_link = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)  