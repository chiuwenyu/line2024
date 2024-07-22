import { Box, Card, CardContent, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { VDDataType } from "./TwoPhase";

const pcolor = indigo[900];

const DataListVD = (props: any) => {
  const { vdData } = props;

  return (
    <>
      <Box sx={{ minWidth: "730px", height: "ˇ360px", mt: 8 }}>
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
                Norminal ID = {(vdData as VDDataType).id} in
                <br />
                Inside ID = {(vdData as VDDataType).actID} in
                <br />
                Flow Regime : &nbsp; &nbsp; &lt;&lt;{" "}
                {(vdData as VDDataType).flow_regime} &gt;&gt;
                <br />
                {/* 針對 Bubble Model 的輸出 */}
                {(vdData as VDDataType).flow_regime ===
                  "Vertical Down Dispersed-Bubble Flow" && (
                  <>
                    Two-Phase Density (Kg/m³) = {(vdData as VDDataType).LoTP}
                    <br />
                    Liquid Volume Fraction = {(vdData as VDDataType).HL}
                    <br />
                    Two-Phase Velocity (m/s)= {(vdData as VDDataType).UTP}
                    <br />
                  </>
                )}
                {/* Bubble Model 輸出結束 */}
                {/* 針對 Annular Model 的輸出 */}
                {(vdData as VDDataType).flow_regime ===
                  "Vertical Down Annular Flow" && (
                  <>
                    Two-Phase Density (Kg/m³) = {(vdData as VDDataType).LoTP}
                    <br />
                    Two-Phase Velocity (m/s)= {(vdData as VDDataType).UTP}
                    <br />
                    Liquid Volume Fraction = {(vdData as VDDataType).alfaL}
                    <br />
                  </>
                )}
                {/* Annular Model 輸出結束 */}
                {/* 針對 Slug Model 的輸出 */}
                {(vdData as VDDataType).flow_regime ===
                  "Vertical Down Slug Flow" && (
                  <>
                    Two-Phase Density (Kg/m³) = {(vdData as VDDataType).Loip}
                    <br />
                    Liquid Slug Density (Kg/m³) = {(vdData as VDDataType).LoLS}
                    <br />
                    Liquid Volume Fraction = {(vdData as VDDataType).HL}
                    <br />
                  </>
                )}
                {/* Slug Model 輸出結束 */}
                {/* 以下為共通輸出 */}
                1.0 Velocity Head (Kgf/cm²) = {(vdData as VDDataType).Head}
                <br />
                Frictional Press. Loss (Kgf/cm²/100m) ={" "}
                {(vdData as VDDataType).Pfric}
                <br />
                Elevation Head Loss (Kgf/cm²/100m) ={" "}
                {(vdData as VDDataType).Pgrav}
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
