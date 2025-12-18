import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  MapPin,
  CalendarClock,
  Bluetooth,
  AlertCircle,
  Home,
  Users,
  User,
} from "lucide-react";

import { beaconService } from "@/services/beaconService";
import { Beacon } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

function BeaconsFooter() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const baseBtn =
    "flex flex-col items-center gap-1 text-xs transition-colors";
  const inactive =
    "text-muted-foreground hover:text-foreground";
  const active =
    "text-primary font-medium";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="max-w-5xl mx-auto px-4">
        <div className="h-16 flex items-center justify-around">
          <button
            className={`${baseBtn} ${isActive("/") ? active : inactive}`}
            onClick={() => navigate("/")}
            type="button"
          >
            <Home className="w-5 h-5" />
            Início
          </button>

          <button
            className={`${baseBtn} ${isActive("/beacons") ? active : inactive}`}
            onClick={() => navigate("/beacons")}
            type="button"
          >
            <Bluetooth className="w-5 h-5" />
            Beacons
          </button>

          <button
            className={`${baseBtn} ${isActive("/turmas") ? active : inactive}`}
            onClick={() => navigate("/turmas")}
            type="button"
          >
            <Users className="w-5 h-5" />
            Turmas
          </button>

          <button
            className={`${baseBtn} ${isActive("/perfil") ? active : inactive}`}
            onClick={() => navigate("/perfil")}
            type="button"
          >
            <User className="w-5 h-5" />
            Perfil
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Beacons() {
  const navigate = useNavigate();
  const [beacons, setBeacons] = useState<Beacon[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);

  async function carregarBeacons() {
    setLoading(true);
    try {
      const response = await beaconService.listar();
      setBeacons(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar beacons:", error);
      toast.error("Não foi possível carregar os beacons.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarBeacons();
  }, []);

  const beaconsFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return beacons.filter((b) => {
      if (!termo) return true;
      const nomeLocal = b.local?.nome?.toLowerCase() || "";
      const idStr = String(b.id);
      return nomeLocal.includes(termo) || idStr.includes(termo);
    });
  }, [beacons, busca]);

  const beaconsAtivos = useMemo(
    () => beaconsFiltrados.filter((b) => b.status === "ATIVADO"),
    [beaconsFiltrados]
  );
  const outrosBeacons = useMemo(
    () => beaconsFiltrados.filter((b) => b.status !== "ATIVADO"),
    [beaconsFiltrados]
  );

  const formatarData = (data?: string) => {
    if (!data) return "Nunca conectado";
    try {
      return format(new Date(data), "dd/MM 'às' HH:mm", { locale: ptBR });
    } catch {
      return data;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ATIVADO":
        return "default";
      case "MANUTENCAO":
      case "MANUNTENCAO":
        return "secondary";
      case "DESATIVADO":
        return "destructive";
      default:
        return "outline";
    }
  };

  const BeaconCard = ({ beacon }: { beacon: Beacon }) => (
    <Card
      className="cursor-pointer hover:border-primary transition-all duration-200 group"
      onClick={() => navigate(`/local/${beacon.local?.id}`)}
    >
      <CardHeader className="pb-3 space-y-0">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-2 group-hover:text-primary transition-colors">
              <MapPin className="w-4 h-4 text-primary" />
              {beacon.local?.nome || "Local Desconhecido"}
            </CardTitle>
            <p className="text-xs text-muted-foreground font-mono">ID: #{beacon.id}</p>
          </div>
          <Badge variant={getStatusVariant(beacon.status)}>{beacon.status}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
          <CalendarClock className="w-3 h-3" />
          <span>
            Última conexão: <strong>{formatarData(beacon.ultimaConexao)}</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-6 pb-24 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Beacons
            </h1>
            <p className="text-muted-foreground">
              Monitore os dispositivos instalados.
            </p>
          </div>

          <Button
            onClick={() => navigate("/novo-beacon")}
            className="shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Novo
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome do local ou ID..."
            className="pl-10 h-12 bg-card"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <Tabs defaultValue="ativos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-12 p-1 bg-muted/50">
            <TabsTrigger
              value="ativos"
              className="h-full rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Ativos{" "}
              <span className="ml-2 bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full">
                {beaconsAtivos.length}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="outros"
              className="h-full rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Outros{" "}
              <span className="ml-2 bg-muted-foreground/20 text-muted-foreground text-[10px] px-2 py-0.5 rounded-full">
                {outrosBeacons.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ativos" className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                <p className="text-sm">Sincronizando dados...</p>
              </div>
            ) : beaconsAtivos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {beaconsAtivos.map((b) => (
                  <BeaconCard key={b.id} beacon={b} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/10">
                <Bluetooth className="mx-auto w-12 h-12 text-muted-foreground/30 mb-3" />
                <h3 className="text-lg font-medium text-foreground">
                  Nenhum beacon ativo
                </h3>
                <p className="text-muted-foreground text-sm">
                  Verifique a aba &quot;Outros&quot; ou adicione um novo.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="outros" className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                <p className="text-sm">Carregando...</p>
              </div>
            ) : outrosBeacons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {outrosBeacons.map((b) => (
                  <BeaconCard key={b.id} beacon={b} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/10">
                <AlertCircle className="mx-auto w-12 h-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">
                  Tudo limpo! Nenhum beacon inativo ou em manutenção.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BeaconsFooter />
    </div>
  );
}
