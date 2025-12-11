import { ChevronLeft, MapPin, Phone, Mail, Building, Navigation } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";

const locais: Record<string, {
  name: string;
  image: string;
  sobre: string[];
  contato: { type: string; value: string }[];
}> = {
  "1": {
    name: "Praça Tybyra",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=400&fit=crop",
    sobre: ["Localizada no centro histórico do Recife", "Espaço cultural e de lazer"],
    contato: [{ type: "phone", value: "(81) 99999-9999" }],
  },
  "2": {
    name: "Praça Marco Zero",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
    sobre: ["Marco inicial de Recife", "Ponto turístico principal"],
    contato: [{ type: "phone", value: "(81) 3355-9600" }],
  },
  "4": {
    name: "Mirante do Paço",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=400&fit=crop",
    sobre: [
      "Rooftop do estacionamento ao lado do Shopping Paço Alfândega, nas margens do Rio Capibaribe",
      "Rooftop do estacionamento ao lado do Shopping Paço Alfândega",
      "Nas margens do Rio Capibaribe",
    ],
    contato: [{ type: "whatsapp", value: "(81) 99663-8864" }],
  },
  "5": {
    name: "Prefeitura do Recife",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop",
    sobre: [
      "Está localizada na Avenida Cais do Apolo, no Bairro do Recife",
      "Possui 17 pavimentos",
    ],
    contato: [
      { type: "phone", value: "Teleatendimento: 0800 281 0040, de segunda a sexta, das 8h às 17h" },
      { type: "email", value: "ouvidoria@recife.pe.gov.br" },
      { type: "address", value: "Sede da Prefeitura do Recife, de segunda a sexta, das 8h às 17h" },
      { type: "mail", value: "Correspondência: Av. Cais do Apolo, 925, Térreo, Bairro do Recife, Recife / PE - CEP: 50030-903" },
    ],
  },
};

export default function LocalDetail() {
  const { id } = useParams();
  const local = locais[id || "5"] || locais["5"];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Image Header */}
      <div className="relative h-64">
        <img
          src={local.image}
          alt={local.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Link
          to="/dashboard"
          className="absolute top-4 left-4 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
      </div>

      <main className="px-4 -mt-8 relative z-10 space-y-6 animate-fade-in">
        <h1 className="font-display text-2xl font-bold">{local.name}</h1>

        {/* Sobre */}
        <div className="space-y-2">
          <h2 className="font-display font-semibold">Sobre:</h2>
          <ul className="space-y-2">
            {local.sobre.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div className="space-y-2">
          <h2 className="font-display font-semibold">Contato:</h2>
          <ul className="space-y-2">
            {local.contato.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-muted-foreground mt-1.5 flex-shrink-0" />
                {item.value}
              </li>
            ))}
          </ul>
        </div>

        {/* Rotas Button */}
        <Button className="w-full" size="lg">
          <Navigation className="w-5 h-5" />
          Rotas
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}
