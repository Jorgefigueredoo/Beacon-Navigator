import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react"; 
import logo from "../assets/logobeacon.png";
import { api } from "@/services/api";

type LoginResponse = {
  token: string;
};

export default function Login() {
  const navigate = useNavigate();

  // Estados do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Estados de feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await api.post<LoginResponse>("/auth/login", {
        email,
        senha: password, 
      });

      // Salva o token e redireciona
      localStorage.setItem("token", data.token);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      console.error("Erro no login:", err);
      
      const status = err?.response?.status;
      const serverMsg = err?.response?.data;

      if (status === 401) {
        setError("E-mail ou senha inválidos.");
      } else if (status === 403) {
        setError("Acesso bloqueado. Conta inativa ou sem permissão.");
      } else if (status) {
        setError(
          typeof serverMsg === "string" 
            ? serverMsg 
            : typeof serverMsg?.message === "string"
              ? serverMsg.message
              : `Erro ao fazer login (HTTP ${status}).`
        );
      } else {
        setError("Não foi possível conectar ao servidor. Verifique sua internet.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src={logo} 
            alt="Beacon Navigator Logo" 
            className="w-48 h-48 object-contain" 
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo E-mail */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-11" 
            />
          </div>

          {/* Campo Senha com Toggle */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="h-11 pr-10" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1} 
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-3 text-sm text-destructive font-medium flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Link Esqueceu a Senha */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          {/* Botão de Login */}
          <Button 
            type="submit" 
            className="w-full font-semibold" 
            size="lg" 
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          {/* Footer Links (Offline e Cadastro) */}
          <div className="text-center space-y-4 pt-2">
            <Link to="/offline" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
              Acessar modo Offline
            </Link>
            <p className="text-sm text-muted-foreground">
              Não possui uma conta?{" "}
              <Link to="/cadastro" className="text-primary font-medium hover:underline underline-offset-4">
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}