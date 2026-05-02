import { useState } from "react";
import EmptyProperty from "./EmptyProperty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Property from "./Property";
import { toast } from "sonner";

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

const mockProperties: Property[] = [
  {
    id: "1",
    name: "Beachfront Villa with Pool",
    location: "Malibu, California",
    type: "Villa",
    price: 450,
    rating: 4.9,
    reviews: 124,
    bookings: 32,
    revenue: 14400,
    status: "published",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600",
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
  },
  {
    id: "2",
    name: "Modern Mountain Cabin",
    location: "Aspen, Colorado",
    type: "Cabin",
    price: 350,
    rating: 4.8,
    reviews: 89,
    bookings: 28,
    revenue: 9800,
    status: "published",
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600",
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
  },
  {
    id: "3",
    name: "Luxury Lake House",
    location: "Lake Tahoe, Nevada",
    type: "House",
    price: 520,
    rating: 4.9,
    reviews: 156,
    bookings: 38,
    revenue: 19760,
    status: "published",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600",
    bedrooms: 5,
    bathrooms: 4,
    guests: 10,
  },
  {
    id: "4",
    name: "Downtown City Loft",
    location: "New York, NY",
    type: "Apartment",
    price: 280,
    rating: 4.7,
    reviews: 67,
    bookings: 24,
    revenue: 6720,
    status: "published",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
  },
  {
    id: "5",
    name: "Coastal Cottage",
    location: "Cape Cod, Massachusetts",
    type: "Cottage",
    price: 220,
    rating: 4.6,
    reviews: 45,
    bookings: 18,
    revenue: 3960,
    status: "archived",
    image:
      "https://plus.unsplash.com/premium_photo-1687960117069-567a456fe5f3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600",
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
  },
];

export default function PropertiesTabs() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "archived">("all");

  const filteredProperties = properties.filter((property) => {
    if (filter === "all") return true;
    return property.status === filter;
  });

  const handleDelete = () => {
    if (propertyToDelete) {
      setProperties(properties.filter((p) => p.id !== propertyToDelete));
      toast.success("Property deleted successfully");
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    setProperties(
      properties.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "published" ? "archived" : "published",
            }
          : p,
      ),
    );
    toast.success("Property status updated");
  };

  return (
    <Tabs value={filter} onValueChange={(value: any) => setFilter(value)}>
      <TabsList>
        <TabsTrigger value="all">All ({properties.length})</TabsTrigger>
        <TabsTrigger value="published">
          Published ({properties.filter((p) => p.status === "published").length}
          )
        </TabsTrigger>
        <TabsTrigger value="archived">
          Archived ({properties.filter((p) => p.status === "archived").length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value={filter} className="mt-6">
        {filteredProperties.length === 0 ? (
          <EmptyProperty />
        ) : (
          <Property properties={filteredProperties} />
        )}
      </TabsContent>
    </Tabs>
  );
}
