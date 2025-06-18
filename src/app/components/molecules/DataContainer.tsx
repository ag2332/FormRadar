import React from "react";
import Label from "../atoms/label";
import {
  calculateAverage,
  calculatePercentile,
} from "@/app/utilities/fplData";

interface DataContainerProps {
  title: string | null;
  field: string;
  data: number[];
  player: any;
}

const DataContainer = ({
  title,
  field,
  data = [],
  player,
}: DataContainerProps) => {
  const rawValue = parseFloat(player?.[field] ?? "");
  const playerValue = !isNaN(rawValue) ? rawValue : 0;

  const average = calculateAverage(data);
  const percentile = calculatePercentile(data, playerValue);

  return (
    <Label className="flex flex-col items-center">
      {title && <p className="font-semibold text-6xl text-h1">{title}</p>}
      <p className="text-5xl">{isNaN(playerValue) ? "NaN" : playerValue}</p>
      <div className="text-2xl text-gray-500 flex gap-4">
        <span>Average {average.toFixed(1)}</span>
        <span>|</span>
        <span>
          Percentile {isNaN(percentile) ? "-" : `${percentile.toFixed(1)}%`}
        </span>
      </div>
    </Label>
  );
};

export default DataContainer;
