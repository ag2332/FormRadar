import React from "react";
import Label from "../atoms/label";
import { ATStatsCardProps } from "@/app/utilities/types";

const ATStatsCard = ({
  numberOfGamesStarted,
  expectedGoals,
  expectedGoalsPer90,
  expectedAssists,
  expectedAssistsPer90,
  expectedGoalInvolvements,
  expectedGoalInvolvementsPer90,
}: ATStatsCardProps) => {
  return (
    <>
      <h1 className="text-7xl font-semibold">Attacking Stats Card</h1>
      <Label>
        <h1 className="font-semibold">No. of Games Started:</h1>
        <div>{numberOfGamesStarted}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">xG:</h1>
        <div>{expectedGoals}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">xG/90:</h1>
        <div>{expectedGoalsPer90}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Expected Assists:</h1>
        <div>{expectedAssists}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Expected Assists/90:</h1>
        <div>{expectedAssistsPer90}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">xG Involvements:</h1>
        <div>{expectedGoalInvolvements}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">xG Involvements/90:</h1>
        <div>{expectedGoalInvolvementsPer90}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
    </>
  );
};

export default ATStatsCard;
