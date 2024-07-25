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
  const [calState, setCalState] = useState(false);

  // DownComer1 data
  const [downFlowRateMain, setDownFlowRateMain] = useState(""); // Downcomer total flow Rate [Kg/hr]
  const [downDensity, setDownDensity] = useState(""); // Downcomer fluid density [Kg/m^3]
  const [downVisc, setDownVisc] = useState(""); // Downcimer fluid viscosity [cP]
  const [downIDMain, setDownIDMain] = useState(""); // Downcomer main pipe diameter [in]
  const [downRough, setDownRough] = useState(""); // Downcomer main pipe absolute roughness [mm]

  // Error handling
  const [error101, setError101] = useState(false); // error number for downcomer total flow rate
  const [error102, setError102] = useState(false); // error number for downcomer fluid density
  const [error103, setError103] = useState(false); // error number for downcomer fluid viscosity
  const [error104, setError104] = useState(false); // error number for downcomer main pipe diameter
  const [error105, setError105] = useState(false); // error number for downcomer main pipe absolute roughness

  const validateInput = (id: string, value: any) => {
    // 驗證輸入值是否為正的浮點數
    const isPositiveFloat = /^([0-9]*[.])?[0-9]+$/;

    // 101~ 108 is process data input validation
    id === "101" && !isPositiveFloat.test(value) && value !== ""
      ? setError101(true)
      : setError101(false);
    id === "102" && !isPositiveFloat.test(value) && value !== ""
      ? setError102(true)
      : setError102(false);
    id === "103" && !isPositiveFloat.test(value) && value !== ""
      ? setError103(true)
      : setError103(false);
    id === "104" && !isPositiveFloat.test(value) && value !== ""
      ? setError104(true)
      : setError104(false);
    id === "105" && !isPositiveFloat.test(value) && value !== ""
      ? setError105(true)
      : setError105(false);

    setCalState(false);
  };

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
              <Downcomer1
                downFlowRateMain={downFlowRateMain}
                setDownFlowRateMain={setDownFlowRateMain}
                downDensity={downDensity}
                setDownDensity={setDownDensity}
                downVisc={downVisc}
                setDownVisc={setDownVisc}
                downIDMain={downIDMain}
                setDownIDMain={setDownIDMain}
                downRough={downRough}
                setDownRough={setDownRough}
                validateInput={validateInput}
                error101={error101}
                error102={error102}
                error103={error103}
                error104={error104}
                error105={error105}
              />
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
