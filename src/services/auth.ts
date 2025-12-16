import { api } from "./api";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  // Ajuste a rota se no seu back for diferente
  const { data } = await api.post<LoginResponse>("/auth/login", payload);

  // Persistir token
  localStorage.setItem("token", data.token);

  return data;
}

export function logout() {
  localStorage.removeItem("token");
}
