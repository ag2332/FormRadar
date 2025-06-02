import React from "react";
import Grid from "../atoms/Grid";
import { PointsFormCardProps } from "@/app/utilities/types";
import DataContainer from "./DataContainer";


const PointsFormCard = ({
  totalPoints,
  form,
  ictIndex,
  selectedByPercent,
  percentiles,
  gameWeekPoints,
  bonusPoints,
  player,
  averages,
}: PointsFormCardProps) => {
  console.log(percentiles)

  const dataArray = [
    {
      title: "Total Points",
      data: totalPoints,
      average: averages.avgTotalPoints.toFixed(1),
      percentile: percentiles.totalPoints,
    },
    {
      title: "Game Week Points",
      data: gameWeekPoints,
      average: averages.avgGameWeekPoints.toFixed(1),
      percentile: percentiles.gameWeekPoints,
    },
    {
      title: "Bonus Points",
      data: bonusPoints,
      average: averages.avgBonusPoints.toFixed(1),
      percentile: percentiles.bonusPoints,
    },
    {
      title: "Form",
      data: form,
      average: averages.avgForm.toFixed(2),
      percentile: percentiles.form,
    },
    {
      title: "ICT Index",
      data: ictIndex,
      average: averages.avgIctIndex.toFixed(1),
      percentile: percentiles.ictIndex,
    },
    {
      title: "Selected By %",
      data: selectedByPercent,
      average: averages.avgSelectedByPercent.toFixed(1),
      percentile: percentiles.selectedByPercent,
    },
  ]
  return (


    <Grid className="text-5xl" columns={3}>
      {dataArray.map((item, index) => (
        <DataContainer
          key={index}
          title={item.title}
          data={item.data}
          average={item.average}
          percentile={item.percentile}
        />
      ))}
    </Grid>
  );
};

export default PointsFormCard;
