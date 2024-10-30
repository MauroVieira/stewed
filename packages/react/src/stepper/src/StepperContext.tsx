import { useContext, createContext } from "react";

interface Steps {
  /** The unique identifier or label for the step. */
  value: string;
}

export interface StepperContextProps {
  /** An optional array of steps, each containing a unique value. */
  steps?: Steps[];
  /** Specifies the currently selected step's value. */
  selectedValue?: string;
}

/**
 * Creates a Stepper  context with the specified generic type.
 *
 * This function initializes a context for managing Stepper within the application.
 * It provides default value and setters for Stepper-related operations.
 *
 * @returns A new Stepper context with the specified generic type.
 */
function createStepperContext() {
  return createContext<StepperContextProps>({
    steps: [],
    selectedValue: undefined,
  });
}

/**
 * Default context for managing Stepper.
 *
 * This context provides functionalities to manage Steppers across the application.
 * It includes default value and setters for Stepper-related operations.
 */
export const StepperContext = createStepperContext();

/**
 * Hook to conveniently use the Stepper context.
 *
 * @returns Stepper context value.
 */
export function useStepper() {
  return useContext(StepperContext);
}
