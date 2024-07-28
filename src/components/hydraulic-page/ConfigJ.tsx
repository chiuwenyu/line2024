import { Card, CardMedia, Grid, TextField, Typography } from "@mui/material";
import picA from "../../assets/ThermoSyphone-Case A.png";
import picB from "../../assets/ThermoSyphone-Case B.png";
import picC from "../../assets/ThermoSyphone-Case C.png";

const ConfigJ = (props: any) => {
  const {
    caseNo,
    jDownOutNozzleSize,
    setJDownOutNozzleSize,
    jRiserInNozzleSize,
    setJRiserInNozzleSize,
    jReboInNozzleSize,
    setJReboInNozzleSize,
    jReboOutNozzleSize,
    setJReboOutNozzleSize,
    jReboDP,
    setJReboDP,
    jT,
    setJT,
    jLC,
    setJLC,
    jL,
    setJL,
    jRD,
    setJRD,
    jSF,
    setJSF,
    validateInput,
    error301,
    error302,
    error303,
    error304,
    error305,
    error306,
    error307,
    error308,
    error309,
    error310,
  } = props;

  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ fontWeight: "medium", ml: 4 }}
      >
        {caseNo === "A"
          ? "Case A Configuration Data"
          : caseNo === "B"
          ? "Case B Configuration Data"
          : "Case C Configuration Data"}
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
            value={jDownOutNozzleSize}
            color="secondary"
            error={error301}
            helperText={error301 ? "Please input correct number" : ""}
            onChange={(e) => setJDownOutNozzleSize(e.target.value)}
            onBlur={(e) => validateInput("301", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="tower-riser-inlet-nozzle-size"
            label="Tower Riser Inlet Nozzle Size (in)"
            variant="outlined"
            value={jRiserInNozzleSize}
            color="secondary"
            error={error302}
            helperText={error302 ? "Please input correct number" : ""}
            onChange={(e) => setJRiserInNozzleSize(e.target.value)}
            onBlur={(e) => validateInput("302", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="reboiler-inlet-nozzle-size"
            label="Reboiler Inlet Nozzle Size (in)"
            variant="outlined"
            value={jReboInNozzleSize}
            color="secondary"
            error={error303}
            helperText={error303 ? "Please input correct number" : ""}
            onChange={(e) => setJReboInNozzleSize(e.target.value)}
            onBlur={(e) => validateInput("303", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="reboiler-outlet-nozzle-size"
            label="Reboiler Outlet Nozzle Size (in)"
            variant="outlined"
            value={jReboOutNozzleSize}
            color="secondary"
            error={error304}
            helperText={error304 ? "Please input correct number" : ""}
            onChange={(e) => setJReboOutNozzleSize(e.target.value)}
            onBlur={(e) => validateInput("304", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="reboiler-pressure-loss"
            label="Reboiler Press. Loss (Excl. Nozzle Loss) (Kg/cm^2)"
            variant="outlined"
            value={jReboDP}
            color="secondary"
            error={error305}
            helperText={error305 ? "Please input correct number" : ""}
            onChange={(e) => setJReboDP(e.target.value)}
            onBlur={(e) => validateInput("305", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="j-T"
            label="Tower T.L to C.L of the Riser Entering Tower <T> (mm)"
            variant="outlined"
            value={jT}
            color="secondary"
            error={error306}
            helperText={error306 ? "Please input correct number" : ""}
            onChange={(e) => setJT(e.target.value)}
            onBlur={(e) => validateInput("306", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          {caseNo === "A" && (
            <TextField
              id="j-LC"
              label="Tower Outlet Nozzle Higher than Riser Distance <LC> (mm)"
              variant="outlined"
              value={jLC}
              color="secondary"
              error={error307}
              helperText={error307 ? "Please input correct number" : ""}
              onChange={(e) => setJLC(e.target.value)}
              onBlur={(e) => validateInput("307", e.target.value)}
              InputLabelProps={{
                sx: {
                  color: "blue", // 預設顏色
                },
              }}
            />
          )}
          {caseNo === "C" && (
            <TextField
              id="j-L"
              label="Tower Baffle Top Lower than Riser Distance <L> (mm)"
              variant="outlined"
              value={jL}
              color="secondary"
              error={error308}
              helperText={error308 ? "Please input correct number" : ""}
              onChange={(e) => setJL(e.target.value)}
              onBlur={(e) => validateInput("308", e.target.value)}
              InputLabelProps={{
                sx: {
                  color: "blue", // 預設顏色
                },
              }}
            />
          )}
          <TextField
            id="j-RD"
            label="Reboiler Shell Diameter <RD> (mm)"
            variant="outlined"
            value={jRD}
            color="secondary"
            error={error309}
            helperText={error309 ? "Please input correct number" : ""}
            onChange={(e) => setJRD(e.target.value)}
            onBlur={(e) => validateInput("309", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="j-safety-factor"
            label="Safety Factor of Riser E.L. of Homo. Method (-)"
            variant="outlined"
            value={jSF}
            color="secondary"
            error={error310}
            helperText={error310 ? "Please input correct number" : ""}
            onChange={(e) => setJSF(e.target.value)}
            onBlur={(e) => validateInput("310", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
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
          {caseNo === "A" && (
            <Card elevation={3} sx={{ p: 4 }}>
              <CardMedia component="img" image={picA} alt="Case A" />
            </Card>
          )}
          {caseNo === "B" && (
            <Card elevation={3} sx={{ p: 4 }}>
              <CardMedia component="img" image={picB} alt="Case B" />
            </Card>
          )}
          {caseNo === "C" && (
            <Card elevation={3} sx={{ p: 4 }}>
              <CardMedia component="img" image={picC} alt="Case C" />
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ConfigJ;
