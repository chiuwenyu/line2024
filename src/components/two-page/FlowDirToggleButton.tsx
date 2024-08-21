import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/system";
import UploadIcon from "@mui/icons-material/Upload";
import ForwardIcon from "@mui/icons-material/Forward";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  border: "none",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },

  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.primary.light,
    color: "white",
  },
}));

const FlowDirToggleButton = (props: any) => {
  const { direct, handleDirectChange } = props;

  return (
    <>
      <ToggleButtonGroup
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
