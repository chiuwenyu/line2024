import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import VerticalLinearStepper from "./VerticalLinearStepper";
import FileButton from "../single-page/FileButton";
import { useState } from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { StyledEngineProvider } from "@mui/material/styles";
import SelCircuitPage from "./SelCircuitPage";
import Downcomer1 from "./Downcomer1";
import Downcomer3 from "./Downcomer3";

const Thermo = () => {
  const [fileName, setFileName] = useState("");
  const [activeStep, setActiveStep] = useState(0); // track stepper progress step, 0 = step 1, 4 = step 5
  const [caseNo, setCaseNo] = useState(""); // track selected thermosyphon circuit case number; A~F

  const onNewButtonClick = () => {
    console.log("New button clicked");
  };
  const onOpenButtonClick = () => {
    console.log("Open button clicked");
  };
  const onSaveButtonClick = () => {
    console.log("Save button clicked");
  };
  const onSaveAsButtonClick = () => {
    console.log("Save As button clicked");
  };
  const onExportButtonClick = () => {
    console.log("Export button clicked");
  };

  const goNextStepbySelectCircuit = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  return (
    <>
      <Stack direction="row" spacing={1.5} marginBottom={"20px"}>
        <FileButton
          onNewButtonClick={onNewButtonClick}
          onOpenButtonClick={onOpenButtonClick}
          onSaveButtonClick={onSaveButtonClick}
          onSaveAsButtonClick={onSaveAsButtonClick}
          onExportButtonClick={onExportButtonClick}
        />
        {fileName !== "" && (
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            color={"primary.main"}
          >
            <FolderOpenIcon />
            <Typography variant="body2">{fileName}</Typography>
          </Stack>
        )}
      </Stack>
      <Stack direction="row" spacing={4}>
        <Grid item xs={4} sx={{ ml: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "medium" }}
          >
            Thermosyphon Hydraulic Check
          </Typography>
          <Box
            border={1}
            width={275}
            sx={{ borderColor: "grey.400", boxShadow: 3, padding: 2, mt: 3 }}
          >
            <Typography variant="h6" color="primary.main" sx={{ ml: 2, mb: 1 }}>
              {caseNo !== ""
                ? `Select Case ${caseNo}`
                : "Follow the steps below"}
            </Typography>
            <StyledEngineProvider injectFirst>
              <VerticalLinearStepper
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </StyledEngineProvider>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ width: "100%" }}>
          {activeStep === 0 && (
            <SelCircuitPage
              goNextStepbySelectCircuit={goNextStepbySelectCircuit}
              caseNo={caseNo}
              setCaseNo={setCaseNo}
            />
          )}
          {activeStep === 1 &&
            (caseNo === "D" || caseNo === "E" || caseNo === "F") && (
              <Downcomer1 />
            )}
          {activeStep === 1 &&
            (caseNo === "A" || caseNo === "B" || caseNo === "C") && (
              <Downcomer3 />
            )}
        </Grid>
      </Stack>
    </>
  );
};

export default Thermo;
