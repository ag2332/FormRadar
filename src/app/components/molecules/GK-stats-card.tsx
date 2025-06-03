import React, { useState, useEffect } from "react";
import { ComponentProps } from "@/app/utilities/types";
import DataContainer from "./DataContainer";
import {
  filteredPlayers,
  allPlayersRaw,
  PlayerRawData,
} from "@/app/utilities/fplAverages";

const GKStatsCard = ({ data, player }: ComponentProps) => {
  const [allPlayers, setAllPlayers] = useState<PlayerRawData[]>([]);
  const [filteredPlayersArr, setFilteredPlayersArr] = useState<PlayerRawData[]>(
    []
  );

  // Compute derived stats locally
  const calculatedPlayer = (() => {
    const { saves, goals_conceded, expected_goals_conceded, minutes } = player;

    const save_percentage =
      saves + goals_conceded > 0
        ? +((saves / (saves + goals_conceded)) * 100).toFixed(1)
        : 0;

    const goals_prevented = +(expected_goals_conceded - goals_conceded).toFixed(
      1
    );

    const saves_per_90 = minutes > 0 ? +(saves / (minutes / 90)).toFixed(2) : 0;

    return {
      ...player,
      save_percentage,
      goals_prevented,
      saves_per_90,
    };
  })();

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
      <h1 className="text-7xl font-semibold">Goalkeeping</h1>
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
            .map((p) => {
              const value =
                item.field in p
                  ? p[item.field as keyof PlayerRawData]
                  : ((): number => {
                      if (item.field === "save_percentage") {
                        const saves = p.saves || 0;
                        const conceded = p.goals_conceded || 0;
                        return saves + conceded > 0
                          ? +((saves / (saves + conceded)) * 100).toFixed(1)
                          : 0;
                      }
                      if (item.field === "goals_prevented") {
                        return +(
                          (p.expected_goals_conceded ?? 0) -
                          (p.goals_conceded ?? 0)
                        ).toFixed(1);
                      }
                      if (item.field === "saves_per_90") {
                        const mins = p.minutes || 0;
                        return mins > 0
                          ? +(p.saves / (mins / 90)).toFixed(2)
                          : 0;
                      }
                      return NaN;
                    })();

              return parseFloat(value as unknown as string);
            })
            .filter((n) => !isNaN(n));

          return (
            <DataContainer
              key={index}
              title={item.title}
              field={item.field}
              player={calculatedPlayer}
              data={data}
            />
          );
        }
      )}
    </>
  );
};

export default GKStatsCard;
