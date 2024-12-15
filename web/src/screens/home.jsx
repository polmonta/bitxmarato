import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestió de Pacients</Text>

      <TouchableOpacity
        style={[styles.button, styles.sameSizeButton]}
        onPress={() => navigation.navigate('GestionPacients')}
      >
        <Text style={styles.buttonText}>Consultar pacients</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.sameSizeButton]}
        onPress={() => navigation.navigate('AfegirPacient')}
      >
        <Text style={styles.buttonText}>Afegir pacient</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.sameSizeButton]}
        onPress={() => navigation.navigate('Diagnostico')}
      >
        <Text style={styles.buttonText}>Diagnóstico</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sameSizeButton: {
    width: 200, // Define un ancho fijo para todos los botones
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
