import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import imageA from "../../assets/ThermoSyphone-Case A.svg";

const ActionAreaCard = () => {
  return (
    <Card sx={{ height: "420", width: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={imageA}
          alt="green iguana"
          sx={{
            height: "auto", // 設定高度
            width: "100%", // 設定寬度
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Case A
          </Typography>
          <Typography variant="body1" color="text.primary">
            Horizontal "J" type reboiler, Preference Ciucuit
          </Typography>
          <Typography variant="body2" color="text.primary">
            <br />
            Downcomer is draw-off from trapout boot and return to the bottom of
            trapout boot, The bottom product is discharged from the bottom of
            the distillation tower.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;
