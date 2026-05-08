import AppSidebar from "@/components/dashboard/sidebar/AppSidebar";
import NavigationProgress from "@/components/navigation/NavigationProgress";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import {
  Outlet,
  useMatches,
  useNavigation,
  type UIMatch,
} from "react-router-dom";
import logo from "@/assets/logo.png";

type RouteHandle = {
  title?: string;
};

export default function DashboardLayout() {
  const navigation = useNavigation();
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
  const current = matches.at(-1);
  const title = current?.handle?.title || "Dashboard";
  const isLoading = navigation.state === "loading";

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [title]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavigationProgress />
        <header className="flex items-center gap-2 border-b border-border px-4 py-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="self-stretch" />
          <h1 className="text-base font-medium">{title}</h1>
        </header>
        <main
          className="relative min-h-[calc(100vh-3.5rem)]"
          aria-busy={navigation.state === "loading"}
        >
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <img
                src={logo}
                alt="Serenphea Logo's"
                className="w-7 h-7 animate-spin"
                loading="lazy"
              />
              <span className="ml-2 text-sm">Loading...</span>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
