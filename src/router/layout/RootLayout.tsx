import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </main>
  );
}
