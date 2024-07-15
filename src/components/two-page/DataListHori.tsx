import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { deepPurple } from "@mui/material/colors";
import { HORIDataType } from "./TwoPhase";

const pcolor = deepPurple[900];

const DataListHori = (props: any) => {
  const { horiData, direct } = props;

  useEffect(() => {
    console.log("DataListHori useEffect");
  }, [horiData, direct]);

  return (
    <>
      <Box sx={{ minWidth: "730px", height: "ˇ360px", mt: 7 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "medium" }}
        >
          Calculated Property :
        </Typography>
        <Card
          style={{ backgroundColor: pcolor, color: "white" }}
          sx={{ maxWidth: 730 }}
        >
          <CardContent>
            {
              <Typography
                variant="body1"
                color="white"
                style={{ lineHeight: 2 }}
              >
                Norminal ID = {(horiData as HORIDataType).id} in, &nbsp;&nbsp;
                &nbsp;&nbsp; Inside ID = {(horiData as HORIDataType).actID} in
                <br />
                Flow Regime : &nbsp; &nbsp; &lt;&lt;{" "}
                {(horiData as HORIDataType).flow_regime} &gt;&gt;
                <br />
                {/* 以下為共通輸出 */}
                Frictional Press. Loss (Kgf/cm²/100m) ={" "}
                {(horiData as HORIDataType).Pfric}
                <br />
                Erosion Factor = {(horiData as HORIDataType).Ef} &nbsp; &nbsp;
                &nbsp;&#8212; &nbsp; if Φ ≤ 1 : No Erosion; &nbsp; Φ &lt; 1 :
                Erosion occurred
                {/* 共同輸出結束 */}
              </Typography>
            }
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DataListHori;
