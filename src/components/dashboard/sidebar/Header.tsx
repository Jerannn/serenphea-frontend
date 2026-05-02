import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Header() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-transparent active:bg-transparent"
        >
          <Link
            to="/host/dashboard"
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
              <img
                src={logo}
                alt="Serenphea Logo's"
                className="w-full"
                loading="lazy"
              />
            </div>

            <div>
              <h1 className="font-serif text-xl/4 tracking-wide truncate font-semibold">
                HOST
              </h1>
              <p className="text-xs/3">Serenphéa</p>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
