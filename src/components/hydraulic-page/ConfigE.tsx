import { Card, CardMedia, Grid, TextField, Typography } from "@mui/material";
import picE from "../../assets/ThermoSyphone-Case E.png";
import picF from "../../assets/ThermoSyphone-Case F.png";
import picG from "../../assets/ThermoSyphone-Case G.png";

const ConfigE = (props: any) => {
  const {
    caseNo,
    eDownOutNozzleSize,
    setEDownOutNozzleSize,
    validateInput,
    error501,
  } = props;

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
            onBlur={(e) => validateInput("501", e.target.value)}
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
            <Card elevation={3} sx={{ p: 4 }}>
              <CardMedia component="img" image={picE} alt="Case E" />
            </Card>
          )}
          {caseNo === "F" && (
            <Card elevation={3} sx={{ p: 4 }}>
              <CardMedia component="img" image={picF} alt="Case F" />
            </Card>
          )}
          {caseNo === "G" && (
            <Card elevation={3} sx={{ p: 4 }}>
              <CardMedia component="img" image={picG} alt="Case G" />
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ConfigE;
