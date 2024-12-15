import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { obtenerPacientesPorMedico } from '../services/pacientService'; // Importa el servicio

const P1 = ({ navigation }) => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dniMedico, setDniMedico] = useState(''); // Campo para el DNI del médico

  // Función para cargar los pacientes de un médico específico
  const cargarPacientes = async () => {
    if (!dniMedico) {
      Alert.alert('Error', 'Por favor, introduce el DNI del médico.');
      return;
    }

    setLoading(true); // Activa el indicador de carga

    try {
      const data = await obtenerPacientesPorMedico(dniMedico); // Llama al servicio con el DNI
      setPacientes(data); // Establece los pacientes en el estado
    } catch (error) {
      Alert.alert('Error', error); // Muestra un mensaje de error si falla
    } finally {
      setLoading(false); // Detén el indicador de carga
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Pacientes</Text>

      {/* Campo para introducir el DNI del médico */}
      <TextInput
        style={styles.inputField}
        placeholder="Introduce el DNI del médico"
        value={dniMedico}
        onChangeText={setDniMedico}
      />

      <TouchableOpacity style={styles.loadButton} onPress={cargarPacientes}>
        <Text style={styles.loadButtonText}>Cargar Pacientes</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text>Cargando pacientes...</Text>
        </View>
      ) : (
        <FlatList
          data={pacientes}
          keyExtractor={(item) => item.dni} // Supongo que "dni" es la clave única en tu base de datos
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.nomComplet}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('VerDetalles', { paciente: item })}
              >
                <Text style={styles.buttonText}>Ver Detalles</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputField: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  loadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  loadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default P1;
