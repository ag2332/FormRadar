import React, { useState, useEffect } from "react";
import { ComponentProps } from "@/app/utilities/types";
import DataContainer from "./DataContainer";
import {
  filteredPlayers,
  allPlayersRaw,
  PlayerRawData,
} from "@/app/utilities/fplData";

const ATStatsCard = ({
  data,
  player,
}: ComponentProps) => {
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
    <>
      <h1 className="text-7xl font-semibold">Attacking</h1>
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
    </>
  );
};

export default ATStatsCard;
