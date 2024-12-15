from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


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

class Metge(db.Model):
    __tablename__ = 'metges'
    dni = db.Column(db.String(10), primary_key=True)
    nomcomplet = db.Column(db.String(100), nullable=False)
    telefon = db.Column(db.String(15), unique=True, nullable=False)
    hospitaladscrit = db.Column(db.Integer, db.ForeignKey('hospitals.id'), nullable=False)

class Malaltia(db.Model):
    __tablename__ = 'malalties'
    sigles = db.Column(db.String(10), primary_key=True)
    nom = db.Column(db.String(100), nullable=False)

class RespostaQuestionari(db.Model):
    __tablename__ = 'respostaQuestionari'
    data = db.Column(db.DateTime, primary_key=True, default=datetime.utcnow)
    pacient = db.Column(db.String(10), db.ForeignKey('pacients.dni'), primary_key=True)
    febre = db.Column(db.Boolean, nullable=False)
    tos = db.Column(db.Boolean, nullable=False)



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

@app.route('/crearMetge', methods=['POST'])
def crearMetge():
    data = request.get_json()
    try:
        metge = Metge(
            dni=data['dni'],
            nomcomplet=data['nomComplet'],
            telefon=data['telefon'],
            hospitaladscrit=data['hospitaladscrit']
        )
        db.session.add(metge)
        db.session.commit()
        return jsonify({"message": "Metge created successfully", "dni": metge.dni}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/crearMalaltia', methods=['POST'])
def crearMalaltia():
    data = request.get_json()
    try:
        malaltia = Malaltia(
            sigles=data['sigles'],
            nom=data['nom']
        )
        db.session.add(malaltia)
        db.session.commit()
        return jsonify({"message": "Malaltia created successfully", "sigles": malaltia.sigles}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/crearRespostaQuestionari', methods=['POST'])
def crearRespostaQuestionari():
    data = request.get_json()
    try:
        resposta = RespostaQuestionari(
            data=datetime.strptime(data['data'], "%Y-%m-%d %H:%M:%S"),
            pacient=data['pacient'],
            febre=data['febre'],
            tos=data['tos']
        )
        db.session.add(resposta)
        db.session.commit()
        return jsonify({"message": "RespostaQuestionari created successfully", "pacient": resposta.pacient}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/getPacientsByMetge/<dniMetgeAssociat>', methods=['GET'])
def getPacientsByMetge(dniMetgeAssociat):
    try:
        # Query all pacients where dni_metge_associat matches the argument
        pacients = Pacient.query.filter_by(dni_metge_associat=dniMetgeAssociat).all()

        # Check if there are any matching records
        if not pacients: 
            return jsonify({"message": "No pacients found for the given doctor."}), 404

        # Convert the query results to a list of dictionaries
        result = [
            {
                "dni": pacient.dni,
                "nomComplet": pacient.nom_complet,
                "telefon": pacient.telefon,
                "hospitalPacient": pacient.hospital_pacient,
                "dniMetgeAssociat": pacient.dni_metge_associat,
                "malaltia": pacient.malaltia
            }
            for pacient in pacients
        ]

        return jsonify(result), 200
    except Exception as e:
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