import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from '../assets/logobeacon.png';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-8 animate-fade-in">
        
        {/* --- INICIO DO AJUSTE --- */}
        <div className="flex items-center justify-center py-8">
            {/* Aumentei de w-48 h-48 para w-64 h-64 */}
            <img 
              src={logo} 
              alt="Beacon Navigator" 
              className="w-64 h-64 object-contain" 
            />
        </div>
        {/* --- FIM DO AJUSTE --- */}

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