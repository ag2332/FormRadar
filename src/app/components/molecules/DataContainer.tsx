import React from "react";
import Label from "../atoms/label";

interface DataContainerProps {
  title: string | null;
  data: number | string | null;
  average: number | string | null;
  percentile: number | null;
}

const DataContainer = ({
  title = null,
  data = null,
  average = null,
  percentile = null,
}: DataContainerProps) => {
  return (
    <Label className="flex flex-col items-center ">
      {title && (<p className="font-semibold text-h1">{title}</p>)}
      {data && (<div>{data}</div>)}
      <div className="text-xl text-gray-500 flex gap-4">
        <span>Average: {average}</span>
        {(percentile && average) && (<span>|</span>)}
        <span>Percentile: {percentile}%</span>
      </div>
    </Label>
  );
};

export default DataContainer;
