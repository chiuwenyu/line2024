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
import { purple, cyan, brown, lightGreen } from "@mui/material/colors";

let purplecolor = purple[700];
let ccolor = cyan[700];
let gcolor = lightGreen[800];
let browncolor = brown[600];
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
    width: 90,
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
        Check Result :
      </Typography>
      <Box sx={{ width: "80vh" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            textColor="primary"
            indicatorColor="primary"
            onChange={handleChange}
            aria-label="basic tabs"
            centered
          >
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="Downcomer" {...a11yProps(1)} />
            <Tab label="Riser" {...a11yProps(2)} />
            <Tab label="Configration" {...a11yProps(3)} />
            <Tab label="Homogeneous" {...a11yProps(4)} />
            {caseNo !== "D" && <Tab label="Dukler" {...a11yProps(5)} />}
          </Tabs>
        </Box>
        {/* summary tab */}
        <CustomTabPanel value={value} index={0}>
          <Box
            component="form"
            display="flex"
            flexDirection="row"
            sx={{
              "& .MuiTextField-root": { mt: 2, width: "35ch" },
            }}
          >
            <Grid sx={{ mt: 2, ml: 1 }}>
              {caseNo === "A" && <img src={picA} alt="Case A" width="100%" />}
              {caseNo === "B" && <img src={picB} alt="Case B" width="100%" />}
              {caseNo === "C" && <img src={picC} alt="Case C" width="100%" />}
              {caseNo === "D" && <img src={picD} alt="Case D" width="100%" />}
              {caseNo === "E" && <img src={picE} alt="Case E" width="100%" />}
              {caseNo === "F" && <img src={picF} alt="Case F" width="100%" />}
              {caseNo === "G" && <img src={picG} alt="Case G" width="100%" />}
            </Grid>
            <Grid sx={{ mt: 2, ml: 4 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  width: "35%",
                  textAlign: "center",
                  fontSize: 14,
                }}
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
              <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 2, fontSize: 14 }}
              >
                {caseNo === "E" || caseNo === "F" || caseNo === "G"
                  ? "Reboiler Type:  E type"
                  : caseNo === "D"
                  ? "Reboiler Type:  Kettle"
                  : caseNo === "A" || caseNo === "B" || caseNo === "C"
                  ? "Reboiler Type:  J type"
                  : ""}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 14 }}>
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
                Min. Required Static Head , H = {minStaticHead.toFixed(2)} m
              </Typography>
            </Grid>
          </Box>
        </CustomTabPanel>
        {/* downcomer result tab */}
        <CustomTabPanel value={value} index={1}>
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
        <CustomTabPanel value={value} index={2}>
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
              rows={configResData}
              autoHeight={true}
              columns={configColumns as GridColDef<ConfigData>[]}
              sx={{
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: browncolor,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  height: "50",
                },
                "& .MuiDataGrid-columnSeparator": {
                  display: "none",
                },
                "& .MuiDataGrid-filler": {
                  backgroundColor: browncolor,
                },
                mt: 1,
              }}
              hideFooter={true}
            />
          </Box>
        </CustomTabPanel>
        {/* Homogeneous result tab */}
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
              rows={homeResData}
              autoHeight={true}
              columns={hdColumns as GridColDef<HomoAndDukData>[]}
              sx={{
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: gcolor,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  height: "50",
                },
                "& .MuiDataGrid-columnSeparator": {
                  display: "none",
                },
                "& .MuiDataGrid-filler": {
                  backgroundColor: gcolor,
                },
                mt: 1,
              }}
              hideFooter={true}
            />
          </Box>
        </CustomTabPanel>
        {/* Dukler result tab */}
        <CustomTabPanel value={value} index={5}>
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
    </>
  );
};

export default ThermoResultPage;
