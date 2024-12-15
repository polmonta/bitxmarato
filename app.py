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

class respostaquestionari(db.Model):
    __tablename__ = 'respostaquestionari'
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    data = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Timestamp
    pacient = db.Column(db.String(10), db.ForeignKey('pacients.dni'), nullable=False)  # Foreign key
    febre = db.Column(db.Boolean, nullable=True)  # Allow NULL until all values are filled
    desaturacio = db.Column(db.Boolean, nullable=True)
    increps = db.Column(db.Boolean, nullable=True)
    tirmusc = db.Column(db.Boolean, nullable=True)
    ofeg = db.Column(db.Boolean, nullable=True)
    xiulets = db.Column(db.Boolean, nullable=True)
    completed = db.Column(db.Boolean, default=False)  # Automatically updated via a trigger



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
        # Create a new instance of respostaquestionari
        resposta = respostaquestionari(
            id=data['id'],
            data=datetime.strptime(data['data'], "%Y-%m-%d %H:%M:%S"),
            pacient=data['pacient'],
            febre=data.get('febre'),  # Use .get() to handle optional values
            desaturacio=data.get('desaturacio'),
            increps=data.get('increps'),
            tirmusc=data.get('tirmusc'),
            ofeg=data.get('ofeg'),
            xiulets=data.get('xiulets')
        )
        
        # Add and commit the new record to the database
        db.session.add(resposta)
        db.session.commit()
        return jsonify({"message": "respostaquestionari created successfully", "id": resposta.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/getPacientsByMetge/<dniMetgeAssociat>', methods=['GET'])
def getPacientsByMetge(dniMetgeAssociat):
    try:
        # Query only nom_complet and dni for pacients where dni_metge_associat matches
        pacients = Pacient.query.with_entities(Pacient.nomcomplet, Pacient.dni)\
            .filter_by(dnimetgeassociat=dniMetgeAssociat).all()

        # Check if there are any matching records
        if not pacients:
            return jsonify({"message": "No pacients found for the given doctor."}), 404

        # Format the results as a list of dictionaries
        result = [{"nomComplet": pacient.nomcomplet.strip(), "dni": pacient.dni.strip()} for pacient in pacients]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getPacientDetails/<dni>', methods=['GET'])
def getPacientDetails(dni):
    try:
        # Query the Pacient table to find the record with the matching DNI
        pacient = Pacient.query.filter_by(dni=dni).first()

        # Check if the pacient exists
        if not pacient:
            return jsonify({"message": "Pacient not found"}), 404

        # Serialize the pacient data
        result = {
            "dni": pacient.dni.strip(),
            "nomComplet": pacient.nomcomplet.strip(),
            "telefon": pacient.telefon.strip(),
            "hospitalPacient": pacient.hospitalpacient,
            "dniMetgeAssociat": pacient.dnimetgeassociat.strip(),
            "malaltia": pacient.malaltia.strip()
        }

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getBooleanState/<int:id>/<field>', methods=['GET'])
def getBooleanState(id, field):
    try:
        # Dynamically check the boolean field
        if field not in ['febre', 'desaturacio', 'increps', 'tirmusc', 'ofeg', 'xiulets']:
            return jsonify({"error": "Invalid boolean field"}), 400

        # Query the specific field for the given id
        resposta = respostaquestionari.query.with_entities(getattr(respostaquestionari, field)).filter_by(id=id).first()

        if resposta is None:
            return jsonify({"error": "respostaquestionari not found"}), 404

        # Return the state of the boolean field
        return jsonify({field: resposta[0]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/setBooleanState/<int:id>/<field>', methods=['POST'])
def setBooleanState(id, field):
    try:
        # Validate the boolean field
        if field not in ['febre', 'desaturacio', 'increps', 'tirmusc', 'ofeg', 'xiulets']:
            return jsonify({"error": "Invalid boolean field"}), 400

        # Get the new state from the request
        data = request.get_json()
        new_state = data.get('state')
        if new_state is None or not isinstance(new_state, bool):
            return jsonify({"error": "State must be a boolean"}), 400

        # Update the specific field for the given id
        resposta = respostaquestionari.query.filter_by(id=id).first()
        if resposta is None:
            return jsonify({"error": "respostaquestionari not found"}), 404

        # Dynamically set the field
        setattr(resposta, field, new_state)
        db.session.commit()

        return jsonify({"message": f"State of {field} updated to {new_state}", "id": id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/getPacientNomComplet/<dni>', methods=['GET'])
def getPacientNomComplet(dni):
    try:
        # Query the Pacient table for the record with the matching DNI
        pacient = Pacient.query.with_entities(Pacient.nomcomplet).filter_by(dni=dni).first()

        # Check if the pacient exists
        if not pacient:
            return jsonify({"message": "Pacient not found"}), 404

        # Return the nomComplet
        return jsonify({"nomComplet": pacient.nomcomplet.strip()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/routes', methods=['GET'])
def get_routes():
    return jsonify([str(rule) for rule in app.url_map.iter_rules()])

# Run the app
if __name__ == "__main__":
    # Ensure tables are created before the app starts
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            print(f"Database connection failed: {e}")
    app.run(host="127.0.0.1", port=5000, debug=True)