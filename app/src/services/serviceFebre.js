import axios from 'axios';

import { API_BASE_URL } from '../../globalVariables';

export const setFebre = async (questionari, valor) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/setBooleanState/${questionari}/febre/${valor}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error amb ofeg';
  }
};

export const getFebre = async (questionari) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getBooleanState/${questionari}/febre`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Error amb ofeg';
    }
  };