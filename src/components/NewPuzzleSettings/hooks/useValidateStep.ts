import { useContext } from 'react';

import { SettingsContext } from '../SettingsContext';

export type StepValidationResult = {
  hasValidationErrors: boolean;
  validationErrors?: string[];
};

const useValidateStep = (step: number): StepValidationResult => {
  const { imageSrc } = useContext(SettingsContext);
  const validationErrors: string[] = [];

  if (step === 0 && !imageSrc) {
    validationErrors.push('You must select an image before you can proceed');
  }

  return {
    hasValidationErrors: !!validationErrors.length,
    validationErrors,
  };
};

export default useValidateStep;
