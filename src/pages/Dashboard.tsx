import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bluetooth, MapPin, Navigation, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchHeader } from "@/components/SearchHeader";
import { BottomNav } from "@/components/BottomNav";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import api from "../services/api";

const destinations = [
  { id: "1", name: "Praça Tybyra" },
  { id: "2", name: "Praça Marco Zero" },
  { id: "3", name: "Faculdade Senac" },
  { id: "4", name: "Mirante do Paço" },
  { id: "5", name: "Prefeitura do Recife" },
];

export default function Dashboard() {
  const [usuarioNome, setUsuarioNome] = useState("");
  const [stats, setStats] = useState({ beacons: 0, turmas: 0 });
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showDestinationDialog, setShowDestinationDialog] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isGuiding, setIsGuiding] = useState(false);

  useEffect(() => {
    // 1. Carrega o usuário
    api.get("/usuarios/me").then((res) => {
      // Pega o primeiro nome
      const primeiroNome = res.data.nomeCompleto.split(" ")[0];
      setUsuarioNome(primeiroNome);
    });

    // 2. Carrega contagem de beacons
    api.get("/beacons/me").then((res) => {
      setStats((prev) => ({ ...prev, beacons: res.data.length }));
    }).catch(() => {});

    // 3. Carrega contagem de turmas
    api.get("/turmas/me").then((res) => {
      setStats((prev) => ({ ...prev, turmas: res.data.length }));
    }).catch(() => {});
  }, []);

  const handleBluetoothActivate = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setShowDestinationDialog(true);
    }, 2000);
  };

  const handleSelectDestination = (destination: string) => {
    setSelectedDestination(destination);
    setShowDestinationDialog(false);
    setIsGuiding(true);
  };

  const handleStopGuiding = () => {
    setIsGuiding(false);
    setIsConnected(false);
    setSelectedDestination(null);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <SearchHeader />
      
      <main className="px-4 space-y-6 animate-fade-in">
        {/* Greeting */}
        <div className="space-y-1">
          <p className="text-muted-foreground">Olá {usuarioNome || "visitante"},</p>
          <h1 className="font-display text-xl">
            para onde você quer ir?{" "}
            <span className="text-primary">Ative seu Beacon!</span>
          </h1>
        </div>

        {/* Stats Cards (Atalhos) */}
        <div className="grid grid-cols-2 gap-4">
            <Link to="/beacons" className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-primary">
                    <Bluetooth className="w-5 h-5" />
                    <span className="font-bold text-2xl">{stats.beacons}</span>
                </div>
                <p className="text-xs text-muted-foreground">Meus Beacons</p>
            </Link>
            <Link to="/turmas" className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-primary">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-bold text-2xl">{stats.turmas}</span>
                </div>
                <p className="text-xs text-muted-foreground">Minhas Turmas</p>
            </Link>
        </div>

        {/* Bluetooth Area */}
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          {!isGuiding ? (
            <>
              <div 
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isConnecting ? "bg-primary/20 animate-pulse" : isConnected ? "bg-green-500/20" : "bg-secondary"
                }`}
              >
                <Bluetooth 
                  className={`w-16 h-16 transition-colors duration-300 ${
                    isConnecting ? "text-primary animate-pulse" : isConnected ? "text-green-500" : "text-muted-foreground"
                  }`} 
                />
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="font-display text-lg font-semibold">
                  {isConnecting ? "Conectando..." : isConnected ? "Beacon Conectado!" : "Beacon Bluetooth"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {isConnecting ? "Procurando..." : isConnected ? "Pronto para guiar" : "Ative para começar"}
                </p>
              </div>

              {!isConnected && (
                <Button 
                  size="lg" 
                  onClick={handleBluetoothActivate}
                  disabled={isConnecting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-glow"
                >
                  <Bluetooth className="w-5 h-5 mr-2" />
                  {isConnecting ? "Conectando..." : "Ativar Beacon"}
                </Button>
              )}

              {isConnected && !showDestinationDialog && (
                <Button 
                  size="lg" 
                  onClick={() => setShowDestinationDialog(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Escolher Destino
                </Button>
              )}
            </>
          ) : (
            <>
              {/* Modo Guiando (Mantido igual) */}
              <div className="w-32 h-32 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                <Navigation className="w-16 h-16 text-green-500" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="font-display text-lg font-semibold text-green-500">Guiando você</h2>
                <p className="text-muted-foreground text-sm">Destino: <span className="text-foreground font-medium">{selectedDestination}</span></p>
              </div>
              <Button size="lg" variant="outline" onClick={handleStopGuiding} className="border-destructive text-destructive hover:bg-destructive/10">
                Parar Navegação
              </Button>
            </>
          )}
        </div>
      </main>

      {/* Dialogs e Footer */}
      <Dialog open={showDestinationDialog} onOpenChange={setShowDestinationDialog}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Para onde quer ir?</DialogTitle>
            <DialogDescription>Selecione seu destino</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {destinations.map((dest) => (
              <button key={dest.id} onClick={() => handleSelectDestination(dest.name)} className="w-full flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-surface-hover transition-colors text-left">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">{dest.name}</span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <BottomNav />
    </div>
  );
}