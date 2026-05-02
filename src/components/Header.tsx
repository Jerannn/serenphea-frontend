import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  ChevronDown,
  Heart,
  MessagesSquare,
  PlaneTakeoff,
  SettingsIcon,
  Sun,
} from "lucide-react";
import { LogOutIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm h-16 flex items-center">
      <div className="container flex items-center justify-between mx-auto px-4 lg:px-8">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Serenphea Logo's" className="w-10 h-10" />
          <h1 className="font-serif text-xl font-medium tracking-wide">
            Serenphéa
          </h1>
        </div>

        <h1>search</h1>

        <div className="flex items-center gap-5">
          <Button
            className="py-4 px-4"
            onClick={() => navigate("/host/dashboard")}
          >
            Become a host
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src="https://github.com/pranathip.png"
                  alt="@pranathip"
                />
                <AvatarFallback>PP</AvatarFallback>
                <AvatarBadge>
                  <ChevronDown />
                </AvatarBadge>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-44">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigate("/auth/register")}>
                Register
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/auth/login")}>
                Login
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Travel / Activity</DropdownMenuLabel>
              <DropdownMenuItem>
                <PlaneTakeoff />
                Trips
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Heart />
                Wishlists
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessagesSquare />
                Messages
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Personal Settings</DropdownMenuLabel>
              <DropdownMenuItem>
                <UserIcon />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Sun />
                Theme
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
