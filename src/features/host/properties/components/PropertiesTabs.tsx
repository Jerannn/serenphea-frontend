import { useState } from "react";
import EmptyProperty from "./EmptyProperty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Property from "./Property";
import { useLoaderData } from "react-router-dom";

export default function PropertiesTabs() {
  const { meta, properties } = useLoaderData();
  const [filter, setFilter] = useState<
    "all" | "published" | "archived" | "draft"
  >("all");

  const filteredProperties = properties.filter((property) => {
    if (filter === "all") return true;
    return property.status === filter;
  });

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
        <TabsTrigger value="draft">
          Archived ({properties.filter((p) => p.status === "draft").length})
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
