import axios from 'axios';

import { API_BASE_URL } from '../../globalVariables';

export const setMusculs = async (questionari, valor) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/setBooleanState/${questionari}/tirmusc/${valor}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error amb musculs';
  }
};

export const getMusculs = async (questionari) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getBooleanState/${questionari}/tirmusc`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Error amb musculs';
    }
  };