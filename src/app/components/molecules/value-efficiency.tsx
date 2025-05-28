import React from "react";
import { valueEfficiencyLevels } from "@/app/utilities/styles";
import Section from "../Section";
import Grid from "../atoms/Grid";

interface ValueEfficiencyProps {
  valueEfficiencyLevel: "low" | "moderate" | "good" | "high";
  valueEfficiencyDisplay: string;
}

const ValueEfficiency: React.FC<ValueEfficiencyProps> = ({
  valueEfficiencyLevel,
  valueEfficiencyDisplay,
}) => {
  const levelData = valueEfficiencyLevels[valueEfficiencyLevel];

  return (
    <Section>
      <Grid columns={3} className={"text-3xl"}>
        <div>
          <p className="text-xl text-gray-500 mt-1">{levelData.description}</p>
        </div>
        <div>
          <h1 className="font-semibold">Value Efficiency:</h1>
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
        <div>needle gauge</div>
      </Grid>
    </Section>
  );
};

export default ValueEfficiency;
