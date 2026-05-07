import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  essentials: "Essentials",
  bathroom: "Bathroom",
  kitchen: "Kitchen & Dining",
  entertainment: "Entertainment",
  safety: "Safety",
  facilities: "Facilities",
  outdoor: "Outdoor",
  services: "Services",
  family: "Family",
  internet_office: "Internet & Office",
  accessibility: "Accessibility",
  pet: "Pet",
  rules: "Rules",
};

type AmenityCategorySectionProps = {
  category: string;
  children: ReactNode;
};

export default function AmenityCategorySection({
  category,
  children,
}: AmenityCategorySectionProps) {
  return (
    <Card
      key={category}
      className="overflow-hidden border-border/60 shadow-sm py-0 rounded-sm"
    >
      <CardHeader className="border-b bg-muted/30 px-6 py-5 rounded-none">
        <CardTitle className="font-serif text-xl font-semibold tracking-tight">
          {CATEGORY_LABELS[category]}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
