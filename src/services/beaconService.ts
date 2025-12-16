import api from './api';
import { Beacon } from '@/types';

export const beaconService = {
  listar: () => api.get<Beacon[]>('/beacons'),
  buscarPorId: (id: number) => api.get<Beacon>(`/beacons/${id}`),
  criar: (beacon: Beacon) => api.post<Beacon>('/beacons', beacon),
  atualizar: (id: number, beacon: Beacon) => 
    api.put<Beacon>(`/beacons/${id}`, beacon),
  vincularLocal: (beaconId: number, localId: number) => 
    api.put<Beacon>(`/beacons/${beaconId}/vincular-local/${localId}`),
  deletar: (id: number) => api.delete(`/beacons/${id}`),
};