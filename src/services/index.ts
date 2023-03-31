import axios from 'axios';

const URL = 'http://51.81.246.218:2001/emsoft/emauto/';

const api = axios.create({
  baseURL: URL,
});

export default api;
