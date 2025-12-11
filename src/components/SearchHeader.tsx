import { Search, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchHeader() {
  return (
    <header className="flex items-center gap-3 p-4">
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
        <User className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar"
          className="pl-9 bg-secondary border-0 rounded-full h-10"
        />
      </div>
      <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-surface-hover transition-colors">
        <Settings className="w-5 h-5 text-muted-foreground" />
      </button>
    </header>
  );
}
