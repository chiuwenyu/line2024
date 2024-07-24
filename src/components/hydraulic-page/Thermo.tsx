import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import VerticalLinearStepper from "./VerticalLinearStepper";
import FileButton from "../single-page/FileButton";
import { useState } from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { StyledEngineProvider } from "@mui/material/styles";

const Thermo = () => {
  const [fileName, setFileName] = useState("");
  const [activeStep, setActiveStep] = useState(0);

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
      <Grid>
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
          <Typography sx={{ mb: 3 }}>WORKING PROCEDURE :</Typography>
          <StyledEngineProvider injectFirst>
            <VerticalLinearStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </StyledEngineProvider>
        </Box>
      </Grid>
    </>
  );
};

export default Thermo;
