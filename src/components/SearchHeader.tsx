import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchHeader() {
  return (
    <header className="flex items-center gap-3 p-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar"
          className="pl-9 bg-secondary border-0 rounded-full h-10"
        />
      </div>
    </header>
  );
}
