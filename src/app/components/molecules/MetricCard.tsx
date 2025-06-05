import React from "react";
import { dataLevels } from "@/app/utilities/styles";
import { MetricDataProps } from "@/app/utilities/types/types";
import MetricContainer from "./MetricContainer";
import { calculateAverage, calculateHighest } from "@/app/utilities/fplData";

const MetricCard: React.FC<MetricDataProps> = ({
  dataLevel,
  dataDisplay,
  dataRaw,
  fullName,
  text,
}) => {

  const levelData = dataLevels[dataLevel];
  const dataDisplayHighest = calculateHighest([dataDisplay / 10]);
  const dataDisplayAverage = calculateAverage([dataDisplay / 10]);

  return (
    <MetricContainer
    levelData={levelData}
    dataDisplay={`${dataDisplay}`}
    dataDisplayAverage={dataDisplayAverage}
    dataDisplayHighest={dataDisplayHighest}
    dataRaw={dataRaw}
    fullName={fullName}
    dataLevel={dataLevel}
    text={text}
    />
  );
};

export default MetricCard;
