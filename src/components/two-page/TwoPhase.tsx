import { invoke } from "@tauri-apps/api/tauri";

import React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import pipeData from "../../assets/PipeStd.json";
import workID from "../../assets/PipeWork.json";
import { dialog } from "@tauri-apps/api";
import { writeTextFile, readTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import {
  OptDiaErrorDialog,
  OptPresErrorDialog,
} from "../single-page/OptErrorDialog";
import { TwoData, VUResult } from "./TwoDataType";
import FileButton from "../single-page/FileButton";

import { CustomTabPanel, a11yProps } from "../utils/utility";
import FlowDirToggleButton from "./FlowDirToggleButton";
import DataGridTwo, { TwoSizingData } from "./DataGridTwo";
import DataListVU from "./DataListVU";

export interface VUDataType {
  id: string;
  actID: string;
  flow_regime: string;
  Head: string;
  Pfric: string;
  Pgrav: string;
  Ef: string;
  LoLS: string;
}

const TwoPhase = () => {
  // Program Data
  const [fileName, setFileName] = useState("");

  // Process Data
  const [vaporFlowRate, setVaporFlowRate] = useState("");
  const [liquidFlowRate, setLiquidFlowRate] = useState("");
  const [vaporDensity, setVaporDensity] = useState("");
  const [liquidDensity, setLiquidDensity] = useState("");
  const [vaporViscosity, setVaporViscosity] = useState("");
  const [liquidViscosity, setLiquidViscosity] = useState("");
  const [surfaceTension, setSurfaceTension] = useState("");
  const [insideDia, setInsideDia] = useState("");
  const [slope, setSlope] = useState("");
  const [roughness, setRoughness] = useState("");
  const [safeFactor, setSafeFactor] = useState("1.2");

  // Options
  const [lowPres, setLowPres] = useState("0.01");
  const [highPres, setHighPres] = useState("1.00");
  const [lowID, setLowID] = useState("1");
  const [highID, setHighID] = useState("6");
  const [optValue, setOptValue] = useState("1");
  const [optDiaErrOpen, setOptDiaErrOpen] = useState(false);
  const [optPresErrOpen, setOptPresErrOpen] = useState(false);

  // Project Info
  const [projNo, setProjectNo] = useState("");
  const [projName, setProjectName] = useState("");
  const [projDesc, setProjectDesc] = useState("");

  // // Line Tag
  const [lineNo, setLineNo] = useState("");
  const [lineFrom, setLineFrom] = useState("");
  const [lineTo, setLineTo] = useState("");
  const [note, setNote] = useState("");

  // Error handling
  const [error101, setError101] = useState(false);
  const [error102, setError102] = useState(false);
  const [error103, setError103] = useState(false);
  const [error104, setError104] = useState(false);
  const [error105, setError105] = useState(false);
  const [error106, setError106] = useState(false);
  const [error107, setError107] = useState(false);
  const [error108, setError108] = useState(false);
  const [error201, setError201] = useState(false);
  const [error202, setError202] = useState(false);

  // Tab value
  const [value, setValue] = useState(0);
  const [direct, setDirect] = React.useState<string[]>([]);

  // Calculated Result
  const [resData, setResData] = useState<TwoSizingData[]>([]);
  const [calState, setCalState] = useState(false);
  const [selectId, setSelectId] = useState<string>("");
  const [idSelState, setIdSelState] = useState(false);
  const [vuData, setVuData] = useState<VUDataType>({
    id: "",
    actID: "",
    flow_regime: "",
    Head: "",
    Pfric: "",
    Pgrav: "",
    Ef: "",
    LoLS: "",
  });

  // uesEffect to handle the select ID
  React.useEffect(() => {
    const fetchData = async () => {
      let actID = workID.find((item) => item.SIZE === selectId)?.ID || 0;
      if (direct.includes("up")) {
        try {
          const result = await invoke<VUResult>(
            "invoke_vertical_up_hydraulic",
            {
              wl: parseFloat(liquidFlowRate),
              wg: parseFloat(vaporFlowRate),
              lol: parseFloat(liquidDensity),
              logg: parseFloat(vaporDensity),
              mul: parseFloat(liquidViscosity),
              mug: parseFloat(vaporViscosity),
              st: parseFloat(surfaceTension),
              rough: parseFloat(roughness),
              sf: parseFloat(safeFactor),
              id: actID,
              degree: parseFloat(slope),
            }
          );
          const res = result as VUResult;
          const newData = {
            id: selectId,
            actID: actID.toString(),
            flow_regime: res.flow_regime,
            Head: res.Head.toFixed(4),
            Pfric: res.Pfric.toFixed(4),
            Pgrav: res.Pgrav.toFixed(4),
            Ef: res.Ef.toFixed(4),
            LoLS: res.LoLS.toFixed(4),
          };
          setVuData(newData as VUDataType);
          setIdSelState(true);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchData();
  }, [selectId]);

  // handle ID select
  const nids = pipeData.map((item) => {
    return (
      <MenuItem key={item.VALUE} value={item.SIZE}>
        {item.SIZE}
      </MenuItem>
    );
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const validateInput = (id: string, value: any) => {
    // 驗證輸入值是否為正的浮點數
    const isPositiveFloat = /^([0-9]*[.])?[0-9]+$/;

    // 101~ 108 is process data input validation
    // 201, 202 is option pressure high-low input validation
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
    id === "201" && !isPositiveFloat.test(value) && value !== ""
      ? setError201(true)
      : setError201(false);
    id === "202" && !isPositiveFloat.test(value) && value !== ""
      ? setError202(true)
      : setError202(false);
    setCalState(false);
  };

  const handleDirectChange = (
    _event: React.MouseEvent<HTMLElement>,
    newDirect: string[]
  ) => {
    handleExecuteButtonClick(newDirect);
    setDirect(newDirect || []);
  };

  const handleExecuteButtonClick = async (fd: string[]) => {
    // fd: flow direction
    if (fd === null) return;
    if (fd.includes("up")) {
      // implement by all dia.
      if (optValue === "1") {
        const newResData: TwoSizingData[] = [];
        await Promise.all(
          workID.map(async (item) => {
            let [flow_regime, Pfric, Ef] = await rust_two_phase_hydraulic_byid(
              item.ID
            );
            newResData.push({
              id: item.SIZE,
              actID: item.ID.toString(),
              flow_regime: flow_regime,
              Pfric: Pfric,
              Ef: Ef,
            });
          })
        );
        setResData(newResData);
        setCalState(true);
      }
      if (optValue === "2") {
        // optValue = 2, implement by Dia range
        let lowActID = workID.find((item) => item.SIZE === lowID)?.ID || 0;
        let highActID = workID.find((item) => item.SIZE === highID)?.ID || 0;
        if (lowActID >= highActID) {
          setOptDiaErrOpen(true);
          return;
        }
        const newResData: TwoSizingData[] = [];
        await Promise.all(
          workID.map(async (item) => {
            let [flow_regime, Pfric, Ef] = await rust_two_phase_hydraulic_byid(
              item.ID
            );
            if (item.ID >= lowActID && item.ID <= highActID) {
              newResData.push({
                id: item.SIZE,
                actID: item.ID.toString(),
                flow_regime: flow_regime,
                Pfric: Pfric,
                Ef: Ef,
              });
            }
          })
        );
        setResData(newResData);
        setCalState(true);
      }
      if (optValue === "3") {
        // implement by pressure drop range
        let lowDP = parseFloat(lowPres);
        let highDP = parseFloat(highPres);
        if (lowDP >= highDP) {
          setOptPresErrOpen(true);
          return;
        }
        const newResData: TwoSizingData[] = [];
        await Promise.all(
          workID.map(async (item) => {
            let [flow_regime, Pfric, Ef] = await rust_two_phase_hydraulic_byid(
              item.ID
            );
            if (parseFloat(Pfric) > lowDP && parseFloat(Pfric) < highDP) {
              newResData.push({
                id: item.SIZE,
                actID: item.ID.toString(),
                flow_regime: flow_regime,
                Pfric: Pfric,
                Ef: Ef,
              });
            }
          })
        );
        // judge the pressure drop range here
        setResData(newResData);
        setCalState(true);
      }
      if (optValue === "4") {
        // implement by Erosion Factor < 1.0
        const newResData: TwoSizingData[] = [];
        await Promise.all(
          workID.map(async (item) => {
            let [flow_regime, Pfric, Ef] = await rust_two_phase_hydraulic_byid(
              item.ID
            );
            if (parseFloat(Ef) <= 1.0) {
              newResData.push({
                id: item.SIZE,
                actID: item.ID.toString(),
                flow_regime: flow_regime,
                Pfric: Pfric,
                Ef: Ef,
              });
            }
          })
        );
        // judge the pressure drop range here
        setResData(newResData);
        setCalState(true);
      }
    } else if (fd.includes("horizontal")) {
    } else if (fd.includes("down")) {
    } else {
      return;
    }
  };

  async function rust_two_phase_hydraulic_byid(
    actID: number
  ): Promise<[string, string, string]> {
    try {
      const result = await invoke<VUResult>("invoke_vertical_up_hydraulic", {
        wl: parseFloat(liquidFlowRate),
        wg: parseFloat(vaporFlowRate),
        lol: parseFloat(liquidDensity),
        logg: parseFloat(vaporDensity),
        mul: parseFloat(liquidViscosity),
        mug: parseFloat(vaporViscosity),
        st: parseFloat(surfaceTension),
        rough: parseFloat(roughness),
        sf: parseFloat(safeFactor),
        id: actID,
        degree: parseFloat(slope),
      });
      const res = result as VUResult;
      return [res.flow_regime, res.Pfric.toFixed(4), res.Ef.toFixed(4)];
    } catch (e) {
      console.error(e);
      return ["", "", ""];
    }
  }

  const onSaveAsButtonClick = async () => {
    dialog
      .save({
        defaultPath: "tpdata1.tps", // 預設檔案名稱
        filters: [{ name: "Two Phase Files", extensions: ["tps"] }], // 檔案類型過濾器
        title: "Save File As",
      })
      .then(async (result) => {
        if (result !== null) {
          const data: TwoData = {
            Two_ProcessData: {
              Two_LiquidFlowRate: liquidFlowRate,
              Two_VaporFlowRate: vaporDensity,
              Two_LiquidDensity: liquidDensity,
              Two_VaporDensity: vaporDensity,
              Two_LiquidViscosity: liquidViscosity,
              Two_VaporViscosity: vaporViscosity,
              Two_SurfaceTension: surfaceTension,
              Two_Roughness: roughness,
              Two_Slope: slope,
              Two_SafeFactor: safeFactor,
            },
            Two_OptionData: {
              Two_lowPres: lowPres,
              Two_highPres: highPres,
              Two_lowID: lowID,
              Two_highID: highID,
              Two_OptValue: optValue,
            },
            Two_ProjectData: {
              Two_projNo: projNo,
              Two_projName: projName,
              Two_projDesc: projDesc,
            },
            Two_LineData: {
              Two_lineNo: lineNo,
              Two_lineFrom: lineFrom,
              Two_lineTo: lineTo,
              Two_note: note,
            },
          };
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

  const onSaveButtonClick = async () => {
    if (fileName !== "") {
      try {
        const data: TwoData = {
          Two_ProcessData: {
            Two_LiquidFlowRate: liquidFlowRate,
            Two_VaporFlowRate: vaporDensity,
            Two_LiquidDensity: liquidDensity,
            Two_VaporDensity: vaporDensity,
            Two_LiquidViscosity: liquidViscosity,
            Two_VaporViscosity: vaporViscosity,
            Two_SurfaceTension: surfaceTension,
            Two_Roughness: roughness,
            Two_Slope: slope,
            Two_SafeFactor: safeFactor,
          },
          Two_OptionData: {
            Two_lowPres: lowPres,
            Two_highPres: highPres,
            Two_lowID: lowID,
            Two_highID: highID,
            Two_OptValue: optValue,
          },
          Two_ProjectData: {
            Two_projNo: projNo,
            Two_projName: projName,
            Two_projDesc: projDesc,
          },
          Two_LineData: {
            Two_lineNo: lineNo,
            Two_lineFrom: lineFrom,
            Two_lineTo: lineTo,
            Two_note: note,
          },
        };
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

  const onNewButtonClick = async () => {
    // reset program data
    setFileName("");
    setCalState(false);
    setResData([]);

    // reset process data
    setLiquidFlowRate("");
    setVaporFlowRate("");
    setLiquidDensity("");
    setVaporDensity("");
    setLiquidViscosity("");
    setVaporViscosity("");
    setSurfaceTension("");
    setInsideDia("");
    setSlope("");
    setRoughness("");
    setSafeFactor("1.2");

    // reset options data
    setLowPres("");
    setHighPres("");
    setLowID("");
    setHighID("");
    setOptValue("1");
    setOptDiaErrOpen(false);
    setOptPresErrOpen(false);

    // reset project data
    setProjectNo("");
    setProjectName("");
    setProjectDesc("");

    // reset line data
    setLineNo("");
    setLineFrom("");
    setLineTo("");
    setNote("");
    // rest error handling
    setError101(false);
    setError102(false);
    setError103(false);
    setError104(false);
    setError105(false);
    setError106(false);
    setError107(false);
    setError108(false);
    setError201(false);
    setError202(false);
    // reset Tab value
    setValue(0);
    setIdSelState(false);
  };

  const onOpenButtonClick = async () => {
    dialog
      .open({
        filters: [{ name: "Two Phase Files", extensions: ["tps"] }], // 檔案類型過濾器
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
            // set process data
            setLiquidFlowRate(objData.Two_ProcessData.Two_LiquidFlowRate);
            setVaporFlowRate(objData.Two_ProcessData.Two_VaporFlowRate);
            setLiquidDensity(objData.Two_ProcessData.Two_LiquidDensity);
            setVaporDensity(objData.Two_ProcessData.Two_VaporDensity);
            setLiquidViscosity(objData.Two_ProcessData.Two_LiquidViscosity);
            setVaporViscosity(objData.Two_ProcessData.Two_VaporViscosity);
            setSurfaceTension(objData.Two_ProcessData.Two_SurfaceTension);
            setRoughness(objData.Two_ProcessData.Two_Roughness);
            setSlope(objData.Two_ProcessData.Two_Slope);
            setSafeFactor(objData.Two_ProcessData.Two_SafeFactor);
            // set options data
            setLowPres(objData.Two_OptionData.Two_lowPres);
            setHighPres(objData.Two_OptionData.Two_highPres);
            setLowID(objData.Two_OptionData.Two_lowID);
            setHighID(objData.Two_OptionData.Two_highID);
            setOptValue(objData.Two_OptionData.Two_OptValue);
            // set project data
            setProjectNo(objData.Two_ProjectData.Two_projNo);
            setProjectName(objData.Two_ProjectData.Two_projName);
            setProjectDesc(objData.Two_ProjectData.Two_projDesc);
            // set line data
            setLineNo(objData.Two_LineData.Two_lineNo);
            setLineFrom(objData.Two_LineData.Two_lineFrom);
            setLineTo(objData.Two_LineData.Two_lineTo);
            setNote(objData.Two_LineData.Two_note);
          });
        } else {
          console.log("Cancelled by user.");
        }
      })
      .catch((error) => {
        console.error("Error reading data:", error.message);
      });
  };

  const onExportButtonClick = async () => {
    // const pdfDoc = await PDFDocument.create();
    // const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    // const page = pdfDoc.addPage();
    // const { width, height } = page.getSize();
    // // **** Print Header (Application Name) ****
    // let fontSize = 16;
    // let dy = height - 3 * fontSize;
    // let dx = 450;
    // let textStr = "Line2024";
    // let textWidth = timesRomanFont.widthOfTextAtSize(textStr, fontSize);
    // page.drawText(textStr, {
    //   x: dx,
    //   y: dy,
    //   size: fontSize,
    //   font: timesRomanFont,
    //   color: rgb(0, 0, 0),
    // });
    // fontSize = 6;
    // page.drawText("   Ver 1.0.0", {
    //   x: dx + textWidth,
    //   y: dy,
    //   size: fontSize,
    //   font: timesRomanFont,
    //   color: rgb(0, 0, 0),
    // });
    // // draw a thick red line at the bottom of header
    // const widthMargin = 30;
    // page.drawLine({
    //   start: { x: widthMargin, y: dy - 5 },
    //   end: { x: width - widthMargin, y: dy - 5 },
    //   thickness: 1,
    //   color: rgb(1, 0, 0),
    // });
    // // **** Print Input Data ****
    // let txtStrs: string[] = [
    //   `Project No. : ${projNo}`,
    //   `Project Name : ${projName}`,
    //   `Description : ${projDesc}`,
    //   `Line No. : ${lineNo}`,
    //   `From : ${lineFrom}`,
    //   `To : ${lineTo}`,
    //   `Note : ${note}`,
    //   `>>>> INPUT DATA <<<<`,
    //   // `Mass Flow Rate (Kg/hr): ${massFlowRate}`,
    //   // `Density (Kg/m^3): ${density} `,
    //   // `Viscosity (cP): ${viscosity} `,
    //   `Pipe Roughness (mm): ${roughness} `,
    //   `Safe Factor : ${safeFactor}`,
    //   `>>>> CALCULATION RESULT  <<<<`,
    //   `    `,
    //   `  Norm. ID         Act. ID        Velocity         Pressure Drop          1.0 V.H           Reynold No.`,
    //   `   (inch)          (inch)          (m/s)           (Kg/cm^2/100m)        (Kg/m/s^2)             [-]`,
    // ];
    // dy = dy - 5;
    // const courierFont = await pdfDoc.embedFont(StandardFonts.Courier);
    // const courierBoldFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
    // fontSize = 8;
    // const lineSpacing = 2;
    // const lineHeight = fontSize + lineSpacing;
    // dx = widthMargin + 5;
    // for (let i = 0; i < txtStrs.length; i++) {
    //   dy = dy - lineHeight * 1.5;
    //   if (i === 7 || i === 14) {
    //     page.drawText(txtStrs[i], {
    //       x: dx,
    //       y: dy,
    //       size: fontSize,
    //       font: courierBoldFont,
    //       color: rgb(0, 0, 0),
    //     });
    //   } else {
    //     page.drawText(txtStrs[i], {
    //       x: dx,
    //       y: dy,
    //       size: fontSize,
    //       font: courierFont,
    //       color: rgb(0, 0, 0),
    //     });
    //   }
    // }
    // // draw a thick black line at the top of head row
    // page.drawLine({
    //   start: { x: widthMargin, y: dy + 30 },
    //   end: { x: width - widthMargin * 1.5, y: dy + 30 },
    //   thickness: 1,
    //   color: rgb(0.25, 0.25, 0.25),
    // });
    // // draw a thick black line at the bottom of head row
    // dy = dy - 7;
    // page.drawLine({
    //   start: { x: widthMargin, y: dy },
    //   end: { x: width - widthMargin * 1.5, y: dy },
    //   thickness: 1,
    //   color: rgb(0.25, 0.25, 0.25),
    // });
    // // **** Print Result Data ****
    // if (resData.length === 0) {
    //   dy = dy - 12;
    //   page.drawText("No data available...", {
    //     x: dx,
    //     y: dy,
    //     size: fontSize,
    //     font: courierFont,
    //     color: rgb(0, 0, 0),
    //   });
    // } else {
    //   let outStrs: string[] = [];
    //   resData.forEach((item) => {
    //     outStrs.push(
    //       `${item.id.padStart(8)}${item.actID.padStart(17)}${item.vel.padStart(
    //         17
    //       )}${item.presDrop.padStart(22)}${item.vh.padStart(19)}${
    //         item.reynoldNo
    //       }`
    //     );
    //   });
    //   dy = dy - 5;
    //   for (let i = 0; i < outStrs.length; i++) {
    //     dy = dy - lineHeight * 1.5;
    //     if (selectId === resData[i].id) {
    //       page.drawText(outStrs[i], {
    //         x: dx,
    //         y: dy,
    //         size: fontSize,
    //         font: courierBoldFont,
    //         color: rgb(1, 0, 0),
    //       });
    //     } else {
    //       page.drawText(outStrs[i], {
    //         x: dx,
    //         y: dy,
    //         size: fontSize,
    //         font: courierFont,
    //         color: rgb(0, 0, 0),
    //       });
    //     }
    //   }
    // }
    // // draw a thick black line at the bottom of data table
    // dy = dy - 8;
    // page.drawLine({
    //   start: { x: widthMargin, y: dy },
    //   end: { x: width - widthMargin * 1.5, y: dy },
    //   thickness: 1,
    //   color: rgb(0.25, 0.25, 0.25),
    // });
    // // **** Print Footer ****
    // let msg = "";
    // if (selectId === "") {
    //   msg =
    //     "Note: You did not select any pipe ID. Please select one on the result table!!";
    // } else {
    //   msg = `Note: You select the ${selectId}\" pipe.`;
    // }
    // dy = dy - 14;
    // page.drawText(msg, {
    //   x: dx + 10,
    //   y: dy,
    //   size: fontSize,
    //   font: courierFont,
    //   color: rgb(0, 0, 0),
    // });
    // const pdfBytes = await pdfDoc.save();
    // const pdfDataUrl = URL.createObjectURL(
    //   new Blob([pdfBytes], { type: "application/pdf" })
    // );
    // window.open(pdfDataUrl);
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
      <Grid
        container
        gap={6}
        sx={{
          bgcolor: "background.default",
          minHeight: "80vh",
          marginLeft: "8px",
        }}
      >
        <Grid item xs={4} sx={{ ml: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "medium" }}
          >
            Two Phase Line Sizing App
          </Typography>
          <Box sx={{ width: "100%", height: "580px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                textColor="secondary"
                indicatorColor="secondary"
                onChange={handleChange}
                aria-label="basic tabs"
              >
                <Tab label="Process" {...a11yProps(0)} />
                <Tab label="Options" {...a11yProps(1)} />
                <Tab label="Project" {...a11yProps(2)} />
                <Tab label="Line Tag" {...a11yProps(3)} />
              </Tabs>
            </Box>
            {/* process data input page */}
            <CustomTabPanel value={value} index={0}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                sx={{
                  "& .MuiTextField-root": { mt: 2, width: "25ch" },
                }}
              >
                <Box display="flex" flexDirection="row">
                  <TextField
                    id="liquid-flow-rate"
                    label="Liquid Flow Rate (Kg/hr)"
                    variant="outlined"
                    value={liquidFlowRate}
                    color="secondary"
                    error={error102}
                    helperText={error102 ? "Please input correct number" : ""}
                    onChange={(e) => setLiquidFlowRate(e.target.value)}
                    onBlur={(e) => validateInput("102", e.target.value)}
                    InputLabelProps={{
                      sx: {
                        color: "blue", // 預設顏色
                      },
                    }}
                  />
                  <TextField
                    id="vapor-flow-rate"
                    label="Vapor Flow Rate (Kg/hr)"
                    variant="outlined"
                    value={vaporFlowRate}
                    color="secondary"
                    error={error101}
                    helperText={error101 ? "Please input correct number" : ""}
                    onChange={(e) => setVaporFlowRate(e.target.value)}
                    onBlur={(e) => validateInput("101", e.target.value)}
                    sx={{ ml: 4 }}
                    InputLabelProps={{
                      sx: {
                        color: "Orange", // 預設顏色
                      },
                    }}
                  />
                </Box>
                <Box display="flex" flexDirection="row">
                  <TextField
                    id="liquid-density"
                    label="Liquid Density (Kg/m^3)"
                    variant="outlined"
                    value={liquidDensity}
                    color="secondary"
                    error={error104}
                    helperText={error104 ? "Please input correct number" : ""}
                    onChange={(e) => setLiquidDensity(e.target.value)}
                    onBlur={(e) => validateInput("104", e.target.value)}
                    InputLabelProps={{
                      sx: {
                        color: "blue", // 預設顏色
                      },
                    }}
                  />
                  <TextField
                    id="vapor-density"
                    label="Vapor Density (Kg/m^3)"
                    variant="outlined"
                    value={vaporDensity}
                    color="secondary"
                    error={error103}
                    helperText={error103 ? "Please input correct number" : ""}
                    onChange={(e) => setVaporDensity(e.target.value)}
                    onBlur={(e) => validateInput("103", e.target.value)}
                    sx={{ ml: 4 }}
                    InputLabelProps={{
                      sx: {
                        color: "Orange", // 預設顏色
                      },
                    }}
                  />
                </Box>
                <Box display="flex" flexDirection="row">
                  <TextField
                    id="liquid-viscosity"
                    label="Liquid Viscosity (cP)"
                    variant="outlined"
                    value={liquidViscosity}
                    color="secondary"
                    error={error106}
                    helperText={error106 ? "Please input correct number" : ""}
                    onChange={(e) => setVaporViscosity(e.target.value)}
                    onBlur={(e) => validateInput("106", e.target.value)}
                    InputLabelProps={{
                      sx: {
                        color: "blue", // 預設顏色
                      },
                    }}
                  />
                  <TextField
                    id="vapor-viscosity"
                    label="Vapor Viscosity (cP)"
                    variant="outlined"
                    value={vaporViscosity}
                    color="secondary"
                    error={error105}
                    helperText={error105 ? "Please input correct number" : ""}
                    onChange={(e) => setVaporViscosity(e.target.value)}
                    onBlur={(e) => validateInput("105", e.target.value)}
                    sx={{ ml: 4 }}
                    InputLabelProps={{
                      sx: {
                        color: "Orange", // 預設顏色
                      },
                    }}
                  />
                </Box>
                <TextField
                  id="surface-tension"
                  label="Surface Tension (dyne/cm)"
                  variant="outlined"
                  value={surfaceTension}
                  color="secondary"
                  error={error106}
                  helperText={error106 ? "Please input correct number" : ""}
                  onChange={(e) => setSurfaceTension(e.target.value)}
                  onBlur={(e) => validateInput("106", e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: "blue", // 預設顏色
                    },
                  }}
                />
                <TextField
                  id="roughness"
                  label="Pipe Roughness (mm)"
                  variant="outlined"
                  value={roughness}
                  color="secondary"
                  error={error107}
                  helperText={error107 ? "Please input correct number" : ""}
                  onChange={(e) => setRoughness(e.target.value)}
                  onBlur={(e) => validateInput("107", e.target.value)}
                />
                <TextField
                  id="slope"
                  label="Pipe Slope (degree)"
                  variant="outlined"
                  value={slope}
                  color="secondary"
                  error={error108}
                  helperText={error108 ? "Please input correct number" : ""}
                  onChange={(e) => setSlope(e.target.value)}
                  onBlur={(e) => validateInput("108", e.target.value)}
                  style={{ width: 150 }}
                />

                <TextField
                  id="safety-factor"
                  label="Safety Factor (-)"
                  variant="outlined"
                  value={safeFactor}
                  color="secondary"
                  error={error105}
                  helperText={error105 ? "Please input correct number" : ""}
                  onChange={(e) => setSafeFactor(e.target.value)}
                  onBlur={(e) => validateInput("105", e.target.value)}
                  style={{ width: 150 }}
                />
              </Box>
            </CustomTabPanel>

            {/* options page */}
            <CustomTabPanel value={value} index={1}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                sx={{
                  "& .MuiTextField-root": { mt: 2, width: "16ch" },
                }}
              >
                <FormControl>
                  <FormLabel id="radio-buttons-group-label">
                    Design Criteria :
                  </FormLabel>
                  <Box
                    height="50ch"
                    boxShadow={1}
                    sx={{ border: "1px solid lightgrey", mt: 1, pl: 2 }}
                  >
                    <RadioGroup
                      aria-labelledby="radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={optValue}
                      onChange={(e) => setOptValue(e.target.value)}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="All Diameters"
                        sx={{ mt: 2 }}
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="By Diameter range"
                        sx={{ mt: 2 }}
                      />
                      <Grid>
                        <FormControl
                          sx={{ ml: 4, mt: 2, minWidth: 130 }}
                          size="medium"
                          disabled={optValue !== "2"}
                        >
                          <InputLabel id="lowID">Lower ID</InputLabel>
                          <Select
                            labelId="lowID"
                            id="lowID"
                            value={lowID}
                            onChange={(e) => setLowID(e.target.value)}
                            label="Low ID"
                          >
                            {nids}
                          </Select>
                        </FormControl>
                        <FormControl
                          sx={{ ml: 4, mt: 2, minWidth: 130 }}
                          size="medium"
                          disabled={optValue !== "2"}
                        >
                          <InputLabel id="highID">Higher ID</InputLabel>
                          <Select
                            labelId="highID"
                            id="highID"
                            value={highID}
                            onChange={(e) => setHighID(e.target.value)}
                            label="High ID"
                          >
                            {nids}
                          </Select>
                        </FormControl>
                      </Grid>

                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="By Pressure Drop (Kg/cm^2/100m) range"
                        sx={{ mt: 2 }}
                      />
                      <Grid
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                      >
                        <TextField
                          id="lowpres"
                          label="Low limit"
                          variant="outlined"
                          value={lowPres}
                          color="secondary"
                          // error={error}
                          helperText={
                            error201 ? "Please input correct number" : ""
                          }
                          onChange={(e) => setLowPres(e.target.value)}
                          onBlur={(e) => validateInput("201", e.target.value)}
                          sx={{ ml: 4 }}
                          disabled={optValue !== "3"}
                        />
                        <TextField
                          id="highpres"
                          label="High limit"
                          variant="outlined"
                          value={highPres}
                          color="secondary"
                          error={error202}
                          helperText={
                            error202 ? "Please input correct number" : ""
                          }
                          onChange={(e) => setHighPres(e.target.value)}
                          onBlur={(e) => validateInput("202", e.target.value)}
                          sx={{ ml: 4 }}
                          disabled={optValue !== "3"}
                        />
                      </Grid>
                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="Erosion Factor < 1.0"
                        sx={{ mt: 2 }}
                      />
                    </RadioGroup>
                  </Box>
                </FormControl>
              </Box>
            </CustomTabPanel>

            {/* project info page */}
            <CustomTabPanel value={value} index={2}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                sx={{
                  "& .MuiTextField-root": { mt: 2, width: "45ch" },
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Project No."
                  variant="outlined"
                  value={projNo}
                  color="secondary"
                  onChange={(e) => {
                    setProjectNo(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Project Name"
                  variant="outlined"
                  value={projName}
                  color="secondary"
                  multiline
                  rows={3}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Project Description"
                  variant="outlined"
                  value={projDesc}
                  color="secondary"
                  multiline
                  rows={7}
                  onChange={(e) => {
                    setProjectDesc(e.target.value);
                  }}
                />
              </Box>
            </CustomTabPanel>

            {/* Line tag page */}
            <CustomTabPanel value={value} index={3}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                sx={{
                  "& .MuiTextField-root": { mt: 2, width: "45ch" },
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Line No."
                  variant="outlined"
                  value={lineNo}
                  color="secondary"
                  onChange={(e) => {
                    setLineNo(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Line From"
                  variant="outlined"
                  value={lineFrom}
                  color="secondary"
                  onChange={(e) => {
                    setLineFrom(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Line To"
                  variant="outlined"
                  value={lineTo}
                  color="secondary"
                  onChange={(e) => {
                    setLineTo(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Note"
                  variant="outlined"
                  value={note}
                  color="secondary"
                  multiline
                  rows={6}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
              </Box>
            </CustomTabPanel>
          </Box>

          <FlowDirToggleButton
            direct={direct}
            handleDirectChange={handleDirectChange}
          />

          <OptDiaErrorDialog
            optErrOpen={optDiaErrOpen}
            setOptErrOpen={setOptDiaErrOpen}
          />
          <OptPresErrorDialog
            optErrOpen={optPresErrOpen}
            setOptErrOpen={setOptPresErrOpen}
          />
        </Grid>
        <Grid item xs={4} sx={{ width: "100%" }}>
          {calState && (
            <DataGridTwo
              rows={resData}
              selectId={selectId}
              setSelectId={setSelectId}
            />
          )}
          {idSelState && <DataListVU vuData={vuData} direct={direct} />}
        </Grid>
      </Grid>
    </>
  );
};

export default TwoPhase;
