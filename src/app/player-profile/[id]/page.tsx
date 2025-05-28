"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Section from "@/app/components/Section";
import PlayerBanner from "@/app/components/molecules/player-banner";
import { Player } from "@/app/page";
import PointsFormCard from "@/app/components/molecules/points-card";
import Card from "@/app/components/atoms/card";
import {
  getPlayerImage,
  getTeamBadge,
  valueEfficiencyLevels,
} from "@/app/utilities/styles";
import {
  calculateAverages,
  calculatePercentile,
  Averages,
  PlayerRawData,
} from "@/app/utilities/fplAverages";
import ValueEfficiency from "@/app/components/molecules/value-efficiency";

interface PointsFormData {
  totalPoints: number;
  gameWeekPoints: number;
  bonusPoints: number;
  form: string;
  ictIndex: string;
  selectedByPercent: string;
  percentiles: {
    totalPoints: number;
    gameWeekPoints: number;
    bonusPoints: number;
    form: number;
    ictIndex: number;
    selectedByPercent: number;
  };
}

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [teamCode, setTeamCode] = useState<number | null>(null);
  const [pointsFormData, setPointsFormData] = useState<PointsFormData | null>(
    null
  );
  const [averages, setAverages] = useState<Averages | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const res = await fetch("/api/fpl");
        const data = await res.json();

        const allPlayersRaw: PlayerRawData[] = data.elements;

        const filteredPlayers = allPlayersRaw.filter(
          (p) => parseFloat(p.selected_by_percent) > 0.5
        );

        const computedAverages = calculateAverages(allPlayersRaw);
        setAverages(computedAverages);

        const totalPointsArr = filteredPlayers.map((p) => p.total_points);
        const gameWeekPointsArr = allPlayersRaw.map((p) => p.event_points);
        const bonusPointsArr = allPlayersRaw.map((p) => p.bonus);
        const formArr = filteredPlayers.map((p) => parseFloat(p.form));
        const ictIndexArr = filteredPlayers.map((p) => parseFloat(p.ict_index));
        const selectedByPercentArr = filteredPlayers
          .map((p) => parseFloat(p.selected_by_percent))
          .filter((n) => !isNaN(n));

        const playerData = data.elements.find((p: any) => p.id === Number(id));
        if (playerData) {
          const team = data.teams.find((t: any) => t.id === playerData.team);
          const position = data.element_types.find(
            (e: any) => e.id === playerData.element_type
          );

          const transformedPlayer: Player = {
            id: playerData.id,
            name: `${playerData.first_name} ${playerData.second_name}`,
            full_name: `${playerData.first_name} ${playerData.second_name}`,
            team: team?.name || "Unknown",
            position: position?.singular_name || "Unknown",
            value: playerData.now_cost / 10,
            stats: playerData,
            photo: undefined,
            team_code: undefined,
          };

          const percentiles = {
            totalPoints: calculatePercentile(
              totalPointsArr,
              playerData.total_points
            ),
            gameWeekPoints: calculatePercentile(
              gameWeekPointsArr,
              playerData.event_points
            ),
            bonusPoints: calculatePercentile(bonusPointsArr, playerData.bonus),
            form: calculatePercentile(formArr, parseFloat(playerData.form)),
            ictIndex: calculatePercentile(
              ictIndexArr,
              parseFloat(playerData.ict_index)
            ),
            selectedByPercent: calculatePercentile(
              selectedByPercentArr,
              parseFloat(playerData.selected_by_percent) || 0
            ),
          };

          const pointsData: PointsFormData = {
            totalPoints: playerData.total_points,
            gameWeekPoints: playerData.event_points,
            bonusPoints: playerData.bonus,
            form: String(playerData.form),
            ictIndex: String(playerData.ict_index),
            selectedByPercent: String(playerData.selected_by_percent || "0"),
            percentiles,
          };

          setPlayer(transformedPlayer);
          setPointsFormData(pointsData);
          setTeamCode(team?.code ?? null);
        }
      } catch (err) {
        console.error("Failed to load player data:", err);
      }
    };

    if (id) fetchPlayerData();
  }, [id]);

  if (!player || !pointsFormData || !averages || teamCode === null)
    return <div className="p-8 text-[#38003c]">Loading...</div>;

  const valueEfficiencyRaw =
    player?.value > 0
      ? Math.min((pointsFormData?.totalPoints / player?.value) * 10, 100)
      : 0;
  const valueEfficiencyDisplay = (valueEfficiencyRaw / 10).toFixed(1);
  const valueEfficiencyLevel =
    valueEfficiencyRaw < valueEfficiencyLevels.low.maxLevel
      ? "low"
      : valueEfficiencyRaw < valueEfficiencyLevels.moderate.maxLevel
      ? "moderate"
      : valueEfficiencyRaw < valueEfficiencyLevels.good.maxLevel
      ? "good"
      : "high";


  const playerImageUrl = getPlayerImage(player.stats.photo);
  const teamBadgeUrl = getTeamBadge(player.stats.team_code);

  return (
    <div className="px-8 mt-40">
      <Section>
        <PlayerBanner
          player={player}
          playerImageUrl={playerImageUrl}
          teamBadgeUrl={teamBadgeUrl}
          fullName={player.full_name}
          teamName={player.team}
          className="p-15 place-items-center"
        />
      </Section>
      <div className="mt-8">
        <Card className={""}>
          <PointsFormCard
            totalPoints={pointsFormData.totalPoints}
            bonusPoints={pointsFormData.bonusPoints}
            gameWeekPoints={pointsFormData.gameWeekPoints}
            form={pointsFormData.form}
            ictIndex={pointsFormData.ictIndex}
            selectedByPercent={pointsFormData.selectedByPercent}
            percentiles={pointsFormData.percentiles}
            player={player}
            averages={averages} // pass averages here
          />
        </Card>
      </div>
      <div className="mt-8">
        <Card className={""}>
          <ValueEfficiency
            valueEfficiencyLevel={valueEfficiencyLevel}
            valueEfficiencyDisplay={valueEfficiencyDisplay}
          />
        </Card>
      </div>
    </div>
  );
};

export default PlayerProfile;
