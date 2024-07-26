import { Grid, TextField, Typography } from "@mui/material";

const Riser1 = (props: any) => {
  const {
    riserWGMain,
    setRiserWGMain,
    riserWLMain,
    setRiserWLMain,
    riserVapDensity,
    setRiserVapDensity,
    riserLiqDensity,
    setRiserLiqDensity,
    validateInput,
    error201,
    error202,
    error203,
    error204,
  } = props;

  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ fontWeight: "medium", ml: 4 }}
      >
        Riser Data:
      </Typography>
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
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          textAlign="center"
          sx={{ fontWeight: "medium", mb: -1 }}
        >
          Main pipe{" "}
        </Typography>
        <TextField
          id="riser-vapor-flow-rate"
          label="Vapor Flow Rate - Main (Kg/hr)"
          variant="outlined"
          value={riserWGMain}
          color="secondary"
          error={error201}
          helperText={error201 ? "Please input correct number" : ""}
          onChange={(e) => setRiserWGMain(e.target.value)}
          onBlur={(e) => validateInput("201", e.target.value)}
          InputLabelProps={{
            sx: {
              color: "blue", // 預設顏色
            },
          }}
        />
        <TextField
          id="riser-liquid-flow-rate"
          label="Liquid Flow Rate - Main (Kg/hr)"
          variant="outlined"
          value={riserWLMain}
          color="secondary"
          error={error202}
          helperText={error202 ? "Please input correct number" : ""}
          onChange={(e) => setRiserWLMain(e.target.value)}
          onBlur={(e) => validateInput("202", e.target.value)}
          InputLabelProps={{
            sx: {
              color: "blue", // 預設顏色
            },
          }}
        />
        <TextField
          id="riser-vapor-density"
          label="Vapor Density (Kg/m^3)"
          variant="outlined"
          value={riserVapDensity}
          color="secondary"
          error={error203}
          helperText={error203 ? "Please input correct number" : ""}
          onChange={(e) => setRiserVapDensity(e.target.value)}
          onBlur={(e) => validateInput("203", e.target.value)}
          InputLabelProps={{
            sx: {
              color: "blue", // 預設顏色
            },
          }}
        />
        <TextField
          id="riser-liquid-density"
          label="Liquid Density (Kg/m^3)"
          variant="outlined"
          value={riserLiqDensity}
          color="secondary"
          error={error204}
          helperText={error204 ? "Please input correct number" : ""}
          onChange={(e) => setRiserLiqDensity(e.target.value)}
          onBlur={(e) => validateInput("204", e.target.value)}
          InputLabelProps={{
            sx: {
              color: "blue", // 預設顏色
            },
          }}
        />
      </Grid>
    </>
  );
};

export default Riser1;
