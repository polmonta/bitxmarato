from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the database to use IPv4
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:bxm12345@aws-0-eu-central-1.pooler.supabase.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Pacient model
class Pacient(db.Model):
    __tablename__ = 'pacients'
    dni = db.Column(db.String(10), primary_key=True)  # dni is the primary key
    nom_complet = db.Column(db.String(100), nullable=False)  # nomComplet is required
    telefon = db.Column(db.String(15), unique=True, nullable=False)  # telefon is unique and required
    hospital_pacient = db.Column(db.Integer, nullable=False)  # hospitalPacient is required
    dni_metge_associat = db.Column(db.String(10), nullable=False)  # dniMetgeAssociat is required
    malaltia = db.Column(db.String(10), nullable=False)  # malaltia is required

    def __init__(self, dni, nom_complet, telefon, hospital_pacient, dni_metge_associat, malaltia):
        self.dni = dni
        self.nom_complet = nom_complet
        self.telefon = telefon
        self.hospital_pacient = hospital_pacient
        self.dni_metge_associat = dni_metge_associat
        self.malaltia = malaltia

# Endpoint to create a new pacient
@app.route('/crearPacient', methods=['POST'])
def crearPacient():
    # Extract data from the request body
    data = request.get_json()

    dni = data.get('dni')
    nom_complet = data.get('nomComplet')
    telefon = data.get('telefon')
    hospital_pacient = data.get('hospitalPacient')
    dni_metge_associat = data.get('dniMetgeAssociat')
    malaltia = data.get('malaltia')

    # Input validation
    if not dni or not nom_complet or not telefon or not hospital_pacient or not dni_metge_associat or not malaltia:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Create a new Pacient instance
        new_pacient = Pacient(
            dni=dni,
            nom_complet=nom_complet,
            telefon=telefon,
            hospital_pacient=hospital_pacient,
            dni_metge_associat=dni_metge_associat,
            malaltia=malaltia
        )
        # Add and commit to the database
        db.session.add(new_pacient)
        db.session.commit()
        return jsonify({"message": "Pacient created successfully", "dni": new_pacient.dni}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == "__main__":
    # Ensure tables are created before the app starts
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            print(f"Database connection failed: {e}")
    app.run(host="127.0.0.1", port=5000)