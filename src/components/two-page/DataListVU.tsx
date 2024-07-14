import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { deepPurple } from "@mui/material/colors";
import { VUDataType } from "./TwoPhase";

const pcolor = deepPurple[500];

const DataListVU = (props: any) => {
  const { vuData, direct } = props;

  useEffect(() => {
    console.log("DataListVU: ", vuData);
  }, [vuData, direct]);

  return (
    <>
      <Box sx={{ minWidth: "730px", height: "400px", mt: 7 }}>
        <Card
          style={{ backgroundColor: pcolor, color: "white" }}
          sx={{ maxWidth: 730 }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Calculated Property
            </Typography>
            {
              <Typography
                variant="body1"
                color="white"
                style={{ lineHeight: 2 }}
              >
                Norminal ID = {(vuData as VUDataType).id} in, &nbsp;&nbsp;
                &nbsp;&nbsp; Inside ID = {(vuData as VUDataType).actID} in
                <br />
                Flow Regime : &nbsp; &nbsp; &lt;&lt;{" "}
                {(vuData as VUDataType).flow_regime} &gt;&gt;
                <br />
                {(vuData as VUDataType).flow_regime ===
                  "Vertical Up Slug and Churn Flow" && (
                  <>
                    Liquid Slug Unit Density = {(vuData as VUDataType).LoLS}{" "}
                    Kg/m³
                    <br />
                  </>
                )}
                1.0 Velocity Head (Kgf/cm²) = {(vuData as VUDataType).Head}
                <br />
                Frictional Press. Loss (Kgf/cm²/100m) ={" "}
                {(vuData as VUDataType).Pfric}
                <br />
                Elevation Head Loss (Kgf/cm²/100m) ={" "}
                {(vuData as VUDataType).Pgrav}
                <br />
                Erosion Factor = {(vuData as VUDataType).Ef} &nbsp; &nbsp;
                &nbsp;&#8212; &nbsp; if Φ ≤ 1 : No Erosion, Φ &lt; 1 : Erosion
                occurred
              </Typography>
            }
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DataListVU;
