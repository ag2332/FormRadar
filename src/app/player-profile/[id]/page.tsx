"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Section from "@/app/components/Section";
import PlayerBanner from "@/app/components/molecules/player-banner";
import { Player } from "@/app/utilities/types/types";
import PointsFormCard from "@/app/components/molecules/points-card";
import Card from "@/app/components/atoms/card";
import {
  getPlayerImage,
  getTeamBadge,
  buildMetricCardProps,
} from "@/app/utilities/styles";
import {
  getCompletedGameweeks,
  allPlayersRaw,
  GKCardData,
  DFCardData,
  ATCardData,
  pointsCardData,
  reliabilityCardData,
  ICTCardData,
  calculateAverage,
} from "@/app/utilities/fplData";
import Grid from "@/app/components/atoms/Grid";
import ReliabilityStatsCard from "@/app/components/molecules/reliability-stats-card";
import ATStatsCard from "@/app/components/molecules/AT-stats-card";
import DFStatsCard from "@/app/components/molecules/DF-stats-card";
import GKStatsCard from "@/app/components/molecules/GK-stats-card";
import ICTCard from "@/app/components/molecules/ICT-card";
import Title from "@/app/components/atoms/title";
import MetricCard from "@/app/components/molecules/MetricCard";

interface ElementSummary {
  gw: number;
  value: number;
  form: number;
  totalPoints: number;
  minutes: number;
  bonus: number;
  threat: number;
  influence: number;
  creativity: number;
  ictIndex: number;
  wasHome: boolean;
  opponentTeam: number;
  transfersIn: number;
  transfersOut: number;
  selected: number;
}

interface PlayerInsights {
  playerKeyData: Player;
  teamCode: number;
}

