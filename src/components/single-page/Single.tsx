import { invoke } from "@tauri-apps/api/tauri";

import React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DataGridSingle from "./DataGridSingle";
import { SizingData } from "./DataGridSingle";
import pipeData from "../../assets/PipeStd.json";
import workID from "../../assets/PipeWork.json";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PasteDialog from "./PrintDialog";

type Result = {
  w: number; // fluid flow rate [kg/hr]
  rho: number; // fluid density [kg/m^3]
  mu: number; // fluid viscosity [N-sec/m^2] = [Kg/m3/sec]
  id: number; // pipe inside diameter [m]
  e: number; // pipe roughness [m]
  sf: number; // safety factor [-]
  // output fields
  v: number; // fluid flow velocity [m/s]
  nre: number; // Reynold number [-]
  fdarcy: number; // Darcy Friction Factor [-]
  dp100: number; // pressure drop per 100m
  vh: number; // velocity head vh = rho * v^2
};

let res: Result = {
  w: 0.0,
  rho: 0.0,
  mu: 0.0,
  id: 0.0,
  e: 0.046,
  sf: 1.2,
  v: -999.0,
  nre: -999.0,
  fdarcy: -999.0,
  dp100: -999.0,
  vh: -999.0,
};

// 將 num 輸出格式化的 scientific format to 1.23E+002
function fmt_f64(
  num: number,
  width: number,
  precision: number,
  exp_pad: number
): string {
  let numStr: string = num.toExponential(precision);
  let eIndex: number = numStr.indexOf("e");
  let exp: string = numStr.slice(eIndex + 1);
  numStr = numStr.slice(0, eIndex);
  let sign: string = exp.startsWith("-") ? "-" : "+";
  if (sign === "-") {
    exp = exp.slice(1);
  } else {
    exp = exp.slice(1);
  }
  numStr += "E" + sign + exp.padStart(exp_pad, "0");
  return numStr.padStart(width);
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Single = () => {
  // Process Data
  const [fluid, setFluid] = useState(10);
  const [massFlowRate, setMassFlowRate] = useState("150734");
  const [density, setDensity] = useState("380");
  const [viscosity, setViscosity] = useState("0.054");
  const [roughness, setRoughness] = useState("0.046");
  const [safeFactor, setSafeFactor] = useState("1.0");

  // Options
  const [lowPres, setLowPres] = useState("0.01");
  const [highPres, setHighPres] = useState("1.00");
  const [lowID, setLowID] = useState("1");
  const [highID, setHighID] = useState("6");
  const [optValue, setOptValue] = useState("1");

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
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);

  // handle ID select
  const nids = pipeData.map((item) => {
    return (
      <MenuItem key={item.VALUE} value={item.SIZE}>
        {item.SIZE}
      </MenuItem>
    );
  });

  // Calculated Result
  const [resData, setResData] = useState<SizingData[]>([]);
  const [calState, setCalState] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const validateInput = (value: any) => {
    // 驗證輸入值是否為正的浮點數
    const isPositiveFloat = /^([0-9]*[.])?[0-9]+$/;
    if (!isPositiveFloat.test(value)) {
      setError(true);
      setCalState(true);
    } else {
      setError(false);
      setCalState(false);
    }
  };

  const handleExecuteButtonClick = () => {
    if (optValue === "1") {
      const newResData: SizingData[] = workID.map((item) => {
        return {
          id: item.SIZE,
          actID: item.ID.toString(),
          vel: "",
          presDrop: "",
          vh: "",
          reynoldNo: "",
        };
      });
      newResData.map((item) => {
        rust_single_phase_hydraulic(item);
      });
      console.log(newResData);
      setResData(newResData);
      setCalState(true);
    }
    if (optValue === "2") {
      const newResData: SizingData[] = workID.map((item) => {
        return {
          id: item.SIZE,
          actID: item.ID.toString(),
          vel: "",
          presDrop: "",
          vh: "",
          reynoldNo: "",
        };
      });
      newResData.map((item) => {
        rust_single_phase_hydraulic(item);
      });

      let lowActID = workID.find((item) => item.SIZE === lowID)?.ID || 0;
      let highActID = workID.find((item) => item.SIZE === highID)?.ID || 0;

      setResData(
        newResData.filter((item) => {
          if (lowActID !== undefined || highActID !== undefined) {
            return (
              parseFloat(item.actID) >= lowActID &&
              parseFloat(item.actID) <= highActID
            );
          }
        })
      );
      setCalState(true);
    }
    if (optValue === "3") {
      const newData: SizingData[] = workID.map((item) => {
        return {
          id: item.SIZE,
          actID: item.ID.toString(),
          vel: "",
          presDrop: "",
          vh: "",
          reynoldNo: "",
        };
      });
      newData.map((item) => {
        rust_single_phase_hydraulic(item);
      });
      // judge the pressure drop range here
      let lowDP = parseFloat(lowPres);
      let highDP = parseFloat(highPres);
      console.log(newData);

      setResData(newData);
      setCalState(true);
    }
  };

  // call Rust function
  async function rust_single_phase_hydraulic(item: SizingData) {
    await invoke<Result>("invoke_hydraulic", {
      w: parseFloat(massFlowRate),
      rho: parseFloat(density),
      mu: parseFloat(viscosity),
      id: parseFloat(item.actID),
      e: parseFloat(roughness),
      sf: parseFloat(safeFactor),
    })
      .then((result) => {
        res = result as Result;
        item.vel = res.v.toFixed(4);
        item.presDrop = res.dp100.toFixed(6);
        item.vh = res.vh.toFixed(4);
        item.reynoldNo = fmt_f64(res.nre, 20, 4, 3);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <>
      <Grid
        container
        // alignItems="center"
        gap={6}
        sx={{
          bgcolor: "background.default",
          minHeight: "80vh",
        }}
      >
        <Grid item xs={4} sx={{ ml: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "medium" }}
          >
            Single Phase Line Sizing App
          </Typography>
          <Box sx={{ width: "100%", height: "550px" }}>
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
                <FormControl sx={{ mt: 2 }}>
                  <InputLabel id="state-label">Fluid</InputLabel>
                  <Select
                    labelId="state-label"
                    id="state-select"
                    value={fluid}
                    label="Fluid"
                    onChange={(e) => {
                      setFluid(e.target.value as number);
                    }}
                    sx={{ width: "20ch" }}
                  >
                    <MenuItem value={10}>Liquid</MenuItem>
                    <MenuItem value={20}>Gas</MenuItem>
                    <MenuItem value={30}>Steam</MenuItem>
                    <MenuItem value={40}>Water</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  id="outlined-basic"
                  label="Mass Flow Rate (Kg/hr)"
                  variant="outlined"
                  value={massFlowRate}
                  color="secondary"
                  error={error}
                  helperText={error ? "Please input correct number" : ""}
                  onChange={(e) => {
                    setMassFlowRate(e.target.value);
                    validateInput(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Density (Kg/m^3)"
                  variant="outlined"
                  value={density}
                  color="secondary"
                  error={error}
                  helperText={error ? "Please input correct number" : ""}
                  onChange={(e) => {
                    setDensity(e.target.value);
                    validateInput(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Viscosity (cP)"
                  variant="outlined"
                  value={viscosity}
                  color="secondary"
                  error={error}
                  helperText={error ? "Please input correct number" : ""}
                  onChange={(e) => {
                    setViscosity(e.target.value);
                    validateInput(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Pipe Roughness (mm)"
                  variant="outlined"
                  value={roughness}
                  color="secondary"
                  error={error}
                  helperText={error ? "Please input correct number" : ""}
                  onChange={(e) => {
                    setRoughness(e.target.value);
                    validateInput(e.target.value);
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="Safe Factor (-)"
                  variant="outlined"
                  value={safeFactor}
                  color="secondary"
                  error={error}
                  helperText={error ? "Please input correct number" : ""}
                  onChange={(e) => {
                    setSafeFactor(e.target.value);
                    validateInput(e.target.value);
                  }}
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
                    height="42ch"
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
                        label="all diameters"
                        sx={{ mt: 2 }}
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="by Diameter range"
                        sx={{ mt: 2 }}
                      />
                      <Grid>
                        <FormControl
                          sx={{ ml: 4, mt: 2, minWidth: 130 }}
                          size="medium"
                          disabled={optValue !== "2"}
                        >
                          <InputLabel id="lowID-select-standard-label">
                            Lower ID
                          </InputLabel>
                          <Select
                            labelId="lowID-select-standard-label"
                            id="lowID-select-standard"
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
                          <InputLabel id="highID-select-standard-label">
                            Higher ID
                          </InputLabel>
                          <Select
                            labelId="highID-select-standard-label"
                            id="highID-select-standard"
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
                        label="by Pressure Drop (Kg/cm^2/100m) range"
                        sx={{ mt: 2 }}
                      />
                      <Grid
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Low limit"
                          variant="outlined"
                          value={lowPres}
                          color="secondary"
                          error={error}
                          helperText={
                            error ? "Please input correct number" : ""
                          }
                          onChange={(e) => {
                            setLowPres(e.target.value);
                            validateInput(e.target.value);
                          }}
                          sx={{ ml: 4 }}
                          disabled={optValue !== "3"}
                        />
                        <TextField
                          id="outlined-basic"
                          label="High limit"
                          variant="outlined"
                          value={highPres}
                          color="secondary"
                          error={error}
                          helperText={
                            error ? "Please input correct number" : ""
                          }
                          onChange={(e) => {
                            setHighPres(e.target.value);
                            validateInput(e.target.value);
                          }}
                          sx={{ ml: 4 }}
                          disabled={optValue !== "3"}
                        />
                      </Grid>
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
          <Button
            variant="text"
            color="success"
            onClick={handleExecuteButtonClick}
          >
            {" "}
            Execute{" "}
          </Button>
          <PasteDialog setDensity={setDensity} setViscosity={setViscosity} />
        </Grid>
        <Grid item xs={4} sx={{ width: "100%" }}>
          {calState && <DataGridSingle rows={resData} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Single;
