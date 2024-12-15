import axios from 'axios';

import { API_BASE_URL } from '../../globalVariables';

export const setRespiracio = async (questionari, valor) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/crearHospital`, questionari, valor);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error amb respiracions';
  }
};

export const getRespiracio = async (questionari) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getPacientsByMetge/${questionari}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Error amb respiracions';
    }
  };