import AppSidebar from "@/components/dashboard/sidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
