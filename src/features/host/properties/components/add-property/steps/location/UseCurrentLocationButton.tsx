import { Button } from "@/components/ui/button";
import { Loader2, LocateFixed } from "lucide-react";

interface UseCurrentLocationButtonProps {
  geoLoading: boolean;
  onClick: () => void;
}

export function UseCurrentLocationButton({
  geoLoading,
  onClick,
}: UseCurrentLocationButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-8 shrink-0 border-border bg-white"
      disabled={geoLoading}
      onClick={onClick}
    >
      {geoLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <LocateFixed className="size-4" />
      )}
      <span className="ml-2">Use current location</span>
    </Button>
  );
}
