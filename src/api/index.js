import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.lovecrypto.net/v1/app',
});