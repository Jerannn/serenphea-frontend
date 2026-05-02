import AddPropertyPage from "@/pages/host/AddPropertyPage";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "@/pages/host/DashboardPage";
import PropertiesPage from "@/pages/host/PropertiesPage";

const dashboardRoutes = {
  path: "/host",
  Component: DashboardLayout,
  children: [
    {
      index: true,
      path: "dashboard",
      Component: DashboardPage,
      handle: { title: "Dashboard" },
    },
    {
      path: "properties",
      Component: PropertiesPage,
      handle: { title: "Properties" },
    },
    {
      path: "properties/new",
      Component: AddPropertyPage,
      handle: { title: "New Property" },
    },
  ],
};

export default dashboardRoutes;
