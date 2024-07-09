import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import UploadIcon from "@mui/icons-material/Upload";
import ForwardIcon from "@mui/icons-material/Forward";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },

  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.secondary.light,
    color: "white",
  },
}));

const FlowDirToggleButton = (props: any) => {
  const { direct, handleDirectChange } = props;

  return (
    <>
      <Typography
        gutterBottom
        variant="body1"
        component="div"
        sx={{ mb: 1, ml: 0.5, fontWeight: "medium" }}
      >
        Flow Direction :{" "}
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={direct}
        exclusive
        onChange={handleDirectChange}
        aria-label="flow-direction"
      >
        <StyledToggleButton value="up" sx={{ width: 90 }}>
          <UploadIcon />
          <Box sx={{ pl: 1 }}>Up</Box>
        </StyledToggleButton>
        <StyledToggleButton value="horizontal" sx={{ width: 90 }}>
          <ForwardIcon />
          <Box sx={{ pl: 1 }}>Hori</Box>
        </StyledToggleButton>
        <StyledToggleButton value="down" sx={{ width: 90 }}>
          <FileDownloadIcon />
          <Box sx={{ pl: 1 }}>down</Box>
        </StyledToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default FlowDirToggleButton;
