import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";

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
    headerName: "Norm. ID\n     (in)",
    width: 90,
    resizable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "actID",
    headerName: "Act. ID\n   (in)",
    width: 90,
    editable: false,
    resizable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "vel",
    headerName: "VelocityID\n    (m/s)",
    width: 100,
    resizable: false,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "presDrop",
    headerName: "  Pres. DropID\n(kg/cm^2/100m)",
    width: 150,
    resizable: false,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "vh",
    headerName: " 1.0 V.HID\n(kg/m/s^2)",
    width: 140,
    resizable: false,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "reynoldNo",
    headerName: "Reynold No. [-]",
    width: 130,
    resizable: false,
    editable: false,
  },
];

export default function DataGridSingle(props: any) {
  const { rows, selectId, setSelectId } = props;

  return (
    <Box sx={{ minWidth: "702px" }}>
      <Stack display={"flex"} justifyContent={"flex-end"}>
        <span>
          <Typography
            gutterBottom
            variant="h5"
            component="span"
            sx={{
              fontWeight: "medium",
            }}
          >
            Sizing Result :
          </Typography>
          <Box sx={{ float: "right" }}></Box>
        </span>
      </Stack>
      <DataGrid
        rows={rows}
        autoHeight={true}
        // hideFooterSelectedRowCount
        localeText={{
          footerRowSelected: () => `You select the ${selectId}" pipe`,
        }}
        columns={columns as GridColDef<SizingData>[]}
        sx={{
          "& .MuiDataGrid-footerContainer": {
            fontWeight: "bold", // 變更 footer font weight
            color: "primary.main", // 變更 footer font color
            fontSize: "0.9rem", // 變更 footer font size
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "success.main",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.8rem",
            height: "60",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "pre-wrap",
            // lineHeight: "normal",
          },
          "& .MuiDataGrid-columnHeaders": {
            maxHeight: "168px !important",
          },

          mt: 1,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 6, 7, 8, 9, 10]}
        onRowSelectionModelChange={(newSelection) => {
          setSelectId(newSelection[0] as string);
        }}
      />
    </Box>
  );
}
