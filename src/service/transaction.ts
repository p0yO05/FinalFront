import axios from 'axios';
import { API_BASE_URL } from '../config/config';

export const getMercadoNegro = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/mercadoNegro`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener items del mercado negro:', error);
      throw error;
    }
  };
  
  export const createItemMercadoNegro = async (data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/mercadoNegro`, data);
      return response.data;
    } catch (error) {
      console.error('Error al crear item del mercado negro:', error);
      throw error;
    }
  };
  
  export const getItemMercadoNegroById = async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/mercadoNegro/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener item con ID ${id} del mercado negro:`, error);
      throw error;
    }
  };
  
  export const updateItemMercadoNegro = async (id: string, data: any) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/mercadoNegro/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar item con ID ${id} del mercado negro:`, error);
      throw error;
    }
  };
  
  export const deleteItemMercadoNegro = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/mercadoNegro/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar item con ID ${id} del mercado negro:`, error);
      throw error;
    }
  };
  