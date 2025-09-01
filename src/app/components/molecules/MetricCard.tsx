import React from "react";
import Heading from "../atoms/Heading";
import Grid from "../atoms/Grid";
import Section from "../Section";

interface MetricCardProps {
  dataLevel: "low" | "moderate" | "high";
  dataDisplay: string | number;
  dataRaw?: number;
  fullName: string;
  text: string;
  levelData: {
    color: string;
    background: string;
  };
  definition: {
    description: string;
    legend: string;
  };
}

const MetricCard = ({
  dataLevel,
  dataDisplay,
  text,
  levelData,
  definition,
}: MetricCardProps) => {

  return (
    <Section>
      <div>
        <div className="my-10 text-7xl">
          <Heading text={text} tag="h1" />
          <h2>{dataDisplay}</h2>
          <h5
            className="inline-block ml-2 px-2 py-1 rounded capitalize"
            style={{
              color: levelData.color,
              background: levelData.background,
            }}
          >
            {dataLevel}
          </h5>
        </div>
      </div>
      <Grid columns={2} className="text-xl text-gray-500 mt-2">
        <Heading text={definition.description} tag="p" className="p-2" />
        <Heading text={`Legend: ${definition.legend}`} tag="p" className="p-2" />
      </Grid>
    </Section>
  );
};

export default MetricCard;
