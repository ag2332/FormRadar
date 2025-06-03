import React from "react";
import Label from "../atoms/label";
import { DFStatsCardProps } from "@/app/utilities/types";

const DFStatsCard = ({
  cleanSheets,
  cleanSheetsPer90,
  goalsConceded,
  goalsConcededPer90,
  expectedGoalsConceded,
  ownGoals,
  blocks,
}: DFStatsCardProps) => {
  return (
    <>
      <h1 className="text-7xl font-semibold">Defensive Stats Card</h1>
      <Label>
        <h1 className="font-semibold">Clean Sheets:</h1>
        <div>{cleanSheets}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Clean Sheets/90</h1>
        <div>{cleanSheetsPer90}</div>
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
        <h1 className="font-semibold">Goals Conceded/90</h1>
        <div>{goalsConcededPer90}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">xG Conceded:</h1>
        <div>{expectedGoalsConceded}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Own Goals:</h1>
        <div>{ownGoals}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Blocks:</h1>
        <div>{blocks}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
    </>
  );
};

export default DFStatsCard;
