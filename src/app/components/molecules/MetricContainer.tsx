import React from "react";
import Heading from "../atoms/Heading";
import Grid from "../atoms/Grid";
import Section from "../Section";
import GaugeChart from "./gauge-chart";

interface MetricContainerProps {
  dataLevel: "low" | "moderate" | "good" | "high";
  dataDisplay: string | number;
  dataDisplayAverage: number;
  dataDisplayHighest: number;
  dataRaw?: number;
  fullName: string;
  text: string;
  levelData: {
    color: string;
    background: string;
    maxLevel: number;
    description: string;
    recommendation: string;
  };
}

const MetricContainer = ({
  dataLevel,
  dataDisplay,
  dataDisplayAverage,
  dataDisplayHighest,
  dataRaw,
  fullName,
  text,
  levelData,
}: MetricContainerProps) => {
  return (
    <Section>
      <Grid columns={2} className={"text-6xl flex items-center"}>
        <div>
          <div className="my-10">
            <Heading text={text} tag="h1" />
            <span className="">{dataDisplay}</span>
            <h5
              className="inline-block ml-2 px-2 py-1 rounded"
              style={{
                color: levelData.color,
                background: levelData.background,
              }}
            >
              {dataLevel}
            </h5>
          </div>
          <div>
            <GaugeChart
              gaugeData={dataRaw ?? 0}
              dataLevel={dataLevel}
              dataDisplay={dataDisplay}
              dataDisplayAverage={dataDisplayAverage}
              dataDisplayHighest={dataDisplayHighest}
            />
          </div>
        </div>
        <div className="text-xl text-gray-500 mt-2">
          <Heading
            text={`${fullName} ${levelData.description}`}
            tag="p"
            className="p-2"
          />
          <Heading
            text={`${levelData.recommendation}`}
            tag="p"
            className="p-2"
          />
        </div>
      </Grid>
    </Section>
  );
};

export default MetricContainer;
