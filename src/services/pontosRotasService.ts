import api from './api';
import { PontoRota } from '@/types';

export const pontosRotasService = {
  listar: async () => {
    const response = await api.get<PontoRota[]>('/pontos-rotas');
    return response.data;
  },

  listarPorRota: async (rotaId: number) => {
    const response = await api.get<PontoRota[]>(`/pontos-rotas/rota/${rotaId}`);
    return response.data;
  },

  buscarPorId: async (id: number) => {
    const response = await api.get<PontoRota>(`/pontos-rotas/${id}`);
    return response.data;
  },

  criar: async (ponto: PontoRota) => {
    const response = await api.post<PontoRota>('/pontos-rotas', ponto);
    return response.data;
  },

  atualizar: async (id: number, ponto: PontoRota) => {
    const response = await api.put<PontoRota>(`/pontos-rotas/${id}`, ponto);
    return response.data;
  },

  deletar: async (id: number) => {
    await api.delete(`/pontos-rotas/${id}`);
  },
};