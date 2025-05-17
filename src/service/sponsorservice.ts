import axios from 'axios';
import { API_BASE_URL } from '../config/config';

export const getSponsors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sponsors`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener sponsors:', error);
    throw error;
  }
};

export const createSponsor = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sponsors`, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear sponsor:', error);
    throw error;
  }
};

export const getSponsorById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sponsors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener sponsor con ID ${id}:`, error);
    throw error;
  }
};

export const updateSponsor = async (id: string, data: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/sponsors/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar sponsor con ID ${id}:`, error);
    throw error;
  }
};

export const deleteSponsor = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/sponsors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar sponsor con ID ${id}:`, error);
    throw error;
  }
};
