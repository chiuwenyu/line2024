import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PasteDialog(props: any) {
  const { setDensity, setViscosity } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    const value1 = localStorage.getItem("density");
    if (typeof value1 === "string") {
      setDensity(JSON.parse(parseFloat(value1).toFixed(6))); // 正常
    }
    const value2 = localStorage.getItem("viscosity");
    if (typeof value2 === "string") {
      setViscosity(JSON.parse(parseFloat(value2).toFixed(6))); // 正常
    }
    localStorage.clear();
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="success"
        onClick={handleClickOpen}
        style={{ marginLeft: "25px", marginRight: "20px" }}
        sx={{ borderRadius: "20px" }}
      >
        Paste props
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="paste-dialog-title"
        aria-describedby="paste-dialog-description"
      >
        <DialogTitle id="paste-dialog-title">
          {"Do you want to copy?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="paste-dialog-description">
            Do you want to copy the density and viscosity data of steam or water
            from STEAM APP calculated result to here?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
