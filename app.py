from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres.dcmskpcyynimvlpyxnbi:bxm12345@aws-0-eu-central-1.pooler.supabase.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable SQLAlchemy event system (optional)

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Example: Define a model for a "profiles" table
class Profile(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.BigInteger, primary_key=True)  # Use BigInteger for compatibility with Supabase
    user_id = db.Column(db.BigInteger, db.ForeignKey('auth.users.id'), nullable=False)  # Foreign key to auth.users
    name = db.Column(db.String(80), nullable=False)

# Example route to test DB connection
@app.route('/profiles', methods=['GET'])
def get_profiles():
    try:
        profiles = Profile.query.all()
        return jsonify([{'id': profile.id, 'name': profile.name} for profile in profiles])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)