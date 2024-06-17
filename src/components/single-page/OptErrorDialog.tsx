import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const OptErrorDialog = () => {
  const [optErrOpen, setOptErrOpen] = React.useState(true);

  const handleOK = () => {
    setOptErrOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={optErrOpen}
        aria-labelledby="opt-dialog-title"
        aria-describedby="opt-dialog-description"
      >
        <DialogTitle id="opt-dialog-title">
          {"Option Diameter Range Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="opt-dialog-description">
            The ID range you selected is not allowed because Lower ID is greater
            than Higher ID. Please select the correct value again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOK} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default OptErrorDialog;
