import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import { ListItemIcon, ListItemText } from "@mui/material";

const FileButton = (props: any) => {
  const {
    onNewButtonClick,
    onOpenButtonClick,
    onSaveButtonClick,
    onSaveAsButtonClick,
    onExportButtonClick,
  } = props;

  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  return (
    <>
      <Button
        variant="outlined"
        {...bindTrigger(popupState)}
        size="medium"
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          borderRadius: "25px",
          minWidth: "80px",
          bgcolor: "#f7f7f7",
          color: "#191919",
          borderColor: "#757575",
          "&:hover": {
            bgcolor: "#e0e0e0",
            borderColor: "lightgrey",
          },
        }}
      >
        File
      </Button>
      <Menu
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem
          onClick={() => {
            popupState.close();
            onNewButtonClick();
          }}
        >
          <ListItemIcon>
            <CreateNewFolderOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="New File..." />
        </MenuItem>
        <MenuItem
          onClick={() => {
            popupState.close();
            onOpenButtonClick();
          }}
        >
          <ListItemIcon>
            <FileOpenOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Open" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            popupState.close();
            onSaveButtonClick();
          }}
        >
          <ListItemIcon>
            <SaveOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Save" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            popupState.close();
            onSaveAsButtonClick();
          }}
        >
          <ListItemIcon>
            <SaveAsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Save As..." />{" "}
        </MenuItem>
        <MenuItem
          onClick={() => {
            popupState.close();
            onExportButtonClick();
          }}
        >
          <ListItemIcon>
            <IosShareOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Export to" />{" "}
        </MenuItem>
      </Menu>
    </>
  );
};

export default FileButton;
