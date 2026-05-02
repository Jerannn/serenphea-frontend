import { Button } from "@/components/ui/button";
import { LandPlot, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyProperty() {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LandPlot />
        </EmptyMedia>
        <EmptyTitle>No properties</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          You haven't added any properties yet. Start by adding your first
          property.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <Plus />
          <Link to="/host/properties/new">Add your first property</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
