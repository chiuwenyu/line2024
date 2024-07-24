import { Grid } from "@mui/material";
import React from "react";
import ActionAreaCard from "./ActionAreaCard";

const SelCircuitPage = () => {
  return (
    <>
      <Grid
        container
        gap={6}
        sx={{
          bgcolor: "grey.100",
          marginLeft: "10px",
        }}
      >
        <ActionAreaCard />
      </Grid>
    </>
  );
};

export default SelCircuitPage;