const PlayerProfile = () => {
  const { id } = useParams();
  const [playerInsights, setPlayerInsights] = useState<PlayerInsights | null>(
    null
  );
  const [thisPlayer, setThisPlayer] = useState<any | null>(null);
  const [thisHistory, setThisHistory] = useState<any | null>(null);
  const [completedGameweeks, setCompletedGameweeks] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const fplRes = await fetch("/api/fpl");
        const fplData = await fplRes.json();
        setCompletedGameweeks(getCompletedGameweeks(fplData.events));
        const allPlayers = await allPlayersRaw();
        const playerData = allPlayers.find((p) => p.id === Number(id));
        setThisPlayer(playerData);

        const elementSummaryRes = await fetch(`/api/element-summary/${id}`);
        const elementSummaryData = await elementSummaryRes.json();

        if (playerData) {
          const team = fplData.teams.find((t: any) => t.id === playerData.team);
          const position = fplData.element_types.find(
            (e: any) => e.id === playerData.element_type
          );

          const individualInsights: PlayerInsights = {
            playerKeyData: {
              id: playerData.id,
              name: `${playerData.first_name} ${playerData.second_name}`,
              full_name: `${playerData.first_name} ${playerData.second_name}`,
              goalsScored: playerData.goals_scored || 0,
              assists: playerData.assists || 0,
              team: team?.name || "Unknown",
              position: position?.singular_name || "Unknown",
              value: playerData.now_cost / 10,
              stats: playerData,
              totalPoints: playerData.total_points,
              photo: undefined,
              team_code: undefined,
              minutes: playerData.minutes || 0,
              form: playerData.form || 0,
              bonus: playerData.bonus || 0,
            } as unknown as Player,
            teamCode: team?.code ?? null,
          };

          setPlayerInsights(individualInsights);
        }

        if (elementSummaryData) {
          const historyData: ElementSummary[] = elementSummaryData.history.map(
            (gw: any) => ({
              value: gw.value,
              gw: gw.round,
              form: gw.form,
              totalPoints: gw.total_points,
              minutes: gw.minutes,
              bonus: gw.bonus,
              threat: gw.threat,
              influence: gw.influence,
              creativity: gw.creativity,
              ictIndex: gw.ict_index,
              wasHome: gw.was_home,
              opponentTeam: gw.opponent_team,
              transfersIn: gw.transfers_in,
              transfersOut: gw.transfers_out,
              selected: gw.selected_by_percent,
              upcomingFixtures: gw.upcoming_fixtures,
            })
          );
          setThisHistory(historyData);
        }
      } catch (err) {
        console.error("Failed to load player data:", err);
      }
    };

    if (id) fetchPlayerData();
  }, [id]);

  if (!playerInsights || completedGameweeks === null)
    return <div className="p-8 text-[#38003c]">Loading...</div>;

  const { playerKeyData, teamCode } = playerInsights;

  const playerImageUrl = getPlayerImage(playerKeyData.stats.photo);
  const teamBadgeUrl = getTeamBadge(teamCode);

  // Value Efficiency
  const valueEfficiencyRaw =
    playerKeyData.value > 0
      ? Math.min(
          (playerKeyData.totalPoints /
            (completedGameweeks ?? 1) /
            playerKeyData.value) *
            100
        )
      : 0;
  const valueEfficiencyDisplay = valueEfficiencyRaw.toFixed(1);

  //Return On Investment
  const roiRaw =
    playerKeyData.value > 0
      ? playerKeyData.totalPoints / playerKeyData.value
      : 0;
  const roiDisplay = roiRaw.toFixed(1);

  //points per 90 mins
  const pp90Raw =
    playerKeyData.minutes > 0
      ? (playerKeyData.totalPoints / playerKeyData.minutes) * 90
      : 0;
  const pp90Display = pp90Raw.toFixed(1);

  // Price vs Output trend
  const priceHistory = thisHistory?.map((gw: { value: number }) => {
    const price = gw.value / 10; // Convert to real-world price
    return isNaN(price) ? 0 : price;
  });
  const formHistory = isNaN(playerKeyData.form) ? 1 : playerKeyData.form;
  const priceChange = priceHistory.at(-1)! - priceHistory[0]; // Most recent - first
  const potRaw = formHistory - priceChange;
  const potDisplay = potRaw.toFixed(1);

  //Performance Uplift
  const first3 = thisHistory
    ?.slice(0, 3)
    .map((gw: { totalPoints: number }) => gw.totalPoints);
  const last3 = thisHistory
    ?.slice(-3)
    .map((gw: { totalPoints: number }) => gw.totalPoints);

  const firstAvg = first3 && first3.length > 0 ? calculateAverage(first3) : 0;
  const lastAvg = last3 && last3.length > 0 ? calculateAverage(last3) : 0;

  const upliftRaw = lastAvg - firstAvg;
  const upliftDisplay = upliftRaw.toFixed(1);

  //Consistency Score
  const recentPoints = thisHistory
    .slice(-5)
    .map((gw: { totalPoints: number }) => gw.totalPoints);
  const mean = calculateAverage(recentPoints);

  const stdDevRaw = Math.sqrt(
    recentPoints.reduce(
      (sum: number, val: number) => sum + Math.pow(val - mean, 2),
      0
    ) / recentPoints.length
  );
  const stdDevDisplay = stdDevRaw.toFixed(1);

  //Points Momentum
  const pointsMomentum = thisHistory
    .slice(-5)
    .map((gw: { totalPoints: number }) => gw.totalPoints);
  const momentumRaw = calculateAverage(pointsMomentum);
  const momentumDisplay = momentumRaw.toFixed(1);

  //Explosiveness
  const explosiveGames = thisHistory.filter(
    (gw: { totalPoints: number }) => gw.totalPoints >= 10
  ).length;
  const explosivenessRaw = (explosiveGames / completedGameweeks) * 100;
  const explosivenessDisplay = explosivenessRaw.toFixed(1);

  //Goal Involvement Rate
  const goalInvolvementRaw =
    playerKeyData.minutes > 0
      ? ((playerKeyData.goalsScored + playerKeyData.assists) /
          playerKeyData.minutes) *
        90
      : 0;
  const goalInvolvementDisplay = goalInvolvementRaw.toFixed(2);

  //Differential Potential
  const selectedBy = parseFloat(playerKeyData.stats.selected_by_percent);
  const differentialRaw =
    momentumRaw > 0 && selectedBy > 0 ? (momentumRaw / selectedBy) * 10 : 0;
  const differentialDisplay = differentialRaw.toFixed(1);

  //Exploitability
  const difficultyValues = thisHistory
    .map((f: { difficulty: any }) => f?.difficulty)
    .filter((d: any): d is number => typeof d === "number");

  const avgDifficulty =
    difficultyValues.length > 0 ? calculateAverage(difficultyValues) : 3; // fallback to a neutral difficulty level

  const form = isNaN(playerKeyData.form) ? 1 : playerKeyData.form;

  const exploitabilityRaw = avgDifficulty > 0 ? (form / avgDifficulty) * 10 : 0;

  const exploitabilityDisplay = exploitabilityRaw.toFixed(1);

  // Market Movement
  const lastGW = thisHistory[thisHistory.length - 1];
  const firstGW = thisHistory[0];

  const totalTransfersIn = thisHistory.reduce(
    (sum: number, gw: { transfersIn: number }) => sum + (gw.transfersIn || 0),
    0
  );
  const totalTransfersOut = thisHistory.reduce(
    (sum: number, gw: { transfersOut: number }) => sum + (gw.transfersOut || 0),
    0
  );
  const netTransfers = totalTransfersIn - totalTransfersOut;

  const marketStart = firstGW.value / 10;
  const marketEnd = lastGW.value / 10;
  const marketChange = marketEnd - marketStart;

  const marketRaw = netTransfers / 10000 + marketChange;
  const marketDisplay = marketRaw.toFixed(1);

  // Discipline Risk
  const disciplineRiskRaw =
    playerKeyData.minutes > 0
      ? (playerKeyData.bonus / playerKeyData.minutes) * 1000
      : 0;
  const disciplineRiskDisplay = disciplineRiskRaw.toFixed(2);

  // Inconsistency Risk
  const recent5Points = thisHistory
    .slice(-5)
    .map((gw: { totalPoints: any }) => gw.totalPoints);
  const meanPoints = calculateAverage(recent5Points);
  const stdDevPoints = Math.sqrt(
    recent5Points.reduce(
      (sum: number, val: number) => sum + Math.pow(val - meanPoints, 2),
      0
    ) / recent5Points.length
  );
  const inconsistencyRiskRaw = meanPoints > 0 ? stdDevPoints / meanPoints : 0;
  const inconsistencyRiskDisplay = inconsistencyRiskRaw.toFixed(2);

  // Low Minutes Risk
  const maxPossibleMinutes = completedGameweeks * 90;
  const lowMinutesRiskRaw =
    maxPossibleMinutes > 0
      ? ((maxPossibleMinutes - playerKeyData.minutes) / maxPossibleMinutes) *
        100
      : 0;
  const lowMinutesRiskDisplay = lowMinutesRiskRaw.toFixed(1);

  // Fixture Difficulty Risk
  const upcomingDifficulties = thisHistory
    .slice(0, 3)
    .map((gw: { difficulty: any }) => gw.difficulty)
    .filter((d: any) => typeof d === "number");
  const fixtureDifficultyRiskRaw =
    upcomingDifficulties.length > 0
      ? calculateAverage(upcomingDifficulties)
      : 3; // Neutral fallback
  const fixtureDifficultyRiskDisplay = fixtureDifficultyRiskRaw.toFixed(1);

  const valueMetricData = [
    buildMetricCardProps({
      metricName: "Value Efficiency",
      valueRaw: valueEfficiencyRaw,
      valueDisplay: valueEfficiencyDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Return On Investment",
      valueRaw: roiRaw,
      valueDisplay: roiDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Points Per 90 Mins",
      valueRaw: pp90Raw,
      valueDisplay: pp90Display,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Price vs Output Trend",
      valueRaw: potRaw,
      valueDisplay: potDisplay,
      fullName: playerKeyData.full_name,
    }),
  ];

  const formIndicatorData = [
    buildMetricCardProps({
      metricName: "Performance Uplift",
      valueRaw: upliftRaw,
      valueDisplay: upliftDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Consistency Score",
      valueRaw: stdDevRaw,
      valueDisplay: stdDevDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Points Momentum",
      valueRaw: momentumRaw,
      valueDisplay: momentumDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Explosiveness",
      valueRaw: explosivenessRaw,
      valueDisplay: explosivenessDisplay,
      fullName: playerKeyData.full_name,
    }),
  ];

  const influenceDynamicData = [
    buildMetricCardProps({
      metricName: "Goal Involvement Rate",
      valueRaw: goalInvolvementRaw,
      valueDisplay: goalInvolvementDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Differential Potential",
      valueRaw: differentialRaw,
      valueDisplay: differentialDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Exploitability",
      valueRaw: exploitabilityRaw,
      valueDisplay: exploitabilityDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Market Movement",
      valueRaw: marketRaw,
      valueDisplay: marketDisplay,
      fullName: playerKeyData.full_name,
    }),
  ];

  const riskDynamicData = [
    buildMetricCardProps({
      metricName: "Discipline Risk",
      valueRaw: disciplineRiskRaw,
      valueDisplay: disciplineRiskDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Inconsistency Risk",
      valueRaw: inconsistencyRiskRaw,
      valueDisplay: inconsistencyRiskDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Low Minutes Risk",
      valueRaw: lowMinutesRiskRaw,
      valueDisplay: lowMinutesRiskDisplay,
      fullName: playerKeyData.full_name,
    }),
    buildMetricCardProps({
      metricName: "Fixture Difficulty Risk",
      valueRaw: fixtureDifficultyRiskRaw,
      valueDisplay: fixtureDifficultyRiskDisplay,
      fullName: playerKeyData.full_name,
    }),
  ];

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

      <div>
        <Title className={""} title={"Key Data"} />
        <Card className={""}>
          <PointsFormCard data={pointsCardData} player={thisPlayer} />
        </Card>
      </div>

      <div>
        <Title className={""} title={"Statistics"} />
        <Grid columns={3} className={"text-5xl"}>
          {playerKeyData.position === "Goalkeeper" && (
            <>
              <Card className={""}>
                <GKStatsCard data={GKCardData} player={thisPlayer} />
              </Card>
              <Card className={""}>
                <ReliabilityStatsCard
                  data={reliabilityCardData}
                  player={thisPlayer}
                />
              </Card>
              <Card className={""}>
                <ICTCard data={ICTCardData} player={thisPlayer} />
              </Card>
            </>
          )}

          {playerKeyData.position === "Defender" && (
            <>
              <Card className={""}>
                <DFStatsCard data={DFCardData} player={thisPlayer} />
              </Card>
              <Card className={""}>
                <ReliabilityStatsCard
                  data={reliabilityCardData}
                  player={thisPlayer}
                />
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
                <ATStatsCard data={ATCardData} player={thisPlayer} />
              </Card>
              <Card className={""}>
                <ReliabilityStatsCard
                  data={reliabilityCardData}
                  player={thisPlayer}
                />
              </Card>
              <Card className={""}>
                <ICTCard data={ICTCardData} player={thisPlayer} />
              </Card>
            </>
          )}
        </Grid>
      </div>
      <Title className={""} title={"Value Insights"} />
      <Grid columns={2} className={""}>
        {valueMetricData.map((metric, i) => (
          <Card key={i} className="">
            <MetricCard key={i} {...metric} />
          </Card>
        ))}
      </Grid>
      <Title className={""} title={"Form & Consisency Indicators"} />
      <Grid columns={2} className={""}>
        {formIndicatorData.map((metric, i) => (
          <Card key={i} className={""}>
            <MetricCard key={i} {...metric} />
          </Card>
        ))}
      </Grid>
      <Title className={""} title={"Influence & Market Dynamics"} />
      <Grid columns={2} className={""}>
        {influenceDynamicData.map((metric, i) => (
          <Card key={i} className={""}>
            <MetricCard key={i} {...metric} />
          </Card>
        ))}
      </Grid>
      <Title className={""} title={"Risk Dynamics"} />
      <Grid columns={2} className={""}>
        {riskDynamicData.map((metric, i) => (
          <Card key={i} className={""}>
            <MetricCard key={i} {...metric} />
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default PlayerProfile;
