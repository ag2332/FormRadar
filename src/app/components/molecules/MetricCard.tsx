import React from "react";
import { dataLevels } from "@/app/utilities/styles";
import { MetricDataProps } from "@/app/utilities/types/types";
import MetricContainer from "./MetricContainer";

const MetricCard: React.FC<MetricDataProps> = ({
  dataLevel,
  dataDisplay,
  averageResult,
  highestResult,
  dataRaw,
  fullName,
  text,
}) => {
  const levelData = dataLevels[dataLevel];

  return (
    <MetricContainer
      levelData={levelData}
      dataDisplay={`${dataDisplay}`}
      dataDisplayAverage={averageResult}
      dataDisplayHighest={highestResult}
      dataRaw={dataRaw}
      fullName={fullName}
      dataLevel={dataLevel}
      text={text}
    />
  );
};

export default MetricCard;
