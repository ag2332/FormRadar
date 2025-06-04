import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import { valueEfficiencyLevels } from "@/app/utilities/styles";

type GaugeChartProps = {
  gaugeData: number; // Value from 0–100
  valueEfficiencyLevel?: string; // Optional, if you want to use it for styling or other purposes
};

export default function GaugeChart({ gaugeData, valueEfficiencyLevel }: GaugeChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("chartjs-gauge").then(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext("2d");
        if (!ctx) return;

        const config: Chart.ChartConfiguration = {
          type: "gauge",
          data: {
            datasets: [
              {
                data: [25,50,75,100], // Quarter segments (total 100)
                value: gaugeData, // Directly using the raw value
                backgroundColor: [
                  valueEfficiencyLevels.low.color,
                  valueEfficiencyLevels.moderate.color,
                  valueEfficiencyLevels.good.color,
                  valueEfficiencyLevels.high.color,
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
