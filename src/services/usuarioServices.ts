import api from './api';
import { Usuario } from '@/types';

export const usuarioService = {
  listar: () => api.get<Usuario[]>('/usuarios'),
  buscarPorId: (id: number) => api.get<Usuario>(`/usuarios/${id}`),
  criar: (usuario: Usuario) => api.post<Usuario>('/usuarios', usuario),
  atualizar: (id: number, usuario: Usuario) => api.put<Usuario>(`/usuarios/${id}`, usuario),
  atualizarParcial: (id: number, usuario: Partial<Usuario>) => 
    api.patch<Usuario>(`/usuarios/${id}`, usuario),
  deletar: (id: number) => api.delete(`/usuarios/${id}`),
};