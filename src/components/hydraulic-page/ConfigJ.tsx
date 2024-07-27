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
    validateInput,
    error301,
    error302,
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
          xs={3}
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
        </Grid>
        <Grid // This Grid is Manifold pipe column
          container
          item
          xs={4}
          gap={2}
          sx={{
            ml: 20,
            width: "100%",
          }}
        >
          {caseNo === "A" && (
            <Card sx={{ p: 4 }}>
              <CardMedia component="img" image={picA} alt="Case A" />
            </Card>
          )}
          {caseNo === "B" && (
            <Card sx={{ p: 4 }}>
              <CardMedia component="img" image={picB} alt="Case B" />
            </Card>
          )}
          {caseNo === "C" && (
            <Card sx={{ p: 4 }}>
              <CardMedia component="img" image={picC} alt="Case C" />
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ConfigJ;
