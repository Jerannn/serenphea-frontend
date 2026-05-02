import HomePage from "@/pages/HomePage";
import RootLayout from "./layout/RootLayout";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";

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
  dashboardRoutes,
];
