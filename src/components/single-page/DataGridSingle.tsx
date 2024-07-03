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
    width: 100,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "actID",
    headerName: "Act. ID\n   (in)",
    width: 100,
    editable: false,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "vel",
    headerName: "VelocityID\n    (m/s)",
    width: 100,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "presDrop",
    headerName: "  Pres. DropID\n(kg/cm^2/100m)",
    width: 140,
    resizable: false,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "vh",
    headerName: " 1.0 V.HID\n(kg/m/s^2)",
    width: 140,
    resizable: false,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "reynoldNo",
    headerName: "Reynold No.",
    flex: 1,
    // width: 140,
    resizable: false,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
];

export default function DataGridSingle(props: any) {
  const { rows, selectId, setSelectId } = props;

  return (
    <Box sx={{ minWidth: "702px", height: "600px" }}>
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
        autoHeight={false}
        localeText={{
          footerRowSelected: () => `Selected pipe size : ${selectId} in`,
        }}
        columns={columns as GridColDef<SizingData>[]}
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
            height: "60",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "pre-wrap",
          },
          "& .MuiDataGrid-columnHeaders": {
            maxHeight: "180px !important",
          },

          mt: 1,
        }}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 10,
        //     },
        //   },
        // }}
        pageSizeOptions={[]}
        hideFooterPagination={true}
        onRowSelectionModelChange={(newSelection) => {
          setSelectId(newSelection[0] as string);
        }}
      />
    </Box>
  );
}
