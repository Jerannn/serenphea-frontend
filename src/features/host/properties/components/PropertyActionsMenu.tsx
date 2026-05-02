import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

type PropertyActionsMenuProps = {
  id: string;
  status: string;
};

export default function PropertyActionsMenu({
  id,
  status,
}: PropertyActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to={`/property/${id}`}>
            <Eye className="w-4 h-4 mr-2" />
            View listing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/host/properties/${id}/edit`}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/host/calendar/${id}`}>
            <Calendar className="w-4 h-4 mr-2" />
            Manage calendar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            // handleToggleStatus(property.id);
          }}
        >
          {status === "published" ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => {
            // setPropertyToDelete(property.id);
            // setDeleteDialogOpen(true);
          }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
