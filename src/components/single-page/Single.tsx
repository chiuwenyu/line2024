import React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import pipeData from "../../assets/PipeStd.json";

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
  const [designCriteria, setDesignCriteria] = useState("1");
  const [lowPres, setLowPres] = useState("0.01");
  const [highPres, setHighPres] = useState("1.00");
  const [lowID, setLowID] = useState("1");
  const [highID, setHighID] = useState("6");
  const [allFlag, setAllFlag] = useState(true);
  const [idFlag, setIDFlag] = useState(false);
  const [presFlag, setPresFlag] = useState(false);

  // // Project Info
  // const [projNo, setProjectNo] = useState("");
  // const [projName, setProjectName] = useState("");
  // const [projDesc, setProjectDesc] = useState("");

  // // Line Tag
  // const [lineNo, setLineNo] = useState("");
  // const [lineFrom, setLineFrom] = useState("");
  // const [lineTo, setLineTo] = useState("");
  // const [note, setNote] = useState("");

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
  // const [resData, setResData] = useState<SizingData[]>([]);
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
    // const newResData: SizingData[] = workID.map((item) => {
    //   return {
    //     id: item.SIZE,
    //     actID: item.ID.toString(),
    //     vel: "",
    //     presDrop: "",
    //     vh: "",
    //     reynoldNo: "",
    //   };
    // });
    // newResData.map((item) => {
    //   rust_single_phase_hydraulic(item);
    // });
    // setResData(newResData);
    // setCalState(true);
  };

  // call Rust function
  // async function rust_single_phase_hydraulic(item: SizingData) {
  //   await invoke<Result>("invoke_hydraulic", {
  //     w: parseFloat(massFlowRate),
  //     rho: parseFloat(density),
  //     mu: parseFloat(viscosity),
  //     id: parseFloat(item.actID),
  //     e: parseFloat(roughness),
  //     sf: parseFloat(safeFactor),
  //   })
  //     .then((result) => {
  //       res = result as Result;
  //       item.vel = res.v.toFixed(4);
  //       item.presDrop = res.dp100.toFixed(6);
  //       item.vh = res.vh.toFixed(4);
  //       item.reynoldNo = fmt_f64(res.nre, 20, 4, 3);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }

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
          <Typography gutterBottom variant="h5" component="div">
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
                {/* <Tab label="Project Info" {...a11yProps(1)} />
                <Tab label="Line Tag" {...a11yProps(2)} />
                <Tab label="Pipe Sch." {...a11yProps(3)} /> */}
              </Tabs>
            </Box>
            {/* process data input page */}
            <CustomTabPanel value={value} index={0}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                sx={{
                  "& .MuiTextField-root": { mt: 2, width: "30ch" },
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
                  <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    defaultValue="1"
                    name="radio-buttons-group"
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
                        helperText={error ? "Please input correct number" : ""}
                        onChange={(e) => {
                          setLowPres(e.target.value);
                          validateInput(e.target.value);
                        }}
                        sx={{ ml: 4 }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="High limit"
                        variant="outlined"
                        value={highPres}
                        color="secondary"
                        error={error}
                        helperText={error ? "Please input correct number" : ""}
                        onChange={(e) => {
                          setHighPres(e.target.value);
                          validateInput(e.target.value);
                        }}
                        sx={{ ml: 4 }}
                      />
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Box>
            </CustomTabPanel>

            {/* <CustomTabPanel value={value} index={1}>
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
            </CustomTabPanel> */}
          </Box>
          <Button
            variant="contained"
            color="success"
            startIcon={<CalculateOutlinedIcon />}
            onClick={handleExecuteButtonClick}
          >
            {" "}
            Execute{" "}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Single;
