import {
  Box,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import picD from "../../assets/ThermoSyphone-Case D.png";
import Focus from "./Focus";
import { useState } from "react";

const ConfigK = (props: any) => {
  const {
    kDownOutNozzleSize,
    setKDownOutNozzleSize,
    kRiserInNozzleSize,
    setKRiserInNozzleSize,
    kReboInNozzleSize,
    setKReboInNozzleSize,
    kReboOutNozzleSize,
    setKReboOutNozzleSize,
    kReboDP,
    setKReboDP,
    kT,
    setKT,
    kHV,
    setKHV,
    kSF,
    setKSF,
    validateInput,
    error401,
    error402,
    error403,
    error404,
    error405,
    error406,
    error407,
    error408,
  } = props;

  // Focus state
  const [downOutNozz, setDownOutNozz] = useState(false);
  const [riserInNozz, setRiserInNozz] = useState(false);
  const [reboInNozz, setReboInNozz] = useState(false);
  const [reboOutNozz, setReboOutNozz] = useState(false);
  const [kRT, setKRT] = useState(false);
  const [rKHV, setRKHV] = useState(false);

  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ fontWeight: "medium", ml: 4 }}
      >
        "Case D Configuration Data"
      </Typography>
      <Grid container display={"flex"} flexDirection={"row"}>
        <Grid
          container
          display={"flex"}
          flexDirection={"column"}
          item
          xs={6}
          gap={2}
          sx={{
            ml: 4,
          }}
        >
          <TextField
            id="tower-downcomer-outlet-nozzle-size"
            label="Tower Downcomer Outlet Nozzle Size (in)"
            variant="outlined"
            value={kDownOutNozzleSize}
            color="secondary"
            error={error401}
            helperText={error401 ? "Please input correct number" : ""}
            onChange={(e) => setKDownOutNozzleSize(e.target.value)}
            onBlur={(e) => {
              validateInput("401", e.target.value);
              setDownOutNozz(false);
            }}
            onFocus={() => setDownOutNozz(true)}
          />
          <TextField
            id="tower-riser-inlet-nozzle-size"
            label="Tower Riser Inlet Nozzle Size (in)"
            variant="outlined"
            value={kRiserInNozzleSize}
            color="secondary"
            error={error402}
            helperText={error402 ? "Please input correct number" : ""}
            onChange={(e) => setKRiserInNozzleSize(e.target.value)}
            onBlur={(e) => {
              validateInput("402", e.target.value);
              setRiserInNozz(false);
            }}
            onFocus={() => setRiserInNozz(true)}
          />
          <TextField
            id="reboiler-inlet-nozzle-size"
            label="Reboiler Inlet Nozzle Size (in)"
            variant="outlined"
            value={kReboInNozzleSize}
            color="secondary"
            error={error403}
            helperText={error403 ? "Please input correct number" : ""}
            onChange={(e) => setKReboInNozzleSize(e.target.value)}
            onBlur={(e) => {
              validateInput("403", e.target.value);
              setReboInNozz(false);
            }}
            onFocus={() => setReboInNozz(true)}
          />
          <TextField
            id="reboiler-outlet-nozzle-size"
            label="Reboiler Outlet Nozzle Size (in)"
            variant="outlined"
            value={kReboOutNozzleSize}
            color="secondary"
            error={error404}
            helperText={error404 ? "Please input correct number" : ""}
            onChange={(e) => setKReboOutNozzleSize(e.target.value)}
            onBlur={(e) => {
              validateInput("404", e.target.value);
              setReboOutNozz(false);
            }}
            onFocus={() => setReboOutNozz(true)}
          />
          <TextField
            id="reboiler-pressure-loss"
            label="Reboiler Pressure Loss (excl. Nozzle Loss) [Kg/cm^2]"
            variant="outlined"
            value={kReboDP}
            color="secondary"
            error={error405}
            helperText={error405 ? "Please input correct number" : ""}
            onChange={(e) => setKReboDP(e.target.value)}
            onBlur={(e) => validateInput("405", e.target.value)}
          />
          <TextField
            id="tower-T"
            label="Tower T.L to C.L of the Riser Entering Tower <T> (mm)"
            variant="outlined"
            value={kT}
            color="secondary"
            error={error406}
            helperText={error406 ? "Please input correct number" : ""}
            onChange={(e) => setKT(e.target.value)}
            onBlur={(e) => {
              validateInput("406", e.target.value);
              setKRT(false);
            }}
            onFocus={() => setKRT(true)}
          />
          <TextField
            id="reboiler-vapor-space-height-kettle"
            label="Reboiler Vapor Space Height (Kettle) <HV> (mm)"
            variant="outlined"
            value={kHV}
            color="secondary"
            error={error407}
            helperText={error407 ? "Please input correct number" : ""}
            onChange={(e) => setKHV(e.target.value)}
            onBlur={(e) => {
              validateInput("407", e.target.value);
              setRKHV(false);
            }}
            onFocus={() => setRKHV(true)}
          />
          <TextField
            id="safety-factor-kSF"
            label="Safety Factor of Riser E.L of Homo. Method [-]"
            variant="outlined"
            value={kSF}
            color="secondary"
            error={error408}
            helperText={error408 ? "Please input correct number" : ""}
            onChange={(e) => setKSF(e.target.value)}
            onBlur={(e) => validateInput("408", e.target.value)}
          />
        </Grid>
        <Grid // This Grid is Manifold pipe column
          container
          item
          xs={4}
          sx={{
            ml: 5,
            height: "40vh",
          }}
        >
          <Box position="relative">
            <Card elevation={3} sx={{ p: 4 }}>
              <CardMedia component="img" image={picD} alt="Case D" />
            </Card>
            {downOutNozz && <Focus x="11%" y="53%" />}
            {riserInNozz && <Focus x="20%" y="17%" />}
            {reboInNozz && <Focus x="58.5%" y="79%" />}
            {reboOutNozz && <Focus x="68%" y="66%" />}
            {kRT && <Focus x="27%" y="35%" />}
            {rKHV && <Focus x="82%" y="69%" />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ConfigK;
