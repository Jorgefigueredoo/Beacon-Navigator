import { api } from "@/services/api";
import { Usuario } from "@/types";

export type UsuarioCreate = {
  nomeCompleto: string;
  email: string;
  senha: string;
};

export const usuarioService = {
  criar: async (usuario: UsuarioCreate): Promise<Usuario> => {
    const { data } = await api.post<Usuario>("/usuarios", usuario);
    return data;
  },

  listar: async (): Promise<Usuario[]> => {
    const { data } = await api.get<Usuario[]>("/usuarios");
    return data;
  },

  buscarPorId: async (id: number): Promise<Usuario> => {
    const { data } = await api.get<Usuario>(`/usuarios/${id}`);
    return data;
  },

  atualizar: async (id: number, usuario: Usuario): Promise<Usuario> => {
    const { data } = await api.put<Usuario>(`/usuarios/${id}`, usuario);
    return data;
  },

  atualizarParcial: async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const { data } = await api.patch<Usuario>(`/usuarios/${id}`, usuario);
    return data;
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/usuarios/${id}`);
  },
};
