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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { purple } from "@mui/material/colors";

let pcolor = purple[700];

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
    align: "right",
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
    align: "right",
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
    align: "right",
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
    width: 100,
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
                <Tab label="Dukler" {...a11yProps(4)} />
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
                height={584}
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
                      backgroundColor: pcolor,
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      height: "50",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },
                    "& .MuiDataGrid-filler": {
                      backgroundColor: pcolor,
                    },
                    "& .MuiDataGrid-scrollbarFiller": {
                      backgroundColor: pcolor,
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
                      backgroundColor: "error.main",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      height: "50",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },
                    "& .MuiDataGrid-filler": {
                      backgroundColor: "error.main",
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
                      backgroundColor: "warning.main",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      height: "50",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },
                    "& .MuiDataGrid-filler": {
                      backgroundColor: "warning.main",
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
