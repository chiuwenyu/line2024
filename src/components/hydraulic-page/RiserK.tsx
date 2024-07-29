import { Grid, TextField, Typography } from "@mui/material";

const RiserK = (props: any) => {
  const {
    riserWGMain,
    setRiserWGMain,
    riserVapDensity,
    setRiserVapDensity,
    riserVapVisc,
    setRiserVapVisc,
    riserIDMain,
    setRiserIDMain,
    riserRough,
    setRiserRough,
    riserELMain,
    setRiserELMain,
    riserSF,
    setRiserSF,
    validateInput,
    error201,
    error203,
    error205,
    error207,
    error208,
    error209,
    error210,
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
        xs={4}
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
          id="riser-vapor-viscosity"
          label="Vapor Viscosity (cP)"
          variant="outlined"
          value={riserVapVisc}
          color="secondary"
          error={error205}
          helperText={error205 ? "Please input correct number" : ""}
          onChange={(e) => setRiserVapVisc(e.target.value)}
          onBlur={(e) => validateInput("205", e.target.value)}
          InputLabelProps={{
            sx: {
              color: "blue", // 預設顏色
            },
          }}
        />

        <TextField
          id="riser-pipe-diameter-main"
          label="Pipe Diameter - Main (m)"
          variant="outlined"
          value={riserIDMain}
          color="secondary"
          error={error207}
          helperText={error207 ? "Please input correct number" : ""}
          onChange={(e) => setRiserIDMain(e.target.value)}
          onBlur={(e) => validateInput("207", e.target.value)}
          InputLabelProps={{
            sx: {
              color: "blue", // 預設顏色
            },
          }}
        />
        <TextField
          id="riser-absolute-roughness"
          label="Pipe Absolute Roughness (mm)"
          variant="outlined"
          value={riserRough}
          color="secondary"
          error={error208}
          helperText={error208 ? "Please input correct number" : ""}
          onChange={(e) => setRiserRough(e.target.value)}
          onBlur={(e) => validateInput("208", e.target.value)}
          InputLabelProps={{
            sx: {
              color: "blue", // 預設顏色
            },
          }}
        />
        <TextField
          id="riser-elevation-length-main"
          label="Pipe Equivalent Length - Main (m) excl. H"
          variant="outlined"
          value={riserELMain}
          color="secondary"
          error={error209}
          helperText={error209 ? "Please input correct number" : ""}
          onChange={(e) => setRiserELMain(e.target.value)}
          onBlur={(e) => validateInput("209", e.target.value)}
          InputLabelProps={{
            sx: {
              color: "blue", // 預設顏色
            },
          }}
        />
        <TextField
          id="riser-safety-factor"
          label="Safety Factor for pres. drop"
          variant="outlined"
          value={riserSF}
          color="secondary"
          error={error210}
          helperText={error210 ? "Please input correct number" : ""}
          onChange={(e) => setRiserSF(e.target.value)}
          onBlur={(e) => validateInput("210", e.target.value)}
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

export default RiserK;
