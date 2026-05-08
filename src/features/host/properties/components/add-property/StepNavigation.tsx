import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { usePropertyStore } from "../../store/PropertyStore";
import { useNavigate } from "react-router-dom";

type StepNavigationProps = {
  typeAction: string;
  onNext?: () => void;
  isSubmitting?: boolean;
};

export default function StepNavigation({
  typeAction,
  isSubmitting,
}: StepNavigationProps) {
  const navigate = useNavigate();
  const prevStep = usePropertyStore((state) => state.prevStep);
  const currentStep = usePropertyStore((state) => state.currentStep);
  const paths = usePropertyStore((state) => state.paths);

  const handleNavigateBack = () => {
    prevStep();

    // prevent going back to the first step
    if (currentStep === 0) return;

    navigate(paths[currentStep - 1]);
  };

  return (
    <div className="border-t border-border/40 px-4 py-4  flex items-center justify-between sticky bottom-0 bg-card">
      <Button
        variant="ghost"
        onClick={handleNavigateBack}
        className="gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all rounded-xl px-4"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </Button>

      <Button
        type="submit"
        className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all rounded-xl px-6 sm:px-8 h-11"
        form={typeAction}
        disabled={isSubmitting}
      >
        {/* {isLastStep ? (
          <>
            <span className="font-semibold">Publish Property</span>
            <CheckCircle2 className="w-4 h-4 ml-1" />
          </>
        ) : ( */}
        <>
          <span className="font-semibold">Save & Continue</span>
          {isSubmitting ? (
            <Loader2 className="mr-2 animate-spin" />
          ) : (
            <ChevronRight className="w-4 h-4 ml-1" />
          )}
        </>
        {/* )} */}
      </Button>
    </div>
  );
}
