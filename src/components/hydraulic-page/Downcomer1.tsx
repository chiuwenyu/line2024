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
    validateInput,
    error101,
    error102,
    error103,
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
      </Grid>
    </>
  );
};

export default Downcomer1;
