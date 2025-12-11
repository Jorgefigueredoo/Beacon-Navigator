import { ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface BeaconCardProps {
  id: string;
  name: string;
  image?: string;
  status?: "active" | "inactive";
}

export function BeaconCard({ id, name, image, status }: BeaconCardProps) {
  return (
    <Link
      to={`/local/${id}`}
      className="beacon-card group"
    >
      <div className="w-12 h-12 rounded-full bg-muted overflow-hidden flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <MapPin className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <span className="flex-1 font-medium text-foreground">{name}</span>
      {status && (
        <span className={`text-xs px-2 py-1 rounded-full ${
          status === "active" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        }`}>
          {status === "active" ? "Ativo" : "Inativo"}
        </span>
      )}
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
    </Link>
  );
}
