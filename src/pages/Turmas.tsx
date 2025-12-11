import { SearchHeader } from "@/components/SearchHeader";
import { BottomNav } from "@/components/BottomNav";
import { Bell, User } from "lucide-react";

const notifications = [
  {
    id: "1",
    title: "Cronograma Senac",
    subtitle: "Olá Larissa!",
    description: "Sua aula hoje é no 10 andar sala 1005, com o professor marcos de Big Data",
    type: "info",
  },
  {
    id: "2",
    title: "Sala de aula - ADS",
    user: "Marcos",
    description: "Aula cancelada",
    type: "alert",
  },
  {
    id: "3",
    title: "Portaria - Faculdade",
    user: "Lúcia",
    description: "Elevador em manutenção",
    type: "warning",
  },
];

export default function Turmas() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <SearchHeader />
      
      <main className="px-4 space-y-6 animate-fade-in">
        <h1 className="font-display text-xl text-center">
          Veja suas notificações
        </h1>

        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className="bg-card rounded-2xl p-4 space-y-2 animate-slide-up border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-display font-semibold text-foreground">
                {notification.title}
              </h3>
              {notification.subtitle && (
                <p className="text-muted-foreground text-sm">{notification.subtitle}</p>
              )}
              {notification.user && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{notification.user}:</span>
                  <span>{notification.description}</span>
                </div>
              )}
              {!notification.user && notification.description && (
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              )}
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
