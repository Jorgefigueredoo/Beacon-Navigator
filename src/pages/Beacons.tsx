import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Bluetooth } from "lucide-react";
import { api } from "@/services/api"; // Certifique-se que o caminho da api está correto
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav"; // Importação do rodapé

type Beacon = {
  id: number;
  nome: string;
  uuid: string;
  status: string;
};

export default function Beacons() {
  const navigate = useNavigate();
  const [beacons, setBeacons] = useState<Beacon[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);

  async function carregarBeacons() {
    setLoading(true);
    try {
      const resposta = await api.get("/beacons/me"); 
      setBeacons(Array.isArray(resposta.data) ? resposta.data : []);
    } catch (e) {
      console.error("Erro ao carregar beacons", e);
      setBeacons([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarBeacons();
  }, []);

  const beaconsFiltrados = beacons.filter((b) => 
      b.nome.toLowerCase().includes(busca.toLowerCase()) || 
      b.uuid.toLowerCase().includes(busca.toLowerCase())
  );

  const beaconsAtivos = beaconsFiltrados.filter((b) => b.status === "ATIVADO");
  const outrosBeacons = beaconsFiltrados.filter((b) => b.status !== "ATIVADO");

  const BeaconItem = ({ b }: { b: Beacon }) => (
    <Card className="cursor-pointer hover:shadow-md" onClick={() => navigate(`/local/${b.id}`)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
           <CardTitle className="text-lg flex items-center gap-2">
              <Bluetooth className="w-4 h-4 text-primary"/> {b.nome}
           </CardTitle>
           <Badge variant={b.status === "ATIVADO" ? "default" : "secondary"}>
             {b.status}
           </Badge>
        </div>
      </CardHeader>
      <CardContent>
         <p className="text-xs text-muted-foreground">UUID: {b.uuid}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold">Meus Beacons</h1>
         <Button onClick={() => navigate("/novo-beacon")}>
            <Plus className="w-4 h-4 mr-2"/> Novo
         </Button>
      </div>

      <div className="relative mb-6">
         <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground"/>
         <Input 
           placeholder="Buscar..." 
           className="pl-10" 
           value={busca} 
           onChange={e => setBusca(e.target.value)}
         />
      </div>

      <Tabs defaultValue="ativos">
         <TabsList className="mb-4">
            <TabsTrigger value="ativos">Ativos ({beaconsAtivos.length})</TabsTrigger>
            <TabsTrigger value="outros">Outros ({outrosBeacons.length})</TabsTrigger>
         </TabsList>
         
         <TabsContent value="ativos" className="space-y-4">
            {loading ? <p>Carregando...</p> : beaconsAtivos.map(b => <BeaconItem key={b.id} b={b} />)}
            {!loading && beaconsAtivos.length === 0 && <p className="text-muted-foreground">Nenhum beacon ativo.</p>}
         </TabsContent>

         <TabsContent value="outros" className="space-y-4">
            {loading ? <p>Carregando...</p> : outrosBeacons.map(b => <BeaconItem key={b.id} b={b} />)}
         </TabsContent>
      </Tabs>
      
      {/* Menu Inferior Fixo adicionado corretamente */}
      <BottomNav />
    </div>
  );
}