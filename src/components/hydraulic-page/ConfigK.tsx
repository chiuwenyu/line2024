import { Card, CardMedia, Grid, TextField, Typography } from "@mui/material";
import picD from "../../assets/ThermoSyphone-Case D.png";

const ConfigK = (props: any) => {
  const { kDownOutNozzleSize, setKDownOutNozzleSize, validateInput, error401 } =
    props;

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
            value={kDownOutNozzleSize}
            color="secondary"
            error={error401}
            helperText={error401 ? "Please input correct number" : ""}
            onChange={(e) => setKDownOutNozzleSize(e.target.value)}
            onBlur={(e) => validateInput("401", e.target.value)}
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
          <Card elevation={3} sx={{ p: 4 }}>
            <CardMedia component="img" image={picD} alt="Case D" />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ConfigK;
