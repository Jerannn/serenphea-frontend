import DashboardLayout from "../layout/DashboardLayout";
import AddPropertyPage from "@/pages/host/add-property/AddPropertyPage";
import DashboardPage from "@/pages/host/DashboardPage";
import PropertiesPage from "@/pages/host/PropertiesPage";
import BasicInfoPage from "@/pages/host/add-property/BasicInfoPage";
import LocationPage from "@/pages/host/add-property/LocationPage";
import UpdatePropertyPage from "@/pages/host/add-property/UpdatePropertyPage";
import AmenitiesPage from "@/pages/host/add-property/AmenitiesPage";

import basicInfoAction from "@/features/host/properties/actions/basic-info-action";
import locationAction from "@/features/host/properties/actions/location-action";
import amenitiesAction from "@/features/host/properties/actions/amenities-action";

import basicInfoLoader from "@/features/host/properties/loaders/basic-info-loader";
import propertiesLoader from "@/features/host/properties/loaders/properties-loader";
import amenitiesLoader from "@/features/host/properties/loaders/amenities-loader";
import PhotosPage from "@/pages/host/add-property/PhotosPage";

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
      children: [
        {
          index: true,
          Component: PropertiesPage,
          loader: propertiesLoader,
          handle: { title: "Properties" },
        },
        {
          path: "new",
          Component: AddPropertyPage,
          children: [
            {
              path: "basics",
              Component: BasicInfoPage,
              action: basicInfoAction,
              loader: basicInfoLoader,
              handle: { title: "Basic Info" },
            },
          ],
        },
        {
          path: ":id",
          Component: UpdatePropertyPage,
          children: [
            {
              path: "location",
              Component: LocationPage,
              action: locationAction,
              handle: { title: "Location" },
            },
            {
              path: "amenities",
              Component: AmenitiesPage,
              action: amenitiesAction,
              loader: amenitiesLoader,
              handle: { title: "Amenities" },
            },
            {
              path: "photos",
              Component: PhotosPage,
              // action: amenitiesAction,
              // loader: amenitiesLoader,
              handle: { title: "Photos" },
            },
          ],
        },
      ],
    },
  ],
};

export default dashboardRoutes;
