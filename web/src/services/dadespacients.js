import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Cambia esto si el servidor está desplegado

// Servicio para crear un paciente
export const crearPacient = async (pacientData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/crearPacient`, pacientData);
    return response.data; // Devuelve los datos del servidor
  } catch (error) {
    throw error.response?.data?.error || 'Error al crear el paciente'; // Maneja el error
  }
};
