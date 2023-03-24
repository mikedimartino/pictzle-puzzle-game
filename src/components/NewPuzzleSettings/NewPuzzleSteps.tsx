import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import styled from 'styled-components';

import DifficultySelector from './DifficultySelector';
import useStartPuzzle from './hooks/useStartPuzzle';
import useValidateStep from './hooks/useValidateStep';
import ImageSelector from './ImageSelector';
import SettingsConfirmation from './SettingsConfirmation';

const Wrapper = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const StyledPaper = styled(Paper)`
  width: 700px;
  padding: 10px 20px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const StyledTitle = styled(Typography)`
  margin-bottom: 20px;
  margin-top: 10px;
`;

const StepFooter = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  align-self: flex-end;
`;

const stepLabels = ['Select an image', 'Select difficulty', 'Confirm settings'];

const NewPuzzleSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === stepLabels.length - 1;
  const { hasValidationErrors, validationErrors } = useValidateStep(activeStep);
  const startPuzzle = useStartPuzzle();

  const handleBackClick = () => {
    setActiveStep((value) => value - 1);
  };

  const handleNextClick = () => {
    if (isLastStep) {
      startPuzzle();
      return;
    }
    setActiveStep((value) => value + 1);
  };

  const nextButtonTooltipText = validationErrors?.join('. ') || '';

  const steps = stepLabels.map((label) => {
    return (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    );
  });

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ImageSelector />;
      case 1:
        return <DifficultySelector />;
      case 2:
        return <SettingsConfirmation />;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <StyledPaper>
        <StyledTitle variant="h4">Start a New Puzzle</StyledTitle>
        <Stepper activeStep={activeStep}>{steps}</Stepper>
        {renderStepContent()}
        <StepFooter>
          <Button onClick={handleBackClick} disabled={activeStep === 0}>
            Back
          </Button>
          <Tooltip title={nextButtonTooltipText} placement="top">
            <span>
              <Button onClick={handleNextClick} disabled={hasValidationErrors}>
                {isLastStep ? 'Start Puzzle' : 'Next'}
              </Button>
            </span>
          </Tooltip>
        </StepFooter>
      </StyledPaper>
    </Wrapper>
  );
};

export default NewPuzzleSteps;
