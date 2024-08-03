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

export interface DowncomerData {
  id: string;
  item: string;
  unit: string;
  main: string;
  manifold: string;
  lead: string;
}

const columns: GridColDef<DowncomerData>[] = [
  {
    field: "id",
    headerName: "No.",
    width: 20,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "item",
    headerName: "DOWNCOMER",
    width: 280,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "unit",
    headerName: "UNIT",
    width: 128,
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

const ThermoResultPage = (props: any) => {
  const { caseNo, downResData } = props;
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
          <Box sx={{ width: "114%", height: "550px" }}>
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
            {/* process data input page */}
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
                  autoHeight={false}
                  columns={columns as GridColDef<DowncomerData>[]}
                  sx={{
                    "& .MuiDataGrid-footerContainer": {
                      fontWeight: "bold", // 變更 footer font weight
                      // backgroundColor: "success.main", // 變更 footer background color
                      color: "primary.main", // 變更 footer font color
                      fontSize: "0.9rem", // 變更 footer font size
                    },
                    "& .MuiDataGrid-columnHeader": {
                      backgroundColor: "success.main",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      height: "50",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      whiteSpace: "pre-wrap",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      maxHeight: "180px !important",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },

                    mt: 1,
                  }}
                  pageSizeOptions={[]}
                  hideFooterPagination={true}
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
