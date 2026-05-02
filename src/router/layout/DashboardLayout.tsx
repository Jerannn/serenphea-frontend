import AppSidebar from "@/components/dashboard/sidebar/AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useMatches, type UIMatch } from "react-router-dom";

type RouteHandle = {
  title?: string;
};

export default function DashboardLayout() {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
  const current = matches.at(-1);
  const title = current?.handle?.title || "Dashboard";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <>
          <header className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <SidebarTrigger />
            <Separator orientation="vertical" className="self-stretch" />
            <h1 className="text-base font-medium">{title}</h1>
          </header>
          <main className="p-4">
            <Outlet />
          </main>
        </>
      </SidebarInset>
    </SidebarProvider>
  );
}
