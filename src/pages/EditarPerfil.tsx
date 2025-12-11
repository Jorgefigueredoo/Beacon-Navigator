import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";

const EditarPerfil = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    // TODO: Save profile changes
    navigate("/perfil");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="pt-6 pb-4 px-4">
        <div className="flex items-center mb-8">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft size={28} />
          </button>
          <h1 className="flex-1 text-center text-xl font-title font-semibold text-foreground pr-7">
            Editar perfil
          </h1>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-muted-foreground/30 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-muted-foreground/50">
                  <circle cx="12" cy="8" r="4" fill="currentColor"/>
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center">
              <Pencil size={14} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-4">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-body text-foreground mb-2">
              Nome completo
            </label>
            <Input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-body text-foreground mb-2">
              E-mail
            </label>
            <Input
              type="email"
              placeholder="usuário@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-body text-foreground mb-2">
              Senha de acesso
            </label>
            <button className="w-full flex items-center justify-between py-2 border-b border-border text-muted-foreground hover:text-foreground transition-colors">
              <span className="font-body">Redefinir senha</span>
              <ChevronRight size={20} className="text-primary" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-10">
          <button 
            onClick={() => navigate(-1)}
            className="text-muted-foreground font-body hover:text-foreground transition-colors"
          >
            Cancelar
          </button>
          <Button 
            onClick={handleSave}
            className="rounded-full px-8"
          >
            Salvar
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EditarPerfil;
