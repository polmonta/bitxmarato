import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { crearRespostaQuestionari } from '../services/diagnosticService'; // Importa el servicio

const DiagnosticoScreen = () => {
  const [dx, setDx] = useState(null);
  const [pneumonia, setPneumonia] = useState(null);
  const [estatInmunologic, setEstatInmunologic] = useState('');
  const [pcr, setPcr] = useState(null);
  const [CMV, setCMV] = useState(null);
  const [jiroveci, setJiroveci] = useState(null);
  const [DimeroD, setDimeroD] = useState(null);
  const [TACAR, setTACAR] = useState(null);

  const handleDiagnostico = async () => {
    if (
      dx === null ||
      pneumonia === null ||
      estatInmunologic === '' ||
      pcr === null ||
      CMV === null ||
      jiroveci === null ||
      DimeroD === null ||
      TACAR === null
    ) {
      Alert.alert('Error', 'Por favor, completa todos los campos antes de continuar.');
      return;
    }

    const diagnosticData = {
      dx,
      pneumonia,
      estatInmunologic,
      pcr,
      CMV,
      jiroveci,
      DimeroD,
      TACAR,
    };

    try {
      const result = await crearRespostaQuestionari(diagnosticData); // Llama al servicio
      Alert.alert('Éxito', 'Diagnóstico registrado con éxito.');
    } catch (error) {
      Alert.alert('Error', error);
    }
  };

  const renderBoolSelector = (label, value, setValue) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.optionButton, value === true && styles.optionButtonSelected]}
          onPress={() => setValue(true)}
        >
          <Text style={styles.optionButtonText}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, value === false && styles.optionButtonSelected]}
          onPress={() => setValue(false)}
        >
          <Text style={styles.optionButtonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnóstico</Text>

      <View style={styles.fieldsContainer}>
        {renderBoolSelector('Dx (Diagnóstico Concreto)', dx, setDx)}
        {renderBoolSelector('Pneumonia', pneumonia, setPneumonia)}

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Estat Inmunologic</Text>
          <TouchableOpacity
            style={styles.inputField}
            onPress={() => Alert.alert('Instrucciones', 'Introduce el estado inmunológico (1-100).')}
          >
            <Text style={styles.inputText}>{estatInmunologic || 'Introduce un valor'}</Text>
          </TouchableOpacity>
        </View>

        {renderBoolSelector('PCR', pcr, setPcr)}
        {renderBoolSelector('CMV', CMV, setCMV)}
        {renderBoolSelector('Jiroveci', jiroveci, setJiroveci)}
        {renderBoolSelector('Dímero D', DimeroD, setDimeroD)}
        {renderBoolSelector('TACAR', TACAR, setTACAR)}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleDiagnostico}>
        <Text style={styles.submitButtonText}>Realizar Diagnóstico</Text>
      </TouchableOpacity>
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