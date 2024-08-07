import * as React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

// import MUI components
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

// import Icons
import LooksOneIcon from "@mui/icons-material/LooksOne";
import SettingsIcon from "@mui/icons-material/Settings";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import RepeatIcon from "@mui/icons-material/Repeat";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { GiRollingEnergy } from "react-icons/gi";

// import my components
import Steam from "./components/steam-page/Steam";
import Single from "./components/single-page/Single";
import TwoPhase from "./components/two-page/TwoPhase";
import Thermo from "./components/hydraulic-page/Thermo";
import Setup from "./components/setup-page/Setup";

const drawerWidth = 200;

interface DrawerStyle {
  Text: String;
  Icon: React.JSX.Element;
  Index: number;
}

const drawerItems1: DrawerStyle[] = [
  { Text: "Steam", Icon: <DeviceThermostatIcon />, Index: 1 },
  {
    Text: "Single Phase",
    Icon: <LooksOneIcon />,
    Index: 2,
  },
  {
    Text: "Two Phase",
    Icon: <LooksTwoIcon />,
    Index: 3,
  },
  {
    Text: "Thermosyphon",
    Icon: <RepeatIcon />,
    Index: 4,
  },
];

const SetupIndex = drawerItems1[drawerItems1.length - 1].Index + 1;

export default function ClippedDrawer() {
  const [appNo, setAppNo] = useState(4);

  // steam component states
  const [steamState, setSteamState] = useState(0);
  const [temp, setTemp] = useState("0");
  const [pres, setPres] = useState("0");
  const [calState, setCalState] = useState(false);

  const theme = createTheme({
    typography: {
      fontSize: 12,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar sx={{ display: "flex", alignItems: "center" }}>
            <GiRollingEnergy fontSize="24px" />
            <Typography variant="h6" noWrap component="div" sx={{ ml: "8px" }}>
              Line2024 App
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "primary.dark",
            },
          }}
        >
          <Toolbar />
          <Box display="flex" flexDirection="column" height="100%">
            <Box flexGrow={1}>
              <List>
                {drawerItems1.map((item) => (
                  <ListItem key={item.Index} disablePadding>
                    <ListItemButton onClick={() => setAppNo(item.Index)}>
                      <ListItemIcon sx={{ color: "white", mr: -1 }}>
                        {item.Icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ color: "white" }}
                        primary={item.Text}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Box>
            <Box sx={{ mb: 1 }}>
              <ListItemButton onClick={() => setAppNo(SetupIndex)}>
                <ListItemIcon sx={{ color: "white", mr: -1 }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary="Setup" />
              </ListItemButton>
            </Box>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {appNo === 1 && (
            <Steam
              steamState={steamState}
              setSteamState={setSteamState}
              temp={temp}
              setTemp={setTemp}
              pres={pres}
              setPres={setPres}
              calState={calState}
              setCalState={setCalState}
            />
          )}
          {appNo === 2 && <Single />}
          {appNo === 3 && <TwoPhase />}
          {appNo === 4 && <Thermo />}
          {appNo === SetupIndex && <Setup />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
