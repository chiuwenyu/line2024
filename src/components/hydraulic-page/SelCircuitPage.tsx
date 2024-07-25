import { Grid } from "@mui/material";
import React from "react";
import ActionAreaCard from "./ActionAreaCard";
import imageA from "../../assets/ThermoSyphon-Case A.svg";
import imageB from "../../assets/ThermoSyphon-Case B.svg";
import imageC from "../../assets/ThermoSyphon-Case C.svg";
import imageD from "../../assets/ThermoSyphon-Case D.svg";
import imageE from "../../assets/ThermoSyphon-Case E.svg";
import imageF from "../../assets/ThermoSyphon-Case F.svg";

const cards = [
  {
    id: 1,
    cardimage: imageA,
    title: "Case A",
    subtitle: "Horizontal 'J' type reboiler, Preference Ciucuit",
    description: `Downcomer is drawn off from the trapout boot and returned to the bottom of the trapout boot. The bottom product is discharged from the bottom of the distillation tower.`,
  },
  {
    id: 2,
    cardimage: imageB,
    title: "Case B",
    subtitle: "Horizontal 'J' type reboiler, Circulating Ciucuit",
    description: `Downcomer is drawn off from the column bottom,  the bottom product is discharged from the bottom of the distillation tower.`,
  },
  {
    id: 3,
    cardimage: imageC,
    title: "Case C",
    subtitle: "Horizontal 'J' type reboiler, One-Through Ciucuit",
    description: `Downcomer is drawn off from the overflow baffle at the bottom of the column, and the bottom product is also discharged from the other side of the baffle at the bottom.`,
  },
  {
    id: 4,
    cardimage: imageD,
    title: "Case D",
    subtitle: "Kettle type reboiler, Circulating Ciucuit",
    description: `The downcomer draws off from the column bottom, fully vapor instead of a two-phase line for the kettle reboiler.`,
  },
  {
    id: 5,
    cardimage: imageE,
    title: "Case E",
    subtitle: "Vertical 'E' type reboiler, Circulating Ciucuit",
    description: `Downcomer is drawn off from the column bottom,  the bottom product is discharged from the bottom of the distillation tower.`,
  },
  {
    id: 6,
    cardimage: imageF,
    title: "Case F",
    subtitle: "Vertical 'E' type reboiler, Preference Ciucuit",
    description: `Downcomer is drawn off from the trapout boot and returned to the bottom of the trapout boot. The bottom product is discharged from the bottom of the distillation tower.`,
  },
];

const SelCircuitPage = (props: any) => {
  const { goNextStepbySelectCircuit, setCaseNo } = props;

  return (
    <>
      <Grid
        container
        gap={6}
        sx={{
          bgcolor: "grey.100",
          marginLeft: "10px",
        }}
      >
        {cards.map((card) => (
          <ActionAreaCard
            key={card.id}
            cardimage={card.cardimage}
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
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
