import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";
import Beacons from "./pages/Beacons";
import LocalDetail from "./pages/LocalDetail";
import Rotas from "./pages/Rotas";
import Turmas from "./pages/Turmas";
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import NotFound from "./pages/NotFound";
import NovoBeacon from "./pages/NovoBeacon";

const queryClient = new QueryClient();

function hasToken() {
  const t = localStorage.getItem("token");
  return !!t && t !== "undefined" && t !== "null";
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();

  if (!hasToken()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

function PublicOnly({ children }: { children: JSX.Element }) {
  if (hasToken()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Sempre começa no login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rotas públicas */}
          <Route
            path="/login"
            element={
              <PublicOnly>
                <Login />
              </PublicOnly>
            }
          />
          <Route
            path="/cadastro"
            element={
              <PublicOnly>
                <Cadastro />
              </PublicOnly>
            }
          />

          {/* Rotas privadas (obrigam login) */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/beacons"
            element={
              <RequireAuth>
                <Beacons />
              </RequireAuth>
            }
          />
          <Route
            path="/local/:id"
            element={
              <RequireAuth>
                <LocalDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/rotas"
            element={
              <RequireAuth>
                <Rotas />
              </RequireAuth>
            }
          />
          <Route
            path="/turmas"
            element={
              <RequireAuth>
                <Turmas />
              </RequireAuth>
            }
          />
          <Route
            path="/perfil"
            element={
              <RequireAuth>
                <Perfil />
              </RequireAuth>
            }
          />
          <Route
            path="/editar-perfil"
            element={
              <RequireAuth>
                <EditarPerfil />
              </RequireAuth>
            }
          />
          <Route
            path="/novo-beacon"
            element={
              <RequireAuth>
                <NovoBeacon />
              </RequireAuth>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
