import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

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
    headerName: "Velocity\n  (m/s)",
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
    headerName: "     Pres. Drop\n(kg/cm^2/100m)",
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
    headerName: "   1.0 V.H\n(kg/m/s^2)",
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
  const gcolor = grey[800];

  return (
    <Box sx={{ width: "100%", minWidth: "702px", height: "65vh", ml: 2 }}>
      <Typography
        gutterBottom
        variant="h5"
        component="span"
        sx={{
          fontWeight: "medium",
        }}
      >
        Sizing Result
      </Typography>
      <DataGrid
        rows={rows}
        autoHeight={false}
        localeText={{
          footerRowSelected: () => `Selected pipe size : ${selectId} in`,
        }}
        columns={columns.map((column) => ({
          ...column,
          flex: 1, // 設置列的 flex 屬性
        }))}
        sx={{
          borderRadius: 3,
          "& .MuiDataGrid-footerContainer": {
            fontWeight: "bold", // 變更 footer font weight
            color: gcolor, // 變更 footer font color
            fontSize: "0.9rem", // 變更 footer font size
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "primary.main",
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
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-scrollbarFiller": {
            backgroundColor: "primary.main",
          },
          mt: 1,
        }}
        pageSizeOptions={[]}
        hideFooterPagination={true}
        onRowSelectionModelChange={(newSelection) => {
          setSelectId(newSelection[0] as string);
        }}
      />
      <Typography
        gutterBottom
        variant="subtitle1"
        component="div"
        sx={{ mt: 1 }}
      >
        Note: Click the pipe size will be choiced and displayed in the footer.
      </Typography>
    </Box>
  );
}
