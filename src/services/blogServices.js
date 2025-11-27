import { carregarDados } from '../services/api';

export const carregarPosts = async () => {
    return await carregarDados.get('/listarDados');
};