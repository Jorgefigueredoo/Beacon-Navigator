import { LayoutDashboard, Radio, Users, Navigation, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Painel" },
  { to: "/beacons", icon: Radio, label: "Beacons" },
  { to: "/turmas", icon: Users, label: "Turmas" },
  { to: "/rotas", icon: Navigation, label: "Rotas" },
  { to: "/perfil", icon: User, label: "Perfil" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="max-w-lg mx-auto flex justify-around py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="nav-item"
            activeClassName="nav-item-active"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
