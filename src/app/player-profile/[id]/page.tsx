"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Section from "@/app/components/Section";
import PlayerBanner from "@/app/components/molecules/player-banner";
import {
  Player,
  DFStatsCardProps,
  ATStatsCardProps,
  GKStatsCardProps,
} from "@/app/utilities/types";
import PointsFormCard from "@/app/components/molecules/points-card";
import Card from "@/app/components/atoms/card";
import {
  getPlayerImage,
  getTeamBadge,
  valueEfficiencyLevels,
} from "@/app/utilities/styles";
import {
  getCompletedGameweeks,
  allPlayersRaw,
} from "@/app/utilities/fplAverages";
import ValueEfficiency from "@/app/components/molecules/value-efficiency";
import Grid from "@/app/components/atoms/Grid";
import ReliabilityStatsCard from "@/app/components/molecules/reliability-stats-card";
import ATStatsCard from "@/app/components/molecules/AT-stats-card";
import DFStatsCard from "@/app/components/molecules/DF-stats-card";
import GKStatsCard from "@/app/components/molecules/GK-stats-card";
import ICTCard from "@/app/components/molecules/ICT-card";

interface PlayerInsights {
  playerKeyData: Player;
  teamCode: number;
}

const PlayerProfile = () => {
  const { id } = useParams();
  const [playerInsights, setPlayerInsights] = useState<PlayerInsights | null>(null);
  const [thisPlayer, setThisPlayer] = useState<any | null>(null);
  const [completedGameweeks, setCompletedGameweeks] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const res = await fetch("/api/fpl");
        const data = await res.json();

        setCompletedGameweeks(getCompletedGameweeks(data.events));

        const allPlayers = await allPlayersRaw();

        const playerData = allPlayers.find((p) => p.id === Number(id));

        setThisPlayer(playerData);

        if (playerData) {
          const team = data.teams.find((t: any) => t.id === playerData.team);
          const position = data.element_types.find(
            (e: any) => e.id === playerData.element_type
          );

          // Assemble all insights into a single state object
          const insights: PlayerInsights = {
            playerKeyData: {
              id: playerData.id,
              name: `${playerData.first_name} ${playerData.second_name}`,
              full_name: `${playerData.first_name} ${playerData.second_name}`,
              team: team?.name || "Unknown",
              position: position?.singular_name || "Unknown",
              value: playerData.now_cost / 10,
              stats: playerData,
              totalPoints: playerData.total_points,
              photo: undefined,
              team_code: undefined,
            } as Player,
            teamCode: team?.code ?? null,
          };

          setPlayerInsights(insights);
        }
      } catch (err) {
        console.error("Failed to load player data:", err);
      }
    };

    if (id) fetchPlayerData();
  }, [id]);

  if (!playerInsights || completedGameweeks === null)
    return <div className="p-8 text-[#38003c]">Loading...</div>;

  const { playerKeyData, teamCode } =
    playerInsights;

  const valueEfficiencyRaw =
    playerKeyData.value > 0
      ? Math.min(
          (playerKeyData.totalPoints /
            (completedGameweeks ?? 1) /
            playerKeyData.value) *
            100
        )
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

  const playerImageUrl = getPlayerImage(playerKeyData.stats.photo);
  const teamBadgeUrl = getTeamBadge(teamCode);

  const pointsCardData = [
    { title: "Total Points", field: "total_points", source: "filtered" },
    { title: "Game Week Points", field: "event_points", source: "all" },
    { title: "Bonus Points", field: "bonus", source: "all" },
    { title: "Form", field: "form", source: "filtered" },
    { title: "ICT Index", field: "ict_index", source: "filtered" },
    { title: "Selected By %", field: "selected_by_percent", source: "filtered" },
  ];

  const ICTCardData = [
    { title: "Threat Rank", field: "threat_rank", source: "all" },
    { title: "Goals Scored", field: "goals_scored", source: "all" },
    { title: "Assists", field: "assists", source: "all" },
    { title: "ICT Index", field: "ict_index", source: "all" },
    { title: "Influence", field: "influence", source: "all" },
    { title: "Creativity", field: "creativity", source: "all" },
    { title: "Threat", field: "threat", source: "all" },
  ];

  const reliabilityCardData = [
    { title: "Starts", field: "starts", source: "all" },
    { title: "Sub Appearances", field: "substitutes_in", source: "all" },
    { title: "Minutes Played", field: "minutes", source: "all" },
    { title: "Status", field: "status", source: "all" },
    { title: "Yellow Cards", field: "yellow_cards", source: "all" },
    { title: "Red Cards", field: "red_cards", source: "all" },
    { title: "Selected By %", field: "selected_by_percent", source: "all" },
  ];

  const ATCardData = [
    { title: "Games Started", field: "starts", source: "all" },
    { title: "Expected Goals", field: "expected_goals", source: "all" },
    { title: "xG Per 90", field: "expected_goals_per_90", source: "all" },
    { title: "xA", field: "expected_assists", source: "all" },
    { title: "xA Per 90", field: "expected_assists_per_90", source: "all" },
    { title: "xGI", field: "expected_goal_involvements", source: "all" },
    { title: "xGI Per 90", field: "expected_goal_involvements_per_90", source: "all" },
  ]

  const DFCardData = [
    { title: "Clean Sheets", field: "clean_sheets", source: "all" },
    { title: "Clean Sheets Per 90", field: "clean_sheets_per_90", source: "all" },
    { title: "Goals Conceded", field: "goals_conceded", source: "all" },
    { title: "Goals Conceded Per 90", field: "goals_conceded_per_90", source: "all" },
    { title: "Expected Goals Conceded", field: "expected_goals_conceded", source: "all" },
    { title: "Own Goals", field: "own_goals", source: "all" },
    { title: "Blocks", field: "blocks", source: "all" },
  ]

  const GKCardData = [
    { title: "Saves", field: "saves", source: "all" },
    { title: "Save %", field: "save_percentage", source: "computed" },
    { title: "Clean Sheets", field: "clean_sheets", source: "all" },
    { title: "Goals Conceded", field: "goals_conceded", source: "all" },
    { title: "Penalties Saved", field: "penalties_saved", source: "all" },
    { title: "Goals Prevented", field: "goals_prevented", source: "computed" },
    { title: "Saves Per 90", field: "saves_per_90", source: "computed" },
  ]

  return (
    <div className="px-8 mt-40">
      <Section>
        <PlayerBanner
          player={playerKeyData}
          playerImageUrl={playerImageUrl}
          teamBadgeUrl={teamBadgeUrl}
          fullName={playerKeyData.full_name}
          teamName={playerKeyData.team}
          className="p-15 place-items-center"
        />
      </Section>

      <div className="mt-8">
        <Card className={""}>
          <PointsFormCard data={pointsCardData} player={thisPlayer} />
        </Card>
      </div>

      <div className="mt-8">
        <Card className={""}>
          <ValueEfficiency
            valueEfficiencyLevel={valueEfficiencyLevel}
            valueEfficiencyDisplay={valueEfficiencyDisplay}
            valueEfficiencyRaw={valueEfficiencyRaw}
            fullName={playerKeyData.full_name}
          />
        </Card>
      </div>

      <div className="mt-8">
        <Grid columns={3} className={"text-5xl"}>
          {playerKeyData.position === "Goalkeeper" && (
            <>
              <Card className={""}>
                <GKStatsCard data={GKCardData} player={thisPlayer}/>
              </Card>
              <Card className={""}>
                <ReliabilityStatsCard data={reliabilityCardData} player={thisPlayer}/>
              </Card>
              <Card className={""}>
                <ICTCard data={ICTCardData} player={thisPlayer} />
              </Card>
            </>
          )}

          {playerKeyData.position === "Defender" && (
            <>
              <Card className={""}>
                <DFStatsCard data={DFCardData}  player={thisPlayer} />
              </Card>
              <Card className={""}>
                <ReliabilityStatsCard data={reliabilityCardData} player={thisPlayer} />
              </Card>
              <Card className={""}>
                <ICTCard data={ICTCardData} player={thisPlayer} />
              </Card>
            </>
          )}

          {(playerKeyData.position === "Midfielder" ||
            playerKeyData.position === "Forward") && (
            <>
              <Card className={""}>
                <ATStatsCard data={ATCardData} player={thisPlayer}/>
              </Card>
              <Card className={""}>
              <ReliabilityStatsCard data={reliabilityCardData} player={thisPlayer} />
              </Card>
              <Card className={""}>
                <ICTCard data={ICTCardData} player={thisPlayer} />
              </Card>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default PlayerProfile;
