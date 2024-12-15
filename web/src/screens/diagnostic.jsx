import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
      estatInmunologic: parseInt(estatInmunologic, 10),
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
        {renderBoolSelector('Dx', dx, setDx)}
        {renderBoolSelector('Pneumònia', pneumonia, setPneumonia)}

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Estat Inmunològic</Text>
          <TextInput
            style={styles.inputField}
            placeholder="1-100"
            keyboardType="numeric"
            value={estatInmunologic}
            onChangeText={setEstatInmunologic}
          />
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
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  fieldsContainer: {
    flex: 1,
    justifyContent: 'space-between', // Espaciado uniforme
  },
  fieldContainer: {
    marginBottom: 5, // Menor margen
  },
  label: {
    fontSize: 14, // Texto más compacto
    marginBottom: 2,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Botones más juntos
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8, // Reduce el padding vertical
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#4CAF50',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 12, // Texto más compacto
  },
  inputField: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5, // Reduce el padding interno
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14, // Texto más compacto
    fontWeight: 'bold',
  },
});

export default DiagnosticoScreen;
