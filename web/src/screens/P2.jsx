import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { crearPacient } from '../services/dadespacients'; // Importa el servicio

const AfegirPacientScreen = () => {
  const [dni, setDni] = useState('');
  const [nomComplet, setNomComplet] = useState('');
  const [telefon, setTelefon] = useState('');
  const [hospitalPacient, setHospitalPacient] = useState('');
  const [dniMetgeAssociat, setDniMetgeAssociat] = useState('');
  const [malaltia, setMalaltia] = useState('');

  const handleAddPatient = async () => {
    if (!dni || !nomComplet || !telefon || !hospitalPacient || !dniMetgeAssociat || !malaltia) {
      Alert.alert('Error', 'Por favor, rellena todos los campos.');
      return;
    }

    const pacientData = {
      dni,
      nomComplet,
      telefon,
      hospitalPacient,
      dniMetgeAssociat,
      malaltia,
    };

    try {
      const result = await crearPacient(pacientData); // Llama al servicio
      Alert.alert('Éxito', result.message);

      // Reset fields
      setDni('');
      setNomComplet('');
      setTelefon('');
      setHospitalPacient('');
      setDniMetgeAssociat('');
      setMalaltia('');
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir Paciente</Text>

      <TextInput
        style={styles.input}
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nomComplet}
        onChangeText={setNomComplet}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefon}
        keyboardType="phone-pad"
        onChangeText={setTelefon}
      />
      <TextInput
        style={styles.input}
        placeholder="Hospital del Paciente"
        value={hospitalPacient}
        onChangeText={setHospitalPacient}
      />
      <TextInput
        style={styles.input}
        placeholder="DNI del Médico Asociado"
        value={dniMetgeAssociat}
        onChangeText={setDniMetgeAssociat}
      />
      <TextInput
        style={styles.input}
        placeholder="Enfermedad"
        value={malaltia}
        onChangeText={setMalaltia}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
        <Text style={styles.buttonText}>Añadir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AfegirPacientScreen;
