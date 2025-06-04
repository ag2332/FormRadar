import "chart.js";

declare module "chart.js" {
  interface ChartTypeRegistry {
    gauge: {
      chartOptions: any; // Customize this type if you know the specific options
      datasetOptions: any; // Customize this type if you know the specific dataset options
      defaultDataPoint: number;
    };
  }
}