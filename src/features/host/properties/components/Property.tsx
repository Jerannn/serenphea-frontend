import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Edit, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyActionsMenu from "./PropertyActionsMenu";
import type { PropertyWithRelations } from "../types";

type PropertyProps = {
  properties: PropertyWithRelations[];
};

const DEFAULT_LOCATION = {
  city: "Unknown city",
  country: "Unknown country",
};

const DEFAULT_PRICING = {
  basePrice: 0,
};

const DEFAULT_BOOKING_SETTINGS = {
  instantBook: false,
  minNights: 1,
  maxNights: 30,
};

const DEFAULT_PROPERTY_IMAGE =
  "https://placehold.co/800x500?text=No+Image+Available";

export default function Property({ properties }: PropertyProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => {
        const location = {
          city: property.location?.city?.trim() || DEFAULT_LOCATION.city,
          country:
            property.location?.country?.trim() || DEFAULT_LOCATION.country,
        };

        const pricing = {
          basePrice: property.pricing?.basePrice ?? DEFAULT_PRICING.basePrice,
        };

        const bookingSettings = {
          instantBook:
            property.bookingSettings?.instantBook ??
            DEFAULT_BOOKING_SETTINGS.instantBook,
          minNights:
            property.bookingSettings?.minNights ??
            DEFAULT_BOOKING_SETTINGS.minNights,
          maxNights:
            property.bookingSettings?.maxNights ??
            DEFAULT_BOOKING_SETTINGS.maxNights,
        };

        const images = property.images ?? [];
        const coverImage =
          images.find((image) => image.isCover && image.url?.trim()) ??
          images.find((image) => image.url?.trim());
        const imageUrl = coverImage?.url?.trim() || DEFAULT_PROPERTY_IMAGE;

        return (
          <Card key={property.id} className="overflow-hidden pt-0 max-w-96">
            <div className="relative">
              <img
                src={imageUrl}
                alt={property.title || "Property image"}
                onError={(event) => {
                  event.currentTarget.src = DEFAULT_PROPERTY_IMAGE;
                }}
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
              <Badge
                variant={
                  property.status === "published" ? "default" : "secondary"
                }
                className="absolute top-3 left-3"
              >
                {property.status}
              </Badge>
              <PropertyActionsMenu id={property.id} status={property.status} />
            </div>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                  {property.title}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {location.city}, {location.country}
                </p>
              </div>

              <div className="flex items-center gap-1 mb-4 text-sm text-muted-foreground">
                <span>{property.bedrooms} beds</span>
                <Separator orientation="vertical" />
                <span>{property.bathrooms} baths</span>
                <Separator orientation="vertical" />
                <span>{property.guests} guests</span>
              </div>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#C6A85C] text-[#C6A85C]" />
                  <span className="font-medium">
                    {/* {property.rating} */}4.9
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({/* {property.reviews} */}124)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold">
                    ${pricing.basePrice}
                  </span>
                  <span className="text-sm text-muted-foreground"> /night</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Bookings</p>
                  <p className="text-lg font-semibold">
                    {/* {property.bookings} */} 32
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                  <p className="text-lg font-semibold text-success">
                    ${/* ${property.revenue.toLocaleString()} */}14,400
                  </p>
                </div>
              </div>

              <div className="mb-4 text-xs text-muted-foreground flex items-center gap-1">
                <span>
                  {bookingSettings.instantBook
                    ? "Instant Book"
                    : "Request to book"}
                </span>
                <Separator orientation="vertical" />
                <span>
                  {bookingSettings.minNights}-{bookingSettings.maxNights} nights
                </span>
                <Separator orientation="vertical" />
                <span>{images.length} photos</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/host/properties/${property.id}/edit`}>
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/host/calendar/${property.id}`}>
                    <Calendar className="w-3 h-3 mr-1" />
                    Calendar
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
