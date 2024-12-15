import axios from 'axios';

// Base URL del servidor Flask
const API_BASE_URL = 'http://127.0.0.1:5000'; // Cambia esta URL si el servidor está desplegado

/**
 * Servicio para enviar los datos del diagnóstico al servidor
 * @param {Object} diagnosticData - Datos del cuestionario
 */
export const crearRespostaQuestionari = async (diagnosticData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/crearRespostaQuestionari`, diagnosticData);
    return response.data; // Retorna la respuesta del servidor
  } catch (error) {
    throw error.response?.data?.error || 'Error al registrar el diagnóstico'; // Maneja errores
  }
};
