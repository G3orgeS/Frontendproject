import axios, { AxiosError } from 'axios';
import { House } from '../types/house';

const baseURL = 'http://localhost:3000'; 

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export const houseApi = {
  getAllHouses: async (): Promise<House[]> => {
    try {
      const response = await api.get('/api/house');
      return response.data;
    } catch (error) {
      console.error('Något gick fel vid hämtning av hus:', error);
      throw error;
    }
  },

  getHouseById: async (id: string): Promise<House | null> => {
    try {
      const response = await api.get(`/api/house/${id}`);
      return response.data;
    } catch (error) {
      console.error('Något gick fel vid hämtning av husdetaljer:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response && axiosError.response.status === 404) {
          return null; // Returnera null om huset inte hittades
        }
      }

      throw error;
    }
  },

  createHouse: async (formData: House): Promise<{ message: string; insertedId: string }> => {
    try {
      const response = await api.post('/api/house', formData);
      return response.data;
    } catch (error) {
      console.error('Något gick fel vid skapande av hus:', error);
      throw error;
    }
  },

  updateHouse: async (id: string, updatedData: Partial<House>): Promise<{ message: string; modifiedCount: number }> => {
    try {
      const response = await api.put(`/api/house/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Något gick fel vid uppdatering av hus:', error);
      throw error;
    }
  },

  deleteHouse: async (id: string): Promise<{ message: string; deletedCount: number }> => {
    try {
      const response = await api.delete(`/api/house/${id}`);
      return response.data;
    } catch (error) {
      console.error('Något gick fel vid borttagning av hus:', error);
      throw error;
    }
  },

  getHouseByType: async (type: string): Promise<House[]> => {
    try {
      const response = await api.get(`/api/house?type=${type}`);
      return response.data;
    } catch (error) {
      console.error('Något gick fel vid hämtning av hus efter typ:', error);
      throw error;
    }
  },
};
