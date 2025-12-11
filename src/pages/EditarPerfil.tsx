import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Pencil, 
  ShieldAlert 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";

const EditarPerfil = () => {
  const navigate = useNavigate();
  
  // Estados para Informações Pessoais
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [telefone, setTelefone] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  const handleSave = () => {
    // TODO: Salvar alterações do perfil
    navigate("/perfil");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      
      {/* Header */}
      <div className="pt-6 pb-4 px-4">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-foreground p-2 -ml-2">
            <ChevronLeft size={28} />
          </button>
          <h1 className="flex-1 text-center text-xl font-title font-semibold text-foreground pr-7">
            Editar perfil
          </h1>
        </div>
        
        {/* Foto de Perfil */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-background shadow-lg">
              <div className="w-full h-full rounded-full bg-muted-foreground/30 flex items-center justify-center overflow-hidden">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-muted-foreground/50">
                  <circle cx="12" cy="8" r="4" fill="currentColor"/>
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md border-2 border-background">
              <Pencil size={14} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 px-6 space-y-8 animate-fade-in">
        
        {/* SEÇÃO: DADOS PESSOAIS */}
        <div className="space-y-5">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Dados Pessoais</h2>
          
          <div>
            <label className="block text-sm font-body text-foreground mb-1">Nome completo</label>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
            />
          </div>

          <div>
            <label className="block text-sm font-body text-foreground mb-1">Biografia curta</label>
            <Input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ex: Motorista profissional"
              className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body text-foreground mb-1">Telefone</label>
              <Input
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
                className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-foreground mb-1">Cidade/UF</label>
              <Input
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                placeholder="São Paulo, SP"
                className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-body text-foreground mb-1">E-mail</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@email.com"
              type="email"
              className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* SEÇÃO: SEGURANÇA */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 mb-4">
            <ShieldAlert size={14} /> Segurança
          </h2>

          <button className="w-full flex items-center justify-between py-3 border-b border-border text-foreground hover:bg-white/5 transition-colors">
            <span className="text-sm">Alterar senha de acesso</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4 pb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 py-3 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
          >
            Cancelar
          </button>
          <Button 
            onClick={handleSave}
            className="flex-[2] rounded-full"
            size="lg"
          >
            Salvar alterações
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EditarPerfil;