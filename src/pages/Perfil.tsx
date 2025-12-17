import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Settings, HelpCircle, LogOut, Pencil } from "lucide-react";
import { toast } from "sonner";
import api, { clearAuthToken } from "@/services/api";
import { BottomNav } from "@/components/BottomNav";

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

export default function Perfil() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState<UsuarioMeResponse | null>(null);

  useEffect(() => {
    async function carregar() {
      setLoading(true);
      try {
        const resp = await api.get<UsuarioMeResponse>("/usuarios/me");
        setDados(resp.data);
      } catch (e) {
        console.error(e);
        toast.error("Não foi possível carregar seu perfil.");
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const nome = (dados?.nomeCompleto || "").trim() || "Usuário";

  function handleEditar() {
    navigate("/perfil/editar");
  }

  function handleSuporte() {
    toast.message("Suporte", { description: "Em breve: canal de suporte/contato." });
  }

  function handleSair() {
    clearAuthToken();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col pb-24">
      {/* Header vermelho */}
      <div className="bg-[#c51616]">
        <div className="px-5 pt-6 pb-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full active:scale-95 transition"
              aria-label="Voltar"
            >
              <ChevronLeft className="h-7 w-7 text-white" />
            </button>

            <h1 className="text-xl font-semibold">Seu perfil</h1>

            <div className="w-10" />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-white/25 flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#c51616]">
                    <circle cx="12" cy="8" r="4" fill="currentColor" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Apenas visual (foto) */}
              <button
                type="button"
                className="absolute right-1 bottom-1 h-8 w-8 rounded-full bg-black/70 border border-white/30 flex items-center justify-center active:scale-95 transition"
                aria-label="Editar foto"
                onClick={() => toast.message("Em breve", { description: "Editar foto de perfil." })}
              >
                <Pencil className="h-4 w-4 text-white" />
              </button>
            </div>

            <div className="mt-4 text-lg font-semibold">{loading ? "Carregando..." : nome}</div>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="px-6 pt-8 space-y-4">
        <button
          type="button"
          onClick={handleEditar}
          className="w-full bg-white text-black rounded-xl px-4 py-4 flex items-center gap-3 shadow active:scale-[0.99] transition"
        >
          <Settings className="h-5 w-5 text-black/70" />
          <span className="font-medium">Editar perfil</span>
        </button>

        <button
          type="button"
          onClick={handleSuporte}
          className="w-full bg-white text-black rounded-xl px-4 py-4 flex items-center gap-3 shadow active:scale-[0.99] transition"
        >
          <HelpCircle className="h-5 w-5 text-black/70" />
          <span className="font-medium">Suporte</span>
        </button>

        <button
  type="button"
  onClick={handleSair}
  className="mt-6 w-full rounded-xl px-4 py-4 flex items-center justify-center gap-2
             border border-[#c51616] text-[#c51616] font-semibold
             hover:bg-[#c51616] hover:text-white
             active:scale-[0.99] transition"
>
  <span>Sair</span>
  <LogOut className="h-5 w-5" />
</button>

      </div>

      <BottomNav />
    </div>
  );
}
