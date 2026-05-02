import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type StepperHeaderProps = {
  steps: { id: number; title: string }[];
  currentStep: number;
};

export default function StepperHeader({
  steps,
  currentStep,
}: StepperHeaderProps) {
  return (
    <div className="w-full px-2 sm:px-8">
      <div className="relative flex items-center justify-between w-full">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-secondary/60 rounded-full -z-10" />

        {/* Active Line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full -z-10 transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isActive = currentStep === index;

          return (
            <div
              key={step.id}
              className="relative flex flex-col items-center group"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all duration-500 border-[3px] bg-background",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : isActive
                      ? "border-primary text-primary shadow-lg shadow-primary/20 ring-4 ring-primary/10"
                      : "border-muted text-muted-foreground group-hover:border-primary/40 group-hover:text-primary/60",
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "absolute -bottom-8 w-max text-center text-xs sm:text-sm font-medium transition-colors duration-300",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground",
                  isCompleted && "text-foreground/80",
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
