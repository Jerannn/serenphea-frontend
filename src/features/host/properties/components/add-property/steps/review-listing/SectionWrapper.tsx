import { Button } from "@/components/ui/button";
import usePropertyStepper from "@/features/host/properties/hooks/usePropertyStepper";
import { Pencil } from "lucide-react";
import type { ReactNode } from "react";

type SectionWrapperProps = {
  title: string;
  children: ReactNode;
  step: number;
};

export default function SectionWrapper({
  title,
  children,
  step,
}: SectionWrapperProps) {
  const { goToSpecificStep } = usePropertyStepper();

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold mb-3">{title}</h2>
        <Button variant="link" onClick={() => goToSpecificStep(step)}>
          <Pencil /> Edit
        </Button>
      </div>

      {children}
    </div>
  );
}
