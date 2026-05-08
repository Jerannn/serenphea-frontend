import StepperHeader from "./StepperHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import StepNavigation from "./StepNavigation";
import { usePropertyStore } from "../../store/PropertyStore";
import { useEffect } from "react";

export default function AddPropertyStepper() {
  const location = useLocation();
  const navigation = useNavigation();

  const steps = usePropertyStore((state) => state.steps);
  const currentStep = usePropertyStore((state) => state.currentStep);
  const setPath = usePropertyStore((state) => state.setPath);
  const currentAction = `${steps[currentStep].title.toLowerCase()}-property-form`;
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  useEffect(() => {
    setPath(location.pathname);
  }, [setPath, location.pathname]);

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

        <StepperHeader />
      </div>

      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      <StepNavigation typeAction={currentAction} isSubmitting={isSubmitting} />
    </div>
  );
}
