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
                Pipe Norminal ID = {(vuData as VUDataType).id} inch
                <br />
              </Typography>
            }
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DataListVU;
