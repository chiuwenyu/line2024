import { Box, Grid, Stack, Typography } from "@mui/material";
import VerticalLinearStepper from "./VerticalLinearStepper";
import FileButton from "../single-page/FileButton";
import { useState } from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { StyledEngineProvider } from "@mui/material/styles";
import SelCircuitPage from "./SelCircuitPage";
import Downcomer1 from "./Downcomer1";
import Downcomer3 from "./Downcomer3";
import Riser1 from "./Riser1";
import RiserK from "./RiserK";
import Riser3 from "./Riser3";
import ConfigJ from "./ConfigJ";
import ConfigK from "./ConfigK";

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
  const [downELMain, setDownELMain] = useState(""); // Downcomer main pipe equivalent length excl. H [m]
  const [downSF, setDownSF] = useState(""); // Downcomer main pipe safety factor, [-]

  // Downcomer3 data
  const [downHD, setDownHD] = useState(""); // HD (Height from mainfold to reboiler) [m]
  const [downFlowRateMF, setDownFlowRateMF] = useState(""); // Downcomer total flow Rate for manifold [Kg/hr]
  const [downFlowRateLead, setDownFlowRateLead] = useState(""); // Downcomer total flow Rate for lead [Kg/hr]
  const [downIDMF, setDownIDMF] = useState(""); // Downcomer manifold pipe diameter [in]
  const [downIDLead, setDownIDLead] = useState(""); // Downcomer lead pipe diameter [in]
  const [downELMF, setDownELMF] = useState(""); // Downcomer manifold pipe equivalent length [m]
  const [downELLead, setDownELLead] = useState(""); // Downcomer lead pipe equivalent length [m]

  // Riser1 data
  const [riserWGMain, setRiserWGMain] = useState(""); // Riser main pipe vapor flow rate [Kg/hr]
  const [riserWLMain, setRiserWLMain] = useState(""); // Riser main pipe liquid flow rate [Kg/hr]
  const [riserVapDensity, setRiserVapDensity] = useState(""); // Riser vapor density [Kg/m^3]
  const [riserLiqDensity, setRiserLiqDensity] = useState(""); // Riser liquid density [Kg/m^3]
  const [riserVapVisc, setRiserVapVisc] = useState(""); // Riser vapor viscosity [cP]
  const [riserLiqVisc, setRiserLiqVisc] = useState(""); // Riser liquid viscosity [cP]
  const [riserIDMain, setRiserIDMain] = useState(""); // Riser main pipe diameter [in]
  const [riserRough, setRiserRough] = useState(""); // Riser main pipe absolute roughness [mm]
  const [riserELMain, setRiserELMain] = useState(""); // Riser main pipe equivalent length [m]
  const [riserSF, setRiserSF] = useState(""); // Riser main pipe safety factor [-]

  // Riser3 data
  const [riserHR, setRiserHR] = useState(""); // Height from reboiler to manifold [m]
  const [riserWGMF, setRiserWGMF] = useState(""); // Riser vapor flow rate for manifold [Kg/hr]
  const [riserWGLead, setRiserWGLead] = useState(""); // Riser vapor flow rate for lead [Kg/hr]
  const [riserWLMF, setRiserWLMF] = useState(""); // Riser liquid flow rate for manifold [Kg/hr]
  const [riserWLLead, setRiserWLLead] = useState(""); // Riser liquid flow rate for lead [Kg/hr]
  const [riserIDMF, setRiserIDMF] = useState(""); // Riser manifold pipe diameter [in]
  const [riserIDLead, setRiserIDLead] = useState(""); // Riser lead pipe diameter [in]
  const [riserELMF, setRiserELMF] = useState(""); // Riser manifold pipe equivalent length [m]
  const [riserELLead, setRiserELLead] = useState(""); // Riser lead pipe equivalent length [m]

  // Configure J data
  const [jDownOutNozzleSize, setJDownOutNozzleSize] = useState(""); // Tower downcomer outlet nozzle size [in]
  const [jRiserInNozzleSize, setJRiserInNozzleSize] = useState(""); // Tower riser inlet nozzle size [in]
  const [jReboInNozzleSize, setJReboInNozzleSize] = useState(""); // Reboiler inlet nozzle size [in]
  const [jReboOutNozzleSize, setJReboOutNozzleSize] = useState(""); // Reboiler outlet nozzle size [in]
  const [jReboDP, setJReboDP] = useState(""); // Reboiler Pressure Loss (Excl. Nozzle Loss) [Kg/cm^2]
  const [jT, setJT] = useState(""); // Tower T.L. to C.L. of the the Riser Entering Tower <T> [mm]
  const [jLC, setJLC] = useState(""); // Tower outlet nozzle higher than riser distance <LC> [mm]
  const [jL, setJL] = useState(""); // Tower baffle top lower than riser distance <L> [mm]
  const [jRD, setJRD] = useState(""); // Reboiler shell diameter [mm]
  const [jSF, setJSF] = useState(""); // Safety factor of riser E.L. of Homo. method [-]

  // Configure K data
  const [kDownOutNozzleSize, setKDownOutNozzleSize] = useState(""); // Tower downcomer outlet nozzle size [in]

  // 100 Error handling
  const [error101, setError101] = useState(false); // error number for downcomer total flow rate
  const [error102, setError102] = useState(false); // error number for downcomer fluid density
  const [error103, setError103] = useState(false); // error number for downcomer fluid viscosity
  const [error104, setError104] = useState(false); // error number for downcomer main pipe diameter
  const [error105, setError105] = useState(false); // error number for downcomer main pipe absolute roughness
  const [error106, setError106] = useState(false); // error number for downcomer main pipe equivalent length
  const [error107, setError107] = useState(false); // error number for downcomer main pipe safety factor
  const [error108, setError108] = useState(false); // error number for downcomer HD height from mainfold to reboiler
  const [error109, setError109] = useState(false); // error number for downcomer total flow rate for manifold
  const [error110, setError110] = useState(false); // error number for downcomer total flow rate for lead
  const [error111, setError111] = useState(false); // error number for downcomer manifold pipe diameter
  const [error112, setError112] = useState(false); // error number for downcomer lead pipe diameter
  const [error113, setError113] = useState(false); // error number for downcomer manifold pipe equivalent length
  const [error114, setError114] = useState(false); // error number for downcomer lead pipe equivalent length

  // 200 Error handling
  const [error201, setError201] = useState(false); // error number for riser main pipe vapor flow rate
  const [error202, setError202] = useState(false); // error number for riser main pipe liquid flow rate
  const [error203, setError203] = useState(false); // error number for riser vapor density
  const [error204, setError204] = useState(false); // error number for riser liquid density
  const [error205, setError205] = useState(false); // error number for riser vapor viscosity
  const [error206, setError206] = useState(false); // error number for riser liquid viscosity
  const [error207, setError207] = useState(false); // error number for riser main pipe diameter
  const [error208, setError208] = useState(false); // error number for riser main pipe absolute roughness
  const [error209, setError209] = useState(false); // error number for riser main pipe equivalent length
  const [error210, setError210] = useState(false); // error number for riser main pipe safety factor
  const [error211, setError211] = useState(false); // error number for riser height from reboiler to manifold
  const [error212, setError212] = useState(false); // error number for riser vapor flow rate for manifold
  const [error213, setError213] = useState(false); // error number for riser vapor flow rate for lead
  const [error214, setError214] = useState(false); // error number for riser liquid flow rate for manifold
  const [error215, setError215] = useState(false); // error number for riser liquid flow rate for lead
  const [error216, setError216] = useState(false); // error number for riser manifold pipe diameter
  const [error217, setError217] = useState(false); // error number for riser lead pipe diameter
  const [error218, setError218] = useState(false); // error number for riser manifold pipe equivalent length
  const [error219, setError219] = useState(false); // error number for riser lead pipe equivalent length

  // 300 Error handling
  const [error301, setError301] = useState(false); // error number for tower downcomer outlet nozzle size
  const [error302, setError302] = useState(false); // error number for tower riser inlet nozzle size
  const [error303, setError303] = useState(false); // error number for reboiler inlet nozzle size
  const [error304, setError304] = useState(false); // error number for reboiler outlet nozzle size
  const [error305, setError305] = useState(false); // error number for reboiler pressure loss
  const [error306, setError306] = useState(false); // error number for tower T.L. to C.L. of the the Riser Entering Tower <T>
  const [error307, setError307] = useState(false); // error number for tower outlet nozzle higher than riser distance <LC>
  const [error308, setError308] = useState(false); // error number for tower baffle top lower than riser distance <L>
  const [error309, setError309] = useState(false); // error number for reboiler shell diameter [mm]
  const [error310, setError310] = useState(false); // error number for safety factor of riser E.L. of homo method [-]

  // 400 Error handling
  const [error401, setError401] = useState(false); // error number for Tower downcomer outlet nozzle size

  const validateInput = (id: string, value: any) => {
    // 驗證輸入值是否為正的浮點數
    const isPositiveFloat = /^([0-9]*[.])?[0-9]+$/;

    // 100 is downcomer data input validation
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
    id === "106" && !isPositiveFloat.test(value) && value !== ""
      ? setError106(true)
      : setError106(false);
    id === "107" && !isPositiveFloat.test(value) && value !== ""
      ? setError107(true)
      : setError107(false);
    id === "108" && !isPositiveFloat.test(value) && value !== ""
      ? setError108(true)
      : setError108(false);
    id === "109" && !isPositiveFloat.test(value) && value !== ""
      ? setError109(true)
      : setError109(false);
    id === "110" && !isPositiveFloat.test(value) && value !== ""
      ? setError110(true)
      : setError110(false);
    id === "111" && !isPositiveFloat.test(value) && value !== ""
      ? setError111(true)
      : setError111(false);
    id === "112" && !isPositiveFloat.test(value) && value !== ""
      ? setError112(true)
      : setError112(false);
    id === "113" && !isPositiveFloat.test(value) && value !== ""
      ? setError113(true)
      : setError113(false);
    id === "114" && !isPositiveFloat.test(value) && value !== ""
      ? setError114(true)
      : setError114(false);

    // 200 is riser data input validation
    id === "201" && !isPositiveFloat.test(value) && value !== ""
      ? setError201(true)
      : setError201(false);
    id === "202" && !isPositiveFloat.test(value) && value !== ""
      ? setError202(true)
      : setError202(false);
    id === "203" && !isPositiveFloat.test(value) && value !== ""
      ? setError203(true)
      : setError203(false);
    id === "204" && !isPositiveFloat.test(value) && value !== ""
      ? setError204(true)
      : setError204(false);
    id === "205" && !isPositiveFloat.test(value) && value !== ""
      ? setError205(true)
      : setError205(false);
    id === "206" && !isPositiveFloat.test(value) && value !== ""
      ? setError206(true)
      : setError206(false);
    id === "207" && !isPositiveFloat.test(value) && value !== ""
      ? setError207(true)
      : setError207(false);
    id === "208" && !isPositiveFloat.test(value) && value !== ""
      ? setError208(true)
      : setError208(false);
    id === "209" && !isPositiveFloat.test(value) && value !== ""
      ? setError209(true)
      : setError209(false);
    id === "210" && !isPositiveFloat.test(value) && value !== ""
      ? setError210(true)
      : setError210(false);
    id === "211" && !isPositiveFloat.test(value) && value !== ""
      ? setError211(true)
      : setError211(false);
    id === "212" && !isPositiveFloat.test(value) && value !== ""
      ? setError212(true)
      : setError212(false);
    id === "213" && !isPositiveFloat.test(value) && value !== ""
      ? setError213(true)
      : setError213(false);
    id === "214" && !isPositiveFloat.test(value) && value !== ""
      ? setError214(true)
      : setError214(false);
    id === "215" && !isPositiveFloat.test(value) && value !== ""
      ? setError215(true)
      : setError215(false);
    id === "216" && !isPositiveFloat.test(value) && value !== ""
      ? setError216(true)
      : setError216(false);
    id === "217" && !isPositiveFloat.test(value) && value !== ""
      ? setError217(true)
      : setError217(false);
    id === "218" && !isPositiveFloat.test(value) && value !== ""
      ? setError218(true)
      : setError218(false);
    id === "219" && !isPositiveFloat.test(value) && value !== ""
      ? setError219(true)
      : setError219(false);

    // 300 is configure J data input validation
    id === "301" && !isPositiveFloat.test(value) && value !== ""
      ? setError301(true)
      : setError301(false);
    id === "302" && !isPositiveFloat.test(value) && value !== ""
      ? setError302(true)
      : setError302(false);
    id === "303" && !isPositiveFloat.test(value) && value !== ""
      ? setError303(true)
      : setError303(false);
    id === "304" && !isPositiveFloat.test(value) && value !== ""
      ? setError304(true)
      : setError304(false);
    id === "305" && !isPositiveFloat.test(value) && value !== ""
      ? setError305(true)
      : setError305(false);
    id === "306" && !isPositiveFloat.test(value) && value !== ""
      ? setError306(true)
      : setError306(false);
    id === "307" && !isPositiveFloat.test(value) && value !== ""
      ? setError307(true)
      : setError307(false);
    id === "308" && !isPositiveFloat.test(value) && value !== ""
      ? setError308(true)
      : setError308(false);
    id === "309" && !isPositiveFloat.test(value) && value !== ""
      ? setError309(true)
      : setError309(false);
    id === "310" && !isPositiveFloat.test(value) && value !== ""
      ? setError310(true)
      : setError310(false);

    // 400 is configure J data input validation
    id === "401" && !isPositiveFloat.test(value) && value !== ""
      ? setError401(true)
      : setError401(false);

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
          {/* Step 1 */}
          {activeStep === 1 &&
            (caseNo === "A" || caseNo === "B" || caseNo === "C") && (
              <Downcomer3
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
                downELMain={downELMain}
                setDownELMain={setDownELMain}
                downSF={downSF}
                setDownSF={setDownSF}
                downHD={downHD}
                setDownHD={setDownHD}
                downFlowRateMF={downFlowRateMF}
                setDownFlowRateMF={setDownFlowRateMF}
                downFlowRateLead={downFlowRateLead}
                setDownFlowRateLead={setDownFlowRateLead}
                downIDMF={downIDMF}
                setDownIDMF={setDownIDMF}
                downIDLead={downIDLead}
                setDownIDLead={setDownIDLead}
                downELMF={downELMF}
                setDownELMF={setDownELMF}
                downELLead={downELLead}
                setDownELLead={setDownELLead}
                validateInput={validateInput}
                error101={error101}
                error102={error102}
                error103={error103}
                error104={error104}
                error105={error105}
                error106={error106}
                error107={error107}
                error108={error108}
                error109={error109}
                error110={error110}
                error111={error111}
                error112={error112}
                error113={error113}
                error114={error114}
              />
            )}
          {activeStep === 1 &&
            (caseNo === "D" ||
              caseNo === "E" ||
              caseNo === "F" ||
              caseNo === "G") && (
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
                downELMain={downELMain}
                setDownELMain={setDownELMain}
                downSF={downSF}
                setDownSF={setDownSF}
                validateInput={validateInput}
                error101={error101}
                error102={error102}
                error103={error103}
                error104={error104}
                error105={error105}
                error106={error106}
                error107={error107}
              />
            )}

          {/* Step 2 */}
          {activeStep === 2 &&
            (caseNo === "A" || caseNo === "B" || caseNo === "C") && (
              <Riser3
                riserWGMain={riserWGMain}
                setRiserWGMain={setRiserWGMain}
                riserWLMain={riserWLMain}
                setRiserWLMain={setRiserWLMain}
                riserVapDensity={riserVapDensity}
                setRiserVapDensity={setRiserVapDensity}
                riserLiqDensity={riserLiqDensity}
                setRiserLiqDensity={setRiserLiqDensity}
                riserVapVisc={riserVapVisc}
                setRiserVapVisc={setRiserVapVisc}
                riserLiqVisc={riserLiqVisc}
                setRiserLiqVisc={setRiserLiqVisc}
                riserIDMain={riserIDMain}
                setRiserIDMain={setRiserIDMain}
                riserRough={riserRough}
                setRiserRough={setRiserRough}
                riserELMain={riserELMain}
                setRiserELMain={setRiserELMain}
                riserSF={riserSF}
                setRiserSF={setRiserSF}
                riserHR={riserHR}
                setRiserHR={setRiserHR}
                riserWGMF={riserWGMF}
                setRiserWGMF={setRiserWGMF}
                riserWGLead={riserWGLead}
                setRiserWGLead={setRiserWGLead}
                riserWLMF={riserWLMF}
                setRiserWLMF={setRiserWLMF}
                riserWLLead={riserWLLead}
                setRiserWLLead={setRiserWLLead}
                riserIDMF={riserIDMF}
                setRiserIDMF={setRiserIDMF}
                riserIDLead={riserIDLead}
                setRiserIDLead={setRiserIDLead}
                riserELMF={riserELMF}
                setRiserELMF={setRiserELMF}
                riserELLead={riserELLead}
                setRiserELLead={setRiserELLead}
                validateInput={validateInput}
                error201={error201}
                error202={error202}
                error203={error203}
                error204={error204}
                error205={error205}
                error206={error206}
                error207={error207}
                error208={error208}
                error209={error209}
                error210={error210}
                error211={error211}
                error212={error212}
                error213={error213}
                error214={error214}
                error215={error215}
                error216={error216}
                error217={error217}
                error218={error218}
                error219={error219}
              />
            )}
          {activeStep === 2 && caseNo === "D" && (
            <RiserK
              riserWGMain={riserWGMain}
              setRiserWGMain={setRiserWGMain}
              riserVapDensity={riserVapDensity}
              setRiserVapDensity={setRiserVapDensity}
              riserVapVisc={riserVapVisc}
              setRiserVapVisc={setRiserVapVisc}
              riserIDMain={riserIDMain}
              setRiserIDMain={setRiserIDMain}
              riserRough={riserRough}
              setRiserRough={setRiserRough}
              riserELMain={riserELMain}
              setRiserELMain={setRiserELMain}
              riserSF={riserSF}
              setRiserSF={setRiserSF}
              validateInput={validateInput}
              error201={error201}
              error203={error203}
              error205={error205}
              error207={error207}
              error208={error208}
              error209={error209}
              error210={error210}
            />
          )}
          {activeStep === 2 &&
            (caseNo === "E" || caseNo === "F" || caseNo === "G") && (
              <Riser1
                riserWGMain={riserWGMain}
                setRiserWGMain={setRiserWGMain}
                riserWLMain={riserWLMain}
                setRiserWLMain={setRiserWLMain}
                riserVapDensity={riserVapDensity}
                setRiserVapDensity={setRiserVapDensity}
                riserLiqDensity={riserLiqDensity}
                setRiserLiqDensity={setRiserLiqDensity}
                riserVapVisc={riserVapVisc}
                setRiserVapVisc={setRiserVapVisc}
                riserLiqVisc={riserLiqVisc}
                setRiserLiqVisc={setRiserLiqVisc}
                riserIDMain={riserIDMain}
                setRiserIDMain={setRiserIDMain}
                riserRough={riserRough}
                setRiserRough={setRiserRough}
                riserELMain={riserELMain}
                setRiserELMain={setRiserELMain}
                riserSF={riserSF}
                setRiserSF={setRiserSF}
                validateInput={validateInput}
                error201={error201}
                error202={error202}
                error203={error203}
                error204={error204}
                error205={error205}
                error206={error206}
                error207={error207}
                error208={error208}
                error209={error209}
                error210={error210}
              />
            )}

          {/* Step 3 */}
          {activeStep === 3 &&
            (caseNo === "A" || caseNo === "B" || caseNo === "C") && (
              <ConfigJ
                caseNo={caseNo}
                jDownOutNozzleSize={jDownOutNozzleSize}
                setJDownOutNozzleSize={setJDownOutNozzleSize}
                jRiserInNozzleSize={jRiserInNozzleSize}
                setJRiserInNozzleSize={setJRiserInNozzleSize}
                jReboInNozzleSize={jReboInNozzleSize}
                setJReboInNozzleSize={setJReboInNozzleSize}
                jReboOutNozzleSize={jReboOutNozzleSize}
                setJReboOutNozzleSize={setJReboOutNozzleSize}
                jReboDP={jReboDP}
                setJReboDP={setJReboDP}
                jT={jT}
                setJT={setJT}
                jLC={jLC}
                setJLC={setJLC}
                jL={jL}
                setJL={setJL}
                jRD={jRD}
                setJRD={setJRD}
                jSF={jSF}
                setJSF={setJSF}
                validateInput={validateInput}
                error301={error301}
                error302={error302}
                error303={error303}
                error304={error304}
                error305={error305}
                error306={error306}
                error307={error307}
                error308={error308}
                error309={error309}
                error310={error310}
              />
            )}
          {activeStep === 3 && caseNo === "D" && (
            <ConfigK
              kDownOutNozzleSize={kDownOutNozzleSize}
              setKDownOutNozzleSize={setKDownOutNozzleSize}
              validateInput={validateInput}
              error401={error401}
            />
          )}
        </Grid>
      </Stack>
    </>
  );
};

export default Thermo;
