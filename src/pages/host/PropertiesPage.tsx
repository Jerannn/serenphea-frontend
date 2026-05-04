import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PropertiesTabs from "@/features/host/properties/components/PropertiesTabs";

export default function PropertiesPage() {
  return (
    <div className="p-4 md:p-8">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <div>
          <h1 className="font-serif text-3xl font-bold m-0">My Properties</h1>
          <p className="text-muted-foreground">Manage your properties</p>
        </div>
        <Button asChild className="py-5">
          <Link to="/host/properties/new/basics">
            <Plus className="w-4 h-4 mr-2" />
            Add new property
          </Link>
        </Button>
      </div>

      <PropertiesTabs />
    </div>
  );
}
