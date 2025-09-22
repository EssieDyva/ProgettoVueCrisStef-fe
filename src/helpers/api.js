import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFermate = () => {
  return apiClient.get('/fermate/listaFermate');
};

export const insertFermate = (fermataData) => {
  return apiClient.post('/fermate/aggiungiFermata', fermataData);
};

export const deleteFermate = (idFermata) => {
  return apiClient.delete(`/fermate/rimuoviFermata/${idFermata}`);
}