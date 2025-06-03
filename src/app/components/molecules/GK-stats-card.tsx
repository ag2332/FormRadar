import React from "react";
import Label from "../atoms/label";
import { GKStatsCardProps } from "@/app/utilities/types";

const GKStatsCard = ({
  saves,
  savePercentage,
  cleanSheets,
  goalsConceded,
  penaltiesSaved,
  goalsPrevented,
  savesPer90,
}: GKStatsCardProps) => {
  return (
    <>
    <h1 className="text-7xl font-semibold">Goalkeeper Stats Card</h1>
    <div className="text-5xl">
      <Label>
        <h1 className="font-semibold">Total Saves:</h1>
        <div>{saves}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Save Percentage Rate:</h1>
        <div>{savePercentage}%</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Clean Sheets:</h1>
        <div>{cleanSheets}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Goals Conceded:</h1>
        <div>{goalsConceded}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Penalties Saved:</h1>
        <div>{penaltiesSaved}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Goals Prevented:</h1>
        <div>{goalsPrevented}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Saves/90</h1>
        <div>{savesPer90}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
    </div>
    </>
  );
};

export default GKStatsCard;
