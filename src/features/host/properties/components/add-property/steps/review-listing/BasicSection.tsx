import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import SectionWrapper from "./SectionWrapper";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BasicSection() {
  const basicInfo = usePropertyStore((state) => state.property);
  return (
    <SectionWrapper title="Basic information" step={0}>
      <FieldGroup>
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input
            value={basicInfo.title || "Untitled Property"}
            readOnly
            className="border-border bg-white"
          />
        </Field>

        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea
            value={basicInfo.description || "No description"}
            readOnly
            className="border-border bg-white"
          />
        </Field>

        <Field>
          <FieldLabel>Property title</FieldLabel>
          <Input
            value={`${basicInfo.location?.street} ${basicInfo.location?.city} city, ${basicInfo.location?.country}`}
            readOnly
            className="border-border bg-white"
          />
        </Field>
      </FieldGroup>
    </SectionWrapper>
  );
}
