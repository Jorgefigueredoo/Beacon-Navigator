import { SearchHeader } from "@/components/SearchHeader";
import { BeaconCard } from "@/components/BeaconCard";
import { BottomNav } from "@/components/BottomNav";

const savedRoutes = [
  { id: "4", name: "Mirante do Paço", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=100&h=100&fit=crop" },
  { id: "5", name: "Prefeitura do Recife", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop" },
  { id: "3", name: "Portaria Faculdade Senac", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop" },
];

export default function Rotas() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <SearchHeader />
      
      <main className="px-4 space-y-6 animate-fade-in">
        <h1 className="font-display text-2xl font-bold text-center">
          Rotas Salvas
        </h1>

        <div className="space-y-3">
          {savedRoutes.map((route, index) => (
            <div
              key={route.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BeaconCard {...route} />
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
