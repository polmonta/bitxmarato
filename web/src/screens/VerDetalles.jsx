import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const VerDetalles = ({ route }) => {
  const paciente = {
    dni: '12345678A',
    nomComplet: 'Juan Pérez García',
    telefon: '+34 654 321 987',
    hospitalPacient: 'Hospital General de Madrid',
    dniMetgeAssociat: '87654321B',
    malaltia: 'Asma Crónica',
  };

  const questionarios = [
    { id: '2024-12-01', label: 'Questionari (01/12/2024)' },
    { id: '2024-06-05', label: 'Questionari (05/12/2024)' },
    { id: '2024-05-10', label: 'Questionari (10/12/2024)' },
    { id: '2024-02-01', label: 'Questionari (01/12/2024)' },
    { id: '2023-12-05', label: 'Questionari (05/12/2023)' },
    { id: '2023-09-10', label: 'Questionari (10/09/2023)' },
    { id: '2023-08-01', label: 'Questionari (01/08/2023)' },
    { id: '2022-04-05', label: 'Questionari (05/04/2023)' },
    { id: '2022-01-10', label: 'Questionari (10/01/2022)' },
    { id: '2022-01-01', label: 'Questionari (01/01/2022)' },
    { id: '2021-12-25', label: 'Questionari (25/12/2021)' },
    { id: '2021-12-10', label: 'Questionari (10/12/2021)' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalles del Paciente</Text>
        <Text style={styles.detail}>DNI: {paciente.dni}</Text>
        <Text style={styles.detail}>Nombre Completo: {paciente.nomComplet}</Text>
        <Text style={styles.detail}>Teléfono: {paciente.telefon}</Text>
        <Text style={styles.detail}>Hospital: {paciente.hospitalPacient}</Text>
        <Text style={styles.detail}>DNI Médico Asociado: {paciente.dniMetgeAssociat}</Text>
        <Text style={styles.detail}>Enfermedad: {paciente.malaltia}</Text>
      </View>
      <ScrollView style={styles.buttonsScroll} contentContainerStyle={styles.buttonsContainer}>
        {questionarios.map((q) => (
          <View key={q.id} style={styles.horizontalButtonContainer}>
            <TouchableOpacity style={styles.horizontalButton}>
              <Text style={styles.horizontalButtonText}>{q.label}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonsScroll: {
    flex: 1,
    maxHeight: 300, // Ajusta la altura según sea necesario
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  buttonsContainer: {
    paddingBottom: 10,
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  horizontalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  horizontalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerDetalles;
