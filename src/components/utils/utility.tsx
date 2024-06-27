import { Box } from "@mui/material";

export function fmt_f64(
  num: number,
  width: number,
  precision: number,
  exp_pad: number
): string {
  let numStr: string = num.toExponential(precision);
  let eIndex: number = numStr.indexOf("e");
  let exp: string = numStr.slice(eIndex + 1);
  numStr = numStr.slice(0, eIndex);
  let sign: string = exp.startsWith("-") ? "-" : "+";
  if (sign === "-") {
    exp = exp.slice(1);
  } else {
    exp = exp.slice(1);
  }
  numStr += "E" + sign + exp.padStart(exp_pad, "0");
  return numStr.padStart(width);
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
