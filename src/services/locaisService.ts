import api from './api';
import { LocalFisico } from '@/types';

export const locaisService = {
  listar: async () => {
    const response = await api.get<LocalFisico[]>('/locais');
    return response.data;
  },

  buscarPorId: async (id: number) => {
    const response = await api.get<LocalFisico>(`/locais/${id}`);
    return response.data;
  },

  criar: async (local: LocalFisico) => {
    const response = await api.post<LocalFisico>('/locais', local);
    return response.data;
  },

  atualizar: async (id: number, local: LocalFisico) => {
    const response = await api.put<LocalFisico>(`/locais/${id}`, local);
    return response.data;
  },

  deletar: async (id: number) => {
    await api.delete(`/locais/${id}`);
  },
};