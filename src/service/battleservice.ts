import axios from 'axios';
import { API_BASE_URL } from '../config/config';

export const getBattles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/battles`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener battles:', error);
      throw error;
    }
  };
  
  export const createBattle = async (data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/battles`, data);
      return response.data;
    } catch (error) {
      console.error('Error al crear battle:', error);
      throw error;
    }
  };
  
  export const getBattleById = async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/battles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener battle con ID ${id}:`, error);
      throw error;
    }
  };
  
  export const updateBattle = async (id: string, data: any) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/battles/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar battle con ID ${id}:`, error);
      throw error;
    }
  };
  
  export const deleteBattle = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/battles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar battle con ID ${id}:`, error);
      throw error;
    }
  };
  