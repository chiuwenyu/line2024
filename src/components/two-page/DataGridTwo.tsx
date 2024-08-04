import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export interface TwoSizingData {
  id: string;
  actID: string;
  flow_regime: string;
  Pfric: string;
  Ef: string;
}

const columns: GridColDef<TwoSizingData>[] = [
  {
    field: "id",
    headerName: "Norm. ID\n     (in)",
    width: 93,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "actID",
    headerName: "Act. ID\n   (in)",
    width: 90,
    editable: false,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "flow_regime",
    headerName: "Flow Pattern",
    width: 270,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Pfric",
    headerName: "Friction Pres. Loss\n(kg/cm^2/100m)",
    width: 140,
    resizable: false,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Ef",
    headerName: "Erosion Factor",
    width: 140,
    resizable: false,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
];

export default function DataGridTwo(props: any) {
  const { rows, setSelectId, setIdSelState, direct } = props;
  let StrTitle = direct.includes("up")
    ? "Vertical Up"
    : direct.includes("down")
    ? "Vertical Down"
    : direct.includes("horizontal")
    ? "Horizontal"
    : "";
  StrTitle = StrTitle + " Line Sizing Result :";
  let directColor = direct.includes("up")
    ? "success.main"
    : direct.includes("down")
    ? "error.main"
    : direct.includes("horizontal")
    ? "warning.main"
    : "";

  return (
    direct != "" && (
      <Box sx={{ minWidth: "750px", height: "370px" }}>
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
              {StrTitle}
            </Typography>
            <Box sx={{ float: "right" }}></Box>
          </span>
        </Stack>
        <DataGrid
          rows={rows}
          autoHeight={false}
          columns={columns as GridColDef<TwoSizingData>[]}
          sx={{
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: directColor,
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
              backgroundColor: directColor,
            },

            mt: 1,
          }}
          pageSizeOptions={[]}
          hideFooter={true}
          onRowSelectionModelChange={(newSelection) => {
            setSelectId(newSelection[0] as string);
            setIdSelState(true);
          }}
        />
      </Box>
    )
  );
}
