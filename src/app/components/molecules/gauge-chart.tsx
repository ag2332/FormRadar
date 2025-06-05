import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import { dataLevels } from "@/app/utilities/styles";

type GaugeChartProps = {
  gaugeData: number;
  dataDisplay: number;
  dataDisplayAverage: number;
  dataDisplayHighest: number;
  dataLevel: "low" | "moderate" | "good" | "high";
};

export default function GaugeChart({ gaugeData, dataLevel, dataDisplay, dataDisplayAverage, dataDisplayHighest }: GaugeChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("chartjs-gauge").then(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        console.log(dataDisplayHighest, " Highest Value:");

        const config: Chart.ChartConfiguration = {
          type: "doughnut",
          data: {
            datasets: [
              {
                data: [dataDisplay, dataDisplayAverage, dataDisplayHighest,], // Quarter segments (total 100)
                value: gaugeData, // Directly using the raw value
                backgroundColor: [
                  dataLevels.low.color,
                  dataLevels.moderate.color,
                  dataLevels.good.color,
                  dataLevels.high.color,
                ],
                borderWidth: 2,
              } as any,
            ],
          },
          options: {
            responsive: true,
            title: {
              display: false,
            },
            layout: {
              padding: {
                bottom: 30,
              },
            },
            needle: {
              radiusPercentage: 2,
              widthPercentage: 3.2,
              lengthPercentage: 80,
              color: "rgba(0, 0, 0, 1)",
            },
            valueLabel: {
              formatter: Math.round,
              fontSize: 20,
              color: "#ffffff",
            },
          } as any,
        };

        chartInstance.current = new Chart(ctx, config);

        return () => {
          chartInstance.current?.destroy();
        };
      });
    }
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      const chart = chartInstance.current;

      if (chart.data && chart.data.datasets) {
        (chart.data.datasets[0] as any).value = gaugeData;
        chart.update();
      }
    }
  }, [gaugeData]);

  return <canvas ref={chartRef}></canvas>;
}
