from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    # Relationships
    food_logs = db.relationship('FoodLog', backref='user', lazy=True)
    water_logs = db.relationship('WaterLog', backref='user', lazy=True)
    exercise_logs = db.relationship('ExerciseLog', backref='user', lazy=True)

class FoodLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    food_item = db.Column(db.String(255), nullable=False)
    calories = db.Column(db.Integer)
    protein = db.Column(db.Float)
    carbs = db.Column(db.Float)
    fat = db.Column(db.Float)
    logged_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            'id': self.id,
            'food_item': self.food_item,
            'calories': self.calories,
            'protein': self.protein,
            'carbs': self.carbs,
            'fat': self.fat,
            'logged_at': self.logged_at.isoformat()
        }

class WaterLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount_ml = db.Column(db.Integer, nullable=False)
    logged_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            'id': self.id,
            'amount_ml': self.amount_ml,
            'logged_at': self.logged_at.isoformat()
        }

class ExerciseLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    exercise_type = db.Column(db.String(255), nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=False)
    logged_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            'id': self.id,
            'exercise_type': self.exercise_type,
            'duration_minutes': self.duration_minutes,
            'logged_at': self.logged_at.isoformat()
        }