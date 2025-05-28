import { Player } from "@/app/page";
import React from "react";
import Grid from "../atoms/Grid";

interface PointsFormCardProps {
  totalPoints: number;
  form: string;
  ictIndex: string;
  selectedByPercent: string;
  percentiles: {
    totalPoints: number;
    gameWeekPoints: number;
    bonusPoints: number;
    form: number;
    ictIndex: number;
    selectedByPercent: number;
  };
  gameWeekPoints: number;
  bonusPoints: number;
  player: Player;
  averages: {
    avgTotalPoints: number;
    avgGameWeekPoints: number;
    avgBonusPoints: number;
    avgForm: number;
    avgIctIndex: number;
    avgSelectedByPercent: number;
  };
}

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
      <div>
        <h1 className="font-semibold">Total Points:</h1>
        <div>{totalPoints}</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgTotalPoints.toFixed(1)} | Percentile:
          {percentiles.totalPoints}%
        </div>
      </div>
      <div>
        <h1 className="font-semibold">GW Points:</h1>
        <div>{gameWeekPoints}</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgGameWeekPoints.toFixed(1)} | Percentile:
          {percentiles.gameWeekPoints}%
        </div>
      </div>
      <div>
        <h1 className="font-semibold">Bonus Points:</h1>
        <div>{bonusPoints}</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgBonusPoints.toFixed(1)} | Percentile:
          {percentiles.bonusPoints}%
        </div>
      </div>
      <div>
        <h1 className="font-semibold">Form:</h1>
        <div>{form}</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgForm.toFixed(2)} | Percentile:
          {percentiles.form}%
        </div>
      </div>
      <div>
        <h1 className="font-semibold">ICT Index:</h1>
        <div>{ictIndex}</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgIctIndex.toFixed(2)} | Percentile:
          {percentiles.ictIndex}%
        </div>
      </div>
      <div>
        <h1 className="font-semibold">Selected By:</h1>
        <div>{selectedByPercent}%</div>
        <div className="text-xl text-gray-500">
          Average: {averages.avgSelectedByPercent.toFixed(1)} | Percentile:
          {percentiles.selectedByPercent}%
        </div>
      </div>
    </Grid>
  );
};

export default PointsFormCard;
