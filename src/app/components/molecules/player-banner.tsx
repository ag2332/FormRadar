import Section from "../section";
import Grid from "../atoms/Grid";
import { Player } from "@/app/page";
import { useState } from "react";
import PointsFormData from "../../player-profile/[id]/page";
import PointsFormCard from "./points-card";

interface PlayerBannerProps {
  fullName: string;
  playerImageUrl: string;
  teamName: string;
  teamBadgeUrl: string;
  player: Player;
  pointsFormData: PointsFormData;
}

const PlayerBanner = ({
  fullName,
  playerImageUrl,
  teamName,
  teamBadgeUrl,
  player,
  pointsFormData,
}: PlayerBannerProps) => {
  console.log(pointsFormData);
  return (
    <Section className="bg-white rounded-2xl">
      <Grid columns={4} className={"flex items-center p-25 mt-40 mb-17 w-full"}>
        <div>
          <div>
            <h1 className="text-7xl font-bold mb-4">{player.full_name}</h1>
          </div>
          <div className="text-lg mb-2">
            <span className="font-semibold">Team:</span> {player.team}
          </div>

          <div className="text-lg mb-2">
            <span className="font-semibold">Position:</span> {player.position}
          </div>

          <div className="text-lg mb-2">
            <span className="font-semibold">Value:</span> £
            {player.value.toFixed(1)}m
          </div>
        </div>
        <div className="justify-center m-0">
          <img
            src={playerImageUrl}
            alt={fullName}
            className="w-16 h-16 rounded-full mr-4"
          />
        </div>
        <div>
          <PointsFormCard
            totalPoints={pointsFormData.totalPoints}
            bonusPoints={pointsFormData.bonusPoints}
            gameWeekPoints={pointsFormData.gameWeekPoints}
            form={pointsFormData.form}
            ictIndex={pointsFormData.ictIndex}
            selectedByPercent={pointsFormData.selectedByPercent}
            player={player}
          />
        </div>
        <div className="flex items-center">
          <img src={teamBadgeUrl} alt={teamName} className="w-6 h-6 mr-2" />
        </div>
      </Grid>
    </Section>
  );
};

export default PlayerBanner;
