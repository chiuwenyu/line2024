import { invoke } from "@tauri-apps/api/tauri";

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
import ConfigE from "./ConfigE";
import { dialog } from "@tauri-apps/api";
import { writeTextFile, readTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import Thermoproject from "./Thermoproject";
import { parseFloatWithErrorHandling } from "../utils/utility";
import { Result } from "../single-page/SingleDataType";

export interface ThermoResult {
  id: number;
  title: string;
  value: string;
}

const Thermo = () => {
  const [fileName, setFileName] = useState("");
  const [activeStep, setActiveStep] = useState(0); // track stepper progress step, 0 = step 1, 4 = step 5
  const [caseNo, setCaseNo] = useState(""); // track selected thermosyphon circuit case number; A~F
  const [calState, setCalState] = useState(false);

  // Project data
  const [projNo, setProjNo] = useState(""); // Project number
  const [projName, setProjName] = useState(""); // Project name
  const [projDesc, setProjDesc] = useState(""); // Project description

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
  const [kRiserInNozzleSize, setKRiserInNozzleSize] = useState(""); // Tower riser inlet nozzle size [in]
  const [kReboInNozzleSize, setKReboInNozzleSize] = useState(""); // Reboiler inlet nozzle Size [in]
  const [kReboOutNozzleSize, setKReboOutNozzleSize] = useState(""); // Reboiler outlet nozzle size [in]
  const [kReboDP, setKReboDP] = useState(""); // Reboiler pressure loss (excl. nozzle loss) [Kg/cm^2]
  const [kT, setKT] = useState(""); // Tower T.L to C.L of the riser entering tower <T> [mm]
  const [kHV, setKHV] = useState(""); // Reboiler vapor space height (kettle) <HV> [mm]
  const [kSF, setKSF] = useState(""); // Safety factor of riser E.L of home method [-]

  // Configure E data
  const [eDownOutNozzleSize, setEDownOutNozzleSize] = useState(""); // Tower downcomer outlet nozzle size [in]
  const [eRiserInNozzleSize, setERiserInNozzleSize] = useState(""); // Tower riser inlet nozzle size [in]
  const [eReboInNozzleSize, setEReboInNozzleSize] = useState(""); // Reboiler inlet nozzle size [in]
  const [eReboOutNozzleSize, setEReboOutNozzleSize] = useState(""); // Reboiler outlet nozzle size [in]
  const [eReboDP, setEReboDP] = useState(""); // Reboiler pressure loss (excl. nozzle loss) [Kg/cm^2]
  const [eT, setET] = useState(""); // Tower T.L to C.L of the riser entering tower <T> [mm]
  const [eL, setEL] = useState(""); // Tower baffle top lower than riser distance <L> [mm]
  const [eLC, setELC] = useState(""); // Tower outlet nozzle higher than riser distance <LC> [mm]
  const [eE, setEE] = useState(""); // Reboiler Tube Length (Vertical) <E> [mm]
  const [eBD, setEBD] = useState(""); // Tube Length Submerge with Liquid (Vertical) <BD> [mm]
  const [eSF, setESF] = useState(""); // Safety Factor of Riser E.L of Homo method

  // Calculate Result
  const [homeResData, setHomeResData] = useState<ThermoResult[]>([]);
  const [dukResData, setDukResData] = useState<ThermoResult[]>([]);

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
  const [error402, setError402] = useState(false); // error number for tower riser inlet nozzle size
  const [error403, setError403] = useState(false); // error number for reboiler inlet nozzle size
  const [error404, setError404] = useState(false); // error number for rerboiler outlet nozzle size
  const [error405, setError405] = useState(false); // error number for reboiler pressure loss (excl. nozzle loss)
  const [error406, setError406] = useState(false); // error number for tower T.L to C.L of the riser entering tower <T>
  const [error407, setError407] = useState(false); // error number for reboiler vapor space height (kettle) <HV>
  const [error408, setError408] = useState(false); // Safety factor of riser E.L of home method

  // 500 Error handling
  const [error501, setError501] = useState(false); // error number for Tower downcomer outlet nozzle size
  const [error502, setError502] = useState(false); // error number for tower riser inlet nozzle size
  const [error503, setError503] = useState(false); // error number for reboiler inlet nozzle size
  const [error504, setError504] = useState(false); // error number for reboiler outlet nozzle size
  const [error505, setError505] = useState(false); // error number for reboiler pressure loss (excl. nozzle loss)
  const [error506, setError506] = useState(false); // error number for tower T.L to C.L of the riser entering tower <T>
  const [error507, setError507] = useState(false); // error number for tower baffle top lower than riser distance <L>
  const [error508, setError508] = useState(false); // error number for tower outlet nozzle higher than riser distance <LC>
  const [error509, setError509] = useState(false); // error number for reboiler tube length (vertical) <E>
  const [error510, setError510] = useState(false); // error number for tube length submerge with liquid (vertical) <BD>
  const [error511, setError511] = useState(false); // error number for safety factor of riser E.L of Home method

  const validateInput = (id: string, value: any) => {
    // 驗證輸入值是否為正的浮點數
    const isPositiveFloat = /^([0-9]*[.])?[0-9]+$/;

    if (id.charAt(0) === "1") {
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
    } else if (id.charAt(0) === "2") {
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
    } else if (id.charAt(0) === "3") {
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
    } else if (id.charAt(0) === "4") {
      // 400 is configure J data input validation
      id === "401" && !isPositiveFloat.test(value) && value !== ""
        ? setError401(true)
        : setError401(false);
      id === "402" && !isPositiveFloat.test(value) && value !== ""
        ? setError402(true)
        : setError402(false);
      id === "403" && !isPositiveFloat.test(value) && value !== ""
        ? setError403(true)
        : setError403(false);
      id === "404" && !isPositiveFloat.test(value) && value !== ""
        ? setError404(true)
        : setError404(false);
      id === "405" && !isPositiveFloat.test(value) && value !== ""
        ? setError405(true)
        : setError405(false);
      id === "406" && !isPositiveFloat.test(value) && value !== ""
        ? setError406(true)
        : setError406(false);
      id === "407" && !isPositiveFloat.test(value) && value !== ""
        ? setError407(true)
        : setError407(false);
      id === "408" && !isPositiveFloat.test(value) && value !== ""
        ? setError408(true)
        : setError408(false);
    } else if (id.charAt(0) === "5") {
      id === "501" && !isPositiveFloat.test(value) && value !== ""
        ? setError501(true)
        : setError501(false);
      id === "502" && !isPositiveFloat.test(value) && value !== ""
        ? setError502(true)
        : setError502(false);
      id === "503" && !isPositiveFloat.test(value) && value !== ""
        ? setError503(true)
        : setError503(false);
      id === "504" && !isPositiveFloat.test(value) && value !== ""
        ? setError504(true)
        : setError504(false);
      id === "505" && !isPositiveFloat.test(value) && value !== ""
        ? setError505(true)
        : setError505(false);
      id === "506" && !isPositiveFloat.test(value) && value !== ""
        ? setError506(true)
        : setError506(false);
      id === "507" && !isPositiveFloat.test(value) && value !== ""
        ? setError507(true)
        : setError507(false);
      id === "508" && !isPositiveFloat.test(value) && value !== ""
        ? setError508(true)
        : setError508(false);
      id === "509" && !isPositiveFloat.test(value) && value !== ""
        ? setError509(true)
        : setError509(false);
      id === "510" && !isPositiveFloat.test(value) && value !== ""
        ? setError510(true)
        : setError510(false);
      id === "511" && !isPositiveFloat.test(value) && value !== ""
        ? setError511(true)
        : setError511(false);
    } else {
      console.log("Error: Invalid input ID");
    }

    setCalState(false);
  };

  const onNewButtonClick = () => {
    // clear Misc. data
    setFileName("");
    setActiveStep(0);
    setCaseNo("");
    setCalState(false);
    // clear Project data
    setProjNo("");
    setProjName("");
    setProjDesc("");
    // clear Downcomer1 data
    setDownFlowRateMain("");
    setDownDensity("");
    setDownVisc("");
    setDownIDMain("");
    setDownRough("");
    setDownELMain("");
    setDownSF("");
    // clear Downcomer3 data
    setDownHD("");
    setDownFlowRateMF("");
    setDownFlowRateLead("");
    setDownIDMF("");
    setDownIDLead("");
    setDownELMF("");
    setDownELLead("");
    // clear Riser1 data
    setRiserWGMain("");
    setRiserWLMain("");
    setRiserVapDensity("");
    setRiserLiqDensity("");
    setRiserVapVisc("");
    setRiserLiqVisc("");
    setRiserIDMain("");
    setRiserRough("");
    setRiserELMain("");
    setRiserSF("");
    // clear Riser3 data
    setRiserHR("");
    setRiserWGMF("");
    setRiserWGLead("");
    setRiserWLMF("");
    setRiserWLLead("");
    setRiserIDMF("");
    setRiserIDLead("");
    setRiserELMF("");
    setRiserELLead("");
    // clear ConfigJ data
    setJDownOutNozzleSize("");
    setJRiserInNozzleSize("");
    setJReboInNozzleSize("");
    setJReboOutNozzleSize("");
    setJReboDP("");
    setJT("");
    setJLC("");
    setJL("");
    setJRD("");
    setJSF("");
    // clear ConfigK data
    setKDownOutNozzleSize("");
    setKRiserInNozzleSize("");
    setKReboInNozzleSize("");
    setKReboOutNozzleSize("");
    setKReboDP("");
    setKT("");
    setKHV("");
    setKSF("");
    // clear ConfigE data
    setEDownOutNozzleSize("");
    setERiserInNozzleSize("");
    setEReboInNozzleSize("");
    setEReboOutNozzleSize("");
    setEReboDP("");
    setET("");
    setEL("");
    setELC("");
    setEE("");
    setEBD("");
    setESF("");
  };

  const onOpenButtonClick = async () => {
    dialog
      .open({
        filters: [{ name: "Thermosyphon Files", extensions: ["tms"] }], // 檔案類型過濾器
        title: "Open File",
      })
      .then(async (result) => {
        if (result !== null) {
          setFileName(result as string);
          await readTextFile(result as string, {
            dir: BaseDirectory.AppConfig,
          }).then((data) => {
            const jsonData = data as string;
            const objData = JSON.parse(jsonData);

            // Read Misc.
            setCaseNo(objData.caseNo);
            // Read Project data
            setProjNo(objData.projNo);
            setProjName(objData.projName);
            setProjDesc(projDesc);
            if (
              objData.caseNo === "A" ||
              objData.caseNo === "B" ||
              objData.caseNo === "C"
            ) {
              // read Downcomer1 data
              setDownFlowRateMain(objData.downFlowRateMain);
              setDownDensity(objData.downDensity);
              setDownVisc(objData.downVisc);
              setDownIDMain(objData.downIDMain);
              setDownRough(objData.downRough);
              setDownELMain(objData.downELMain);
              setDownSF(objData.downSF);
              // read Downcomer3 data
              setDownHD(objData.downHD);
              setDownFlowRateMF(objData.downFlowRateMF);
              setDownFlowRateLead(objData.downFlowRateLead);
              setDownIDMF(objData.downIDMF);
              setDownIDLead(objData.downIDLead);
              setDownELMF(objData.downELMF);
              setDownELLead(objData.downELLead);
              // read Riser1 data
              setRiserWGMain(objData.riserWGMain);
              setRiserWLMain(objData.riserWLMain);
              setRiserVapDensity(objData.riserVapDensity);
              setRiserLiqDensity(objData.riserLiqDensity);
              setRiserVapVisc(objData.riserVapVisc);
              setRiserLiqVisc(objData.riserLiqVisc);
              setRiserIDMain(objData.riserIDMain);
              setRiserRough(objData.riserRough);
              setRiserELMain(objData.riserELMain);
              setRiserSF(objData.riserSF);
              // read Riser3 data
              setRiserHR(objData.riserHR);
              setRiserWGMF(objData.riserWGMF);
              setRiserWGLead(objData.riserWGLead);
              setRiserWLMF(objData.riserWLMF);
              setRiserWLLead(objData.riserWLLead);
              setRiserIDMF(objData.riserIDMF);
              setRiserIDLead(objData.riserIDLead);
              setRiserELMF(objData.riserELMF);
              setRiserELLead(objData.riserELLead);
              // read Config j data
              setJDownOutNozzleSize(objData.jDownOutNozzleSize);
              setJRiserInNozzleSize(objData.jRiserInNozzleSize);
              setJReboInNozzleSize(objData.jReboInNozzleSize);
              setJReboOutNozzleSize(objData.jReboOutNozzleSize);
              setJReboDP(objData.jReboDP);
              setJT(objData.jT);
              setJLC(objData.jLC);
              setJL(objData.jL);
              setJRD(objData.jRD);
              setJSF(objData.jSF);
            } else if (objData.caseNo === "D") {
              // read Downcomer1 data
              setDownFlowRateMain(objData.downFlowRateMain);
              setDownDensity(objData.downDensity);
              setDownVisc(objData.downVisc);
              setDownIDMain(objData.downIDMain);
              setDownRough(objData.downRough);
              setDownELMain(objData.downELMain);
              setDownSF(objData.downSF);
              // read Riser1 data
              setRiserWGMain(objData.riserWGMain);
              setRiserWLMain(objData.riserWLMain);
              setRiserVapDensity(objData.riserVapDensity);
              setRiserLiqDensity(objData.riserLiqDensity);
              setRiserVapVisc(objData.riserVapVisc);
              setRiserLiqVisc(objData.riserLiqVisc);
              setRiserIDMain(objData.riserIDMain);
              setRiserRough(objData.riserRough);
              setRiserELMain(objData.riserELMain);
              setRiserSF(objData.riserSF);
              // read Config K data
              setKDownOutNozzleSize(objData.kDownOutNozzleSize);
              setKRiserInNozzleSize(objData.kRiserInNozzleSize);
              setKReboInNozzleSize(objData.kReboInNozzleSize);
              setKReboOutNozzleSize(objData.kReboOutNozzleSize);
              setKReboDP(objData.kReboDP);
              setKT(objData.kT);
              setKHV(objData.kHV);
              setKSF(objData.kSF);
            } else if (
              objData.caseNo === "E" ||
              objData.caseNo === "F" ||
              objData.caseNo === "G"
            ) {
              // read Downcomer1 data
              setDownFlowRateMain(objData.downFlowRateMain);
              setDownDensity(objData.downDensity);
              setDownVisc(objData.downVisc);
              setDownIDMain(objData.downIDMain);
              setDownRough(objData.downRough);
              setDownELMain(objData.downELMain);
              setDownSF(objData.downSF);
              // read Riser1 data
              setRiserWGMain(objData.riserWGMain);
              setRiserWLMain(objData.riserWLMain);
              setRiserVapDensity(objData.riserVapDensity);
              setRiserLiqDensity(objData.riserLiqDensity);
              setRiserVapVisc(objData.riserVapVisc);
              setRiserLiqVisc(objData.riserLiqVisc);
              setRiserIDMain(objData.riserIDMain);
              setRiserRough(objData.riserRough);
              setRiserELMain(objData.riserELMain);
              setRiserSF(objData.riserSF);
              // read Config E data
              setEDownOutNozzleSize(objData.eDownOutNozzleSize);
              setERiserInNozzleSize(objData.eRiserInNozzleSize);
              setEReboInNozzleSize(objData.eReboInNozzleSize);
              setEReboOutNozzleSize(objData.eReboOutNozzleSize);
              setEReboDP(objData.eReboDP);
              setET(objData.eT);
              setEL(objData.eL);
              setELC(objData.eLC);
              setEE(objData.eE);
              setEBD(objData.eBD);
              setESF(objData.eSF);
            }
          });
        } else {
          console.log("Cancelled by user.");
        }
      })
      .catch((error) => {
        console.error("Error reading data:", error.message);
      });
  };
  const onSaveButtonClick = async () => {
    if (fileName !== "") {
      try {
        let data: any;

        if (caseNo === "A" || caseNo === "B" || caseNo === "C") {
          data = {
            // Misc.
            caseNo: caseNo,
            // Project data
            projNo: projNo,
            projName: projName,
            projDesc: projDesc,
            // Downcomer1 data
            downFlowRateMain: downFlowRateMain,
            downDensity: downDensity,
            downVisc: downVisc,
            downIDMain: downIDMain,
            downRough: downRough,
            downELMain: downELMain,
            downSF: downSF,
            // Downcomer3 data
            downHD: downHD,
            downFlowRateMF: downFlowRateMF,
            downFlowRateLead: downFlowRateLead,
            downIDMF: downIDMF,
            downIDLead: downIDLead,
            downELMF: downELMF,
            downELLead: downELLead,
            // Riser1 data
            riserWGMain: riserWGMain,
            riserWLMain: riserWLMain,
            riserVapDensity: riserVapDensity,
            riserLiqDensity: riserLiqDensity,
            riserVapVisc: riserVapVisc,
            riserLiqVisc: riserLiqVisc,
            riserIDMain: riserIDMain,
            riserRough: riserRough,
            riserELMain: riserELMain,
            riserSF: riserSF,
            // Riser3 data
            riserHR: riserHR,
            riserWGMF: riserWGMF,
            riserWGLead: riserWGLead,
            riserWLMF: riserWLMF,
            riserWLLead: riserWLLead,
            riserIDMF: riserIDMF,
            riserIDLead: riserIDLead,
            riserELMF: riserELMF,
            riserELLead: riserELLead,
            // ConfigJ data
            jDownOutNozzleSize: jDownOutNozzleSize,
            jRiserInNozzleSize: jRiserInNozzleSize,
            jReboInNozzleSize: jReboInNozzleSize,
            jReboOutNozzleSize: jReboOutNozzleSize,
            jReboDP: jReboDP,
            jT: jT,
            jLC: jLC,
            jL: jL,
            jRD: jRD,
            jSF: jSF,
          };
        } else if (caseNo === "D") {
          data = {
            // Misc.
            caseNo: caseNo,
            // Project data
            projNo: projNo,
            projName: projName,
            projDesc: projDesc,
            // Downcomer1 data
            downFlowRateMain: downFlowRateMain,
            downDensity: downDensity,
            downVisc: downVisc,
            downIDMain: downIDMain,
            downRough: downRough,
            downELMain: downELMain,
            downSF: downSF,
            // Riser1 data
            riserWGMain: riserWGMain,
            riserWLMain: riserWLMain,
            riserVapDensity: riserVapDensity,
            riserLiqDensity: riserLiqDensity,
            riserVapVisc: riserVapVisc,
            riserLiqVisc: riserLiqVisc,
            riserIDMain: riserIDMain,
            riserRough: riserRough,
            riserELMain: riserELMain,
            riserSF: riserSF,
            // ConfigK data
            kDownOutNozzleSize: kDownOutNozzleSize,
            kRiserInNozzleSize: kRiserInNozzleSize,
            kReboInNozzleSize: kReboInNozzleSize,
            kReboOutNozzleSize: kReboOutNozzleSize,
            kReboDP: kReboDP,
            kT: kT,
            kHV: kHV,
            kSF: kSF,
          };
        } else if (caseNo === "E" || caseNo === "F" || caseNo === "G") {
          data = {
            // Misc.
            caseNo: caseNo,
            // Project data
            projNo: projNo,
            projName: projName,
            projDesc: projDesc,
            // Downcomer1 data
            downFlowRateMain: downFlowRateMain,
            downDensity: downDensity,
            downVisc: downVisc,
            downIDMain: downIDMain,
            downRough: downRough,
            downELMain: downELMain,
            downSF: downSF,
            // Riser1 data
            riserWGMain: riserWGMain,
            riserWLMain: riserWLMain,
            riserVapDensity: riserVapDensity,
            riserLiqDensity: riserLiqDensity,
            riserVapVisc: riserVapVisc,
            riserLiqVisc: riserLiqVisc,
            riserIDMain: riserIDMain,
            riserRough: riserRough,
            riserELMain: riserELMain,
            riserSF: riserSF,
            // ConfigE data
            eDownOutNozzleSize: eDownOutNozzleSize,
            eRiserInNozzleSize: eRiserInNozzleSize,
            eReboInNozzleSize: eReboInNozzleSize,
            eReboOutNozzleSize: eReboOutNozzleSize,
            eReboDP: eReboDP,
            eT: eT,
            eL: eL,
            eLC: eLC,
            eE: eE,
            eBD: eBD,
            eSF: eSF,
          };
        }
        const jsonData = JSON.stringify(data);
        const filePath = fileName;
        setFileName(filePath);
        await writeTextFile(filePath, jsonData, {
          dir: BaseDirectory.AppConfig,
        });
      } catch (error: any) {
        console.error("Error saving data:", error.message);
      }
    } else {
      onSaveAsButtonClick();
    }
  };
  const onSaveAsButtonClick = async () => {
    dialog
      .save({
        defaultPath: "thermodata1.tms", // 預設檔案名稱
        filters: [{ name: "Thermosyphon Files", extensions: ["tms"] }], // 檔案類型過濾器
        title: "Save File As",
      })
      .then(async (result) => {
        let data: any;
        if (result !== null) {
          if (caseNo === "A" || caseNo === "B" || caseNo === "C") {
            data = {
              // Misc.
              caseNo: caseNo,
              // Project data
              projNo: projNo,
              projName: projName,
              projDesc: projDesc,
              // Downcomer1 data
              downFlowRateMain: downFlowRateMain,
              downDensity: downDensity,
              downVisc: downVisc,
              downIDMain: downIDMain,
              downRough: downRough,
              downELMain: downELMain,
              downSF: downSF,
              // Downcomer3 data
              downHD: downHD,
              downFlowRateMF: downFlowRateMF,
              downFlowRateLead: downFlowRateLead,
              downIDMF: downIDMF,
              downIDLead: downIDLead,
              downELMF: downELMF,
              downELLead: downELLead,
              // Riser1 data
              riserWGMain: riserWGMain,
              riserWLMain: riserWLMain,
              riserVapDensity: riserVapDensity,
              riserLiqDensity: riserLiqDensity,
              riserVapVisc: riserVapVisc,
              riserLiqVisc: riserLiqVisc,
              riserIDMain: riserIDMain,
              riserRough: riserRough,
              riserELMain: riserELMain,
              riserSF: riserSF,
              // Riser3 data
              riserHR: riserHR,
              riserWGMF: riserWGMF,
              riserWGLead: riserWGLead,
              riserWLMF: riserWLMF,
              riserWLLead: riserWLLead,
              riserIDMF: riserIDMF,
              riserIDLead: riserIDLead,
              riserELMF: riserELMF,
              riserELLead: riserELLead,
              // ConfigJ data
              jDownOutNozzleSize: jDownOutNozzleSize,
              jRiserInNozzleSize: jRiserInNozzleSize,
              jReboInNozzleSize: jReboInNozzleSize,
              jReboOutNozzleSize: jReboOutNozzleSize,
              jReboDP: jReboDP,
              jT: jT,
              jLC: jLC,
              jL: jL,
              jRD: jRD,
              jSF: jSF,
            };
          } else if (caseNo === "D") {
            data = {
              // Misc.
              caseNo: caseNo,
              // Project data
              projNo: projNo,
              projName: projName,
              projDesc: projDesc,
              // Downcomer1 data
              downFlowRateMain: downFlowRateMain,
              downDensity: downDensity,
              downVisc: downVisc,
              downIDMain: downIDMain,
              downRough: downRough,
              downELMain: downELMain,
              downSF: downSF,
              // Riser1 data
              riserWGMain: riserWGMain,
              riserWLMain: riserWLMain,
              riserVapDensity: riserVapDensity,
              riserLiqDensity: riserLiqDensity,
              riserVapVisc: riserVapVisc,
              riserLiqVisc: riserLiqVisc,
              riserIDMain: riserIDMain,
              riserRough: riserRough,
              riserELMain: riserELMain,
              riserSF: riserSF,
              // ConfigK data
              kDownOutNozzleSize: kDownOutNozzleSize,
              kRiserInNozzleSize: kRiserInNozzleSize,
              kReboInNozzleSize: kReboInNozzleSize,
              kReboOutNozzleSize: kReboOutNozzleSize,
              kReboDP: kReboDP,
              kT: kT,
              kHV: kHV,
              kSF: kSF,
            };
          } else if (caseNo === "E" || caseNo === "F" || caseNo === "G") {
            data = {
              // Misc.
              caseNo: caseNo,
              // Project data
              projNo: projNo,
              projName: projName,
              projDesc: projDesc,
              // Downcomer1 data
              downFlowRateMain: downFlowRateMain,
              downDensity: downDensity,
              downVisc: downVisc,
              downIDMain: downIDMain,
              downRough: downRough,
              downELMain: downELMain,
              downSF: downSF,
              // Riser1 data
              riserWGMain: riserWGMain,
              riserWLMain: riserWLMain,
              riserVapDensity: riserVapDensity,
              riserLiqDensity: riserLiqDensity,
              riserVapVisc: riserVapVisc,
              riserLiqVisc: riserLiqVisc,
              riserIDMain: riserIDMain,
              riserRough: riserRough,
              riserELMain: riserELMain,
              riserSF: riserSF,
              // ConfigE data
              eDownOutNozzleSize: eDownOutNozzleSize,
              eRiserInNozzleSize: eRiserInNozzleSize,
              eReboInNozzleSize: eReboInNozzleSize,
              eReboOutNozzleSize: eReboOutNozzleSize,
              eReboDP: eReboDP,
              eT: eT,
              eL: eL,
              eLC: eLC,
              eE: eE,
              eBD: eBD,
              eSF: eSF,
            };
          }
          const jsonData = JSON.stringify(data);
          setFileName(result);
          await writeTextFile(result, jsonData, {
            dir: BaseDirectory.AppConfig,
          });
        } else {
          console.log("Cancelled by user.");
        }
      })
      .catch((error) => {
        console.error("Error saving data:", error.message);
      });
  };
  const onExportButtonClick = () => {
    console.log("Export button clicked");
  };

  const goNextStepbySelectCircuit = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const onExecuteButtonClick = () => {
    if (caseNo === "A") {
    } else if (caseNo === "B") {
    } else if (caseNo === "C") {
    } else if (caseNo === "D") {
    } else if (caseNo === "E") {
      calCaseE();
    } else if (caseNo === "F") {
    } else if (caseNo === "G") {
    } else {
      console.log("Error: Invalid case number");
    }
  };

  const calCaseE = async () => {
    let homoRes: ThermoResult[] = [];
    let dukRes: ThermoResult[] = [];

    //(0) Try and Parse all the parameters
    const W = parseFloatWithErrorHandling(downFlowRateMain);
    const Lo = parseFloatWithErrorHandling(downDensity);
    const mu = parseFloatWithErrorHandling(downVisc);
    const id = parseFloatWithErrorHandling(downIDMain);
    const e = parseFloatWithErrorHandling(downRough);
    const sf = parseFloatWithErrorHandling(downSF);
    const EQD1 = parseFloatWithErrorHandling(downELMain);
    const ReDP = parseFloatWithErrorHandling(eReboDP);
    const WG = parseFloatWithErrorHandling(riserWGMain);
    const WL = parseFloatWithErrorHandling(riserWLMain);
    const LoG = parseFloatWithErrorHandling(riserVapDensity);
    const LoL = parseFloatWithErrorHandling(riserLiqDensity);
    const E = parseFloatWithErrorHandling(eE);
    const T = parseFloatWithErrorHandling(eT);

    // Handle single phase and two phase line hydraulic calculation
    // handle single phase
    const result = await invoke<Result>("invoke_hydraulic", {
      W,
      Lo,
      mu,
      id,
      e,
      sf,
    });
    const res = result as Result;
    const DP1 = res.dp100;
    const DV1 = res.v;

    //(1) Static Head Gain
    let a1 = 0.0;
    let b1 = Lo / 10000.0;
    homoRes.push({
      id: 101,
      title: "(1) STATIC HEAD GAIN",
      value: a1.toFixed(6) + " + " + b1.toFixed(6) + " * H",
    });
    dukRes.push({
      id: 101,
      title: "(1) STATIC HEAD GAIN",
      value: a1.toFixed(6) + " + " + b1.toFixed(6) + " * H",
    });

    //(2) Downcomer Line Loss'=
    let a2 = (DP1 * EQD1) / 100.0;
    let b2 = DP1 / 100.0;
    homoRes.push({
      id: 102,
      title: "(2) DOWNCOMER LINE LOSS",
      value: a2.toFixed(6) + " + " + b2.toFixed(6) + " * H",
    });
    dukRes.push({
      id: 102,
      title: "(2) DOWNCOMER LINE LOSS",
      value: a2.toFixed(6) + " + " + b2.toFixed(6) + " * H",
    });

    // (3) Tower Downcomer Outlet Nozzle Loss
    const a3 = (0.5 * Lo * DV1 * DV1) / (2 * 9.80665) / 10000;
    // const b3 = 0.0;
    homoRes.push({
      id: 103,
      title: "(3) TOWER DOWNCOMER OUTLET NOZZLE LOSS",
      value: a3.toFixed(6),
    });
    dukRes.push({
      id: 103,
      title: "(3) TOWER DOWNCOMER OUTLET NOZZLE LOSS",
      value: a3.toFixed(6),
    });

    // (4) Reboiler Inlet Nozzle Loss
    const a4 = (0.5 * Lo * DV1 * DV1) / (2 * 9.80665) / 10000;
    // const b4 = 0.0;
    homoRes.push({
      id: 104,
      title: "(4) REBOILER INLET NOZZLE LOSS",
      value: a4.toFixed(6),
    });
    dukRes.push({
      id: 104,
      title: "(4) REBOILER INLET NOZZLE LOSS",
      value: a4.toFixed(6),
    });

    // (5) Reboiler Pressure Loss
    const a5 = ReDP;
    // const b5 = 0.0;
    homoRes.push({
      id: 105,
      title: "(5) REBOILER PRESSURE LOSS",
      value: a5.toFixed(6),
    });
    dukRes.push({
      id: 105,
      title: "(5) REBOILER PRESSURE LOSS",
      value: a5.toFixed(6),
    });

    // (6) Riser Static Head Loss
    // (6.1) Homogeneois Model
    const x = WG / (WG + WL);
    const homoLo = 1.0 / (x / LoG + (1 - x) / LoL);
    const ha6 = (homoLo * (T / 1000 - E / 1000)) / 10000;
    const hb6 = homoLo / 10000;
    homoRes.push({
      id: 1061,
      title: "(6) RISER STATIC HEAD LOSS (HOMO.)",
      value: ha6.toFixed(6) + " + " + hb6.toFixed(6) + " * H",
    });
    // (6.2) Dukler Model
    const IDM = (parseFloatWithErrorHandling(riserIDMain) * 2.54) / 100;
    const WGM = parseFloatWithErrorHandling(riserWGMain);
    const WLM = parseFloatWithErrorHandling(riserWLMain);
    const LoGM = parseFloatWithErrorHandling(riserVapDensity);
    const LoLM = parseFloatWithErrorHandling(riserLiqDensity);
    const muGM = parseFloatWithErrorHandling(riserVapVisc) * 0.001;
    const muLM = parseFloatWithErrorHandling(riserLiqVisc) * 0.001;
    const dukLo = InplaceDensity(WLM, WGM, LoLM, LoGM, muLM, muGM, IDM);
    const da6 = (dukLo * (T / 1000 - E / 1000)) / 10000;
    const db6 = dukLo / 10000;
    dukRes.push({
      id: 1062,
      title: "(6) RISER STATIC HEAD LOSS (DUKLER.)",
      value: da6.toFixed(6) + " + " + db6.toFixed(6) + " * H",
    });

    // (7) Riser Line Loss

    // finial works
    setHomeResData(homoRes);
    setDukResData(dukRes);
  };

  const InplaceDensity = (
    WL: number,
    WG: number,
    LoL: number,
    LoG: number,
    muL: number,
    muG: number,
    ID: number
  ) => {
    const area = (Math.PI * ID * ID) / 4; // pipe area [m^2]
    const Gt = (WL + WG) / area / 3600; // Eq (22)

    const UGS = WG / LoG / area / 3600; // Vapor Velocity [m/s]
    const ULS = WL / LoL / area / 3600; // Liquid Velocity [m/s]
    const UTP = UGS + ULS; // Two Phase Velocity [m/s], Eq (23)

    const lamda = ULS / (ULS + UGS); // Liquid Volume Fraction [-], Eq (24)
    let Rgi = 0.5; // Gas Hold-up (Rg) initial value [-]
    const eps = 1e-4; // allowable tolerance
    const np = 100; // trial number
    let i; // loop counter
    const g = 9.81; // gravity acceleration [m/s^2]

    for (i = 0; i < np; i++) {
      // (5) Calc. Re and Fr
      const Re = (ID * Gt) / (Rgi * muG + (1 - Rgi) * muL); // Eq. (25)
      const Fr = (UTP * UTP) / (g * ID); // Froude Number, Eq. (26)

      // (6) Calc. Z and K
      const Z =
        (Math.pow(Re, 0.167) * Math.pow(Fr, 0.125)) / Math.pow(lamda, 0.25); // Eq.(27)
      let K;
      if (Z < 10) {
        K = -0.16367 + 0.31037 * Z - 0.03525 * Z * Z + 0.001366 * Z * Z * Z;
      } else {
        K = 0.75545 + 0.003585 * Z - 0.1436e-4 * Z * Z;
      }

      // (7) Calc Rg (cal.)
      const x = WG / (WG + WL);
      const Rgcal = K / ((1.0 / x - 1) * (LoG / LoL) + 1); // Eq. (28)

      // (8) Calc delta and judgement convergence condition
      const delta = Math.abs(Rgcal - Rgi);
      if (delta > eps) {
        Rgi = (Rgcal + Rgi) / 2;
        // Repeat calc (5), (6), (7)
      } else {
        break;
      }
    }

    let Rg;
    if (i < np) {
      Rg = Rgi; // certain Rg
    } else {
      Rg = 0; // no convergence
      return 0;
    }

    // Calc Result
    const Loip = LoL * (1 - Rg) + LoG * Rg;
    return Loip;
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
                onExecuteButtonClick={onExecuteButtonClick}
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
              kRiserInNozzleSize={kRiserInNozzleSize}
              setKRiserInNozzleSize={setKRiserInNozzleSize}
              kReboInNozzleSize={kReboInNozzleSize}
              setKReboInNozzleSize={setKReboInNozzleSize}
              kReboOutNozzleSize={kReboOutNozzleSize}
              setKReboOutNozzleSize={setKReboOutNozzleSize}
              kReboDP={kReboDP}
              setKReboDP={setKReboDP}
              kT={kT}
              setKT={setKT}
              kHV={kHV}
              setKHV={setKHV}
              kSF={kSF}
              setKSF={setKSF}
              validateInput={validateInput}
              error401={error401}
              error402={error402}
              error403={error403}
              error404={error404}
              error405={error405}
              error406={error406}
              error407={error407}
              error408={error408}
            />
          )}
          {activeStep === 3 &&
            (caseNo === "E" || caseNo === "F" || caseNo === "G") && (
              <ConfigE
                caseNo={caseNo}
                eDownOutNozzleSize={eDownOutNozzleSize}
                setEDownOutNozzleSize={setEDownOutNozzleSize}
                eRiserInNozzleSize={eRiserInNozzleSize}
                setERiserInNozzleSize={setERiserInNozzleSize}
                eReboInNozzleSize={eReboInNozzleSize}
                setEReboInNozzleSize={setEReboInNozzleSize}
                eReboOutNozzleSize={eReboOutNozzleSize}
                setEReboOutNozzleSize={setEReboOutNozzleSize}
                eReboDP={eReboDP}
                setEReboDP={setEReboDP}
                eT={eT}
                setET={setET}
                eL={eL}
                setEL={setEL}
                eLC={eLC}
                setELC={setELC}
                eE={eE}
                setEE={setEE}
                eBD={eBD}
                setEBD={setEBD}
                eSF={eSF}
                setESF={setESF}
                validateInput={validateInput}
                error501={error501}
                error502={error502}
                error503={error503}
                error504={error504}
                error505={error505}
                error506={error506}
                error507={error507}
                error508={error508}
                error509={error509}
                error510={error510}
                error511={error511}
              />
            )}
          {activeStep === 4 && (
            <Thermoproject
              projNo={projNo}
              setProjNo={setProjNo}
              projName={projName}
              setProjName={setProjName}
              projDesc={projDesc}
              setProjDesc={setProjDesc}
            />
          )}
        </Grid>
      </Stack>
    </>
  );
};

export default Thermo;
