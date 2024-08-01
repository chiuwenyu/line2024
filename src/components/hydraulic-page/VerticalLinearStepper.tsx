import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Thermosyphon Circuit",
    description: `Select an appropriate configuration based on 
    the classification of the reboiler and circuit, and then provide 
    data based on the configuration.`,
  },
  {
    label: "Downcomer pipe data",
    description: `Enter Downcomer pipe’s physical property information and 
      related data.`,
  },
  {
    label: "Riser pipe data",
    description: `Enter Riser pipe’s physical property information 
    and related data`,
  },
  {
    label: "Circuit configuration",
    description: `Provide corresponding pipe layout height and 
    length data according to configuration type.`,
  },
  {
    label: "Done",
    description: `Enter project information, then click execute button to get the result.`,
  },
];

const VerticalLinearStepper = (props: any) => {
  const { activeStep, setActiveStep, onExecuteButtonClick } = props;

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      onExecuteButtonClick();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? "Execute" : "Continue"}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default VerticalLinearStepper;
