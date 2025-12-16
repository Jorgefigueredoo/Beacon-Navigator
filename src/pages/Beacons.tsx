import { useEffect, useState } from "react";
import { ChevronLeft, Radio, Bluetooth, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BeaconCard } from "@/components/BeaconCard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Beacon } from "@/types";
import { toast } from "sonner";
// CORREÇÃO 1: Caminho relativo para garantir que o Vite encontre o arquivo
import api from '../services/api'; 

export default function Beacons() {
  const navigate = useNavigate();
  const [beacons, setBeacons] = useState<Beacon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarBeacons();
  }, []);

  async function carregarBeacons() {
    setLoading(true);
    try {
        const resposta = await api.get('/beacons');
        setBeacons(resposta.data);
    } catch (error) {
        console.error("Erro ao carregar:", error);
        toast.error("Erro ao buscar dados do servidor.");
    } finally {
        // CORREÇÃO 2: O finally garante que o loading suma mesmo com Erro 500
        setLoading(false); 
    }
  }

  // Separar beacons ativos dos inativos
  const beaconsAtivos = beacons.filter(b => b.status === 'ATIVADO');
  const beaconsDisponiveis = beacons.filter(b => b.status !== 'ATIVADO');

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-24 flex items-center justify-center">
        <div className="text-center">
          <Bluetooth className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando beacons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="flex items-center justify-between p-4">
        <Link to="/dashboard" className="p-2 rounded-full hover:bg-secondary transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <Button 
          onClick={() => navigate("/novo-beacon")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Beacon
        </Button>
      </header>

      <main className="px-4 space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold">Beacons</h1>
          <p className="text-primary flex items-center gap-2">
            <Bluetooth className="w-4 h-4" />
            {beacons.length} Beacons Cadastrados
          </p>
        </div>

        {/* Beacons Ativos */}
        {beaconsAtivos.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground">
              Beacons Ativos
            </h2>
            {beaconsAtivos.map((beacon, index) => (
              <div
                key={beacon.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BeaconCard
                  id={beacon.id!.toString()}
                  // CORREÇÃO 3: Proteção caso o beacon não tenha local (evita tela branca)
                  name={beacon.local?.nome || "Local Desconhecido"}
                  status="active"
                  image={beacon.local?.imagemUrl}
                />
              </div>
            ))}
          </div>
        )}

        {/* Outros Beacons */}
        {beaconsDisponiveis.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground">
              Outros Beacons
            </h2>
            {beaconsDisponiveis.map((beacon, index) => (
              <div
                key={beacon.id}
                className="flex items-center gap-3 py-3 border-b border-border/50 animate-slide-up"
                style={{ animationDelay: `${(index + beaconsAtivos.length) * 0.1}s` }}
              >
                <Radio className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">
                    {beacon.local?.nome || "Local Desconhecido"}
                </span>
                <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                  beacon.status === 'MANUNTENCAO' 
                    ? 'bg-yellow-500/20 text-yellow-500' 
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {beacon.status === 'MANUNTENCAO' ? 'Manutenção' : 'Desativado'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Lista Vazia */}
        {beacons.length === 0 && (
          <div className="text-center py-12">
            <Radio className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum beacon cadastrado</p>
            <Button 
              onClick={() => navigate("/novo-beacon")}
              className="mt-4"
            >
              Adicionar Primeiro Beacon
            </Button>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}