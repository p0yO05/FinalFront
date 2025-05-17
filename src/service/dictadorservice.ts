import axios from 'axios';
import { API_BASE_URL } from '../config/config';

export const getDictadors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dictadors`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener dictadores:', error);
    throw error;
  }
};

export const createDictador = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/dictadors`, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear dictador:', error);
    throw error;
  }
};

export const getDictadorById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dictadors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener dictador con ID ${id}:`, error);
    throw error;
  }
};

export const updateDictador = async (id: string, data: any) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/dictadors/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar dictador con ID ${id}:`, error);
    throw error;
  }
};

export const deleteDictador = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/dictadors/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar dictador con ID ${id}:`, error);
    throw error;
  }
};
