import { Player } from "@/app/page";
import React from "react";
import Grid from "../atoms/Grid";

interface PointsFormCardProps {
  totalPoints: number;
  form: string;
  ictIndex: string;
  selectedByPercent: string;
  gameWeekPoints: number;
  bonusPoints: number;
  player: Player;
}

const PointsFormCard = ({
  totalPoints,
  form,
  ictIndex,
  selectedByPercent,
  gameWeekPoints,
  bonusPoints,
  player,
}: PointsFormCardProps) => {
  return (
    <Grid className="text-3xl" columns={3}>
      <div>
        <h1 className="font-semibold">Total Points:</h1>
        <div>{totalPoints}</div>
      </div>
      <div>
        <h1 className="font-semibold">GW Points:</h1>
        <div>{gameWeekPoints}</div>
      </div>
      <div>
        <h1 className="font-semibold">Bonus Points:</h1>
        <div>{bonusPoints}</div>
      </div>
      <div>
        <h1 className="font-semibold">Form:</h1>
        <div>{form}</div>
      </div>
      <div>
        <h1 className="font-semibold">ICT Index:</h1>
        <div>{ictIndex}</div>
      </div>
      <div>
        <h1 className="font-semibold">Selected By:</h1>
        <div>{selectedByPercent}%</div>
      </div>
    </Grid>
  );
};

export default PointsFormCard;
