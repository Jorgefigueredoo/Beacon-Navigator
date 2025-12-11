import { useNavigate } from "react-router-dom";
import { ChevronLeft, Settings, HelpCircle, LogOut, Pencil } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const Perfil = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary pt-6 pb-12 px-4">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate("/dashboard")} className="text-primary-foreground">
            <ChevronLeft size={28} />
          </button>
          <h1 className="flex-1 text-center text-xl font-title font-semibold text-primary-foreground pr-7">
            Seu perfil
          </h1>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-muted-foreground/30 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-muted-foreground/50">
                  <circle cx="12" cy="8" r="4" fill="currentColor"/>
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-background rounded-full flex items-center justify-center border-2 border-primary">
              <Pencil size={14} className="text-foreground" />
            </button>
          </div>
          <h2 className="mt-3 text-lg font-title font-semibold text-primary-foreground">
            Larissa Monteiro
          </h2>
        </div>
      </div>

      {/* Menu Options */}
      <div className="flex-1 px-4 -mt-4">
        <div className="bg-card rounded-xl overflow-hidden">
          <button 
            onClick={() => navigate("/editar-perfil")}
            className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-muted/50 transition-colors border-b border-border"
          >
            <Settings size={20} className="text-muted-foreground" />
            <span className="text-foreground font-body">Editar perfil</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-muted/50 transition-colors">
            <HelpCircle size={20} className="text-muted-foreground" />
            <span className="text-foreground font-body">Suporte</span>
          </button>
        </div>

        <button className="flex items-center gap-2 mt-6 px-4 text-primary hover:text-primary/80 transition-colors">
          <span className="font-body">Sair</span>
          <LogOut size={18} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Perfil;
