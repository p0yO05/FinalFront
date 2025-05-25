// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // o usando env
  withCredentials: true,
});

export default api;
