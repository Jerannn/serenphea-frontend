import { Badge } from "@/components/ui/badge";

interface LocationChipsProps {
  city?: string | null;
  region?: string | null;
  postcode?: string | null;
  country?: string | null;
}

export function LocationChips({
  city,
  region,
  postcode,
  country,
}: LocationChipsProps) {
  const addressPreview = [
    city && { label: "City", value: city },
    region && { label: "Region", value: region },
    postcode && { label: "Postcode", value: postcode },
    country && { label: "Country", value: country },
  ].filter(Boolean) as { label: string; value: string }[];

  if (addressPreview.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {addressPreview.map(({ label, value }) => (
        <Badge key={label} variant="secondary">
          {label}: {value}
        </Badge>
      ))}
    </div>
  );
}
