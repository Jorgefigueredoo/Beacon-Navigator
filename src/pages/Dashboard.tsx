import { useState } from "react";
import { Bluetooth, MapPin, Navigation } from "lucide-react";
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

const destinations = [
  { id: "1", name: "Praça Tybyra" },
  { id: "2", name: "Praça Marco Zero" },
  { id: "3", name: "Faculdade Senac" },
  { id: "4", name: "Mirante do Paço" },
  { id: "5", name: "Prefeitura do Recife" },
];

export default function Dashboard() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showDestinationDialog, setShowDestinationDialog] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [isGuiding, setIsGuiding] = useState(false);

  const handleBluetoothActivate = () => {
    setIsConnecting(true);
    // Simula conexão Bluetooth
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
          <p className="text-muted-foreground">Olá Larissa,</p>
          <h1 className="font-display text-xl">
            como posso te ajudar?{" "}
            <span className="text-primary">Ative seu Beacon!</span>
          </h1>
        </div>

        {/* Bluetooth Activation Area */}
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          {!isGuiding ? (
            <>
              <div 
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isConnecting 
                    ? "bg-primary/20 animate-pulse" 
                    : isConnected 
                      ? "bg-green-500/20" 
                      : "bg-secondary"
                }`}
              >
                <Bluetooth 
                  className={`w-16 h-16 transition-colors duration-300 ${
                    isConnecting 
                      ? "text-primary animate-pulse" 
                      : isConnected 
                        ? "text-green-500" 
                        : "text-muted-foreground"
                  }`} 
                />
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="font-display text-lg font-semibold">
                  {isConnecting 
                    ? "Conectando..." 
                    : isConnected 
                      ? "Beacon Conectado!" 
                      : "Beacon Bluetooth"
                  }
                </h2>
                <p className="text-muted-foreground text-sm">
                  {isConnecting 
                    ? "Procurando beacons próximos..." 
                    : isConnected 
                      ? "Pronto para guiar você" 
                      : "Ative o Bluetooth para começar sua navegação"
                  }
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
              <div className="w-32 h-32 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                <Navigation className="w-16 h-16 text-green-500" />
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="font-display text-lg font-semibold text-green-500">
                  Guiando você
                </h2>
                <p className="text-muted-foreground text-sm">
                  Destino: <span className="text-foreground font-medium">{selectedDestination}</span>
                </p>
                <p className="text-muted-foreground text-xs">
                  Siga as instruções de áudio do beacon
                </p>
              </div>

              <Button 
                size="lg" 
                variant="outline"
                onClick={handleStopGuiding}
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                Parar Navegação
              </Button>
            </>
          )}
        </div>
      </main>

      {/* Destination Dialog */}
      <Dialog open={showDestinationDialog} onOpenChange={setShowDestinationDialog}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle className="font-display">Para onde você quer ir?</DialogTitle>
            <DialogDescription>
              Selecione seu destino e o beacon irá guiá-lo
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => handleSelectDestination(dest.name)}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-surface-hover transition-colors text-left"
              >
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