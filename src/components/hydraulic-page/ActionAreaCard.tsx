import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ActionAreaCard = (props: any) => {
  const { cardimage, title, subtitle, description } = props;
  return (
    <Card sx={{ height: "420", width: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={cardimage}
          alt="green iguana"
          sx={{
            height: "auto", // 設定高度
            width: "100%", // 設定寬度
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {subtitle}
          </Typography>
          <Typography variant="body2" color="text.primary">
            <br />
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;
