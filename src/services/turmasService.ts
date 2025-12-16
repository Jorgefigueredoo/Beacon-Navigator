import api from './api';
import { Turma } from '@/types';

export const turmasService = {
  listar: async () => {
    const response = await api.get<Turma[]>('/turmas');
    return response.data;
  },

  listarPorLocal: async (localId: number) => {
    const response = await api.get<Turma[]>(`/turmas/sala/${localId}`);
    return response.data;
  },

  buscarPorId: async (id: number) => {
    const response = await api.get<Turma>(`/turmas/${id}`);
    return response.data;
  },

  criar: async (turma: Turma) => {
    const response = await api.post<Turma>('/turmas', turma);
    return response.data;
  },

  atualizar: async (id: number, turma: Turma) => {
    const response = await api.put<Turma>(`/turmas/${id}`, turma);
    return response.data;
  },

  deletar: async (id: number) => {
    await api.delete(`/turmas/${id}`);
  },
};