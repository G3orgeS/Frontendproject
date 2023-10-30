import axios, { AxiosResponse } from 'axios';
import { Application, HouseSelection } from '../types/application'

const baseURL = 'http://localhost:3000';

const api = axios.create({
  baseURL,
  timeout: 5000,
});

export async function getApplications(): Promise<Application[] | null> {
  try {
    const response: AxiosResponse<Application[]> = await api.get('/api/application');
    
    if (response.status === 200) {
      const applications = response.data;
      return applications;
    } else {
      console.error('Kunde inte hämta ansökningar');
      return null;
    }
  } catch (error) {
    console.error('Något gick fel vid hämtning av ansökningar:', error);
    return null;
  }
}

export async function createApplication(applicationData: Application, userId: string): Promise<Application | null> {
  try {
    applicationData.user = userId;

    // console.log('Försöker skapa ansökan...');
    const response: AxiosResponse<Application> = await api.post('/api/application/createApplication', applicationData);

    if (response.status === 201) {
      // console.log('Ansökan skapad framgångsrikt.');
      const createdApplication = response.data;
      return createdApplication;
    } else {
      // console.error('Kunde inte skapa ansökan');
      return null;
    }
  } catch (error) {
    // console.error('Något gick fel vid skapande av ansökan:', error);
    return null;
  }
}

export async function getApplicationByUser(username: string): Promise<HouseSelection[] | null> {
  try {
    const response: AxiosResponse<HouseSelection[]> = await api.get(`/api/application/${username}`);
    
    if (response.status === 200) {
      const applications = response.data;
      return applications;
    } else {
      console.error('Kunde inte hämta ansökningar');
      return null;
    }
  } catch (error) {
    console.error('Något gick fel vid hämtning av ansökningar:', error);
    return null;
  }
}
