import React from "react";
import Label from "../atoms/label";
import { ICTCardProps } from "@/app/utilities/types";

const ICTCard = ({
  influence,
  creativity,
  threat,
  ictIndex,
  goalsScored,
  assists,
  threatRank,
}: ICTCardProps) => {
  return (
    <>
      <Label>
        <h1 className="font-semibold">Threat Rank:</h1>
        <div>{threatRank}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Goals Scored:</h1>
        <div>{goalsScored}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Assists</h1>
        <div>{assists}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">ICT Index:</h1>
        <div>{ictIndex}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Influence:</h1>
        <div>{influence}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Creativity:</h1>
        <div>{creativity}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
      <Label>
        <h1 className="font-semibold">Threat:</h1>
        <div>{threat}</div>
        <div className="text-xl text-gray-500">
          Average: {} | Percentile:
          {}%
        </div>
      </Label>
    </>
  );
};

export default ICTCard;
