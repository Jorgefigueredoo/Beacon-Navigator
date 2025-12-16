import api from './api';
import { TurmaMatricula } from '@/types';

export const turmasMatriculasService = {
  listar: async () => {
    const response = await api.get<TurmaMatricula[]>('/matriculas');
    return response.data;
  },

  listarPorTurma: async (turmaId: number) => {
    const response = await api.get<TurmaMatricula[]>(`/matriculas/turma/${turmaId}`);
    return response.data;
  },

  listarPorUsuario: async (usuarioId: number) => {
    const response = await api.get<TurmaMatricula[]>(`/matriculas/usuario/${usuarioId}`);
    return response.data;
  },

  buscarPorId: async (id: number) => {
    const response = await api.get<TurmaMatricula>(`/matriculas/${id}`);
    return response.data;
  },

  realizar: async (matricula: TurmaMatricula) => {
    const response = await api.post<TurmaMatricula>('/matriculas', matricula);
    return response.data;
  },

  cancelar: async (id: number) => {
    await api.delete(`/matriculas/${id}`);
  },
};