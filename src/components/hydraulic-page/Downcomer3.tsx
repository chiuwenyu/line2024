import { Grid, TextField, Typography } from "@mui/material";

const Downcomer3 = (props: any) => {
  const {
    downFlowRateMain,
    setDownFlowRateMain,
    downDensity,
    setDownDensity,
    downVisc,
    setDownVisc,
    downIDMain,
    setDownIDMain,
    downRough,
    setDownRough,
    downELMain,
    setDownELMain,
    downSF,
    setDownSF,
    downHD,
    setDownHD,
    downFlowRateMF,
    setDownFlowRateMF,
    downFlowRateLead,
    setDownFlowRateLead,
    downIDMF,
    setDownIDMF,
    downIDLead,
    setDownIDLead,
    downELMF,
    setDownELMF,
    downELLead,
    setDownELLead,
    validateInput,
    error101,
    error102,
    error103,
    error104,
    error105,
    error106,
    error107,
    error108,
    error109,
    error110,
    error111,
    error112,
    error113,
    error114,
  } = props;
  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ fontWeight: "medium", ml: 4 }}
      >
        Downcomer Data:
      </Typography>
      <Grid container display={"flex"} flexDirection={"row"}>
        <Grid // This Grid is Main pipe column
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
            id="down-main-flow-rate"
            label="Total Flow Rate - Main (Kg/hr)"
            variant="outlined"
            value={downFlowRateMain}
            color="secondary"
            error={error101}
            helperText={error101 ? "Please input correct number" : ""}
            onChange={(e) => setDownFlowRateMain(e.target.value)}
            onBlur={(e) => validateInput("101", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="down-fluid-density"
            label="Fluid Density (Kg/m^3)"
            variant="outlined"
            value={downDensity}
            color="secondary"
            error={error102}
            helperText={error102 ? "Please input correct number" : ""}
            onChange={(e) => setDownDensity(e.target.value)}
            onBlur={(e) => validateInput("102", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="down-fluid-viscosity"
            label="Fluid Viscosity (cP)"
            variant="outlined"
            value={downVisc}
            color="secondary"
            error={error103}
            helperText={error103 ? "Please input correct number" : ""}
            onChange={(e) => setDownVisc(e.target.value)}
            onBlur={(e) => validateInput("103", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="down-main-ID"
            label="Pipe Diameter - Main (in)"
            variant="outlined"
            value={downIDMain}
            color="secondary"
            error={error104}
            helperText={error104 ? "Please input correct number" : ""}
            onChange={(e) => setDownIDMain(e.target.value)}
            onBlur={(e) => validateInput("104", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="down-main-rough"
            label="Pipe Absolute Roughness (mm)"
            variant="outlined"
            value={downRough}
            color="secondary"
            error={error105}
            helperText={error105 ? "Please input correct number" : ""}
            onChange={(e) => setDownRough(e.target.value)}
            onBlur={(e) => validateInput("105", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="down-main-EL"
            label="Pipe Equivalent Length - Main (m) excl. H"
            variant="outlined"
            value={downELMain}
            color="secondary"
            error={error106}
            helperText={error106 ? "Please input correct number" : ""}
            onChange={(e) => setDownELMain(e.target.value)}
            onBlur={(e) => validateInput("106", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
              },
            }}
          />
          <TextField
            id="down-main-SF"
            label="Safety Factor for pres. drop"
            variant="outlined"
            value={downSF}
            color="secondary"
            error={error107}
            helperText={error107 ? "Please input correct number" : ""}
            onChange={(e) => setDownSF(e.target.value)}
            onBlur={(e) => validateInput("107", e.target.value)}
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
            id="down-MF-flow-rate"
            label="Total Flow Rate - Manifold (Kg/hr)"
            variant="outlined"
            value={downFlowRateMF}
            color="secondary"
            error={error109}
            helperText={error109 ? "Please input correct number" : ""}
            onChange={(e) => setDownFlowRateMF(e.target.value)}
            onBlur={(e) => validateInput("109", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "red", // 預設顏色
              },
            }}
          />
          <TextField
            id="down-MF-ID"
            label="Pipe Diameter - Manifold (in)"
            variant="outlined"
            value={downIDMF}
            color="secondary"
            error={error111}
            helperText={error111 ? "Please input correct number" : ""}
            onChange={(e) => setDownIDMF(e.target.value)}
            onBlur={(e) => validateInput("111", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "red", // 預設顏色
              },
            }}
            sx={{ mt: 17 }}
          />
          <TextField
            id="down-MF-EL"
            label="Pipe Equivalent Length - Manifold (m)"
            variant="outlined"
            value={downELMF}
            color="secondary"
            error={error113}
            helperText={error113 ? "Please input correct number" : ""}
            onChange={(e) => setDownELMF(e.target.value)}
            onBlur={(e) => validateInput("113", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "red", // 預設顏色
              },
            }}
            sx={{ mt: 9 }}
          />
          <TextField
            id="down-HD"
            label="HD (Height from mainfold to reboiler) (m)"
            variant="outlined"
            value={downHD}
            color="secondary"
            error={error108}
            helperText={error108 ? "Please input correct number" : ""}
            onChange={(e) => setDownHD(e.target.value)}
            onBlur={(e) => validateInput("108", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "blue", // 預設顏色
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
            id="down-lead-flow-rate"
            label="Total Flow Rate - Lead (Kg/hr)"
            variant="outlined"
            value={downFlowRateLead}
            color="secondary"
            error={error110}
            helperText={error110 ? "Please input correct number" : ""}
            onChange={(e) => setDownFlowRateLead(e.target.value)}
            onBlur={(e) => validateInput("110", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "green", // 預設顏色
              },
            }}
          />
          <TextField
            id="down-Lead-ID"
            label="Pipe Diameter - Lead (in)"
            variant="outlined"
            value={downIDLead}
            color="secondary"
            error={error112}
            helperText={error112 ? "Please input correct number" : ""}
            onChange={(e) => setDownIDLead(e.target.value)}
            onBlur={(e) => validateInput("112", e.target.value)}
            InputLabelProps={{
              sx: {
                color: "green", // 預設顏色
              },
            }}
            sx={{ mt: 17 }}
          />
          <TextField
            id="down-Lead-EL"
            label="Pipe Equivalent Length - Lead (m)"
            variant="outlined"
            value={downELLead}
            color="secondary"
            error={error114}
            helperText={error114 ? "Please input correct number" : ""}
            onChange={(e) => setDownELLead(e.target.value)}
            onBlur={(e) => validateInput("114", e.target.value)}
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

export default Downcomer3;
