import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { deepPurple } from "@mui/material/colors";
import { VDDataType } from "./TwoPhase";

const pcolor = deepPurple[900];

const DataListVD = (props: any) => {
  const { vdData, direct } = props;

  useEffect(() => {
    console.log(vdData, direct);
  }, [vdData, direct]);

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
                Norminal ID = {(vdData as VDDataType).id} in, &nbsp;&nbsp;
                &nbsp;&nbsp; Inside ID = {(vdData as VDDataType).actID} in
                <br />
                Flow Regime : &nbsp; &nbsp; &lt;&lt;{" "}
                {(vdData as VDDataType).flow_regime} &gt;&gt;
                <br />
                {/* 針對 Bubble Model 的輸出 */}
                {/* Bubble Model 輸出結束 */}
                {/* 針對 Similarity Model 的輸出 */}
                {/* Similarity Model 輸出結束 */}
                {/* 針對 Slug Model 的輸出 */}
                {/* Slug Model 輸出結束 */}
                {/* 以下為共通輸出 */}
                Frictional Press. Loss (Kgf/cm²/100m) ={" "}
                {(vdData as VDDataType).Pfric}
                <br />
                Erosion Factor = {(vdData as VDDataType).Ef} &nbsp; &nbsp;
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

export default DataListVD;
