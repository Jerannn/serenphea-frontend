import { useState } from "react";
import StepperHeader from "./StepperHeader";
import StepNavigation from "./StepNavigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BasicInfoStep from "./steps/BasicInfoStep";
import LocationStep from "./steps/LocationStep";
import AmenitiesStep from "./steps/AmenitiesStep";
import PhotosStep from "./steps/PhotosStep";
import { Outlet } from "react-router-dom";

const initialSteps = [
  {
    id: 1,
    title: "Basics",
    description: "Property details",
    isCompleted: false,
  },
  { id: 2, title: "Location", description: "Where is it?", isCompleted: false },
  {
    id: 3,
    title: "Amenities",
    description: "What you offer",
    isCompleted: false,
  },
  {
    id: 4,
    title: "Photos",
    description: "Showcase your space",
    isCompleted: false,
  },
  {
    id: 5,
    title: "Pricing",
    description: "Set your rates",
    isCompleted: false,
  },
  {
    id: 6,
    title: "Settings",
    description: "Booking rules",
    isCompleted: false,
  },
  { id: 7, title: "Review", description: "Final check", isCompleted: false },
];

export default function AddPropertyStepper() {
  const [steps, setSteps] = useState(initialSteps);
  const [step, setStep] = useState(0);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white py-6 border-b">
        <Button
          variant="link"
          className="w-fit p-0 mb-6 ml-4"
          onClick={() => {}}
        >
          <ArrowLeft />
          Back to properties
        </Button>

        <StepperHeader steps={steps} currentStep={step} />
      </div>

      <div className="flex-1">
        <Outlet />
      </div>

      {/* <StepNavigation
        step={step}
        totalSteps={steps.length}
        onNext={() =>
          setStep((s) => {
            steps[s].isCompleted = true;
            return s + 1;
          })
        }
        onBack={() => setStep((s) => s - 1)}
      /> */}
    </div>
  );
}
