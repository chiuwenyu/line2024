import { Card, CardMedia, Grid, TextField, Typography } from "@mui/material";
import picA from "../../assets/ThermoSyphone-Case A.png";

const ConfigJ = (props: any) => {
  const {
    caseNo,
    jDownOutNozzleSize,
    setJDownOutNozzleSize,
    validateInput,
    error301,
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
            id="tower-downcomer-nozzle-size"
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
        </Grid>
      </Grid>
    </>
  );
};

export default ConfigJ;
