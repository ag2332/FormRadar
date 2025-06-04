import React from "react";
import { dataLevels } from "@/app/utilities/styles";
import { MetricDataProps } from "@/app/utilities/types";
import MetricContainer from "./MetricContainer";

const ValueEfficiency: React.FC<MetricDataProps> = ({
  dataLevel,
  dataDisplay,
  dataRaw,
  fullName,
  text,
}) => {
  const levelData = dataLevels[dataLevel];

  return (
    <MetricContainer
    levelData={levelData}
    dataDisplay={dataDisplay}
    dataRaw={dataRaw}
    fullName={fullName}
    dataLevel={dataLevel}
    text={text}
    />
  );
};

export default ValueEfficiency;
