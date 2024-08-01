import { Grid } from "@mui/material";
import ActionAreaCard from "./ActionAreaCard";
import imageA from "../../assets/ThermoSyphon-Case A.svg";
import imageB from "../../assets/ThermoSyphon-Case B.svg";
import imageC from "../../assets/ThermoSyphon-Case C.svg";
import imageD from "../../assets/ThermoSyphon-Case D.svg";
import imageE from "../../assets/ThermoSyphon-Case E.svg";
import imageF from "../../assets/ThermoSyphon-Case F.svg";
import imageG from "../../assets/ThermoSyphon-Case G.svg";

const cards = [
  {
    id: "A",
    cardimage: imageA,
    title: "Case A",
    subtitle: "Horizontal 'J' type reboiler, Preference Ciucuit",
    description: `Downcomer is drawn off from the trapout boot and returned to the bottom of the trapout boot. The bottom product is discharged from the bottom of the distillation tower.`,
  },
  {
    id: "B",
    cardimage: imageB,
    title: "Case B",
    subtitle: "Horizontal 'J' type reboiler, Circulating Ciucuit",
    description: `Downcomer is drawn off from the column bottom,  the bottom product is discharged from the bottom of the distillation tower.`,
  },
  {
    id: "C",
    cardimage: imageC,
    title: "Case C",
    subtitle: "Horizontal 'J' type reboiler, One-Through Ciucuit",
    description: `Downcomer is drawn off from the overflow baffle at the bottom of the column, and the bottom product is also discharged from the other side of the baffle at the bottom.`,
  },
  {
    id: "D",
    cardimage: imageD,
    title: "Case D",
    subtitle: "Kettle type reboiler, Circulating Ciucuit",
    description: `The downcomer draws off from the column bottom, fully vapor instead of a two-phase line for the kettle reboiler.`,
  },
  {
    id: "E",
    cardimage: imageE,
    title: "Case E",
    subtitle: "Vertical 'E' type reboiler, Circulating Ciucuit",
    description: `Downcomer is drawn off from the column bottom,  the bottom product is discharged from the bottom of the distillation tower.`,
  },
  {
    id: "F",
    cardimage: imageF,
    title: "Case F",
    subtitle: "Vertical 'E' type reboiler, Preference Ciucuit",
    description: `Downcomer is drawn off from the trapout boot and returned to the bottom of the trapout boot. The bottom product is discharged from the bottom of the distillation tower.`,
  },
  {
    id: "G",
    cardimage: imageG,
    title: "Case G",
    subtitle: "Vertical 'E' type reboiler, One-Through Ciucuit",
    description: `Downcomer is drawn off from the overflow baffle at the bottom of the column, and the bottom product is also discharged from the other side of the baffle at the bottom.`,
  },
];

const SelCircuitPage = (props: any) => {
  const { goNextStepbySelectCircuit, caseNo, setCaseNo } = props;

  return (
    <>
      <Grid
        container
        gap={6}
        sx={{
          marginLeft: "10px",
        }}
      >
        {cards.map((card) => (
          <ActionAreaCard
            key={card.id}
            id={card.id}
            cardimage={card.cardimage}
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
            caseNo={caseNo}
            goNextStepbySelectCircuit={() => {
              goNextStepbySelectCircuit();
              setCaseNo(card.id);
            }}
          />
        ))}
        ;
      </Grid>
    </>
  );
};

export default SelCircuitPage;
