import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function BecomeHostPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Become a host</h1>
      <Button onClick={() => navigate("/host/dashboard")}>Start Hosting</Button>
    </div>
  );
}
