import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Setup = (props: any) => {
  const { textFontSize, setTextFontSize } = props;
  const [inputValue, setInputValue] = useState(textFontSize);
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <div>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "medium", mb: 2 }}
        >
          Setup application parameters:
        </Typography>
        <TextField
          label="Input App font size (pt) in [10 ~ 14]"
          id="outlined-start-adornment"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const num = parseInt(inputValue);
              if (num >= 10 && num <= 14) {
                setTextFontSize(inputValue);
              } else if (num < 10) {
                setInputValue("10");
                setTextFontSize("10");
              } else if (num > 14) {
                setInputValue("14");
                setTextFontSize("14");
              }
            }
          }}
          sx={{ m: 1, width: "30ch" }}
        />
      </div>
    </Box>
  );
};

export default Setup;
