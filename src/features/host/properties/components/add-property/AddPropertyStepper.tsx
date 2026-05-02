import { useState } from "react";
import StepperHeader from "./StepperHeader";
import StepNavigation from "./StepNavigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BasicInfoStep from "./steps/BasicInfoStep";

const steps = [
  { id: 1, title: "Basic Info" },
  { id: 2, title: "Location" },
  { id: 3, title: "Amenities" },
  { id: 4, title: "Photos" },
];

export default function AddPropertyStepper() {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-4xl mx-auto w-full backdrop-blur-xl">
      <Button variant="link" className="w-fit p-0 mb-6" onClick={() => {}}>
        <ArrowLeft />
        Back to properties
      </Button>

      <h1 className="text-3xl font-bold mb-2">Add new property</h1>
      <p className="text-muted-foreground mb-8">
        Fill in the details about your property
      </p>

      <StepperHeader steps={steps} currentStep={step} />

      <div className="min-h-100 mt-16 mb-8">
        {step === 0 && <BasicInfoStep />}
        {/* {step === 1 && <LocationStep />}
        {step === 2 && <AmenitiesStep />}
        {step === 3 && <PhotosStep />} */}
      </div>

      <StepNavigation
        step={step}
        totalSteps={steps.length}
        onNext={() => setStep((s) => s + 1)}
        onBack={() => setStep((s) => s - 1)}
      />
    </div>
  );
}
