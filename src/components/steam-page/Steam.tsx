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
import { deepPurple } from "@mui/material/colors";

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

  const pcolor = deepPurple[500];

  async function rust_satTemp() {
    await invoke<Result>("invoke_seuif", {
      pressure: parseFloat(pres),
      temperature: parseFloat(temp),
      mode: steamState,
    })
      .then((result) => {
        res = result as Result;
        // console.log(res.d);
        // console.log(res.h);
        setCalState(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // 處理溫度輸入值
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

  // 處理壓力輸入值
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
      // alignItems="center"
      gap={6}
      sx={{
        height: "100%",
        bgcolor: "background.default",
        minHeight: "10vh",
      }}
    >
      {/* 輸入條件 */}
      <Grid item xs={4} sx={{ ml: 1 }}>
        <Card sx={{ maxWidth: 550 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
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
                "& .MuiTextField-root": { mt: 2, width: "30ch" },
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
                <TextField
                  id="outlined-basic"
                  label="Pressure (MPa)"
                  variant="outlined"
                  value={pres}
                  error={error}
                  helperText={error ? "Please input correct number" : ""}
                  onChange={handlePresChange}
                />
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
      {calState && (
        <Grid item xs={6} sx={{ ml: 2 }}>
          <Card
            style={{ backgroundColor: pcolor, color: "white" }}
            sx={{ maxWidth: 500 }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Calculated Property
              </Typography>
              {steamState != 0 && (
                <Typography
                  variant="body1"
                  color="white"
                  style={{ lineHeight: 2 }}
                >
                  {steamState === 10
                    ? `Saturated Steam properties @${temp} °C :`
                    : undefined}
                  {steamState === 20
                    ? `Saturated Steam properties @${pres} MPa :`
                    : undefined}
                  {steamState === 30
                    ? `Saturated Water properties @${temp} °C :`
                    : undefined}
                  {steamState === 40
                    ? `Saturated Water properties @${pres} MPa:`
                    : undefined}
                  {steamState === 50
                    ? `Superheated Steam properties @${temp} °C and ${pres} MPa :`
                    : undefined}
                  {steamState === 60
                    ? `Subcool water properties @${temp} °C and ${pres} MPa :`
                    : undefined}
                  <br />
                  {steamState === 10
                    ? `Sat. Pressure, p = ${Conv(res.p, 4)} MPa`
                    : undefined}
                  {steamState === 20
                    ? `Sat. Temp., t = ${Conv(res.t, 4)} °C`
                    : undefined}
                  {steamState === 30
                    ? `Sat. Pressure, p = ${Conv(res.p, 4)} MPa`
                    : undefined}
                  {steamState === 40
                    ? `Sat. Temp., t = ${Conv(res.t, 4)} °C`
                    : undefined}
                  {steamState === 10 ||
                  steamState === 20 ||
                  steamState === 30 ||
                  steamState === 40 ? (
                    <br />
                  ) : undefined}
                  Density, d = {Conv(res.d, 4)} kg/m³
                  <br />
                  Specific Volume, v = {Conv(res.v, 6)} m³/kg
                  <br />
                  Specific enthalpy, h = {Conv(res.h, 4)} kJ/kg
                  <br />
                  Specific entropy, s = {Conv(res.s, 4)} kJ/(kg·K)
                  <br />
                  Specific internal energy, u = {Conv(res.u, 4)} kJ/kg
                  <br />
                  Steam quality, x = {Conv(res.x, 2)}
                  <br />
                  Dynamic viscosity, dv = {Conv(res.dv * 1000.0, 4)} cP
                  <br />
                  Kinematic viscosity, kv = {Conv(res.kv, 8)} m²/s
                  <br />
                  Thermal conductivity, k = {Conv(res.k, 8)} W/(m·K)
                  <br />
                  Thermal diffusivity, td = {Conv(res.td, 8)} m²/s
                  <br />
                  Surface tension, st = {Conv(res.st, 4)} N/m
                  <br />
                  Latent Hea, lat = {Conv(res.lat, 4)} kJ/kg
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
