import axios from 'axios';

function createApiInstance(baseURL) {
  const DEFAULT_TIMEOUT = 12000;
  const TIMEOUT_MS = import.meta.env.VITE_API_TIMEOUT_MS
    ? parseInt(import.meta.env.VITE_API_TIMEOUT_MS)
    : DEFAULT_TIMEOUT;

  const instance = axios.create({
    baseURL,
    timeout: TIMEOUT_MS,
    headers: {},
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token.replace(/[\\"]/g, '')}`;
      }
      if (!(config.data instanceof FormData) && !config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
}

const carregarDados = createApiInstance(import.meta.env.VITE_API_POST);
const buscarPostPorId = createApiInstance(import.meta.env.VITE_API_POST);

export { carregarDados, buscarPostPorId };