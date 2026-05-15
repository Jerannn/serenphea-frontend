import DashboardLayout from "../layout/DashboardLayout";
import AddPropertyPage from "@/pages/host/add-property/AddPropertyPage";
import DashboardPage from "@/pages/host/DashboardPage";
import PropertiesPage from "@/pages/host/PropertiesPage";
import BasicInfoPage from "@/pages/host/add-property/BasicInfoPage";
import LocationPage from "@/pages/host/add-property/LocationPage";
import UpdatePropertyPage from "@/pages/host/add-property/UpdatePropertyPage";
import AmenitiesPage from "@/pages/host/add-property/AmenitiesPage";
import PhotosPage from "@/pages/host/add-property/PhotosPage";
import PricingPage from "@/pages/host/add-property/PricingPage";
import BookingSettingsPage from "@/pages/host/add-property/BookingSettingsPage";
import ReviewListingPage from "@/pages/host/add-property/ReviewListingPage";

import basicInfoAction from "@/features/host/properties/actions/basic-info-action";
import locationAction from "@/features/host/properties/actions/location-action";
import amenitiesAction from "@/features/host/properties/actions/amenities-action";
import photosAction from "@/features/host/properties/actions/photos-action";
import pricingAction from "@/features/host/properties/actions/pricing-action";
import bookingSettingsAction from "@/features/host/properties/actions/booking-settings-action";

import basicInfoLoader from "@/features/host/properties/loaders/basic-info-loader";
import propertiesLoader from "@/features/host/properties/loaders/properties-loader";
import amenitiesLoader from "@/features/host/properties/loaders/amenities-loader";

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
              action: photosAction,
              handle: { title: "Photos" },
            },
            {
              path: "pricing",
              Component: PricingPage,
              action: pricingAction,
              handle: { title: "Pricing" },
            },
            {
              path: "settings",
              Component: BookingSettingsPage,
              action: bookingSettingsAction,
              handle: { title: "Booking Settings" },
            },
            {
              path: "review-listing",
              Component: ReviewListingPage,
              // action: bookingSettingsAction,
              handle: { title: "Review Listing" },
            },
          ],
        },
      ],
    },
  ],
};

export default dashboardRoutes;
