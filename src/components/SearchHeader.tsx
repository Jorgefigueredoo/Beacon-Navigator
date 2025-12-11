import { Search, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export function SearchHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center gap-3 p-4">
      <button 
        onClick={() => navigate("/perfil")}
        className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-surface-hover transition-colors"
      >
        <User className="w-5 h-5 text-muted-foreground" />
      </button>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar"
          className="pl-9 bg-secondary border-0 rounded-full h-10"
        />
      </div>
      <button 
        onClick={() => navigate("/perfil")}
        className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-surface-hover transition-colors"
      >
        <Settings className="w-5 h-5 text-muted-foreground" />
      </button>
    </header>
  );
}
