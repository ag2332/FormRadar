"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Section from "@/app/components/Section";
import PlayerBanner from "@/app/components/molecules/player-banner";
import {
  Player,
  ICTCardProps,
  ReliabilityStatsCardProps,
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
  filteredPlayers,
} from "@/app/utilities/fplAverages";
import ValueEfficiency from "@/app/components/molecules/value-efficiency";
import Grid from "@/app/components/atoms/Grid";
import ReliabilityStatsCard from "@/app/components/molecules/reliability-stats-card";
import ATStatsCard from "@/app/components/molecules/AT-stats-card";
import DFStatsCard from "@/app/components/molecules/DF-stats-card";
import GKStatsCard from "@/app/components/molecules/GK-stats-card";
import ICTCard from "@/app/components/molecules/ICT-card";

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

interface PlayerInsights {
  playerKeyData: Player;
  pointsData: PointsFormData;
  ictData: ICTCardProps;
  teamCode: number;
  reliabilityData: ReliabilityStatsCardProps;
  DfData: DFStatsCardProps;
  AtData: ATStatsCardProps;
  GkData: GKStatsCardProps;
}

const PlayerProfile = () => {
  const { id } = useParams();
  const [playerInsights, setPlayerInsights] = useState<PlayerInsights | null>(
    null
  );
  const [completedGameweeks, setCompletedGameweeks] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const res = await fetch("/api/fpl");
        const data = await res.json();

        setCompletedGameweeks(getCompletedGameweeks(data.events));

        const allPlayers = await allPlayersRaw();

        const playerData = allPlayers.find((p) => p.id === Number(id));
        if (playerData) {
          const team = data.teams.find((t: any) => t.id === playerData.team);
          const position = data.element_types.find(
            (e: any) => e.id === playerData.element_type
          );

          //GK Data Calculations
          const saves = playerData.saves;
          const goalsConceded = playerData.goals_conceded;
          const expectedGoalsConceded = playerData.expected_goals_conceded || 0;
          const minutesPlayed = playerData.minutes;

          // Assemble all insights into a single state object
          const insights: PlayerInsights = {
            GkData: {
              saves: playerData.saves,
              savePercentage: saves + goalsConceded > 0 ? +((saves / (saves + goalsConceded)) * 100).toFixed(1) : 0,
              cleanSheets: playerData.clean_sheets,
              goalsConceded: playerData.goals_conceded,
              penaltiesSaved: playerData.penalties_saved,
              goalsPrevented: +(expectedGoalsConceded - goalsConceded).toFixed(1),
              savesPer90: minutesPlayed > 0 ? +(saves / (minutesPlayed / 90)).toFixed(2) : 0,
            } as unknown as GKStatsCardProps,
            playerKeyData: {
              id: playerData.id,
              name: `${playerData.first_name} ${playerData.second_name}`,
              full_name: `${playerData.first_name} ${playerData.second_name}`,
              team: team?.name || "Unknown",
              position: position?.singular_name || "Unknown",
              value: playerData.now_cost / 10,
              stats: playerData,
              photo: undefined,
              team_code: undefined,
            } as Player,
            pointsData: {
              totalPoints: playerData.total_points,
              gameWeekPoints: playerData.event_points,
              bonusPoints: playerData.bonus,
              form: String(playerData.form),
              ictIndex: String(playerData.ict_index),
              selectedByPercent: String(playerData.selected_by_percent || "0"),
            } as PointsFormData,
            ictData: {
              influence: playerData.influence,
              creativity: playerData.creativity,
              threat: playerData.threat,
              ictIndex: playerData.ict_index,
              goalsScored: playerData.goals_scored,
              assists: playerData.assists,
              threatRank: playerData.threat_rank,
            } as unknown as ICTCardProps,
            reliabilityData: {
              starts: playerData.starts || 0,
              subAppearances: playerData.substitutes_in || 0,
              minutesPlayed: playerData.minutes,
              status: playerData.status,
              yellowCards: playerData.yellow_cards,
              redCards: playerData.red_cards,
              selectedByPercent: playerData.selected_by_percent,
            } as unknown as ReliabilityStatsCardProps,
            DfData: {
              cleanSheets: playerData.clean_sheets,
              cleanSheetsPer90: playerData.clean_sheets_per_90,
              goalsConceded: playerData.goals_conceded,
              goalsConcededPer90: playerData.goals_conceded_per_90,
              expectedGoalsConceded: playerData.expected_goals_conceded,
              ownGoals: playerData.own_goals,
              blocks: playerData.blocks,
            } as unknown as DFStatsCardProps,
            AtData: {
              numberOfGamesStarted: playerData.starts || 0,
              expectedGoals: playerData.expected_goals,
              expectedGoalsPer90: playerData.expected_goals_per_90,
              expectedAssists: playerData.expected_assists,
              expectedAssistsPer90: playerData.expected_assists_per_90,
              expectedGoalInvolvements: playerData.expected_goal_involvements,
              expectedGoalInvolvementsPer90: playerData.expected_goal_involvements_per_90,
            } as unknown as ATStatsCardProps,
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

  const {
    playerKeyData,
    pointsData,
    ictData,
    reliabilityData,
    DfData,
    AtData,
    GkData,
    teamCode,
  } = playerInsights;

  const valueEfficiencyRaw =
    playerKeyData.value > 0
      ? Math.min(
          (pointsData.totalPoints /
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
          <PointsFormCard
            {...pointsData}
            player={playerKeyData}
          />
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
                <GKStatsCard {...GkData} />
              </Card>
              <Card className={""}>
                <ReliabilityStatsCard {...reliabilityData} />
              </Card>
              <Card className={""}>
                <ICTCard {...ictData} />
              </Card>
            </>
          )}

          {playerKeyData.position === "Defender" && (
            <>
              <Card className={""}>
                <DFStatsCard {...DfData} />
              </Card>
              <Card className={""}>
                <ReliabilityStatsCard {...reliabilityData} />
              </Card>
              <Card className={""}>
                <ICTCard {...ictData} />
              </Card>
            </>
          )}

          {(playerKeyData.position === "Midfielder" ||
            playerKeyData.position === "Forward") && (
            <>
              <Card className={""}>
                <ATStatsCard {...AtData} />
              </Card>
              <Card className={""}>
                <ReliabilityStatsCard {...reliabilityData} />
              </Card>
              <Card className={""}>
                <ICTCard {...ictData} />
              </Card>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default PlayerProfile;
