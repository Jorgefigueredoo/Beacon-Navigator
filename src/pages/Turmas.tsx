import { useEffect, useState } from "react";
import { SearchHeader } from "@/components/SearchHeader";
import { BottomNav } from "@/components/BottomNav";
import { BookOpen, MapPin, Calendar, Clock } from "lucide-react";
import api from "@/services/api";
import { Badge } from "@/components/ui/badge";

type Turma = {
  id: number;
  nomeTurma: string;
  descricao: string;
  predio: string;
  sala: string;
  textoHorario: string; // "2025-03-10T08:00:00"
};

export default function Turmas() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/turmas/me")
      .then(res => setTurmas(res.data))
      .catch(err => console.error("Erro turmas", err))
      .finally(() => setLoading(false));
  }, []);

  const formatarData = (dataString: string) => {
    try {
      const data = new Date(dataString);
      return {
        dia: data.toLocaleDateString('pt-BR'),
        hora: data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
    } catch {
      return { dia: "-", hora: "-" };
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <SearchHeader />
      
      <main className="px-4 space-y-6 animate-fade-in">
        <h1 className="font-display text-xl text-center mb-4">
          Minhas Turmas
        </h1>

        {loading ? (
            <p className="text-center text-muted-foreground">Carregando...</p>
        ) : turmas.length === 0 ? (
            <div className="text-center py-8 bg-card rounded-xl border border-border">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-3"/>
                <p className="text-muted-foreground">Você não está matriculado em nenhuma turma.</p>
            </div>
        ) : (
            <div className="space-y-4">
              {turmas.map((turma, index) => {
                const { dia, hora } = formatarData(turma.textoHorario);
                return (
                    <div
                      key={turma.id}
                      className="bg-card rounded-2xl p-5 space-y-3 animate-slide-up border border-border/50 shadow-sm"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-start">
                          <h3 className="font-display font-semibold text-lg text-primary">
                            {turma.nomeTurma}
                          </h3>
                          <Badge variant="outline">{turma.sala}</Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{turma.descricao}</p>
                      
                      <div className="pt-2 flex flex-col gap-2 border-t border-border/50">
                          <div className="flex items-center gap-2 text-sm text-foreground/80">
                             <MapPin className="w-4 h-4 text-primary"/> 
                             <span>{turma.predio} - Sala {turma.sala}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-foreground/80">
                             <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary"/> {dia}
                             </div>
                             <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary"/> {hora}
                             </div>
                          </div>
                      </div>
                    </div>
                );
              })}
            </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}