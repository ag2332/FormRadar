import React from "react";
import Label from "../atoms/label";
import { ReliabilityStatsCardProps } from "@/app/utilities/types";
import { Average } from "next/font/google";

const ReliabilityStatsCard = ({
  minutesPlayed,
  starts,
  subAppearances,
  status,
  yellowCards,
  redCards,
  selectedByPercent,
}: ReliabilityStatsCardProps) => {
  const getPlayerStatusLabel = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      a: "Available",
      d: "Doubtful",
      i: "Injured",
      s: "Suspended",
      u: "Unavailable",
      n: "Not in Squad",
    };

    return statusMap[status] || "Unknown";
  };

  return (
    <>
      <h1 className="text-7xl font-semibold">Reliability Stats Card</h1>
      <Label>
        <h1 className="font-semibold">Minutes Played:</h1>
        <div>{minutesPlayed}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">No. of Starts:</h1>
        <div>{starts}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Starts:</h1>
        <div>{subAppearances}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Status:</h1>
        <div>{getPlayerStatusLabel(status)}</div>{" "}
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Yellow Cards:</h1>
        <div>{yellowCards}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Red Cards:</h1>
        <div>{redCards}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Selected By:</h1>
        <div>{selectedByPercent}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
    </>
  );
};

export default ReliabilityStatsCard;
