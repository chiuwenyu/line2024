import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

const Downcomer1 = (props: any) => {
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
    validateInput,
    error101,
    error102,
    error103,
    error104,
    error105,
    error106,
    error107,
  } = props;
  return (
    <>
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
          sx={{ fontWeight: "medium" }}
        >
          Downcomer Data:
        </Typography>
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
          label="Pipe Diameter (in)"
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
          label="Pipe Equivalent Length (m) excl. H"
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
    </>
  );
};

export default Downcomer1;
