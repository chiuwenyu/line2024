import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { indigo } from "@mui/material/colors";

const pcolor = indigo[500];

const ActionAreaCard = (props: any) => {
  const {
    id,
    cardimage,
    title,
    subtitle,
    description,
    caseNo,
    goNextStepbySelectCircuit,
  } = props;
  return (
    <Card elevation={caseNo === id ? 24 : 1} sx={{ height: "420", width: 250 }}>
      <CardActionArea onClick={goNextStepbySelectCircuit}>
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
          <Typography variant="h6" color={pcolor}>
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
