import axios from 'axios';

import { API_BASE_URL } from '../../globalVariables';

export const setDesaturacio = async (questionari, valor) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/setBooleanState/${questionari}/desaturacio/${valor}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error amb desaturacio';
  }
};

export const getDesaturacio = async (questionari) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getBooleanState/${questionari}/desaturacio`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Error amb desaturacio';
    }
  };