import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

type StepperHeaderProps = {
  steps: Step[];
  currentStep: number;
};

export default function StepperHeader({
  steps,
  currentStep,
}: StepperHeaderProps) {
  return (
    <div className="w-full px-2 sm:px-8">
      <div className="relative flex items-center justify-between w-full">
        {steps.map((step, index) => {
          return (
            <div key={step.id} className="relative flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all duration-500 bg-muted",
                  step.isCompleted
                    ? `bg-primary text-white ${index === currentStep && "bg-accent"}`
                    : index === currentStep
                      ? "text-white bg-accent "
                      : "text-muted-foreground",
                )}
              >
                {step.isCompleted ? <Check className={"w-4 h-4"} /> : index + 1}
              </div>

              <div className="flex flex-col items-center mt-3">
                <span
                  className={cn(
                    "text-sm font-medium whitespace-nowrap bg-background",
                    index === currentStep
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
                <span className="text-xs mt-1 text-center text-muted-foreground">
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}
        <div className="absolute top-1/2 translate-y-2 h-2 w-6 bg-background" />
        <div className="absolute -right-1 top-1/2 translate-y-2 h-2 w-3 bg-background" />
        <Progress
          value={(currentStep / (steps.length - 1)) * 100}
          className="absolute top-1/2 translate-y-2.5 -z-10 transition-all duration-500 ease-out"
        />
      </div>
    </div>
  );
}
