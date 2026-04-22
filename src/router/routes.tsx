import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/DashboardPage";
import RootLayout from "./layout/RootLayout";
import authRoutes from "./routes/authRoutes";

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
  authRoutes,
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
