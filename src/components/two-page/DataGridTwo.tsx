import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";

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
    width: 80,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "actID",
    headerName: "Act. ID\n   (in)",
    width: 80,
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
    width: 400,
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

const gucolor = blue[900];
const ghcolor = blue[800];
const gdcolor = blue[700];

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
    ? gucolor
    : direct.includes("down")
    ? gdcolor
    : direct.includes("horizontal")
    ? ghcolor
    : "";

  return (
    direct != "" && (
      <Box sx={{ width: "100%", minWidth: "750px", height: "370px" }}>
        <DataGrid
          rows={rows}
          autoHeight={false}
          columns={columns.map((column) => ({
            ...column,
            flex: 1, // 設置列的 flex 屬性
          }))}
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
