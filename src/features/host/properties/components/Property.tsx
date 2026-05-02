import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Edit, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyActionsMenu from "./PropertyActionsMenu";

interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  bookings: number;
  revenue: number;
  status: "published" | "archived" | "draft";
  image: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
}

type PropertyProps = {
  properties: Property[];
};

export default function Property({ properties }: PropertyProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden pt-0">
          <div className="relative">
            <img
              src={property.image}
              alt={property.name}
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
                {property.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {property.location}
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
                <span className="font-medium">{property.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({property.reviews})
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold">${property.price}</span>
                <span className="text-sm text-muted-foreground"> /night</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Bookings</p>
                <p className="text-lg font-semibold">{property.bookings}</p>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                <p className="text-lg font-semibold text-success">
                  ${property.revenue.toLocaleString()}
                </p>
              </div>
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
      ))}
    </div>
  );
}
