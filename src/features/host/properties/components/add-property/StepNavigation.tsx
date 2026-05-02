import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

type StepNavigationProps = {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
};

export default function StepNavigation({
  step,
  totalSteps,
  onNext,
  onBack,
}: StepNavigationProps) {
  const isLastStep = step === totalSteps - 1;

  return (
    <div className="flex items-center justify-between mt-8 pt-8 border-t border-border/40">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        disabled={step === 0}
        className="gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all rounded-xl px-4"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </Button>

      <Button 
        onClick={onNext}
        className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all rounded-xl px-6 sm:px-8 h-11"
      >
        {isLastStep ? (
          <>
            <span className="font-semibold">Publish Property</span>
            <CheckCircle2 className="w-4 h-4 ml-1" />
          </>
        ) : (
          <>
            <span className="font-semibold">Continue</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </>
        )}
      </Button>
    </div>
  );
}
