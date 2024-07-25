import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

const Downcomer1 = (props: any) => {
  const { downFlowRateMain, setDownFlowRateMain, validateInput, error101 } =
    props;
  return (
    <>
      <Grid
        container
        display={"flex"}
        flexDirection={"column"}
        item
        xs={3}
        sx={{
          ml: 4,
          width: "75%",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "medium", mb: 3 }}
        >
          Downcomer Data Input:
        </Typography>
        <TextField
          id="liquid-flow-rate"
          label="Total Flow Rate (Kg/hr)"
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
      </Grid>
    </>
  );
};

export default Downcomer1;
