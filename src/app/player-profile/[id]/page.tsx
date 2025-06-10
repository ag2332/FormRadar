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
  dataLevels,
  getDataLevel,
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
  calculateHighest,
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
        console.log(elementSummaryData, "elementSummaryData");

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
  const veDataLevel = getDataLevel(valueEfficiencyRaw, dataLevels);
  const veAverage = calculateAverage([valueEfficiencyRaw]);
  const veHighest = calculateHighest([valueEfficiencyRaw])
  //Return On Investment
  const roiRaw =
    playerKeyData.value > 0
      ? playerKeyData.totalPoints / playerKeyData.value
      : 0;
  const roiDisplay = roiRaw.toFixed(1);
  const roiDataLevel = getDataLevel(roiRaw, dataLevels);

  //points per 90 mins
  const pp90Raw =
    playerKeyData.minutes > 0
      ? (playerKeyData.totalPoints / playerKeyData.minutes) * 90
      : 0;
  const pp90Display = pp90Raw.toFixed(1);
  const pp90DataLevel = getDataLevel(pp90Raw, dataLevels);

  // Price vs Output trend
  const priceHistory = thisHistory?.map((gw: { value: number }) => {
    const price = gw.value / 10; // Convert to real-world price
    return isNaN(price) ? 0 : price;
  });
  const formHistory = isNaN(playerKeyData.form) ? 1 : playerKeyData.form;
  const priceChange = priceHistory.at(-1)! - priceHistory[0]; // Most recent - first
  const potRaw = formHistory - priceChange;
  const potDisplay = potRaw.toFixed(1);
  const potDataLevel = getDataLevel(potRaw, dataLevels);

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
  const upliftDataLevel = getDataLevel(upliftRaw, dataLevels);

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
  const stdDevDataLevel = getDataLevel(stdDevRaw, dataLevels);

  //Points Momentum
  const pointsMomentum = thisHistory
    .slice(-5)
    .map((gw: { totalPoints: number }) => gw.totalPoints);
  const momentumRaw = calculateAverage(pointsMomentum);
  const momentumDisplay = momentumRaw.toFixed(1);
  const momentumDataLevel = getDataLevel(momentumRaw, dataLevels);

  //Explosiveness
  const explosiveGames = thisHistory.filter(
    (gw: { totalPoints: number }) => gw.totalPoints >= 10
  ).length;
  const explosivenessRaw = (explosiveGames / completedGameweeks) * 100;
  const explosivenessDisplay = explosivenessRaw.toFixed(1);
  const explosivenessDataLevel = getDataLevel(explosivenessRaw, dataLevels);

  //Goal Involvement Rate
  const goalInvolvementRaw =
    playerKeyData.minutes > 0
      ? ((playerKeyData.goalsScored + playerKeyData.assists) /
          playerKeyData.minutes) *
        90
      : 0;
  const goalInvolvementDisplay = goalInvolvementRaw.toFixed(2);
  const girDataLevel = getDataLevel(goalInvolvementRaw, dataLevels);

  //Differential Potential
  const selectedBy = parseFloat(playerKeyData.stats.selected_by_percent);
  const differentialRaw =
    momentumRaw > 0 && selectedBy > 0 ? (momentumRaw / selectedBy) * 10 : 0;
  const differentialDisplay = differentialRaw.toFixed(1);
  const differentialDataLevel = getDataLevel(differentialRaw, dataLevels);

  //Exploitability
  const difficultyValues = thisHistory
    .map((f: { difficulty: any }) => f?.difficulty)
    .filter((d: any): d is number => typeof d === "number");

  const avgDifficulty =
    difficultyValues.length > 0 ? calculateAverage(difficultyValues) : 3; // fallback to a neutral difficulty level

  const form = isNaN(playerKeyData.form) ? 1 : playerKeyData.form;

  const exploitabilityRaw = avgDifficulty > 0 ? (form / avgDifficulty) * 10 : 0;

  const exploitabilityDisplay = exploitabilityRaw.toFixed(1);
  const exploitabilityDataLevel = getDataLevel(exploitabilityRaw, dataLevels);

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
  const marketDataLevel = getDataLevel(marketRaw, dataLevels);

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
        <Card className={""}>
          <MetricCard
            dataLevel={veDataLevel}
            dataDisplay={parseFloat(valueEfficiencyDisplay)}
            dataRaw={valueEfficiencyRaw}
            averageResult={veAverage}
            highestResult={veHighest}
            fullName={playerKeyData.full_name}
            text={"Value Efficiency"}
          />
        </Card>
        <Card className={""}>
          <MetricCard
            dataLevel={pp90DataLevel}
            dataDisplay={parseFloat(pp90Display)}
            dataRaw={pp90Raw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Points Per 90 mins"}
          />
        </Card>

        <Card className={""}>
          <MetricCard
            dataLevel={roiDataLevel}
            dataDisplay={parseFloat(roiDisplay)}
            dataRaw={roiRaw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Return On Investment"}
          />
        </Card>
        <Card className={""}>
          <MetricCard
            dataLevel={potDataLevel}
            dataDisplay={parseFloat(potDisplay)}
            dataRaw={potRaw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Price vs Output Trend"}
          />
        </Card>
      </Grid>
      <Title className={""} title={"Form & Consisency Indicators"} />
      <Grid columns={2} className={""}>
        <Card className={""}>
          <MetricCard
            dataLevel={upliftDataLevel}
            dataDisplay={parseFloat(upliftDisplay)}
            dataRaw={upliftRaw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Performance Uplift"}
          />
        </Card>
        <Card className={""}>
          <MetricCard
            dataLevel={stdDevDataLevel}
            dataDisplay={parseFloat(stdDevDisplay)}
            dataRaw={stdDevRaw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Consistency Score"}
          />
        </Card>

        <Card className={""}>
          <MetricCard
            dataLevel={momentumDataLevel}
            dataDisplay={parseFloat(momentumDisplay)}
            dataRaw={momentumRaw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Points Momentum"}
          />
        </Card>
        <Card className={""}>
          <MetricCard
            dataLevel={explosivenessDataLevel}
            dataDisplay={parseFloat(explosivenessDisplay)}
            dataRaw={explosivenessRaw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Explosiveness"}
          />
        </Card>
      </Grid>
      <Title className={""} title={"Influence & Market Dynamics"} />
      <Grid columns={2} className={""}>
        <Card className={""}>
          <MetricCard
            dataLevel={girDataLevel}
            dataDisplay={parseFloat(goalInvolvementDisplay)}
            dataRaw={goalInvolvementRaw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Goal Involvement Rate"}
          />
        </Card>
        <Card className={""}>
          <MetricCard
            dataLevel={differentialDataLevel}
            dataDisplay={parseFloat(differentialDisplay)}
            dataRaw={differentialRaw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Differential Potential"}
          />
        </Card>

        <Card className={""}>
          <MetricCard
            dataLevel={exploitabilityDataLevel}
            dataDisplay={parseFloat(exploitabilityDisplay)}
            dataRaw={exploitabilityRaw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Exploitbility"}
          />
        </Card>
        <Card className={""}>
          <MetricCard
            dataLevel={marketDataLevel}
            dataDisplay={parseFloat(marketDisplay)}
            dataRaw={marketRaw}
            averageResult={0}
            highestResult={0}
            fullName={playerKeyData.full_name}
            text={"Market Movement"}
          />
        </Card>
      </Grid>
    </div>
  );
};

export default PlayerProfile;
