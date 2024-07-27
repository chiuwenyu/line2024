import { Grid, TextField, Typography } from "@mui/material";

const Riser3 = (props: any) => {
  const {
    riserWGMain,
    setRiserWGMain,
    riserWLMain,
    setRiserWLMain,
    riserVapDensity,
    setRiserVapDensity,
    riserLiqDensity,
    setRiserLiqDensity,
    riserVapVisc,
    setRiserVapVisc,
    riserLiqVisc,
    setRiserLiqVisc,
    riserIDMain,
    setRiserIDMain,
    riserRough,
    setRiserRough,
    riserELMain,
    setRiserELMain,
    riserSF,
    setRiserSF,
    riserHR,
    setRiserHR,
    riserWGMF,
    setRiserWGMF,
    riserWGLead,
    setRiserWGLead,
    riserWLMF,
    setRiserWLMF,
    riserWLLead,
    setRiserWLLead,
    riserIDMF,
    setRiserIDMF,
    riserIDLead,
    setRiserIDLead,
    riserELMF,
    setRiserELMF,
    riserELLead,
    setRiserELLead,
    validateInput,
    error201,
    error202,
    error203,
    error204,
    error205,
    error206,
    error207,
    error208,
    error209,
    error210,
    error211,
    error212,
    error213,
    error214,
    error215,
    error216,
    error217,
    error218,
    error219,
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
            id="riser-liquid-viscosity"
            label="Liquid Viscosity (cP)"
            variant="outlined"
            value={riserLiqVisc}
            color="secondary"
            error={error206}
            helperText={error206 ? "Please input correct number" : ""}
            onChange={(e) => setRiserLiqVisc(e.target.value)}
            onBlur={(e) => validateInput("206", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="riser-pipe-diameter-main"
            label="Pipe Diameter - Main (in)"
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
          <TextField
            id="riser-HR"
            label="HR (Height from Reboiler to Manifold) (m)"
            variant="outlined"
            value={riserHR}
            color="secondary"
            error={error211}
            helperText={error211 ? "Please input correct number" : ""}
            onChange={(e) => setRiserHR(e.target.value)}
            onBlur={(e) => validateInput("211", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
        </Grid>
        <Grid // This Grid is Manifold pipe column
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
            Manifold pipe{" "}
          </Typography>
          <TextField
            id="riser-vapor-flow-rate-MF"
            label="Vapor Flow Rate - Manifold (Kg/hr)"
            variant="outlined"
            value={riserWGMF}
            color="secondary"
            error={error212}
            helperText={error212 ? "Please input correct number" : ""}
            onChange={(e) => setRiserWGMF(e.target.value)}
            onBlur={(e) => validateInput("212", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "red", // 預設顏色
              },
            }}
          />
          <TextField
            id="riser-liquid-flow-rate-MF"
            label="Liquid Flow Rate - Manifold (Kg/hr)"
            variant="outlined"
            value={riserWLMF}
            color="secondary"
            error={error214}
            helperText={error214 ? "Please input correct number" : ""}
            onChange={(e) => setRiserWLMF(e.target.value)}
            onBlur={(e) => validateInput("214", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "red", // 預設顏色
              },
            }}
          />
          <TextField
            id="riser-pipe-diameter-MF"
            label="Pipe Diameter - Manifold (in)"
            variant="outlined"
            value={riserIDMF}
            color="secondary"
            error={error216}
            helperText={error216 ? "Please input correct number" : ""}
            onChange={(e) => setRiserIDMF(e.target.value)}
            onBlur={(e) => validateInput("216", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "red", // 預設顏色
              },
            }}
            sx={{ mt: 34 }}
          />
          <TextField
            id="riser-equivalent-length-MF"
            label="Pipe Equivalent Length - Manifold (m)"
            variant="outlined"
            value={riserELMF}
            color="secondary"
            error={error218}
            helperText={error218 ? "Please input correct number" : ""}
            onChange={(e) => setRiserELMF(e.target.value)}
            onBlur={(e) => validateInput("218", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "red", // 預設顏色
              },
            }}
            sx={{ mt: 9 }}
          />
        </Grid>
        <Grid // This Grid Lead Pipe column
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
            Lead pipe{" "}
          </Typography>
          <TextField
            id="riser-vapor-flow-rate-lead"
            label="Vapor Flow Rate - Lead (Kg/hr)"
            variant="outlined"
            value={riserWGLead}
            color="secondary"
            error={error213}
            helperText={error213 ? "Please input correct number" : ""}
            onChange={(e) => setRiserWGLead(e.target.value)}
            onBlur={(e) => validateInput("213", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "green", // 預設顏色
              },
            }}
          />
          <TextField
            id="riser-liquid-flow-rate-lead"
            label="Liquid Flow Rate - Lead (Kg/hr)"
            variant="outlined"
            value={riserWLLead}
            color="secondary"
            error={error215}
            helperText={error215 ? "Please input correct number" : ""}
            onChange={(e) => setRiserWLLead(e.target.value)}
            onBlur={(e) => validateInput("215", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "green", // 預設顏色
              },
            }}
          />
          <TextField
            id="riser-pipe-diameter-lead"
            label="Pipe Diameter - Lead (in)"
            variant="outlined"
            value={riserIDLead}
            color="secondary"
            error={error217}
            helperText={error217 ? "Please input correct number" : ""}
            onChange={(e) => setRiserIDLead(e.target.value)}
            onBlur={(e) => validateInput("217", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "green", // 預設顏色
              },
            }}
            sx={{ mt: 34 }}
          />
          <TextField
            id="riser-equivalent-length-lead"
            label="Pipe Equivalent Length - Lead (m)"
            variant="outlined"
            value={riserELLead}
            color="secondary"
            error={error219}
            helperText={error219 ? "Please input correct number" : ""}
            onChange={(e) => setRiserELLead(e.target.value)}
            onBlur={(e) => validateInput("219", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "green", // 預設顏色
              },
            }}
            sx={{ mt: 9 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Riser3;
