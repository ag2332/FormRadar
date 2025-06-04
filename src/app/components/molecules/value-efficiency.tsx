import React from "react";
import { valueEfficiencyLevels } from "@/app/utilities/styles";
import Section from "../Section";
import Grid from "../atoms/Grid";
import GaugeChart from "./gauge-chart";
import { ValueEfficiencyProps } from "@/app/utilities/types";

const ValueEfficiency: React.FC<ValueEfficiencyProps> = ({
  valueEfficiencyLevel,
  valueEfficiencyDisplay,
  valueEfficiencyRaw,
  fullName,
}) => {
  const levelData = valueEfficiencyLevels[valueEfficiencyLevel];

  return (
    <Section>
      <Grid columns={2} className={"text-6xl flex items-center"}>
        <div className="text-xl text-gray-500 mt-2">
          <p className="p-2">
            {fullName}
            {levelData.description}
          </p>
          <p className="p-2">{levelData.recommendation}</p>
        </div>
        <div>
          <div className="my-10">
            <h1 className="font-semibold justify-end">Value Efficiency:</h1>
            <span className="">{valueEfficiencyDisplay}/10</span>
            <h5
              className="inline-block ml-2 px-2 py-1 rounded"
              style={{
                color: levelData.color,
                background: levelData.background,
              }}
            >
              {valueEfficiencyLevel}
            </h5>
          </div>
          <div>
            <GaugeChart
              gaugeData={valueEfficiencyRaw ?? 0}
              valueEfficiencyLevel={valueEfficiencyLevel}
            />
          </div>
        </div>
      </Grid>
    </Section>
  );
};

export default ValueEfficiency;
