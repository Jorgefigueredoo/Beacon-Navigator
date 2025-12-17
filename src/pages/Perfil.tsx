import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Pencil, 
  ShieldAlert,
  Loader2 // Ícone de carregamento
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner"; // Import para feedback visual
import api from "../services/api"; // Sua conexão com o Back-end

const EditarPerfil = () => {
  const navigate = useNavigate();
  
  // Estados para Informações Pessoais
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [telefone, setTelefone] = useState("");
  
  // No seu layout é um campo só, mas no banco são dois (Cidade e UF).
  // Vamos tratar isso na hora de salvar/carregar.
  const [localizacaoInput, setLocalizacaoInput] = useState(""); 

  const [loading, setLoading] = useState(false);

  // 1. CARREGAR DADOS AO ABRIR A TELA
  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await api.get("/usuarios/me");
        const dados = response.data;

        // Preenche os campos
        setNome(dados.nomeCompleto || "");
        setEmail(dados.email || ""); // Email geralmente vem do usuário raiz
        
        if (dados.userProfile) {
          setBio(dados.userProfile.biografia || "");
          setTelefone(dados.userProfile.telefone || "");
          
          // Junta Cidade e UF para mostrar bonito no input (Ex: "Recife - PE")
          const cidade = dados.userProfile.localizacao || "";
          const uf = dados.userProfile.uf || "";
          
          if (cidade && uf) {
            setLocalizacaoInput(`${cidade} - ${uf}`);
          } else {
            setLocalizacaoInput(cidade || uf || "");
          }
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Não foi possível carregar seus dados.");
      }
    }
    carregarDados();
  }, []);

  // 2. SALVAR DADOS NO BANCO
  const handleSave = async () => {
    setLoading(true);
    try {
      // Separa o texto "Recife - PE" em Cidade e UF para o banco
      let cidadeParaEnviar = localizacaoInput;
      let ufParaEnviar = "";

      // Tenta separar por traço (-) ou vírgula (,)
      if (localizacaoInput.includes("-")) {
        const partes = localizacaoInput.split("-");
        cidadeParaEnviar = partes[0].trim();
        ufParaEnviar = partes[1]?.trim() || "";
      } else if (localizacaoInput.includes(",")) {
        const partes = localizacaoInput.split(",");
        cidadeParaEnviar = partes[0].trim();
        ufParaEnviar = partes[1]?.trim() || "";
      }

      // Monta o objeto exatamente como o Java espera
      const payload = {
        nomeCompleto: nome,
        userProfile: {
          biografia: bio,
          telefone: telefone,
          localizacao: cidadeParaEnviar, 
          uf: ufParaEnviar.substring(0, 2).toUpperCase() // Garante UF com 2 letras
        }
      };

      // Envia para o Back-end
      await api.put("/usuarios/me", payload);
      
      toast.success("Perfil atualizado com sucesso!");
      navigate("/perfil"); // Volta para a tela anterior
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar alterações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      
      {/* Header - Mantendo seu layout exato */}
      <div className="pt-6 pb-4 px-4">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-foreground p-2 -ml-2">
            <ChevronLeft size={28} />
          </button>
          <h1 className="flex-1 text-center text-xl font-title font-semibold text-foreground pr-7">
            Editar perfil
          </h1>
        </div>
        
        {/* Foto de Perfil */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-background shadow-lg">
              <div className="w-full h-full rounded-full bg-muted-foreground/30 flex items-center justify-center overflow-hidden">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-muted-foreground/50">
                  <circle cx="12" cy="8" r="4" fill="currentColor"/>
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md border-2 border-background">
              <Pencil size={14} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 px-6 space-y-8 animate-fade-in">
        
        {/* SEÇÃO: DADOS PESSOAIS */}
        <div className="space-y-5">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Dados Pessoais</h2>
          
          <div>
            <label className="block text-sm font-body text-foreground mb-1">Nome completo</label>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
            />
          </div>

          <div>
            <label className="block text-sm font-body text-foreground mb-1">Biografia curta</label>
            <Input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ex: Motorista profissional"
              className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body text-foreground mb-1">Telefone</label>
              <Input
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
                className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-foreground mb-1">Cidade - UF</label>
              <Input
                value={localizacaoInput}
                onChange={(e) => setLocalizacaoInput(e.target.value)}
                placeholder="Recife - PE"
                className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-body text-foreground mb-1">E-mail</label>
            <Input
              value={email}
              // Email desabilitado para edição (padrão de segurança)
              disabled 
              className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50 opacity-60 cursor-not-allowed"
            />
          </div>
        </div>

        {/* SEÇÃO: SEGURANÇA */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 mb-4">
            <ShieldAlert size={14} /> Segurança
          </h2>

          <button className="w-full flex items-center justify-between py-3 border-b border-border text-foreground hover:bg-white/5 transition-colors">
            <span className="text-sm">Alterar senha de acesso</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4 pb-8">
          <button 
            onClick={() => navigate(-1)}
            disabled={loading}
            className="flex-1 py-3 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
          >
            Cancelar
          </button>
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="flex-[2] rounded-full"
            size="lg"
          >
            {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                </>
            ) : (
                "Salvar alterações"
            )}
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EditarPerfil;