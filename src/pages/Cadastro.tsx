import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
<<<<<<< HEAD
import { usuarioService } from "../services/usuarioService";




export default function Cadastro() {
  const navigate = useNavigate();
=======
import { User, Mail, Lock, Phone, FileText, MapPin, Map } from "lucide-react"; 
import logo from '../assets/logobeacon.png';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    phone: "",
    state: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
>>>>>>> origin/delta

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setErro(null);

    if (senha !== confirmarSenha) {
      setErro("As senhas não conferem.");
      return;
    }

    setLoading(true);
    try {
      await usuarioService.criar({
        nomeCompleto: nome,
        email,
        senha,
    });



      // Fluxo 1 (mais comum): cadastra e manda pro login
      navigate("/login", { replace: true });

      // Fluxo 2 (opcional): auto-login após cadastrar
      // - se você quiser isso, eu te mando o ajuste chamando /auth/login e salvando token
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 409) setErro("E-mail já cadastrado.");
      else if (status) setErro(`Erro ao cadastrar (HTTP ${status}).`);
      else setErro("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold">Cadastro</h1>
=======
    console.log(formData);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 py-12">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        
        {/* Logo Grande */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src={logo} 
            alt="Beacon Navigator" 
            className="w-48 h-48 object-contain" 
          />
        </div>
>>>>>>> origin/delta

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nome */}
          <div className="space-y-2">
<<<<<<< HEAD
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              required
              disabled={loading}
            />
=======
            <Label htmlFor="name" className="text-sm font-medium">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Digite seu nome completo"
                className="pl-10"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
>>>>>>> origin/delta
          </div>

          {/* Biografia */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">Biografia</Label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="bio"
                placeholder="Conte um pouco sobre você"
                className="pl-10"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                className="pl-10"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Estado e Localização */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium">Estado</Label>
              <div className="relative">
                <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="state"
                  placeholder="UF"
                  className="pl-10"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">Cidade</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Sua cidade"
                  className="pl-10"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              required
              disabled={loading}
            />
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Crie uma senha"
              required
              disabled={loading}
            />
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-2">
            <Label htmlFor="confirmarSenha">Confirmar senha</Label>
            <Input
              id="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme a senha"
              required
              disabled={loading}
            />
          </div>

<<<<<<< HEAD
          {erro && (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm">
              {erro}
            </div>
          )}

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
=======
          <Button type="submit" className="w-full" size="lg">
            Cadastrar
>>>>>>> origin/delta
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Já tem conta?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
