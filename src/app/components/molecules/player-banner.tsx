import Section from "../Section";
import Grid from "../atoms/Grid";
import { TEAM_COLORS } from "@/app/utilities/styles";
import { PlayerBannerProps } from "@/app/utilities/types/types";

const PlayerBanner = ({
  fullName,
  playerImageUrl,
  teamName,
  teamBadgeUrl,
  player,
  className = "",
}: PlayerBannerProps) => {
  const teamColors = TEAM_COLORS[player.team] || "#cccccc";

  return (
    <div
      className={`relative bg-white rounded-2xl text-3xl overflow-hidden mb-8 ${className}`}
    >
      <Grid
        columns={4}
        className="flex items-center place-items-center w-full relative z-20"
      >
        <div>
          <div>
            <h1 className="text-8xl font-bold mb-4">{player.full_name}</h1>
          </div>
        </div>
        <div className="justify-center m-0">
          <img src={playerImageUrl} alt={fullName} className="w-73 h-90" />
        </div>
        <div className="text-4xl">
          <div className="mb-2">
            <h1 className="font-semibold">Team:</h1>
            <div>{player.team}</div>
          </div>

          <div className="mb-2">
            <h1 className="font-semibold">Position:</h1>
            <div>{player.position}</div>
          </div>

          <div className="mb-2">
            <h1 className="font-semibold">Value:</h1>
            <div>£{player.value.toFixed(1)}m</div>
          </div>
        </div>
        <div className="flex items-center">
          <img src={teamBadgeUrl} alt={player.team} className="w-75 h-75" />
        </div>
      </Grid>

      <div className="absolute bottom-0 left-0 w-full h-15 pointer-events-none z-30 flex">
        <div
          style={{ backgroundColor: teamColors.primary }}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default PlayerBanner;
