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

import picA from "../../assets/ThermoSyphone-Case A.png";
import picB from "../../assets/ThermoSyphone-Case B.png";
import picC from "../../assets/ThermoSyphone-Case C.png";
import picD from "../../assets/ThermoSyphone-Case D.png";
import picE from "../../assets/ThermoSyphone-Case E.png";
import picF from "../../assets/ThermoSyphone-Case F.png";
import picG from "../../assets/ThermoSyphone-Case G.png";
import { a11yProps, CustomTabPanel } from "../utils/utility";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { purple, cyan, pink } from "@mui/material/colors";

let purplecolor = purple[700];
let ccolor = cyan[700];
let pinkcolor = pink[700];
export interface DownAndRiserData {
  id: string;
  item: string;
  unit: string;
  main: string;
  manifold: string;
  lead: string;
}

export interface ConfigData {
  id: string;
  item: string;
  unit: string;
  value: string;
}

export interface HomoAndDukData {
  id: string;
  item: string;
  value: string;
}

const columns: GridColDef<DownAndRiserData>[] = [
  {
    field: "id",
    headerName: "No.",
    width: 15,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "item",
    headerName: "ITEMS",
    width: 265,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "unit",
    headerName: "UNIT",
    width: 135,
    editable: false,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "main",
    headerName: "MAIN",
    width: 90,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "manifold",
    headerName: "MANIFOLD",
    width: 90,
    resizable: false,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "lead",
    headerName: "LEAD",
    width: 90,
    resizable: false,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
];

const configColumns: GridColDef<ConfigData>[] = [
  {
    field: "id",
    headerName: "No.",
    width: 15,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "item",
    headerName: "ITEMS",
    width: 400,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "unit",
    headerName: "UNIT",
    width: 100,
    editable: false,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "value",
    headerName: "VALUE",
    width: 120,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    editable: false,
    headerAlign: "right",
    align: "right",
  },
];

const hdColumns: GridColDef<HomoAndDukData>[] = [
  {
    field: "item",
    headerName: "ITEMS",
    width: 400,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "value",
    headerName: "VALUE",
    width: 200,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    editable: false,
    headerAlign: "center",
    align: "left",
  },
];

const ThermoResultPage = (props: any) => {
  const {
    caseNo,
    downResData,
    riserResData,
    configResData,
    homeResData,
    dukResData,
    minStaticHead,
  } = props;
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
        sx={{ fontWeight: "medium" }}
      >
        Thermosyphon Hydraulic Check Result :
      </Typography>
      <Grid container display={"flex"} flexDirection={"row"} gap={2}>
        <Grid
          container
          item
          xs={3}
          gap={2}
          sx={{
            ml: 1,
            mt: 3,
            width: "100%",
          }}
        >
          <Card sx={{ p: 4, height: 540 }}>
            {caseNo === "A" && (
              <CardMedia component="img" image={picA} alt="Case A" />
            )}
            {caseNo === "B" && (
              <CardMedia component="img" image={picB} alt="Case B" />
            )}
            {caseNo === "C" && (
              <CardMedia component="img" image={picC} alt="Case C" />
            )}
            {caseNo === "D" && (
              <CardMedia component="img" image={picD} alt="Case D" />
            )}
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
                variant="h6"
                component="div"
                color="primary"
                sx={{ mt: 2 }}
              >
                {caseNo === "A"
                  ? "Case A"
                  : caseNo === "B"
                  ? "Case B"
                  : caseNo === "C"
                  ? "Case C"
                  : caseNo === "D"
                  ? "Case D"
                  : caseNo === "E"
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
                  : caseNo === "D"
                  ? "Reboiler Type: Kettle"
                  : caseNo === "A" || caseNo === "B" || caseNo === "C"
                  ? "Reboiler Type: J type"
                  : ""}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {caseNo === "A"
                  ? "Circuit Type: Preference"
                  : caseNo === "B"
                  ? "Circuit Type: Circulating"
                  : caseNo === "C"
                  ? "Circuit Type: One Through"
                  : caseNo === "D"
                  ? "Circuit Type: Circulating"
                  : caseNo === "E"
                  ? "Circuit Type: Circulating"
                  : caseNo === "F"
                  ? "Circuit Type: Preference"
                  : caseNo === "G"
                  ? "Circuit Type: One Through"
                  : ""}
              </Typography>
              <Typography
                variant="h6"
                fontSize={14}
                fontWeight="bold"
                gutterBottom
                color="warning.main"
              >
                {"Min. Required Static Head (m): " + minStaticHead.toFixed(3)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ width: "120%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                textColor="primary"
                indicatorColor="primary"
                onChange={handleChange}
                aria-label="basic tabs"
                centered
              >
                <Tab label="Downcomer" {...a11yProps(0)} />
                <Tab label="Riser" {...a11yProps(1)} />
                <Tab label="Configration" {...a11yProps(2)} />
                <Tab label="Homogeneous" {...a11yProps(3)} />
                {caseNo !== "D" && <Tab label="Dukler" {...a11yProps(4)} />}
              </Tabs>
            </Box>
            {/* downcomer result tab */}
            <CustomTabPanel value={value} index={0}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                sx={{
                  "& .MuiTextField-root": { mt: 2, width: "35ch" },
                }}
              >
                <DataGrid
                  rows={downResData}
                  autoHeight={true}
                  columns={columns as GridColDef<DownAndRiserData>[]}
                  sx={{
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      height: "50",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },
                    "& .MuiDataGrid-filler": {
                      backgroundColor: "primary.main",
                    },
                    mt: 1,
                  }}
                  hideFooter={true}
                />
              </Box>
            </CustomTabPanel>
            {/* riser result tab */}
            <CustomTabPanel value={value} index={1}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                height={534}
                sx={{
                  "& .MuiTextField-root": {
                    mt: 2,
                    width: "35ch",
                  },
                }}
              >
                <DataGrid
                  rows={riserResData}
                  autoHeight={false}
                  columns={columns as GridColDef<DownAndRiserData>[]}
                  sx={{
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: purplecolor,
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      height: "50",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },
                    "& .MuiDataGrid-filler": {
                      backgroundColor: purplecolor,
                    },
                    "& .MuiDataGrid-scrollbarFiller": {
                      backgroundColor: purplecolor,
                    },
                    mt: 1,
                  }}
                  hideFooter={true}
                />
              </Box>
            </CustomTabPanel>
            {/* configuration result tab */}
            <CustomTabPanel value={value} index={2}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                sx={{
                  "& .MuiTextField-root": { mt: 2, width: "35ch" },
                }}
              >
                <DataGrid
                  rows={configResData}
                  autoHeight={true}
                  columns={configColumns as GridColDef<ConfigData>[]}
                  sx={{
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: pinkcolor,
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      height: "50",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },
                    "& .MuiDataGrid-filler": {
                      backgroundColor: pinkcolor,
                    },
                    mt: 1,
                  }}
                  hideFooter={true}
                />
              </Box>
            </CustomTabPanel>
            {/* Homogeneous result tab */}
            <CustomTabPanel value={value} index={3}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                sx={{
                  "& .MuiTextField-root": { mt: 2, width: "35ch" },
                }}
              >
                <DataGrid
                  rows={homeResData}
                  autoHeight={true}
                  columns={hdColumns as GridColDef<HomoAndDukData>[]}
                  sx={{
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: "success.main",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      height: "50",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },
                    "& .MuiDataGrid-filler": {
                      backgroundColor: "success.main",
                    },
                    mt: 1,
                  }}
                  hideFooter={true}
                />
              </Box>
            </CustomTabPanel>
            {/* Dukler result tab */}
            <CustomTabPanel value={value} index={4}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                sx={{
                  "& .MuiTextField-root": { mt: 2, width: "35ch" },
                }}
              >
                <DataGrid
                  rows={dukResData}
                  autoHeight={true}
                  columns={hdColumns as GridColDef<HomoAndDukData>[]}
                  sx={{
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: ccolor,
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      height: "50",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },
                    "& .MuiDataGrid-filler": {
                      backgroundColor: ccolor,
                    },
                    mt: 1,
                  }}
                  hideFooter={true}
                />
              </Box>
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ThermoResultPage;
