import { carregarDados , buscarPostPorId2 , enviarDados , excluirPublicacao  , atualizarPublic } from '../services/api';

export const carregarPosts = async () => {
    return await carregarDados.get('/listarDados');
};

export const enviarPost = async (formData) => {
  return await enviarDados.post('/enviarDados', formData);
}; 

export const buscarPostPorId = async (id) => {
  return await buscarPostPorId2.get(`/buscarDados/${id}`);
}

export const excluirPost = async (id) => {
  return await excluirPublicacao.delete(`/deletarDados/${id}`);
}

export const atualizarPost = async (id, formData) => {
  return await atualizarPublic.put(`/atualizarDados/${id}`, formData);
}

export const enviarAniversariante = async (data) => {
  return await enviarDados.post('/aniversariante', data);
}

export const getAniversariantes = async () => {
  return await carregarDados.get('/listarAniversariante');
}
