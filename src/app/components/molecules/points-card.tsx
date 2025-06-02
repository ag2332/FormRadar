import React from "react";
import Grid from "../atoms/Grid";
import Label from "../atoms/label";
import { PointsFormCardProps } from "@/app/utilities/types";

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
  return (
    <Grid className="text-5xl" columns={3}>
      <Label>
        <h1 className="font-semibold">Total Points:</h1>
        <div>{totalPoints}</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgTotalPoints.toFixed(1)} | Percentile:
          {percentiles.totalPoints}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">GW Points:</h1>
        <div>{gameWeekPoints}</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgGameWeekPoints.toFixed(1)} | Percentile:
          {percentiles.gameWeekPoints}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Bonus Points:</h1>
        <div>{bonusPoints}</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgBonusPoints.toFixed(1)} | Percentile:
          {percentiles.bonusPoints}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Form:</h1>
        <div>{form}</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgForm.toFixed(2)} | Percentile:
          {percentiles.form}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">ICT Index:</h1>
        <div>{ictIndex}</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgIctIndex.toFixed(2)} | Percentile:
          {percentiles.ictIndex}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Selected By:</h1>
        <div>{selectedByPercent}%</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgSelectedByPercent.toFixed(1)} | Percentile:
          {percentiles.selectedByPercent}%
        </div>
      </Label>
    </Grid>
  );
};

export default PointsFormCard;
