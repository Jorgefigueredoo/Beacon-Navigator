import { useNavigate } from "react-router-dom";
import { ChevronLeft, Settings, HelpCircle, LogOut, Pencil, MapPin, Navigation, Users, Bell } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const Perfil = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary pt-6 pb-16 px-4">
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
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-4 border-primary-foreground/20">
              <div className="w-20 h-20 rounded-full bg-muted-foreground/30 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-muted-foreground/50">
                  <circle cx="12" cy="8" r="4" fill="currentColor"/>
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-2 border-primary shadow-lg">
              <Pencil size={14} className="text-accent-foreground" />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-title font-semibold text-primary-foreground">
            Larissa Monteiro
          </h2>
          <p className="text-primary-foreground/70 text-sm font-body">
            larissa.monteiro@email.com
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-8">
        <div className="bg-card rounded-xl p-4 shadow-lg border border-border">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <MapPin size={20} className="text-primary" />
              </div>
              <span className="text-lg font-title font-bold text-foreground">12</span>
              <span className="text-xs text-muted-foreground font-body">Beacons</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Navigation size={20} className="text-primary" />
              </div>
              <span className="text-lg font-title font-bold text-foreground">5</span>
              <span className="text-xs text-muted-foreground font-body">Rotas</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Users size={20} className="text-primary" />
              </div>
              <span className="text-lg font-title font-bold text-foreground">3</span>
              <span className="text-xs text-muted-foreground font-body">Turmas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="flex-1 px-4 mt-6 space-y-4">
        <div className="bg-card rounded-xl overflow-hidden border border-border">
          <button 
            onClick={() => navigate("/editar-perfil")}
            className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-muted/50 transition-colors border-b border-border"
          >
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
              <Settings size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <span className="text-foreground font-body font-medium">Editar perfil</span>
              <p className="text-xs text-muted-foreground">Alterar dados pessoais</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-muted/50 transition-colors border-b border-border">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
              <Bell size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <span className="text-foreground font-body font-medium">Notificações</span>
              <p className="text-xs text-muted-foreground">Gerenciar alertas</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-muted/50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
              <HelpCircle size={18} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <span className="text-foreground font-body font-medium">Suporte</span>
              <p className="text-xs text-muted-foreground">Ajuda e FAQ</p>
            </div>
          </button>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3 text-primary hover:text-primary/80 transition-colors bg-primary/10 rounded-xl">
          <LogOut size={18} />
          <span className="font-body font-medium">Sair da conta</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Perfil;
