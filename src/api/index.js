import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://dev.lovecrypto.net/v1/app',
});