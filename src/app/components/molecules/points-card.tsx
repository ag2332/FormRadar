import React, { useState, useEffect } from "react";
import Grid from "../atoms/Grid";
import { PointsFormCardProps } from "@/app/utilities/types";
import DataContainer from "./DataContainer";
import {
  filteredPlayers,
  allPlayersRaw,
  PlayerRawData,
} from "@/app/utilities/fplAverages";

const PointsFormCard = ({ data, player }: PointsFormCardProps) => {
  const [allPlayers, setAllPlayers] = useState<PlayerRawData[]>([]);
  const [filteredPlayersArr, setFilteredPlayersArr] = useState<PlayerRawData[]>(
    []
  );

  useEffect(() => {
    const fetchPlayers = async () => {
      const awaitAllPlayersRaw = await allPlayersRaw();
      const filteredPlayersData = await filteredPlayers();
      setAllPlayers(awaitAllPlayersRaw);
      setFilteredPlayersArr(filteredPlayersData);
    };

    fetchPlayers();
  }, []);

  return (
    <Grid className="text-5xl" columns={3}>
      {data.map(
        (
          item: {
            title: string;
            field: string;
            source: "allPlayers" | "filteredPlayersArr";
          },
          index: number
        ) => {
          const sourceArray =
            item.source === "allPlayers" ? allPlayers : filteredPlayersArr;
          const data: number[] = sourceArray
            .map((player) =>
              parseFloat(
                player[item.field as keyof PlayerRawData] as unknown as string
              )
            )
            .filter((n) => !isNaN(n));

          console.log(`Data for field "${item.field}":`, data);

          return (
            <DataContainer
              key={index}
              title={item.title}
              field={item.field}
              player={player}
              data={data}
            />
          );
        }
      )}
    </Grid>
  );
};

export default PointsFormCard;
