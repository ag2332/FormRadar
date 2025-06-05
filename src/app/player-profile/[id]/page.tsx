"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Section from "@/app/components/Section";
import PlayerBanner from "@/app/components/molecules/player-banner";
import { History, Player } from "@/app/utilities/types/types";
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
} from "@/app/utilities/fplData";
import Grid from "@/app/components/atoms/Grid";
import ReliabilityStatsCard from "@/app/components/molecules/reliability-stats-card";
import ATStatsCard from "@/app/components/molecules/AT-stats-card";
import DFStatsCard from "@/app/components/molecules/DF-stats-card";
import GKStatsCard from "@/app/components/molecules/GK-stats-card";
import ICTCard from "@/app/components/molecules/ICT-card";
import Title from "@/app/components/atoms/title";
import MetricCard from "@/app/components/molecules/MetricCard";

interface HistoryEntry {
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
interface ElementSummaryRaw {
  history: HistoryEntry[];
}
interface ElementSummary {
  raw: ElementSummaryRaw;
}

interface PlayerInsights {
  playerKeyData: Player;
  teamCode: number;
  elementSummary: ElementSummary;
}

const PlayerProfile = () => {
  const { id } = useParams();
  const [playerInsights, setPlayerInsights] = useState<PlayerInsights | null>(
    null
  );
  const [thisPlayer, setThisPlayer] = useState<any | null>(null);
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
              minutes: playerData.minutes || 0,
            } as Player,
            elementSummary: {
              raw: {
                history: elementSummaryData.history.map((gw: any) => ({
                  gw: gw.round,
                  value: gw.value,
                  form: gw.form,
                  totalPoints: gw.total_points,
                  minutes: gw.minutes,
                  bonus: gw.bonus,
                  threat: parseFloat(gw.threat),
                  influence: parseFloat(gw.influence),
                  creativity: parseFloat(gw.creativity),
                  ictIndex: parseFloat(gw.ict_index),
                  wasHome: gw.was_home,
                  opponentTeam: gw.opponent_team,
                  transfersIn: gw.transfers_in,
                  transfersOut: gw.transfers_out,
                  selected: gw.selected,
                })),
              },
            },
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

  const { playerKeyData, elementSummary, teamCode } = playerInsights;

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
  const priceHistory = elementSummary.raw.history
    .map((gw) => gw.value / 10)
    .filter((v) => v != null);

  const formHistory = elementSummary.raw.history
    .map((gw) => gw.form)
    .filter((v) => !isNaN(v));

  let potRaw = 0;
  if (priceHistory.length >= 2 && formHistory.length >= 2) {
    const priceChange = priceHistory.at(-1)! - priceHistory[0]!;
    const formChange = formHistory.at(-1)! - formHistory[0]!;
    potRaw = formChange - priceChange;
  }

  const potDisplay = potRaw.toFixed(1);
  const potDataLevel = getDataLevel(potRaw, dataLevels);

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
        <div>
          <Card className={""}>
            <MetricCard
              dataLevel={veDataLevel}
              dataDisplay={parseFloat(valueEfficiencyDisplay)}
              dataRaw={valueEfficiencyRaw}
              fullName={playerKeyData.full_name}
              text={"Value Efficiency"}
            />
          </Card>
          <Card className={""}>
            <MetricCard
              dataLevel={pp90DataLevel}
              dataDisplay={parseFloat(pp90Display)}
              dataRaw={pp90Raw}
              fullName={playerKeyData.full_name}
              text={"Points Per 90 mins"}
            />
          </Card>
        </div>
        <div>
          <Card className={""}>
            <MetricCard
              dataLevel={roiDataLevel}
              dataDisplay={parseFloat(roiDisplay)}
              dataRaw={roiRaw}
              fullName={playerKeyData.full_name}
              text={"Return On Investment"}
            />
          </Card>
          <Card className={""}>
            <MetricCard
              dataLevel={potDataLevel}
              dataDisplay={parseFloat(potDisplay)}
              dataRaw={potRaw}
              fullName={playerKeyData.full_name}
              text={"Price vs Output Trend"}
            />
          </Card>
        </div>
      </Grid>
    </div>
  );
};

export default PlayerProfile;
