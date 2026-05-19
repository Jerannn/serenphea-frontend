import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="relative flex-1">
        <Outlet />
      </div>
    </main>
  );
}
