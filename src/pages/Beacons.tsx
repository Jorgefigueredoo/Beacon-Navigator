import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Bluetooth } from "lucide-react";

import { api } from "@/services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Beacon = {
  id: number;
  nome: string;
  uuid: string;
  status: string; // "ATIVADO" | "MANUTENCAO" | "DESATIVADO" etc
};

export default function Beacons() {
  const navigate = useNavigate();

  const [beacons, setBeacons] = useState<Beacon[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function carregarBeacons() {
    setLoading(true);
    setErro(null);

    try {
      const resposta = await api.get("/beacons");
      const payload = resposta.data;

      // Suporta vários formatos comuns de resposta
      const lista: Beacon[] =
        Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.content)
          ? payload.content
          : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.items)
          ? payload.items
          : [];

      setBeacons(lista);
    } catch (e: any) {
      const status = e?.response?.status;
      if (status) setErro(`Erro ao carregar beacons (HTTP ${status}).`);
      else setErro("Não foi possível conectar ao servidor.");
      setBeacons([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarBeacons();
  }, []);

  const listaBeacons = Array.isArray(beacons) ? beacons : [];

  const termo = busca.trim().toLowerCase();

  const beaconsFiltrados = listaBeacons.filter((beacon) => {
    if (!termo) return true;
    return (
      beacon.nome?.toLowerCase().includes(termo) ||
      beacon.uuid?.toLowerCase().includes(termo) ||
      String(beacon.id).includes(termo)
    );
  });

  const beaconsAtivos = beaconsFiltrados.filter((b) => b.status === "ATIVADO");
  const beaconsDisponiveis = beaconsFiltrados.filter((b) => b.status !== "ATIVADO");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ATIVADO":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "MANUTENCAO":
        return <Badge className="bg-yellow-500">Em manutenção</Badge>;
      default:
        return <Badge className="bg-red-500">Desativado</Badge>;
    }
  };

  const BeaconCard = ({ beacon }: { beacon: Beacon }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/local/${beacon.id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bluetooth className="h-5 w-5 text-primary" />
              {beacon.nome}
            </CardTitle>
            <p className="text-sm text-muted-foreground">UUID: {beacon.uuid}</p>
          </div>
          {getStatusBadge(beacon.status)}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">ID: {beacon.id}</span>
          <span className="text-muted-foreground">Status: {beacon.status}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Beacons</h1>
            <p className="text-muted-foreground">
              Gerencie seus beacons e monitore o status.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={carregarBeacons} disabled={loading}>
              {loading ? "Atualizando..." : "Atualizar"}
            </Button>

            <Button onClick={() => navigate("/novo-beacon")}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Beacon
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, UUID ou ID..."
            className="pl-10"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {erro && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm">
            {erro}
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="ativos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="ativos">Ativos ({beaconsAtivos.length})</TabsTrigger>
            <TabsTrigger value="disponiveis">
              Disponíveis ({beaconsDisponiveis.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ativos">
            {loading ? (
              <p className="text-muted-foreground">Carregando...</p>
            ) : beaconsAtivos.length === 0 ? (
              <p className="text-muted-foreground">Nenhum beacon ativo encontrado.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {beaconsAtivos.map((beacon) => (
                  <BeaconCard key={beacon.id} beacon={beacon} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="disponiveis">
            {loading ? (
              <p className="text-muted-foreground">Carregando...</p>
            ) : beaconsDisponiveis.length === 0 ? (
              <p className="text-muted-foreground">
                Nenhum beacon disponível encontrado.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {beaconsDisponiveis.map((beacon) => (
                  <BeaconCard key={beacon.id} beacon={beacon} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
