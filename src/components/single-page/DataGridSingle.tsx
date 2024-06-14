import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Stack, Typography } from "@mui/material";
import BlurLinearOutlinedIcon from "@mui/icons-material/BlurLinearOutlined";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

export interface SizingData {
  id: string;
  actID: string;
  vel: string;
  presDrop: string;
  vh: string;
  reynoldNo: string;
}

const columns: GridColDef<SizingData>[] = [
  {
    field: "id",
    headerName: "Norm. ID\n(in)",
    width: 110,
    resizable: false,
  },
  {
    field: "actID",
    headerName: "Act. ID (in)",
    width: 110,
    editable: false,
    resizable: false,
  },
  {
    field: "vel",
    headerName: "Velocity (m/s)",
    width: 120,
    resizable: false,
    editable: false,
  },
  {
    field: "presDrop",
    headerName: "Pres. Drop (kg/cm^2/100m)",
    width: 200,
    resizable: false,
    editable: false,
  },
  {
    field: "vh",
    headerName: "1.0 V.H (kg/m/s^2)",
    width: 140,
    resizable: false,
    editable: false,
  },
  {
    field: "reynoldNo",
    headerName: "Reynold No. [-]",
    width: 130,
    resizable: false,
    editable: false,
  },
];

export default function DataGridSingle({ rows }: { rows: SizingData[] }) {
  return (
    <Box sx={{ width: "885px", height: "400px" }}>
      <Stack display={"flex"} justifyContent={"flex-end"}>
        <span>
          <Typography gutterBottom variant="h6" component="span">
            Single Phase Line Sizing
          </Typography>
          <Box sx={{ float: "right" }}>
            <Button
              variant="contained"
              startIcon={<BlurLinearOutlinedIcon />}
              size="small"
              color="success"
            >
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<RotateLeftIcon />}
              size="small"
              color="success"
              sx={{ ml: 2 }}
            >
              {" "}
              Reset
            </Button>
          </Box>
        </span>
      </Stack>
      <DataGrid
        rows={rows}
        columns={columns as GridColDef<SizingData>[]}
        sx={{
          "& .MuiDataGrid-columnHeader": {
            color: "primary.main",
            fontWeight: "bold",
          },
          mt: 2,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 6, 7, 8, 9, 10]}
        // checkboxSelection
        // disableRowSelectionOnClick
      />
    </Box>
  );
}
