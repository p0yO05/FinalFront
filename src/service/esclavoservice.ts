import axios from 'axios';
import { API_BASE_URL } from '../config/config'; // Asegúrate que esta ruta es correcta según tu estructura

export const getEsclavos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/esclavos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener esclavos:', error);
    throw error;
  }
};

export const createEsclavo = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/esclavos`, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear esclavo:', error);
    throw error;
  }
};

export const getEsclavoById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/esclavos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener esclavo con ID ${id}:`, error);
    throw error;
  }
};

export const updateEsclavo = async (id: string, data: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/esclavos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar esclavo con ID ${id}:`, error);
    throw error;
  }
};

export const deleteEsclavo = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/esclavos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar esclavo con ID ${id}:`, error);
    throw error;
  }
};
