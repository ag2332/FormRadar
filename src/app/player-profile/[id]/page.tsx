"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Section from "@/app/components/Section";
import PlayerBanner from "@/app/components/molecules/player-banner";
import { Player } from "@/app/page";
import PointsFormCard from "@/app/components/molecules/points-card";
import Grid from "@/app/components/atoms/Grid";
import Card from "@/app/components/atoms/card";
import { getPlayerImage, getTeamBadge } from "@/app/utilities/styles";

interface PointsFormData {
  totalPoints: number;
  gameWeekPoints: number;
  bonusPoints: number;
  form: string;
  ictIndex: string;
  selectedByPercent: string;
}

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [teamCode, setTeamCode] = useState<number | null>(null);
  const [pointsFormData, setPointsFormData] = useState<PointsFormData | null>(
    null
  );

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const res = await fetch("/api/fpl");
        const data = await res.json();

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
            team_code: undefined
          };

          const pointsData: PointsFormData = {
            totalPoints: playerData.total_points,
            gameWeekPoints: playerData.event_points,
            bonusPoints: playerData.bonus,
            form: playerData.form,
            ictIndex: playerData.ict_index,
            selectedByPercent: playerData.selected_by_percent,
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

  if (!player || !pointsFormData || teamCode === null)
    return <div className="p-8 text-[#38003c]">Loading...</div>;

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
        <Grid className={"items-center"} columns={2}>
          <Card className={""}>
            <PointsFormCard
              totalPoints={pointsFormData.totalPoints}
              bonusPoints={pointsFormData.bonusPoints}
              gameWeekPoints={pointsFormData.gameWeekPoints}
              form={pointsFormData.form}
              ictIndex={pointsFormData.ictIndex}
              selectedByPercent={pointsFormData.selectedByPercent}
              player={player}
            />
          </Card>
          <Card className={""}>
            <PointsFormCard
              totalPoints={pointsFormData.totalPoints}
              bonusPoints={pointsFormData.bonusPoints}
              gameWeekPoints={pointsFormData.gameWeekPoints}
              form={pointsFormData.form}
              ictIndex={pointsFormData.ictIndex}
              selectedByPercent={pointsFormData.selectedByPercent}
              player={player}
            />
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default PlayerProfile;
