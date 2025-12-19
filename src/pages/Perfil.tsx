import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Settings, HelpCircle, LogOut, Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api, { clearAuthToken } from "@/services/api";
import { BottomNav } from "@/components/BottomNav";

type UsuarioMeResponse = {
  nomeCompleto?: string;
  email?: string;
  avatarUrl?: string; // ex.: "/uploads/avatar_1_xxx.jpg"
  userProfile?: {
    biografia?: string;
    telefone?: string;
    localizacao?: string;
    uf?: string;
  };
};

export default function Perfil() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState<UsuarioMeResponse | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [savingPhoto, setSavingPhoto] = useState(false);

  // força refresh do avatar do backend (para evitar cache do navegador)
  const [avatarVersion, setAvatarVersion] = useState<number>(Date.now());

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

  // limpa blob apenas quando o componente desmontar ou quando o preview mudar
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const nome = useMemo(() => {
    return (dados?.nomeCompleto || "").trim() || "Usuário";
  }, [dados?.nomeCompleto]);

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

  function abrirSeletorFoto() {
    fileRef.current?.click();
  }

  function onSelecionarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem (JPG/PNG/WebP).");
      return;
    }

    const maxMb = 3;
    if (file.size > maxMb * 1024 * 1024) {
      toast.error(`Imagem muito grande. Máximo: ${maxMb}MB.`);
      return;
    }

    // troca preview
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function cancelarFoto() {
    setSelectedFile(null);
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function salvarFoto() {
    if (!selectedFile) return;

    setSavingPhoto(true);
    try {
      const form = new FormData();
      form.append("file", selectedFile);

      const resp = await api.post<{ avatarUrl: string }>("/usuarios/me/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const avatarUrl = resp.data?.avatarUrl;

      setDados((prev) => ({ ...(prev || {}), avatarUrl }));
      setAvatarVersion(Date.now()); // cache bust para URL http(s)
      cancelarFoto();

      toast.success("Foto atualizada com sucesso.");
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível salvar a foto.");
    } finally {
      setSavingPhoto(false);
    }
  }

  // base do backend vinda do axios (ou ajuste manual se necessário)
  const apiBase = (api.defaults.baseURL || "http://localhost:8080").replace(/\/$/, "");

  const avatarFromBackend = useMemo(() => {
    if (!dados?.avatarUrl) return null;

    if (dados.avatarUrl.startsWith("http")) return dados.avatarUrl;
    if (dados.avatarUrl.startsWith("/")) return `${apiBase}${dados.avatarUrl}`;
    return `${apiBase}/${dados.avatarUrl}`;
  }, [dados?.avatarUrl, apiBase]);

  // prioridade: preview (blob) > backend
  const rawAvatar = previewUrl || avatarFromBackend || null;

  // IMPORTANTÍSSIMO: só adiciona ?v= em http(s). Nunca em blob:
  const avatarSrc = useMemo(() => {
    if (!rawAvatar) return null;
    if (rawAvatar.startsWith("blob:")) return rawAvatar;
    return `${rawAvatar}${rawAvatar.includes("?") ? "&" : "?"}v=${avatarVersion}`;
  }, [rawAvatar, avatarVersion]);

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
              {/* círculo com recorte */}
              <div className="h-24 w-24 rounded-full bg-white/25 overflow-hidden flex items-center justify-center">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt="Foto do perfil"
                    className="w-full h-full object-cover block"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#c51616]">
                      <circle cx="12" cy="8" r="4" fill="currentColor" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="absolute right-1 bottom-1 h-8 w-8 rounded-full bg-black/70 border border-white/30 flex items-center justify-center active:scale-95 transition"
                aria-label="Editar foto"
                onClick={abrirSeletorFoto}
              >
                <Pencil className="h-4 w-4 text-white" />
              </button>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onSelecionarFoto}
              />
            </div>

            <div className="mt-4 text-lg font-semibold">{loading ? "Carregando..." : nome}</div>

            {selectedFile && (
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={cancelarFoto}
                  className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white text-sm active:scale-[0.99] transition"
                  disabled={savingPhoto}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={salvarFoto}
                  className="px-4 py-2 rounded-xl bg-white text-[#c51616] font-semibold text-sm hover:bg-white/90 disabled:opacity-60 active:scale-[0.99] transition"
                  disabled={savingPhoto}
                >
                  {savingPhoto ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Salvando...
                    </span>
                  ) : (
                    "Salvar foto"
                  )}
                </button>
              </div>
            )}
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
