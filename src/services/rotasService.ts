import api from './api';
import { Rota } from '@/types';

export const rotasService = {
  listar: async () => {
    const response = await api.get<Rota[]>('/rotas');
    return response.data;
  },

  listarPublicas: async () => {
    const response = await api.get<Rota[]>('/rotas/publicas');
    return response.data;
  },

  listarPorUsuario: async (usuarioId: number) => {
    const response = await api.get<Rota[]>(`/rotas/usuario/${usuarioId}`);
    return response.data;
  },

  buscarPorId: async (id: number) => {
    const response = await api.get<Rota>(`/rotas/${id}`);
    return response.data;
  },

  criar: async (rota: Rota) => {
    const response = await api.post<Rota>('/rotas', rota);
    return response.data;
  },

  atualizar: async (id: number, rota: Rota) => {
    const response = await api.put<Rota>(`/rotas/${id}`, rota);
    return response.data;
  },

  alternarVisibilidade: async (id: number) => {
    const response = await api.patch<Rota>(`/rotas/${id}/visibilidade`);
    return response.data;
  },

  deletar: async (id: number) => {
    await api.delete(`/rotas/${id}`);
  },
};