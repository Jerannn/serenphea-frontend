import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import RootLayout from "./layout/RootLayout";
import AuthLayout from "./layout/AuthLayout";

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
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    errorElement: <div>404 Not Found</div>,
    children: [
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
    ],
  },

  {
    path: "/dashboard",
    Component: DashboardPage,
    // children: [
    //   {
    //     path: "properties",
    //     // Component: <PropertiesPage />,
    //     // loader: propertiesLoader,
    //     // action: createPropertyAction,
    //   },
    //   {
    //     path: "properties/:id",
    //     // Component: <PropertyDetailsPage />,
    //     // loader: propertyLoader,
    //   },
    // ],
  },
];
