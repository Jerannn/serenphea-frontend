import { useNavigate } from "react-router-dom";
import { usePropertyStore } from "../store/PropertyStore";

export default function usePropertyStepper() {
  const navigate = useNavigate();
  const paths = usePropertyStore((state) => state.paths);
  const prevStep = usePropertyStore((state) => state.prevStep);
  const navigateStep = usePropertyStore((state) => state.navigateStep);

  // this is for navigating manually to a specific step by clicking the step button
  const goToCurrentStep = () => {
    const currentStep = usePropertyStore.getState().currentStep;
    navigate(paths[currentStep], { replace: true });
  };

  // this is for navigating to the previous step using the back button
  const goToPreviousStep = () => {
    prevStep();
    goToCurrentStep();
  };

  const goToSpecificStep = (step: number) => {
    navigateStep(step);
    goToCurrentStep();
  };

  return { goToPreviousStep, goToSpecificStep };
}
