import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/host/DashboardPage";
import RootLayout from "./layout/RootLayout";
import authRoutes from "./routes/authRoutes";
import DashboardLayout from "./layout/DashboardLayout";
import Properties from "@/pages/host/Properties";

export const routes = [
  {
    path: "/",
    Component: RootLayout,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      authRoutes,
    ],
  },
  {
    path: "/host",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "properties",
        Component: Properties,
      },
    ],
  },
];
