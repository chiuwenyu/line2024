import { invoke } from "@tauri-apps/api/tauri";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Box,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Link,
} from "@mui/material";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import steamPNG from "../../assets/steam.png";
import seuif97 from "../../assets/SEUIF97.png";
import CloseIcon from "@mui/icons-material/Close";
import { parseFloatWithErrorHandling } from "../utils/utility";

// declare the result type
type Result = {
  p: number; // 0. Pressure, MPa
  t: number; // 1. Temperature, °C
  d: number; // 2. Density, kg/m³
  v: number; // 3. Specific Volume, m³/kg
  h: number; // 4. Specific enthalpy, kJ/kg
  s: number; // 5. Specific entropy, kJ/(kg·K)
  u: number; // 7. Specific internal energy, kJ/kg
  x: number; // 15. steam quality, 0 <= x <= 1
  dv: number; // 24. Dynamic viscosity, Pa·s
  kv: number; // 25. Kinematic viscosity, m2/s
  k: number; // 26. Thermal conductivity, W/(m·K)
  td: number; // 27. Thermal diffusivity, m2/s
  st: number; // 29. Surface tension, N/m
  lat: number; // cal. property, Latent Heat
};

// initial res instance
let res: Result = {
  p: -999.0,
  t: -999.0,
  d: -999.0,
  v: -999.0,
  h: -999.0,
  s: -999.0,
  u: -999.0,
  x: -999.0,
  dv: -999.0,
  kv: -999.0,
  k: -999.0,
  td: -999.0,
  st: -999.0,
  lat: -999.0,
};

const Conv = (value: number, deci: number) => {
  if (value < 0.0) {
    return "(N/A)";
  } else {
    return value.toFixed(deci);
  }
};

