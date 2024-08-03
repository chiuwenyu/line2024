import {
  Box,
  Card,
  CardMedia,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";

import picE from "../../assets/ThermoSyphone-Case E.png";
import picF from "../../assets/ThermoSyphone-Case F.png";
import picG from "../../assets/ThermoSyphone-Case G.png";
import { a11yProps, CustomTabPanel } from "../utils/utility";

const ThermoResultPage = (props: any) => {
  const { caseNo } = props;
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ fontWeight: "medium", ml: 4 }}
      >
        Thermosyphon Hydraulic Check Result :
      </Typography>
      <Grid container display={"flex"} flexDirection={"row"}>
        <Grid
          container
          item
          xs={4}
          gap={2}
          sx={{
            ml: 4,
            mt: 3,
            width: "100%",
          }}
        >
          <Card sx={{ p: 4, height: 540 }}>
            {caseNo === "E" && (
              <CardMedia component="img" image={picE} alt="Case E" />
            )}
            {caseNo === "F" && (
              <CardMedia component="img" image={picF} alt="Case E" />
            )}
            {caseNo === "G" && (
              <CardMedia component="img" image={picG} alt="Case E" />
            )}
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="primary"
                sx={{ mt: 2 }}
              >
                {caseNo === "E"
                  ? "Case E"
                  : caseNo === "F"
                  ? "Case F"
                  : caseNo === "G"
                  ? "Case G"
                  : ""}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {caseNo === "E" || caseNo === "F" || caseNo === "G"
                  ? "Reboiler Type: E type"
                  : ""}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {caseNo === "E"
                  ? "Circuit Type: Circulating"
                  : caseNo === "F"
                  ? "Circuit Type: Preference"
                  : caseNo === "G"
                  ? "Circuit Type: One Through"
                  : ""}
              </Typography>
            </CardContent>
          </Card>
          <Typography variant="h6" gutterBottom color="primary.main">
            {"Minimum Required Static Head (m): 6.43"}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ ml: 1 }}>
          <Box sx={{ width: "100%", height: "550px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                textColor="primary"
                indicatorColor="primary"
                onChange={handleChange}
                aria-label="basic tabs"
              >
                <Tab label="Downcomer" {...a11yProps(0)} />
                <Tab label="Riser" {...a11yProps(1)} />
                <Tab label="Configration" {...a11yProps(2)} />
                <Tab label="Homogeneous" {...a11yProps(3)} />
                <Tab label="Dukler" {...a11yProps(4)} />
              </Tabs>
            </Box>
            {/* process data input page */}
            <CustomTabPanel value={value} index={0}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                sx={{
                  "& .MuiTextField-root": { mt: 2, width: "25ch" },
                }}
              ></Box>
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ThermoResultPage;
