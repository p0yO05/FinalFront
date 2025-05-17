import axios from 'axios';
import { API_BASE_URL } from '../config/config';

export const getBets = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bets`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener bets:', error);
      throw error;
    }
  };
  
  export const createBet = async (data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bets`, data);
      return response.data;
    } catch (error) {
      console.error('Error al crear bet:', error);
      throw error;
    }
  };
  
  export const getBetById = async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener bet con ID ${id}:`, error);
      throw error;
    }
  };
  
  export const updateBet = async (id: string, data: any) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/bets/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar bet con ID ${id}:`, error);
      throw error;
    }
  };
  
  export const deleteBet = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/bets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar bet con ID ${id}:`, error);
      throw error;
    }
  };