import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// implement OptErrorDialog component
export const OptDiaErrorDialog = (props: any) => {
  const { optErrOpen, setOptErrOpen } = props;
  return (
    <Dialog
      open={optErrOpen}
      aria-labelledby="opt-dialog-title"
      aria-describedby="opt-dialog-description"
    >
      <DialogTitle id="opt-dialog-title">
        {"Option Diameter Range Error"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="opt-dialog-description" sx={{ color: "black" }}>
          The IDs you selected is not allowed because Lower ID is greater than
          Higher ID. <br />
          Please select the correct value again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOptErrOpen(false);
          }}
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const OptPresErrorDialog = (props: any) => {
  const { optErrOpen, setOptErrOpen } = props;
  return (
    <Dialog
      open={optErrOpen}
      aria-labelledby="opt-dialog-title"
      aria-describedby="opt-dialog-description"
    >
      <DialogTitle id="opt-dialog-title">
        {"Option Pressure Drop Range Error"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="opt-dialog-description" sx={{ color: "black" }}>
          The DPs you selected is not allowed because Lower DP is greater than
          Higher DP. <br />
          Please select the correct value again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOptErrOpen(false);
          }}
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
