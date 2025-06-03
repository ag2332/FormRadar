import React, { useState, useEffect } from "react";
import Grid from "../atoms/Grid";
import { PointsFormCardProps } from "@/app/utilities/types";
import DataContainer from "./DataContainer";
import { filteredPlayers, allPlayersRaw, PlayerRawData, calculatePercentile, calculateAverage } from "@/app/utilities/fplAverages";


const PointsFormCard = ({
  totalPoints,
  form,
  ictIndex,
  selectedByPercent,
  gameWeekPoints,
  bonusPoints,
}: PointsFormCardProps) => {
  const [allPlayers, setAllPlayers] = useState<PlayerRawData[]>([]);
  const [filteredPlayersArr, setFilteredPlayersArr] = useState<PlayerRawData[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const awaitAllPlayersRaw = await allPlayersRaw();
      const filteredPlayersData = await filteredPlayers();
      setAllPlayers(awaitAllPlayersRaw);
      setFilteredPlayersArr(filteredPlayersData);
    };

    fetchPlayers();
  }, []);

  function dataFilter(data: any[], filter: string) {
    const filteredData = data.map((item: { [x: string]: any; }) => parseFloat(item[filter]));
    console.log(filteredData, "Filtered Data", filter);
      return filteredData.filter((n: number) => !isNaN(n));
  }

  // Collect arrays for percentile calculation
  const totalPointsArr = dataFilter(filteredPlayersArr, "total_points");
  const gameWeekPointsArr = dataFilter(allPlayers, "event_points");
  const bonusPointsArr = dataFilter(allPlayers, "bonus");
  const formArr = dataFilter(filteredPlayersArr, "form");
  const ictIndexArr = dataFilter(filteredPlayersArr, "ict_index");
  const selectedByPercentArr = dataFilter(filteredPlayersArr, "selected_by_percent");

  const dataArray = [
    {
      title: "Total Points",
      data: totalPoints,
      dataAverage: calculateAverage(totalPointsArr),
      dataPercentile: parseFloat(calculatePercentile(totalPointsArr, totalPoints).toFixed(1)),
    },
    {
      title: "Game Week Points",
      data: gameWeekPoints,
      dataAverage: calculateAverage(gameWeekPointsArr),
      dataPercentile: parseFloat(calculatePercentile(gameWeekPointsArr, gameWeekPoints).toFixed(1)),
    },
    {
      title: "Bonus Points",
      data: bonusPoints,
      dataAverage: calculateAverage(bonusPointsArr),
      dataPercentile: parseFloat(calculatePercentile(bonusPointsArr, bonusPoints).toFixed(1)),
    },
    {
      title: "Form",
      data: form,
      dataAverage: calculateAverage(formArr),
      dataPercentile: parseFloat(calculatePercentile(formArr, parseFloat(form)).toFixed(1)),
    },
    {
      title: "ICT Index",
      data: ictIndex,
      dataAverage: calculateAverage(ictIndexArr),
      dataPercentile: parseFloat(calculatePercentile(ictIndexArr, parseFloat(ictIndex)).toFixed(1)),
    },
    {
      title: "Selected By %",
      data: selectedByPercent,
      dataAverage: calculateAverage(selectedByPercentArr),
      dataPercentile: parseFloat(calculatePercentile(selectedByPercentArr, parseFloat(selectedByPercent) || 0).toFixed(1)),
    },
  ]

  return (
    <Grid className="text-5xl" columns={3}>
      {dataArray.map((item, index) => (
        <DataContainer
          key={index}
          title={item.title}
          data={item.data}
          dataAverage={item.dataAverage}
          dataPercentile={item.dataPercentile}
        />
      ))}
    </Grid>
  );
};

export default PointsFormCard;
