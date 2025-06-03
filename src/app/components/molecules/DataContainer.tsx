import React from "react";
import Label from "../atoms/label";

interface DataContainerProps {
  title: string | null;
  data: number | string | null;
  dataAverage: number | string | null;
  dataPercentile: number | null;
}

const DataContainer = ({
  title = null,
  data = null,
  dataAverage = null,
  dataPercentile = null,
}: DataContainerProps) => {
  return (
    <Label className="flex flex-col items-center ">
      {title && (<p className="font-semibold text-h1">{title}</p>)}
      {data && (<div>{data}</div>)}
      <div className="text-xl text-gray-500 flex gap-4">
        <span>Average: {dataAverage}</span>
        {(dataPercentile && dataAverage) && (<span>|</span>)}
        <span>Percentile: {dataPercentile}%</span>
      </div>
    </Label>
  );
};

export default DataContainer;
