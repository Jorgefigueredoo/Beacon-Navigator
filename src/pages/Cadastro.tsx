import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Phone, FileText, MapPin, Map, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "../services/api"; // Agora funciona graças ao export default
import logo from '../assets/logobeacon.png';

export default function Cadastro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // MUDANÇA: Campos em português para bater com o Java (DTO)
  const [formData, setFormData] = useState({
    nome: "",
    biografia: "",
    telefone: "",
    estado: "",
    cidade: "", 
    email: "",
    senha: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validação de senha
    if (formData.senha !== formData.confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    setLoading(true);

    try {
      // 2. Prepara os dados (remove a confirmPassword)
      const { confirmPassword, ...dadosParaEnviar } = formData;

      // 3. Envia para o Back-end
      // IMPORTANTE: Authorization: "" evita o erro 401 se tiver token velho salvo
      await api.post("/usuarios", dadosParaEnviar, {
        headers: {
          Authorization: "" 
        }
      });

      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 py-12">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src={logo} 
            alt="Beacon Navigator" 
            className="w-48 h-48 object-contain" 
          />
        </div>

        <h1 className="font-display text-3xl font-bold text-center text-foreground">
          Cadastre-se
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm font-medium">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="nome"
                placeholder="Digite seu nome completo"
                className="pl-10"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Biografia */}
          <div className="space-y-2">
            <Label htmlFor="biografia" className="text-sm font-medium">Biografia</Label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="biografia"
                placeholder="Conte um pouco sobre você"
                className="pl-10"
                value={formData.biografia}
                onChange={(e) => setFormData({ ...formData, biografia: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="telefone" className="text-sm font-medium">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                className="pl-10"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Estado e Cidade */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estado" className="text-sm font-medium">Estado</Label>
              <div className="relative">
                <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="estado"
                  placeholder="UF"
                  className="pl-10"
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cidade" className="text-sm font-medium">Cidade</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="cidade"
                  placeholder="Sua cidade"
                  className="pl-10"
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu-email@exemplo.com"
                className="pl-10"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="senha" className="text-sm font-medium">Crie sua senha</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                className="pl-10"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar senha</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                className="pl-10"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            <Link to="/login" className="text-primary hover:underline">
              Já tem uma conta? Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}