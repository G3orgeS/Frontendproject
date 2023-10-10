import axios, { AxiosError } from 'axios';
import { Users } from '../types/user';

const baseURL = 'http://localhost:3000'; // Ändra detta till din serveradress och port

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export const userApi = {
  getAllUsers: async (): Promise<Users[]> => { // Ändrade Users till User
    try {
      const response = await api.get('/api/users'); // Ändrade /api/user till /api/users
      return response.data;
    } catch (error) {
      console.error('Något gick fel vid hämtning av användare:', error);
      throw error;
    }
  },
};
