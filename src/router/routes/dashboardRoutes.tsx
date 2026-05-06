import AddPropertyPage from "@/pages/host/add-property/AddPropertyPage";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "@/pages/host/DashboardPage";
import PropertiesPage from "@/pages/host/PropertiesPage";
import BasicInfoPage from "@/pages/host/add-property/BasicInfoPage";
import BasicInfoAction from "@/features/host/properties/actions/basic-info-action";
import LocationAction from "@/features/host/properties/actions/location-action";
import BasicInfoLoader from "@/features/host/properties/loaders/basic-info-loader";
import PropertiesLoader from "@/features/host/properties/loaders/properties-loader";
import LocationPage from "@/pages/host/add-property/LocationPage";

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
      // Component: AddPropertyPage,
      // handle: { title: "New Property" },
      children: [
        {
          index: true,
          Component: PropertiesPage,
          loader: PropertiesLoader,
          handle: { title: "Properties" },
        },
        {
          path: "new",
          Component: AddPropertyPage,
          children: [
            {
              path: "basics",
              Component: BasicInfoPage,
              action: BasicInfoAction,
              loader: BasicInfoLoader,
              handle: { title: "Basic Info" },
            },
          ],
        },
        {
          path: ":id",
          Component: AddPropertyPage,
          children: [
            {
              path: "location",
              Component: LocationPage,
              action: LocationAction,
              // loader: BasicInfoLoader,
              handle: { title: "Location" },
            },
          ],
        },
      ],
    },
  ],
};

export default dashboardRoutes;
