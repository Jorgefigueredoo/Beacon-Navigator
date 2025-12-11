import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Bluetooth, 
  MapPin, 
  AlertTriangle, 
  Info, 
  DoorOpen, 
  Zap, 
  Smartphone 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NovoBeacon() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("info");
  const [beaconName, setBeaconName] = useState("");

  // Categorias com ícones e cores para facilitar identificação visual
  const categories = [
    { id: "danger", label: "Perigo", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/20", border: "border-red-500" },
    { id: "info", label: "Info", icon: Info, color: "text-blue-400", bg: "bg-blue-400/20", border: "border-blue-400" },
    { id: "exit", label: "Saída", icon: DoorOpen, color: "text-green-400", bg: "bg-green-400/20", border: "border-green-400" },
    { id: "place", label: "Local", icon: MapPin, color: "text-purple-400", bg: "bg-purple-400/20", border: "border-purple-400" },
  ];

  const handleScan = () => {
    setIsScanning(!isScanning);
    // Simulação de scan
    setTimeout(() => {
        setIsScanning(false);
        setBeaconName("Beacon Hall de Entrada #04");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-6">
      
      {/* Header */}
      <div className="pt-6 px-4 mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-foreground p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft size={28} />
          </button>
          <h1 className="flex-1 text-center text-xl font-title font-semibold text-foreground pr-7">
            Adicionar Beacon
          </h1>
        </div>
      </div>

      <div className="flex-1 px-6 space-y-8 animate-fade-in">

        {/* 1. ÁREA DE DETECÇÃO (RADAR) */}
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative flex items-center justify-center">
                {/* Efeito de Radar (Pulsando) */}
                {isScanning && (
                    <>
                        <div className="absolute w-full h-full bg-primary/20 rounded-full animate-ping opacity-75"></div>
                        <div className="absolute w-48 h-48 bg-primary/10 rounded-full animate-pulse"></div>
                    </>
                )}
                
                <button 
                    onClick={handleScan}
                    className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 transition-all shadow-2xl ${
                        isScanning ? "border-primary bg-primary/20 scale-105" : "border-white/10 bg-zinc-900 hover:border-primary/50"
                    }`}
                >
                    <Bluetooth size={40} className={isScanning ? "text-primary animate-pulse" : "text-muted-foreground"} />
                    <span className="text-xs font-medium mt-2 text-muted-foreground">
                        {isScanning ? "Buscando..." : "Parear"}
                    </span>
                </button>
            </div>
            <p className="text-xs text-center text-muted-foreground max-w-[200px]">
                Aproxime o celular do beacon físico para detectar automaticamente.
            </p>
        </div>

        {/* 2. INFORMAÇÕES BÁSICAS */}
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-sm font-medium">Nome do Local</Label>
                <Input 
                    placeholder="Ex: Escada Principal" 
                    value={beaconName}
                    onChange={(e) => setBeaconName(e.target.value)}
                    className="bg-secondary/50 border-white/10 h-12"
                />
            </div>
        </div>

        {/* 3. CATEGORIA (Visual) */}
        <div className="space-y-3">
            <Label className="text-sm font-medium">Tipo de Alerta</Label>
            <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                            selectedCategory === cat.id 
                            ? `${cat.bg} ${cat.border}` 
                            : "bg-secondary/30 border-transparent hover:bg-secondary/50"
                        }`}
                    >
                        <cat.icon size={20} className={selectedCategory === cat.id ? cat.color : "text-muted-foreground"} />
                        <span className={`text-sm font-medium ${selectedCategory === cat.id ? "text-foreground" : "text-muted-foreground"}`}>
                            {cat.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>

        {/* 4. FEEDBACK SENSORIAL (Acessibilidade) */}
        <div className="space-y-3">
             <Label className="text-sm font-medium">Feedback Sensorial</Label>
             <div className="bg-secondary/30 rounded-xl p-4 space-y-4 border border-white/5">
                
                {/* Vibração */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-800 rounded-lg text-primary">
                            <Smartphone size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Vibração</p>
                            <p className="text-[10px] text-muted-foreground">Padrão intenso para este local</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <span className="h-4 w-1 bg-primary rounded-full animate-pulse"></span>
                        <span className="h-4 w-1 bg-primary rounded-full animate-pulse delay-75"></span>
                        <span className="h-4 w-1 bg-primary rounded-full animate-pulse delay-150"></span>
                    </div>
                </div>

                {/* Luz / Flash */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-800 rounded-lg text-yellow-400">
                            <Zap size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Alerta Visual</p>
                            <p className="text-[10px] text-muted-foreground">Piscar tela na cor da categoria</p>
                        </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full ${categories.find(c => c.id === selectedCategory)?.color.replace('text-', 'bg-') || 'bg-white'}`}></div>
                </div>

             </div>
        </div>

        {/* BOTÃO SALVAR */}
        <Button size="lg" className="w-full mt-4 h-12 text-base rounded-full shadow-lg shadow-primary/20" onClick={() => navigate('/dashboard')}>
            Salvar Beacon
        </Button>

      </div>
    </div>
  );
}