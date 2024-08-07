import {
  Box,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import picE from "../../assets/ThermoSyphone-Case E.png";
import picF from "../../assets/ThermoSyphone-Case F.png";
import picG from "../../assets/ThermoSyphone-Case G.png";
import { useState } from "react";
import Focus from "./Focus";

const ConfigE = (props: any) => {
  const {
    caseNo,
    eDownOutNozzleSize,
    setEDownOutNozzleSize,
    eRiserInNozzleSize,
    setERiserInNozzleSize,
    eReboInNozzleSize,
    setEReboInNozzleSize,
    eReboOutNozzleSize,
    setEReboOutNozzleSize,
    eReboDP,
    setEReboDP,
    eT,
    setET,
    eL,
    setEL,
    eLC,
    setELC,
    eE,
    setEE,
    eBD,
    setEBD,
    eSF,
    setESF,
    validateInput,
    error501,
    error502,
    error503,
    error504,
    error505,
    error506,
    error507,
    error508,
    error509,
    error510,
    error511,
  } = props;

  // Focus state
  const [downOutNozz, setDownOutNozz] = useState(false); // Tower downcomer outlet nozzle focus state
  const [riserInNozz, setRiserInNozz] = useState(false); // Tower riser inlet nozzle focus state
  const [reboInNozz, setReboInNozz] = useState(false); // Reboiler inlet nozzle focus state
  const [reboOutNozz, setReboOutNozz] = useState(false); // Reboiler outlet nozzle focus state
  const [eRT, setERT] = useState(false); // Tower T.L to C.L of the Riser Entering Tower <T> focus state
  const [eRL, setERL] = useState(false); // Tower Baffle Top lower than Riser Distance <L> focus state
  const [eRLC, setERLC] = useState(false); // Tower Outlet Nozzle Higher than Riser Distance <LC> focus state
  const [eRE, setERE] = useState(false); // Reboileer Tube Length (Vertical) <E>focus state

  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ fontWeight: "medium", ml: 4 }}
      >
        {caseNo === "E"
          ? "Case E Configuration Data"
          : caseNo === "F"
          ? "Case F Configuration Data"
          : "Case G Configuration Data"}
        :
      </Typography>
      <Grid container display={"flex"} flexDirection={"row"}>
        <Grid
          container
          display={"flex"}
          flexDirection={"column"}
          item
          xs={4}
          gap={2}
          sx={{
            ml: 4,
            width: "75%",
          }}
        >
          <TextField
            id="tower-downcomer-outlet-nozzle-size"
            label="Tower Downcomer Outlet Nozzle Size (in)"
            variant="outlined"
            value={eDownOutNozzleSize}
            color="secondary"
            error={error501}
            helperText={error501 ? "Please input correct number" : ""}
            onChange={(e) => setEDownOutNozzleSize(e.target.value)}
            onBlur={(e) => {
              validateInput("501", e.target.value);
              setDownOutNozz(false);
            }}
            onFocus={() => setDownOutNozz(true)}
          />
          <TextField
            id="tower-riser-inlet-nozzle-size"
            label="Tower Riser Inlet Nozzle Size (in)"
            variant="outlined"
            value={eRiserInNozzleSize}
            color="secondary"
            error={error502}
            helperText={error502 ? "Please input correct number" : ""}
            onChange={(e) => setERiserInNozzleSize(e.target.value)}
            onBlur={(e) => {
              validateInput("502", e.target.value);
              setRiserInNozz(false);
            }}
            onFocus={() => setRiserInNozz(true)}
          />
          <TextField
            id="reboiler-inlet-nozzle-size"
            label="Reboiler Inlet Nozzle Size (in)"
            variant="outlined"
            value={eReboInNozzleSize}
            color="secondary"
            error={error503}
            helperText={error503 ? "Please input correct number" : ""}
            onChange={(e) => setEReboInNozzleSize(e.target.value)}
            onBlur={(e) => {
              validateInput("503", e.target.value);
              setReboInNozz(false);
            }}
            onFocus={() => setReboInNozz(true)}
          />
          <TextField
            id="reboiler-outlet-nozzle-size"
            label="Reboiler Outlet Nozzle Size (in)"
            variant="outlined"
            value={eReboOutNozzleSize}
            color="secondary"
            error={error504}
            helperText={error504 ? "Please input correct number" : ""}
            onChange={(e) => setEReboOutNozzleSize(e.target.value)}
            onBlur={(e) => {
              validateInput("504", e.target.value);
              setReboOutNozz(false);
            }}
            onFocus={() => setReboOutNozz(true)}
          />
          <TextField
            id="reboiler-pressure-loss"
            label="Reboiler Pressure Loss (Kg/cm^2) (Excl. Nozzle Loss)"
            variant="outlined"
            value={eReboDP}
            color="secondary"
            error={error505}
            helperText={error505 ? "Please input correct number" : ""}
            onChange={(e) => setEReboDP(e.target.value)}
            onBlur={(e) => validateInput("505", e.target.value)}
          />
          <TextField
            id="E-T"
            label="Tower T.L to C.L of the Riser Entering Tower <T> (mm)"
            variant="outlined"
            value={eT}
            color="secondary"
            error={error506}
            helperText={error506 ? "Please input correct number" : ""}
            onChange={(e) => setET(e.target.value)}
            onBlur={(e) => {
              validateInput("506", e.target.value);
              setERT(false);
            }}
            onFocus={() => setERT(true)}
          />
          {caseNo === "G" && (
            <TextField
              id="E-L"
              label="Tower Base to Riser Inlet Nozzle Distance <L> (mm)"
              variant="outlined"
              value={eL}
              color="secondary"
              error={error507}
              helperText={error507 ? "Please input correct number" : ""}
              onChange={(e) => setEL(e.target.value)}
              onBlur={(e) => {
                validateInput("507", e.target.value);
                setERL(false);
              }}
              onFocus={() => setERL(true)}
            />
          )}
          {caseNo === "F" && (
            <TextField
              id="E-LC"
              label="Tower Outlet Nozzle Higher than Riser Distance <LC> (mm)"
              variant="outlined"
              value={eLC}
              color="secondary"
              error={error508}
              helperText={error508 ? "Please input correct number" : ""}
              onChange={(e) => setELC(e.target.value)}
              onBlur={(e) => {
                validateInput("508", e.target.value);
                setERLC(false);
              }}
              onFocus={() => setERLC(true)}
            />
          )}
          <TextField
            id="E-E"
            label="Reboileer Tube Length (Vertical) <E> (mm)"
            variant="outlined"
            value={eE}
            color="secondary"
            error={error509}
            helperText={error509 ? "Please input correct number" : ""}
            onChange={(e) => setEE(e.target.value)}
            onBlur={(e) => {
              validateInput("509", e.target.value);
              setERE(false);
            }}
            onFocus={() => setERE(true)}
          />
          <TextField
            id="E-BD"
            label="Tube Length Submerge with Liquid (Vetical) <BD> (mm)"
            variant="outlined"
            value={eBD}
            color="secondary"
            error={error510}
            helperText={error510 ? "Please input correct number" : ""}
            onChange={(e) => setEBD(e.target.value)}
            onBlur={(e) => validateInput("510", e.target.value)}
          />
          <TextField
            id="E-SF"
            label="Safety Factor of Riser E.L of Homo. Method"
            variant="outlined"
            value={eSF}
            color="secondary"
            error={error511}
            helperText={error511 ? "Please input correct number" : ""}
            onChange={(e) => setESF(e.target.value)}
            onBlur={(e) => validateInput("511", e.target.value)}
          />
        </Grid>
        <Grid // This Grid is Manifold pipe column
          container
          item
          xs={4}
          gap={2}
          sx={{
            ml: 15,
            width: "100%",
            height: "40vh",
          }}
        >
          {caseNo === "E" && (
            <Box position="relative">
              <Card elevation={3} sx={{ p: 4 }}>
                <CardMedia component="img" image={picE} alt="Case E" />
              </Card>
              {downOutNozz && <Focus x="12%" y="52%" />}
              {riserInNozz && <Focus x="22%" y="17%" />}
              {reboInNozz && <Focus x="58%" y="84%" />}
              {reboOutNozz && <Focus x="64%" y="42%" />}
              {eRT && <Focus x="40%" y="32%" />}
              {eRE && <Focus x="78%" y="65.5%" />}
            </Box>
          )}
          {caseNo === "F" && (
            <Box position="relative">
              <Card elevation={3} sx={{ p: 4 }}>
                <CardMedia component="img" image={picF} alt="Case F" />
              </Card>
              {downOutNozz && <Focus x="12%" y="52%" />}
              {riserInNozz && <Focus x="22%" y="17%" />}
              {reboInNozz && <Focus x="58%" y="84%" />}
              {reboOutNozz && <Focus x="64%" y="42%" />}
              {eRT && <Focus x="40%" y="32%" />}
              {eRLC && <Focus x="38%" y="14%" />}
              {eRE && <Focus x="78%" y="65.5%" />}
            </Box>
          )}
          {caseNo === "G" && (
            <Box position="relative">
              <Card elevation={3} sx={{ p: 4 }}>
                <CardMedia component="img" image={picG} alt="Case G" />
              </Card>
              {downOutNozz && <Focus x="12%" y="52%" />}
              {riserInNozz && <Focus x="22%" y="17%" />}
              {reboInNozz && <Focus x="58%" y="84%" />}
              {reboOutNozz && <Focus x="64%" y="42%" />}
              {eRT && <Focus x="40%" y="32%" />}
              {eRL && <Focus x="26%" y="23%" />}
              {eRE && <Focus x="78%" y="65.5%" />}
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ConfigE;
