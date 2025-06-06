import React from "react";
import { dataLevels } from "@/app/utilities/styles";
import { MetricDataProps } from "@/app/utilities/types/types";
import MetricContainer from "./MetricContainer";
import { calculateAverage, calculateHighest } from "@/app/utilities/fplData";

type PlayerMetrics = {
  valueEfficiencyRaw: number;
  roiRaw: number;
  pp90Raw: number;
  potRaw: number;
  upliftRaw: number;
  stdDevRaw: number;
  momentumRaw: number;
  explosivenessRaw: number;
  goalInvolvementRaw: number;
  differentialRaw: number;
  exploitabilityRaw: number;
  marketRaw: number;
};

const MetricCard: React.FC<MetricDataProps> = ({
  dataLevel,
  dataDisplay,
  dataRaw,
  fullName,
  text,
}) => {
  const levelData = dataLevels[dataLevel];
  const dataDisplayAverage = calculateAverage([dataDisplay]);
  const dataDisplayHighest = calculateHighest([dataDisplay]);

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
