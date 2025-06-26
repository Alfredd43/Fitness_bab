from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
import dotenv

from models import db, User, FoodLog, WaterLog, ExerciseLog

# Load environment variables
dotenv.load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:5173', 'http://0.0.0.0:5173'])

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'a_super_secret_key_replace_me')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'mysql+mysqlconnector://Alfred:Blahblah@localhost:3307/fitness'
)

# Initialize DB and login manager
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Load user
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def home():
    return '✅ Flask backend is up and running!'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 400

    # Create new user
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create user'}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'id': user.id, 'username': user.username}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/get_nutrition', methods=['POST'])
@login_required
def get_nutrition():
    food_description = request.get_json().get('food_description')
    if not food_description:
        return jsonify({'message': 'Missing food description'}), 400

    dummy_data = {
        'food_description': food_description,
        'calories': 'Approx. 350 kcal',
        'protein': 'Approx. 10g',
        'carbs': 'Approx. 50g',
        'fat': 'Approx. 10g'
    }
    return jsonify(dummy_data), 200

@app.route('/log_food', methods=['POST'])
@login_required
def log_food():
    data = request.get_json()
    new_log = FoodLog(
        food_item=data.get('food_item'),
        calories=data.get('calories'),
        protein=data.get('protein'),
        carbs=data.get('carbs'),
        fat=data.get('fat'),
        user_id=current_user.id
    )
    db.session.add(new_log)
    db.session.commit()
    return jsonify({'message': 'Food log added successfully'}), 201

@app.route('/log_water', methods=['POST'])
@login_required
def log_water():
    data = request.get_json()
    new_log = WaterLog(amount_ml=data.get('amount'), user_id=current_user.id)
    db.session.add(new_log)
    db.session.commit()
    return jsonify({'message': 'Water log added successfully'}), 201

@app.route('/log_exercise', methods=['POST'])
@login_required
def log_exercise():
    data = request.get_json()
    new_log = ExerciseLog(
        exercise_type=data.get('exercise_type'),
        duration_minutes=data.get('duration_minutes'),
        user_id=current_user.id
    )
    db.session.add(new_log)
    db.session.commit()
    return jsonify({'message': 'Exercise log added successfully'}), 201

@app.route('/api/user', methods=['GET'])
@login_required
def get_user():
 return jsonify({'id': current_user.id, 'username': current_user.username}), 200

@app.route('/user/logs/food', methods=['GET'])
@login_required
def get_food_logs():
    logs = FoodLog.query.filter_by(user_id=current_user.id).all()
    return jsonify([log.serialize() for log in logs]), 200

@app.route('/user/logs/water', methods=['GET'])
@login_required
def get_water_logs():
    logs = WaterLog.query.filter_by(user_id=current_user.id).all()
    return jsonify([log.serialize() for log in logs]), 200

@app.route('/user/logs/exercise', methods=['GET'])
@login_required
def get_exercise_logs():
    logs = ExerciseLog.query.filter_by(user_id=current_user.id).all()
    return jsonify([log.serialize() for log in logs]), 200

@app.route('/ai-coach', methods=['POST'])
@login_required
def ai_coach():
    prompt = request.get_json().get('prompt', '')
    dummy_response = f"AI Placeholder response for: '{prompt}'"
    return jsonify({'advice': dummy_response}), 200

if __name__ == '__main__':
    with app.app_context():
        # Drop all tables and recreate them to fix schema issues
        db.drop_all()
        db.create_all()

        # Create a default test user
        default_username = "testuser"
        default_password = "password123"

        new_user = User(username=default_username, password=generate_password_hash(default_password))
        db.session.add(new_user)
        db.session.commit()
        print(f"Created test user: {default_username}")

    app.run(host='0.0.0.0', port=5000, debug=True)
