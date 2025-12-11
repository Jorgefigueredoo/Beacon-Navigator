import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import beaconLogo from "@/assets/beacon-logo.png";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-8 animate-fade-in">
        {/* Illustration area */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="relative z-10 w-48 h-48 bg-gradient-to-br from-primary/30 to-primary/10 rounded-3xl flex items-center justify-center">
            <img src={beaconLogo} alt="Beacon Navigator" className="w-32 h-32" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h1 className="font-display text-3xl font-bold text-foreground">Bem-vindo</h1>
          <p className="text-muted-foreground">
            Navegue pelo mundo com o Beacon Navigator
          </p>
        </div>

        {/* CTA */}
        <Button asChild size="lg" className="w-full max-w-xs">
          <Link to="/login">Vamos começar</Link>
        </Button>
      </div>
    </div>
  );
}
