
import axios from 'axios';
import { Tour } from '../types/tour'; 

const API_BASE_URL = 'http://localhost:3000'; 


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchTours = async (): Promise<Tour[]> => {
  try {
   
    const response = await apiClient.get<Tour[]>('/tours');

    return response.data;
  } catch (error) {

    console.error('Error fetching tours:', error);

    throw error;
  }
};
