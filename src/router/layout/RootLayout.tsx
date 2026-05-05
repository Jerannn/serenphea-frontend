import Header from "@/components/Header";
import NavigationProgress from "@/components/navigation/NavigationProgress";
import { Outlet, useNavigation } from "react-router-dom";

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <main
      className="flex min-h-screen flex-col"
      aria-busy={navigation.state === "loading"}
    >
      <NavigationProgress />
      <Header />
      <div className="relative flex-1">
        <Outlet />
      </div>
    </main>
  );
}
