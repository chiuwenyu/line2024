import { Typography } from "@mui/material";
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
      ;
    </>
  );
};

export default ThermoResultPage;
