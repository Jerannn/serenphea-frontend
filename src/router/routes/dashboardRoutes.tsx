import AddPropertyPage from "@/pages/host/add-property/AddPropertyPage";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "@/pages/host/DashboardPage";
import PropertiesPage from "@/pages/host/PropertiesPage";
import BasicInfoPage from "@/pages/host/add-property/BasicInfoPage";
import BasicInfoAction from "@/features/host/properties/actions/basic-info-action";

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
      children: [
        {
          path: "basics",
          Component: BasicInfoPage,
          action: BasicInfoAction,
          handle: { title: "Basic Info" },
        },
      ],
    },
  ],
};

export default dashboardRoutes;
