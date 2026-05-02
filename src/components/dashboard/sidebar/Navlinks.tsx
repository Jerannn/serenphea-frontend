import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Calendar,
  DollarSign,
  Fence,
  LayoutDashboard,
  MessagesSquare,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navMain = [
  {
    title: "Dashboard",
    url: "/host/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Properties",
    url: "/host/properties",
    icon: Fence,
  },
  {
    title: "Bookings",
    url: "/host/bookings",
    icon: Calendar,
  },
  {
    title: "Earnings",
    url: "/host/earnings",
    icon: DollarSign,
  },
  {
    title: "Messages",
    url: "/host/messages",
    icon: MessagesSquare,
  },
];

export default function Navlinks() {
  const location = useLocation();
  const currenntPath = location.pathname;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {navMain.map((item) => {
            const isActive = item.url === currenntPath;

            return (
              <SidebarMenuItem
                className="flex items-center gap-2"
                key={item.url}
              >
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "min-w-8 duration-200 ease-linear text-sidebar-foreground hover:bg-sidebar-accent",
                    isActive &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                  )}
                >
                  <NavLink to={item.url} end>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
