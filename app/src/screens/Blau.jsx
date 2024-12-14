import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const App = () => {
  const [activeButton, setActiveButton] = useState(null); // Estado para el botón activo

  const handlePress = (button) => {
    // Si se presiona el botón activo, lo desactiva, si no, activa el nuevo botón
    setActiveButton((prevActive) => (prevActive === button ? null : button));
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={[ styles.button, activeButton === 'button1' && styles.buttonActive,]} onPress={() => handlePress('button2')} >
        <Text style={styles.buttonText}>Botón 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[ styles.button, activeButton === 'button2' && styles.buttonActive, ]} onPress={() => handlePress('button1')} >
        <Text style={styles.buttonText}>Botón 2</Text>
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
  button: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 8,
    margin: 10,
    opacity: 1, // Opacidad por defecto
  },
  buttonActive: {
    backgroundColor: '#0056b3', // Color diferente para el botón activo
    opacity: 0.7, // Cambiar opacidad cuando está activo
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
