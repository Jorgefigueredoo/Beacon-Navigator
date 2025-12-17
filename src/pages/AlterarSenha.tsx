import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api, { clearAuthToken } from "@/services/api";
import axios from "axios";

function rules(p: string) {
  const v = p ?? "";
  return {
    min8: v.length >= 8,
    hasLetter: /[A-Za-z]/.test(v),
    hasNumber: /\d/.test(v),
    // se quiser exigir:
    // hasUpper: /[A-Z]/.test(v),
    // hasSpecial: /[^A-Za-z0-9]/.test(v),
  };
}

function RuleItem({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {ok ? (
        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500" />
      )}
      <span className={ok ? "text-emerald-400" : "text-red-400"}>{text}</span>
    </div>
  );
}

export default function AlterarSenha() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");

  const [showAtual, setShowAtual] = useState(false);
  const [showNova, setShowNova] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const r = useMemo(() => rules(novaSenha), [novaSenha]);

  const confirmOk = useMemo(() => {
    if (!confirmacao) return false;
    return novaSenha === confirmacao;
  }, [novaSenha, confirmacao]);

  const novaSenhaOk = r.min8 && r.hasLetter && r.hasNumber;
  const formOk = !!senhaAtual && novaSenhaOk && confirmOk && !loading;

  async function salvar() {
    // validação final (defensiva)
    if (!senhaAtual || !novaSenha || !confirmacao) {
      toast.error("Preencha todos os campos.");
      return;
    }
    if (!novaSenhaOk) {
      toast.error("A nova senha não atende aos requisitos.");
      return;
    }
    if (!confirmOk) {
      toast.error("A confirmação não confere.");
      return;
    }

    setLoading(true);
    try {
      await api.put("/usuarios/me/senha", {
        senhaAtual,
        novaSenha,
        confirmacao,
      });

      toast.success("Senha alterada com sucesso. Faça login novamente.");
      clearAuthToken();
      navigate("/login");
    } catch (e) {
      console.error(e);

      if (axios.isAxiosError(e)) {
        const status = e.response?.status;

        // mensagens mais amigáveis
        if (status === 401) {
          toast.error("Senha atual incorreta.");
        } else if (status === 400) {
          const msg =
            (e.response?.data as any)?.message ||
            (e.response?.data as any)?.error ||
            "Dados inválidos. Verifique e tente novamente.";
          toast.error(msg);
        } else {
          toast.error(`Erro ao alterar a senha (HTTP ${status ?? "?"}).`);
        }
      } else {
        toast.error("Erro ao alterar a senha.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft size={28} />
          </button>
          <h1 className="flex-1 text-center text-xl font-semibold pr-7">Alterar senha</h1>
        </div>

        <div className="space-y-5">
          {/* Senha atual */}
          <div>
            <label className="text-sm font-medium">Senha atual</label>
            <div className="relative mt-2">
              <Input
                type={showAtual ? "text" : "password"}
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                placeholder="Digite sua senha atual"
                disabled={loading}
                className="pr-12 rounded-full bg-white/10 border-white/10 text-white placeholder:text-white/40"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-80"
                onClick={() => setShowAtual((v) => !v)}
              >
                {showAtual ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Nova senha */}
          <div>
            <label className="text-sm font-medium">Nova senha</label>
            <div className="relative mt-2">
              <Input
                type={showNova ? "text" : "password"}
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Crie uma nova senha"
                disabled={loading}
                className="pr-12 rounded-full bg-white/10 border-white/10 text-white placeholder:text-white/40"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-80"
                onClick={() => setShowNova((v) => !v)}
              >
                {showNova ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Validação em tempo real */}
            <div className="mt-3 space-y-2">
              <RuleItem ok={r.min8} text="Mínimo de 8 caracteres" />
              <RuleItem ok={r.hasLetter} text="Pelo menos 1 letra" />
              <RuleItem ok={r.hasNumber} text="Pelo menos 1 número" />
              {/* Se quiser exigir:
              <RuleItem ok={r.hasUpper} text="Pelo menos 1 letra maiúscula" />
              <RuleItem ok={r.hasSpecial} text="Pelo menos 1 caractere especial" />
              */}
            </div>
          </div>

          {/* Confirmar nova senha */}
          <div>
            <label className="text-sm font-medium">Confirmar nova senha</label>
            <div className="relative mt-2">
              <Input
                type={showConf ? "text" : "password"}
                value={confirmacao}
                onChange={(e) => setConfirmacao(e.target.value)}
                placeholder="Confirme a nova senha"
                disabled={loading}
                className="pr-12 rounded-full bg-white/10 border-white/10 text-white placeholder:text-white/40"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 opacity-80"
                onClick={() => setShowConf((v) => !v)}
              >
                {showConf ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {confirmacao.length > 0 && (
              <p className={`mt-2 text-sm ${confirmOk ? "text-emerald-400" : "text-red-400"}`}>
                {confirmOk ? "As senhas conferem." : "As senhas não conferem."}
              </p>
            )}
          </div>

          {/* Botão */}
          <Button
            onClick={salvar}
            disabled={!formOk}
            className="w-full rounded-full py-6 bg-[#e23b2f] hover:brightness-110 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar nova senha"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
