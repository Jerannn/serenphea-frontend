import { useState } from "react";
import EmptyProperty from "./EmptyProperty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Property from "./Property";
import { useInfiniteQuery } from "@tanstack/react-query";
import { propertiesQuery } from "../loaders/properties-loader";

export default function PropertiesTabs() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(propertiesQuery());

  console.log(data);
  const properties = data?.pages.flatMap((page) => page.properties) ?? [];
  // const meta = data?.pages[0].meta;

  const [filter, setFilter] = useState<
    "all" | "published" | "archived" | "draft"
  >("all");
  const filteredProperties = properties.filter((property) => {
    if (filter === "all") return true;
    return property.status === filter;
  });

  return (
    <Tabs
      value={filter}
      onValueChange={(value: string) =>
        setFilter(value as "all" | "published" | "archived" | "draft")
      }
    >
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
