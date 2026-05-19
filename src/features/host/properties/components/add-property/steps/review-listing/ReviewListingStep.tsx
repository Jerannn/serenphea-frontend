import { Separator } from "@/components/ui/separator";
import AmenitiesSection from "./AmenitiesSection";
import StatsSection from "./StatsSection";
import DescriptionSection from "./DescriptionSection";
import HeaderSection from "./HeaderSection";
import PhotoGridSection from "./PhotoGridSection";
import LocationSection from "./LocationSection";
import SidebarSection from "./SidebarSection";
import PropertyStepLayout from "../../PropertyStepLayout";

export default function ReviewListingStep() {
  return (
    <PropertyStepLayout
      title="Review your listing"
      description="Here's what guests will see when they view your property."
    >
      {/* <form id="review-property-form" onSubmit={onSubmit}> */}
      {/* Main Title & Edit Link */}
      <HeaderSection />

      {/* Photo Grid */}
      <PhotoGridSection />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-20">
        <div className="md:col-span-2 space-y-10">
          {/* Stats Section */}
          <StatsSection />
          <Separator className="bg-border/60" />

          {/* Description Section */}
          <DescriptionSection />
          <Separator className="bg-border/60" />

          {/* Amenities Section */}
          <AmenitiesSection />
          <Separator className="bg-border/60" />

          {/* Location Section */}
          <LocationSection />
        </div>

        {/* Sidebar */}
        <SidebarSection />
      </div>
      {/* </form> */}
    </PropertyStepLayout>
  );
}
