import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Cambia la URL si el servidor está desplegado

/**
 * Servicio para obtener los pacientes asociados a un médico específico.
 * @param {string} dniMetgeAssociat - DNI del médico asociado
 */
export const obtenerPacientesPorMedico = async (dniMetgeAssociat) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getPacientsByMetge/${dniMetgeAssociat}`);
    return response.data; // Retorna la lista de pacientes
  } catch (error) {
    throw error.response?.data?.error || 'Error al obtener los pacientes';
  }
};
