from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the database to use IPv4
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres.dcmskpcyynimvlpyxnbi:bxm12345@aws-0-eu-central-1.pooler.supabase.com:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# CLASSES
class Pacient(db.Model):
    __tablename__ = 'pacients'
    dni = db.Column(db.String(10), primary_key=True)  # dni is the primary key
    nomcomplet = db.Column(db.String(100), nullable=False)  # nomComplet is required
    telefon = db.Column(db.String(15), unique=True, nullable=False)  # telefon is unique and required
    hospitalpacient = db.Column(db.Integer, nullable=False)  # hospitalPacient is required
    dnimetgeassociat = db.Column(db.String(10), nullable=False)  # dniMetgeAssociat is required
    malaltia = db.Column(db.String(10), nullable=False)  # malaltia is required

    def __init__(self, dni, nomcomplet, telefon, hospitalpacient, dnimetgeassociat, malaltia):
        self.dni = dni
        self.nomcomplet = nomcomplet
        self.telefon = telefon
        self.hospitalpacient = hospitalpacient
        self.dnimetgeassociat = dnimetgeassociat
        self.malaltia = malaltia

class Hospital(db.Model):
    __tablename__ = 'hospitals'
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    nom = db.Column(db.String(100), nullable=False)  # Name of the hospital

    def __init__(self, id, nom):
        self.id = id
        self.nom = nom





# ENDPOINTS

# Endpoint to create a new pacient
@app.route('/crearPacient', methods=['POST'])
def crearPacient():
    # Extract data from the request body
    data = request.get_json()

    dni = data.get('dni')
    nomcomplet = data.get('nomComplet')
    telefon = data.get('telefon')
    hospitalpacient = data.get('hospitalPacient')
    dnimetgeassociat = data.get('dniMetgeAssociat')
    malaltia = data.get('malaltia')

    # Input validation
    if not dni or not nomcomplet or not telefon or not hospitalpacient or not dnimetgeassociat or not malaltia:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Create a new Pacient instance
        new_pacient = Pacient(
            dni=dni,
            nomcomplet=nomcomplet,
            telefon=telefon,
            hospitalpacient=hospitalpacient,
            dnimetgeassociat=dnimetgeassociat,
            malaltia=malaltia
        )
        # Add and commit to the database
        db.session.add(new_pacient)
        db.session.commit()
        return jsonify({"message": "Pacient created successfully", "dni": new_pacient.dni}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Endpoint to create a hospital
@app.route('/crearHospital', methods=['POST'])
def crearHospital():
    data = request.get_json()

    id = data.get('id')
    nom = data.get('nom')

    if not id or not nom:
        return jsonify({"error": "Missing required fields: id or nom"}), 400

    try:
        new_hospital = Hospital(id=id, nom=nom)
        db.session.add(new_hospital)
        db.session.commit()
        return jsonify({"message": "Hospital created successfully", "id": new_hospital.id}), 201
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