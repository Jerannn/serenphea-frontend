import HomePage from "@/pages/app/HomePage";
import RootLayout from "./layout/RootLayout";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import BecomeHostPage from "@/pages/app/BecomeHostPage";

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
      {
        path: "become-host",
        Component: BecomeHostPage,
      },
      authRoutes,
    ],
  },
  dashboardRoutes,
];
