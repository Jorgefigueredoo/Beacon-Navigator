import { useNavigate } from "react-router-dom"; // 1. Importei o hook de navegação
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchHeader } from "@/components/SearchHeader";
import { BeaconCard } from "@/components/BeaconCard";
import { BottomNav } from "@/components/BottomNav";

const beacons = [
  { id: "1", name: "Praça Tybyra", image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=100&h=100&fit=crop" },
  { id: "2", name: "Praça Marco Zero", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop" },
  { id: "3", name: "Faculdade Senac", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop" },
  { id: "4", name: "Mirante do Paço", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=100&h=100&fit=crop" },
  { id: "5", name: "Prefeitura do Recife", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop" },
];

export default function Dashboard() {
  const navigate = useNavigate(); // 2. Inicializei a função de navegar

  return (
    <div className="min-h-screen bg-background pb-24">
      <SearchHeader />
      
      <main className="px-4 space-y-6 animate-fade-in">
        {/* Greeting */}
        <div className="space-y-1">
          <p className="text-muted-foreground">Olá Larissa,</p>
          <h1 className="font-display text-xl">
            como posso te ajudar?{" "}
            <span className="text-primary">Veja seu painel de Beacons!</span>
          </h1>
        </div>

        {/* New Beacon Button */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            // 3. Adicionei o onClick para ir para a tela de novo beacon
            onClick={() => navigate("/novo-beacon")}
            // 4. Forcei a cor vermelha (bg-red-500) para ficar igual ao seu design
            className="animate-pulse-glow bg-red-500 hover:bg-red-600 text-white border-0"
          >
            Novo Beacon
            <Plus className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Beacons List */}
        <div className="space-y-3">
          {beacons.map((beacon, index) => (
            <div
              key={beacon.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BeaconCard {...beacon} />
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}