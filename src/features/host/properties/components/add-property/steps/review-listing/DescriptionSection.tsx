import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";

export default function DescriptionSection() {
  const { description } = usePropertyStore((state) => state.property);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">About this space</h3>
      </div>
      <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
        {description || "No description provided."}
      </p>
    </section>
  );
}
