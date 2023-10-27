import axios, { AxiosError } from 'axios';
import { House } from '../types/house';

const baseURL = 'http://localhost:3000';

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export async function getAllHouses(): Promise<House[]> {
  try {
    const response = await api.get('/api/house');
    return response.data;
  } catch (error) {
    console.error('Något gick fel vid hämtning av hus:', error);
    throw error;
  }
}

export async function getHouseById(id: string): Promise<House | null> {
  try {
    const response = await api.get(`/api/house/${id}`);
    return response.data;
  } catch (error) {
    console.error('Något gick fel vid hämtning av husdetaljer:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 404) {
        return null; 
      }
    }

    throw error;
  }
}

export async function createHouse(formData: House): Promise<{ message: string; insertedId: string }> {
  try {
    const response = await api.post('/api/house', formData);
    return response.data;
  } catch (error) {
    console.error('Något gick fel vid skapande av hus:', error);
    throw error;
  }
}

export async function updateHouse(id: string, updatedData: Partial<House>): Promise<{ message: string; modifiedCount: number }> {
  try {
    const response = await api.put(`/api/house/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Något gick fel vid uppdatering av hus:', error);
    throw error;
  }
}

export async function deleteHouse(id: string): Promise<{ message: string; deletedCount: number }> {
  try {
    const response = await api.delete(`/api/house/${id}`);
    return response.data;
  } catch (error) {
    console.error('Något gick fel vid borttagning av hus:', error);
    throw error;
  }
}

export async function getHouseByType(type: string): Promise<House[]> {
  try {
    const response = await api.get(`/api/house?type=${type}`);
    return response.data;
  } catch (error) {
    console.error('Något gick fel vid hämtning av hus efter typ:', error);
    throw error;
  }
}
