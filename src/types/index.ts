export interface Usuario {
  id?: number;
  nomeCompleto: string;
  email: string;
  senha?: string;
  userProfile?: UsuarioPerfil;
}

export interface UsuarioPerfil {
  id?: number;
  biografia?: string;
  telefone: string;
  uf: string;
  localizacao: string;
  avatarUrl?: string;
}

export interface Beacon {
  id?: number;
  status: 'ATIVADO' | 'MANUNTENCAO' | 'DESATIVADO';
  ultimaConexao?: string;
  local: LocalFisico;
}

export interface LocalFisico {
  id?: number;
  nome: string;
  descricao?: string;
  imagemUrl?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
}

export interface Rota {
  id?: number;
  proprietario?: Usuario;
  nome: string;
  descricao?: string;
  publica: boolean;
  pontos?: PontoRota[];
  dataCriacao?: string;
}

export interface PontoRota {
  id?: number;
  rota?: Rota;
  sequenceNumber: number;
  local?: LocalFisico;
  beacon?: Beacon;
  instruction?: string;
}

export interface Turma {
  id?: number;
  nomeTurma: string;
  descricao: string;
  predio: string;
  andar: string;
  sala: string;
  textoHorario: string;
  localFisico?: LocalFisico;
}

export interface TurmaMatricula {
  id?: number;
  matricula: string;
  dataCriacao?: string;
  turma: Turma;
  usuario: Usuario;
  papel: 'ESTUDANTE' | 'PROFESSOR';
}