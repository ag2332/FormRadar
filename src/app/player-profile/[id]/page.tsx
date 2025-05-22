"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Section from "@/app/components/section";
import PlayerBanner from "@/app/components/molecules/player-banner";
import { Player } from "../../home/page";

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
  const [pointsFormData, setPointsFormData] = useState<PointsFormData | null>(null);

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
        }
      } catch (err) {
        console.error("Failed to load player data:", err);
      }
    };

    if (id) fetchPlayerData();
  }, [id]);

  if (!player || !pointsFormData)
    return <div className="p-8 text-[#38003c]">Loading...</div>;

  return (
    <Section className="mt-[var(--header-height)]">
      <PlayerBanner
        player={player}
        fullName={player.full_name}
        playerImageUrl={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photo?.replace(
          ".jpg",
          ""
        )}.png`}
        teamName={player.team}
        teamBadgeUrl={`/team-badges/${player.team_code}.png`}
        pointsFormData={pointsFormData}
      />
    </Section>
  );
};

export default PlayerProfile;