export const Steam = (props: any) => {
  const {
    steamState,
    setSteamState,
    temp,
    setTemp,
    pres,
    setPres,
    calState,
    setCalState,
  } = props;

  const [error, setError] = useState(false);
  const [presUnit, setPresUnit] = useState(10);

  const pcolor = grey[800];

  async function rust_satTemp() {
    await invoke<Result>("invoke_seuif", {
      pressure:
        presUnit === 10
          ? parseFloatWithErrorHandling(pres) // MPa
          : presUnit === 20
          ? (parseFloatWithErrorHandling(pres) + 1.0332) * 0.0980665 // Kg/cm² (gauge)
          : parseFloatWithErrorHandling(pres) * 0.0980665, // Kg/cm² (abs)
      temperature: parseFloatWithErrorHandling(temp),
      mode: steamState,
    })
      .then((result) => {
        res = result as Result;
        setCalState(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // 處理溫度輸入值驗證
  const handleTempChange = (e: any) => {
    const newValue = e.target.value;
    setTemp(newValue);
    // 驗證輸入值是否為正的浮點數
    const isPositiveFloat = /^([0-9]*[.])?[0-9]+$/;
    if (!isPositiveFloat.test(newValue)) {
      setError(true);
    } else {
      setError(false);
      setCalState(false);
    }
  };

  // 處理壓力單位變換
  const handlePresUnitChange = (e: any) => {
    setPresUnit(e.target.value);
    setCalState(false);
  };

  // 處理壓力輸入值驗證
  const handlePresChange = (e: any) => {
    const newValue = e.target.value;
    setPres(newValue);
    // 驗證輸入值是否為正的浮點數
    const isPositiveFloat = /^([0-9]*[.])?[0-9]+$/;
    if (!isPositiveFloat.test(newValue)) {
      setError(true);
    } else {
      setError(false);
      setCalState(false);
    }
  };

  return (
    <Grid
      container
      gap={6}
      sx={{
        height: "100%",
        bgcolor: "background.default",
        minHeight: "10vh",
      }}
    >
      {/* 輸入條件 */}
      <Grid item xs={3} sx={{ ml: 1 }}>
        <Card sx={{ maxWidth: 550 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: "medium" }}
            >
              Steam Property Calculator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is the program implementation of the high-speed IAPWS-IF97
              package seuif97. The IAPWS-IF97, known as the "IAPWS Industrial
              Formulation 1997 for the Thermodynamic Properties of Water and
              Steam".
            </Typography>
            <Box sx={{ mt: 2, fontSize: 12 }}>
              <Link
                href="http://www.iapws.org/relguide/IF97-Rev.html"
                target="_blank"
                rel="noopener"
              >
                IAPWS-IF97?
              </Link>
            </Box>
            <Box marginTop={1}>
              <Divider variant="fullWidth" />
            </Box>
            <Box
              component="form"
              display="flex"
              marginTop={2}
              flexDirection="column"
              sx={{
                "& .MuiTextField-root": { mt: 2, width: "15ch" },
              }}
            >
              <FormControl sx={{ mt: 2 }}>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  id="state-select"
                  value={steamState}
                  label="State"
                  onChange={(e) => {
                    setSteamState(e.target.value as number);
                    switch (e.target.value) {
                      case 10:
                        setTemp("0");
                        setPres("0");
                        break;
                      case 20:
                        setTemp("0");
                        break;
                      case 30:
                        setPres("0");
                        break;
                      case 40:
                        setTemp("0");
                        setPres("0");
                        break;
                      default:
                        break;
                    }
                    setCalState(false);
                  }}
                  sx={{ width: "30ch" }}
                >
                  <MenuItem value={0}>-- Select a State --</MenuItem>
                  <MenuItem value={10}>Saturated Steam by T</MenuItem>
                  <MenuItem value={20}>Saturated Steam by P</MenuItem>
                  <MenuItem value={30}>Saturated Water by T</MenuItem>
                  <MenuItem value={40}>Saturated Water by P</MenuItem>
                  <MenuItem value={50}>Superheated Steam by T, P</MenuItem>
                  <MenuItem value={60}>Subcool Water by T, P</MenuItem>
                </Select>
              </FormControl>
              {steamState === 20 ||
              steamState === 40 ||
              steamState === 0 ? undefined : (
                <TextField
                  id="outlined-basic"
                  label="Temperature (°C)"
                  variant="outlined"
                  value={temp}
                  error={error}
                  helperText={error ? "Please input correct number" : ""}
                  onChange={handleTempChange}
                />
              )}
              {steamState === 10 ||
              steamState === 30 ||
              steamState === 0 ? undefined : (
                <Grid
                  display="flex"
                  flexDirection="row"
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ mt: 2, ml: 0.5 }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Pressure"
                    variant="outlined"
                    value={pres}
                    error={error}
                    helperText={error ? "Please input correct number" : ""}
                    onChange={handlePresChange}
                  />
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={presUnit}
                    label="Age"
                    onChange={handlePresUnitChange}
                    sx={{
                      width: "15ch",
                      mt: 2,
                      ml: 1,
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none", // 移除外框
                      },
                    }}
                  >
                    <MenuItem value={10}>Mpa</MenuItem>
                    <MenuItem value={20}>Kg/cm²G</MenuItem>
                    <MenuItem value={30}>Kg/cm²</MenuItem>
                  </Select>
                </Grid>
              )}
            </Box>
          </CardContent>
          <CardActions sx={{ ml: 1, mt: 4, mb: 1 }}>
            {steamState != 0 && (
              <Button size="medium" onClick={rust_satTemp}>
                Calculate
              </Button>
            )}

            {steamState != 0 && (
              <Button
                style={{ marginLeft: "auto", marginRight: "20px" }}
                size="medium"
                disabled={calState ? false : true}
                onClick={() => {
                  localStorage.setItem("density", res.d.toString());
                  localStorage.setItem(
                    "viscosity",
                    (res.dv * 1000.0).toString()
                  );
                }}
              >
                Copy params
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>

      {/* 輸出結果 */}
      {calState === false && (
        <Grid sx={{ mt: 5, ml: 4 }}>
          <img src={seuif97} alt="seuif97" style={{ width: "50vh" }} />
        </Grid>
      )}
      {calState && (
        <Grid item xs={6} sx={{ ml: 2 }}>
          <Card
            style={{ backgroundColor: pcolor, color: "white" }}
            sx={{ maxWidth: 450, borderRadius: 2 }}
          >
            <CardContent>
              <Grid display="flex" flexDirection="row" sx={{ mb: 2 }}>
                <img src={steamPNG} alt="STEAM" width="24" height="24" />

                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ ml: 1, fontFamily: "serif", fontStyle: "italic" }}
                >
                  Steam-water property
                </Typography>
                <CloseIcon
                  style={{ marginLeft: "auto", cursor: "pointer" }}
                  onClick={() => setCalState(false)}
                  sx={{
                    "&:hover": {
                      transform: "scale(1.2)", // 設置 hover 時的縮放效果
                      backgroundColor: "red",
                      color: "white",
                    },
                    mr: -1,
                    mt: -1,
                  }}
                />
              </Grid>
              {steamState != 0 && (
                <Typography
                  variant="body1"
                  color="white"
                  style={{ lineHeight: 2.5 }}
                  sx={{ ml: 3 }}
                >
                  {steamState === 10
                    ? `Saturated Steam properties @ ${temp} °C :`
                    : undefined}
                  {steamState === 20
                    ? `Saturated Steam properties @ ${pres}` +
                      (presUnit === 10
                        ? " MPa"
                        : presUnit === 20
                        ? " Kg/cm² G"
                        : " Kg/cm²") +
                      ` :`
                    : undefined}
                  {steamState === 30
                    ? `Saturated Water properties @ ${temp} °C :`
                    : undefined}
                  {steamState === 40
                    ? `Saturated Water properties @ ${pres}` +
                      (presUnit === 10
                        ? " MPa"
                        : presUnit === 20
                        ? " Kg/cm² G"
                        : " Kg/cm²") +
                      ` :`
                    : undefined}
                  {steamState === 50
                    ? `Superheated Steam properties @ ${temp} °C and ${pres}` +
                      (presUnit === 10
                        ? " MPa"
                        : presUnit === 20
                        ? " Kg/cm² G"
                        : " Kg/cm²") +
                      ` :`
                    : undefined}
                  {steamState === 60
                    ? `Subcool water properties @ ${temp} °C and ${pres} MPa` +
                      (presUnit === 10
                        ? " MPa"
                        : presUnit === 20
                        ? " Kg/cm² G"
                        : " Kg/cm²") +
                      ` :`
                    : undefined}
                  <br />
                  {steamState === 10
                    ? `Sat. Pressure, p =` +
                      "  " +
                      (presUnit === 10
                        ? Conv(res.p, 4) + " MPa"
                        : presUnit === 20
                        ? Conv(res.p * 10.1972 - 1.0332, 4) + " Kg/cm² G"
                        : Conv(res.p * 10.1972, 4) + " Kg/cm²")
                    : undefined}
                  {steamState === 20
                    ? `Sat. Temp.,  t = ${Conv(res.t, 4)} °C`
                    : undefined}
                  {steamState === 30
                    ? `Sat. Pressure,  p = ${Conv(res.p, 4)}` +
                      (presUnit === 10
                        ? " MPa"
                        : presUnit === 20
                        ? " Kg/cm² G"
                        : " Kg/cm²") +
                      ` :`
                    : undefined}
                  {steamState === 40
                    ? `Sat. Temp.,  t = ${Conv(res.t, 4)} °C`
                    : undefined}
                  {steamState === 10 ||
                  steamState === 20 ||
                  steamState === 30 ||
                  steamState === 40 ? (
                    <br />
                  ) : undefined}
                  &bull;&nbsp;&nbsp;&nbsp;Density,&nbsp;&nbsp; d ={" "}
                  {Conv(res.d, 4)} kg/m³
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Specific Volume,&nbsp;&nbsp; v ={" "}
                  {Conv(res.v, 6)} m³/kg
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Specific enthalpy,&nbsp;&nbsp; h ={" "}
                  {Conv(res.h, 4)} kJ/kg
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Specific entropy,&nbsp;&nbsp; s ={" "}
                  {Conv(res.s, 4)} kJ/(kg·K)
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Specific internal energy,&nbsp;&nbsp;
                  u = {Conv(res.u, 4)} kJ/kg
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Steam quality,&nbsp;&nbsp; x ={" "}
                  {Conv(res.x, 2)}
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Dynamic viscosity,&nbsp;&nbsp; dv ={" "}
                  {Conv(res.dv * 1000.0, 4)} cP
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Kinematic viscosity,&nbsp;&nbsp; kv ={" "}
                  {Conv(res.kv, 8)} m²/s
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Thermal conductivity,&nbsp;&nbsp; k ={" "}
                  {Conv(res.k, 8)} W/(m·K)
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Thermal diffusivity,&nbsp;&nbsp; td ={" "}
                  {Conv(res.td, 8)} m²/s
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Surface tension,&nbsp;&nbsp; st ={" "}
                  {Conv(res.st, 4)} N/m
                  <br />
                  &bull;&nbsp;&nbsp;&nbsp;Latent Hea,&nbsp;&nbsp; lat ={" "}
                  {Conv(res.lat / 4.1868, 4)} kCal/kg
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default Steam;
