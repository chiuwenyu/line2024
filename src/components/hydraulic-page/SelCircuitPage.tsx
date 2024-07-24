import { Grid } from "@mui/material";
import React from "react";
import ActionAreaCard from "./ActionAreaCard";
import imageA from "../../assets/ThermoSyphone-Case A.svg";

const cards = [
  {
    cardimage: imageA,
    title: "Case A",
    subtitle: "Horizontal 'J' type reboiler, Preference Ciucuit",
    description: `Downcomer is draw-off from trapout boot and return to the bottom of
            trapout boot, The bottom product is discharged from the bottom of
            the distillation tower.`,
  },
  {
    cardimage: imageA,
    title: "Case B",
    subtitle: "Horizontal 'J' type reboiler, Circulating Ciucuit",
    description: `Downcomer is draw-off from the column bottom, 
            The bottom product is also discharged from the bottom of
            the distillation tower.`,
  },
  {
    cardimage: imageA,
    title: "Case C",
    subtitle: "Horizontal 'J' type reboiler, One-Through Ciucuit",
    description: `Downcomer is draw-off from the overflow baffle of column bottom, 
            The bottom product is also discharged from the another-side of baffle of
            bottom.`,
  },
  {
    cardimage: imageA,
    title: "Case D",
    subtitle: "Kettle type reboiler, Circulating Ciucuit",
    description: `Downcomer is draw-off from the column bottom, 
            fully Vapor is instead of two phase line for Kettle reboiler.`,
  },
  {
    cardimage: imageA,
    title: "Case E",
    subtitle: "Vertical 'E' type reboiler, Circulating Ciucuit",
    description: `Downcomer is draw-off from the column bottom, 
            The bottom product is also discharged from the bottom of
            the distillation tower.`,
  },
  {
    cardimage: imageA,
    title: "Case F",
    subtitle: "Vertical 'E' type reboiler, Preference Ciucuit",
    description: `Downcomer is draw-off from trapout boot and return to the bottom of
            trapout boot, The bottom product is discharged from the bottom of
            the distillation tower.`,
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
