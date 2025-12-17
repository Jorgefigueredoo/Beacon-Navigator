import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pencil, ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";
import api from "@/services/api";

type UsuarioMeResponse = {
  nomeCompleto?: string;
  email?: string;
  userProfile?: {
    biografia?: string;
    telefone?: string;
    localizacao?: string;
    uf?: string;
  };
};

function splitCidadeUf(texto: string) {
  const raw = (texto || "").trim();
  if (!raw) return { cidade: "", uf: "" };

  const sep = raw.includes("-") ? "-" : raw.includes(",") ? "," : null;
  if (!sep) return { cidade: raw, uf: "" };

  const partes = raw.split(sep);
  const cidade = (partes[0] || "").trim();
  const uf = (partes[1] || "").trim();
  return { cidade, uf };
}

function normalizeUf(uf: string) {
  const clean = (uf || "").replace(/\s+/g, "").toUpperCase();
  return clean ? clean.substring(0, 2) : "";
}

const EditarPerfil = () => {
  const navigate = useNavigate();

  // Estados para Informações Pessoais (seu layout)
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [telefone, setTelefone] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);

  // 1) Carregar dados ao abrir
  useEffect(() => {
    async function carregarDados() {
      setLoadingFetch(true);
      try {
        const response = await api.get<UsuarioMeResponse>("/usuarios/me");
        const dados = response.data;

        setNome(dados.nomeCompleto || "");
        setEmail(dados.email || "");

        const cidade = dados.userProfile?.localizacao || "";
        const uf = dados.userProfile?.uf || "";
        setBio(dados.userProfile?.biografia || "");
        setTelefone(dados.userProfile?.telefone || "");

        // Mostra no input no formato "Cidade - UF"
        if (cidade && uf) setLocalizacao(`${cidade} - ${uf}`);
        else setLocalizacao(cidade || uf || "");
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Não foi possível carregar seus dados.");
      } finally {
        setLoadingFetch(false);
      }
    }

    carregarDados();
  }, []);

  // 2) Salvar no backend
  const handleSave = async () => {
    setLoadingSave(true);
    try {
      const { cidade, uf } = splitCidadeUf(localizacao);

      const payload = {
        nomeCompleto: nome,
        userProfile: {
          biografia: bio,
          telefone: telefone,
          localizacao: cidade,
          uf: normalizeUf(uf),
        },
      };

      await api.put("/usuarios/me", payload);

      toast.success("Perfil atualizado com sucesso!");
      navigate("/perfil");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar alterações. Tente novamente.");
    } finally {
      setLoadingSave(false);
    }
  };

  const disabled = loadingFetch || loadingSave;

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Header (seu layout) */}
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
                  <circle cx="12" cy="8" r="4" fill="currentColor" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor" />
                </svg>
              </div>
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md border-2 border-background"
              onClick={() => toast.message("Em breve", { description: "Editar foto de perfil." })}
            >
              <Pencil size={14} className="text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 px-6 space-y-8 animate-fade-in">
        {loadingFetch ? (
          <div className="flex items-center justify-center pt-10 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Carregando...
          </div>
        ) : (
          <>
            {/* DADOS PESSOAIS */}
            <div className="space-y-5">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                Dados Pessoais
              </h2>

              <div>
                <label className="block text-sm font-body text-foreground mb-1">Nome completo</label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  disabled={disabled}
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
                />
              </div>

              <div>
                <label className="block text-sm font-body text-foreground mb-1">Biografia curta</label>
                <Input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Ex: Motorista profissional"
                  disabled={disabled}
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
                    disabled={disabled}
                    className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body text-foreground mb-1">Cidade/UF</label>
                  <Input
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                    placeholder="São Paulo, SP"
                    disabled={disabled}
                    className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body text-foreground mb-1">E-mail</label>
                <Input
                  value={email}
                  disabled
                  type="email"
                  className="bg-transparent border-0 border-b border-border rounded-none px-0 h-9 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50 opacity-60 cursor-not-allowed"
                />
              </div>
            </div>

            {/* SEGURANÇA */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 mb-4">
                <ShieldAlert size={14} /> Segurança
              </h2>

              <button
                type="button"
                className="w-full flex items-center justify-between py-3 border-b border-border text-foreground hover:bg-white/5 transition-colors"
                onClick={() => navigate("/perfil/alterar-senha")}
              >
                <span className="text-sm">Alterar senha de acesso</span>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Botões */}
            <div className="flex items-center gap-4 pt-4 pb-8">
              <button
                onClick={() => navigate(-1)}
                disabled={disabled}
                className="flex-1 py-3 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>

              <Button onClick={handleSave} disabled={disabled} className="flex-[2] rounded-full" size="lg">
                {loadingSave ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar alterações"
                )}
              </Button>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default EditarPerfil;
