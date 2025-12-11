import { ChevronLeft, Radio, Bluetooth } from "lucide-react";
import { Link } from "react-router-dom";
import { BeaconCard } from "@/components/BeaconCard";
import { BottomNav } from "@/components/BottomNav";

const connectedBeacons = [
  { id: "1", name: "Praça Tybyra", status: "active" as const, image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=100&h=100&fit=crop" },
  { id: "2", name: "Praça da Marco Zero", status: "active" as const, image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop" },
  { id: "3", name: "Portaria Faculdade Senac", status: "active" as const, image: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop" },
];

const availableBeacons = [
  { id: "4", name: "Prefeitura do Recife" },
  { id: "5", name: "Rua Bom Jesus" },
  { id: "6", name: "Museu Cais do Sertão" },
];

export default function Beacons() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="flex items-center gap-4 p-4">
        <Link to="/dashboard" className="p-2 rounded-full hover:bg-secondary transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
      </header>

      <main className="px-4 space-y-6 animate-fade-in">
        <div>
          <h1 className="font-display text-2xl font-bold">Beacons</h1>
          <p className="text-primary flex items-center gap-2">
            <Bluetooth className="w-4 h-4" />
            Beacons Bluetooth
          </p>
        </div>

        {/* Device Info */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Nome do dispositivo</span>
          <span className="text-foreground">Iphone 18 Pro Max &gt;</span>
        </div>

        {/* Connected Beacons */}
        <div className="space-y-3">
          {connectedBeacons.map((beacon, index) => (
            <div
              key={beacon.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BeaconCard {...beacon} />
            </div>
          ))}
        </div>

        {/* Available Beacons */}
        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-muted-foreground">
            Beacons Disponíveis
          </h2>
          {availableBeacons.map((beacon, index) => (
            <div
              key={beacon.id}
              className="flex items-center gap-3 py-3 border-b border-border/50 animate-slide-up"
              style={{ animationDelay: `${(index + connectedBeacons.length) * 0.1}s` }}
            >
              <Radio className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">{beacon.name}</span>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
