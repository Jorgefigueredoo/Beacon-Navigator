import { useEffect, useState } from "react";
import { ChevronLeft, Navigation, Loader2 } from "lucide-react"; // Adicionei Loader2
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";
import { api } from "@/services/api";



export default function LocalDetail() {
  const { id } = useParams();
  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        // Busca o beacon pelo ID vindo da URL
        const response = await api.get(`/beacons/${id}`);
        const dados = response.data;

        // ADAPTAÇÃO: Transforma os dados do Banco no formato visual da tela
        // Se o seu backend retornar o objeto 'local' dentro do beacon, ajuste aqui (ex: dados.local.nome)
        const objetoFormatado = {
          name: dados.local?.nome || dados.nome || "Local sem nome",
          image: dados.local?.imagemUrl || "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=400&fit=crop", // Imagem fallback
          sobre: [
            dados.descricao, // Descrição do Beacon
            dados.local?.descricao // Descrição do Local (se houver)
          ].filter(Boolean), // Remove itens vazios/nulos
          contato: [
            { type: "uuid", value: `UUID: ${dados.uuid}` },
            { type: "status", value: `Status: ${dados.status}` }
            // Adicione telefone aqui se o backend passar a enviar essa info
          ]
        };

        setLocal(objetoFormatado);
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        toast.error("Não foi possível carregar as informações.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      carregarDados();
    }
  }, [id]);

  // Tela de Carregamento
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // Tela de erro caso não encontre
  if (!local) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <p className="text-muted-foreground mb-4">Local não encontrado.</p>
        <Link to="/beacons">
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>
    );
  }

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
          // Mudei para voltar para a lista de beacons, acho que faz mais sentido que dashboard
          to="/beacons" 
          className="absolute top-4 left-4 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
      </div>

      <main className="px-4 -mt-8 relative z-10 space-y-6 animate-fade-in">
        <h1 className="font-display text-2xl font-bold">{local.name}</h1>

        {/* Sobre */}
        {local.sobre.length > 0 && (
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
        )}

        {/* Contato / Informações Técnicas */}
        <div className="space-y-2">
          <h2 className="font-display font-semibold">Informações:</h2>
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
          <Navigation className="w-5 h-5 mr-2" />
          Rotas
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}