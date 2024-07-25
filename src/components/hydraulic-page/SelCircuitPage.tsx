import { Grid } from "@mui/material";
import React from "react";
import ActionAreaCard from "./ActionAreaCard";
import imageA from "../../assets/ThermoSyphon-Case A.svg";
import imageB from "../../assets/ThermoSyphon-Case B.svg";

const cards = [
  {
    cardimage: imageA,
    title: "Case A",
    subtitle: "Horizontal 'J' type reboiler, Preference Ciucuit",
    description: `Downcomer is drawn off from the trapout boot and returned to the bottom of the trapout boot. The bottom product is discharged from the bottom of the distillation tower.`,
  },
  {
    cardimage: imageB,
    title: "Case B",
    subtitle: "Horizontal 'J' type reboiler, Circulating Ciucuit",
    description: `Downcomer is drawn off from the column bottom,  the bottom product is discharged from the bottom of the distillation tower.`,
  },
  {
    cardimage: imageA,
    title: "Case C",
    subtitle: "Horizontal 'J' type reboiler, One-Through Ciucuit",
    description: `Downcomer is drawn off from the overflow baffle at the bottom of the column, and the bottom product is also discharged from the other side of the baffle at the bottom.`,
  },
  {
    cardimage: imageA,
    title: "Case D",
    subtitle: "Kettle type reboiler, Circulating Ciucuit",
    description: `The downcomer draws off from the column bottom, fully vapor instead of a two-phase line for the kettle reboiler.`,
  },
  {
    cardimage: imageA,
    title: "Case E",
    subtitle: "Vertical 'E' type reboiler, Circulating Ciucuit",
    description: `Downcomer is drawn off from the column bottom,  the bottom product is discharged from the bottom of the distillation tower.`,
  },
  {
    cardimage: imageA,
    title: "Case F",
    subtitle: "Vertical 'E' type reboiler, Preference Ciucuit",
    description: `Downcomer is drawn off from the trapout boot and returned to the bottom of the trapout boot. The bottom product is discharged from the bottom of the distillation tower.`,
  },
];

const SelCircuitPage = () => {
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
            key={card.title}
            cardimage={card.cardimage}
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
          />
        ))}
        ;
      </Grid>
    </>
  );
};

export default SelCircuitPage;
