import { Card, CardMedia, Grid, Typography } from "@mui/material";
import picE from "../../assets/ThermoSyphone-Case E.png";

import React from "react";

const ThermoResultPage = (props: any) => {
  const { caseNo } = props;
  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ fontWeight: "medium", ml: 4 }}
      >
        {caseNo === "E"
          ? "Case E Calculation Result"
          : caseNo === "F"
          ? "Case F Calculation Result"
          : "Case G Calculation Result"}
      </Typography>
      <Grid
        container
        item
        xs={4}
        gap={2}
        sx={{
          ml: 4,
          mt: 3,
          width: "100%",
          height: "40vh",
        }}
      >
        <Card sx={{ p: 4 }}>
          <CardMedia component="img" image={picE} alt="Case E" />
        </Card>
      </Grid>
    </>
  );
};

export default ThermoResultPage;
