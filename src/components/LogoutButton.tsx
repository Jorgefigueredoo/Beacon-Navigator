import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Sair
    </Button>
  );
}
