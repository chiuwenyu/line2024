import { Box, Card, CardContent, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { VUDataType } from "./TwoPhase";

const pcolor = indigo[900];

const DataListVU = (props: any) => {
  const { vuData } = props;

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
                Norminal ID = {(vuData as VUDataType).id} in
                <br />
                Inside ID = {(vuData as VUDataType).actID} in
                <br />
                Flow Regime : &nbsp; &nbsp; &lt;&lt;{" "}
                {(vuData as VUDataType).flow_regime} &gt;&gt;
                <br />
                {/* 針對 Bubble Model 的輸出 */}
                {((vuData as VUDataType).flow_regime ===
                  "Vertical Up Bubble Flow" ||
                  (vuData as VUDataType).flow_regime ===
                    "Vertical Up Finely Dispersed Bubble Flow") && (
                  <>
                    Two Phase Density (Kg/m³) = {(vuData as VUDataType).LoNS}
                    <br />
                    Liquid Volume Fraction = {(vuData as VUDataType).Landa}
                    <br />
                    Two-Phase Velocity (m/s)= {(vuData as VUDataType).UTP}
                    <br />
                  </>
                )}
                {/* Bubble Model 輸出結束 */}
                {/* 針對 Similarity Model 的輸出 */}
                {(vuData as VUDataType).flow_regime ===
                  "Vertical Up Annular Flow" && (
                  <>
                    Two Phase Density (Kg/m³) = {(vuData as VUDataType).Loip}
                    <br />
                    Liquid Volume Fraction = {(vuData as VUDataType).RL}
                    <br />
                    Two-Phase Velocity (m/s)= {(vuData as VUDataType).UTP}
                    <br />
                  </>
                )}
                {/* Similarity Model 輸出結束 */}
                {/* 針對 Slug Model 的輸出 */}
                {(vuData as VUDataType).flow_regime ===
                  "Vertical Up Slug and Churn Flow" && (
                  <>
                    Liquid Slug Unit Density (Kg/m³) ={" "}
                    {(vuData as VUDataType).LoLS} <br />
                    Two-Phase Slug Unit Density (Kg/m³) ={" "}
                    {(vuData as VUDataType).LoSU} <br />
                    Liquid Slug Velocity (m/s) = {(vuData as VUDataType).ULLS}
                    <br />
                    Liquid Slug Length (m) = {(vuData as VUDataType).LLS}
                    <br />
                    Slug Unit Length (Liq+Vap) (m) = {(vuData as VUDataType).Lu}
                    <br />
                    Stabilizes to Slug Flow in x m (m) ={" "}
                    {(vuData as VUDataType).Le}
                    <br />
                  </>
                )}
                {/* Slug Model 輸出結束 */}
                {/* 以下為共通輸出 */}
                1.0 Velocity Head (Kgf/cm²) = {(vuData as VUDataType).Head}
                <br />
                Frictional Press. Loss (Kgf/cm²/100m) ={" "}
                {(vuData as VUDataType).Pfric}
                <br />
                Elevation Head Loss (Kgf/cm²/100m) ={" "}
                {(vuData as VUDataType).Pgrav}
                <br />
                Erosion Factor = {(vuData as VUDataType).Ef} &nbsp; &nbsp;
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

export default DataListVU;
