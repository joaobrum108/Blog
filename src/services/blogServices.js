import { carregarDados } from '../services/api';

export const carregarPosts = async () => {
    return await carregarDados.get('/listarDados');
};

export const enviarPost = async (formData) => {
  return await carregarDados.post('/enviarDados', formData);
}; 

export const buscarPostPorId = async (id) => {
  return await carregarDados.get(`/buscarDados/${id}`);
}