"use client";

import { useState, useEffect } from "react";
import Grid from "@/app/components/atoms/Grid";
import DropDown from "@/app/components/atoms/dropdown";
import Section from "./components/Section";
import { Player, FPLPlayer, Team, Position } from "@/app/utilities/types";

function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch("/api/fpl");
        const data = await res.json();

        if (data.error) {
          console.error("API error:", data.error);
          return;
        }

        const teams: Team[] = data.teams;
        const elements: FPLPlayer[] = data.elements;
        const elementTypes: Position[] = data.element_types;

        const formattedPlayers: Player[] = elements.map((player) => ({
          id: player.id,
          name: `${player.first_name} ${player.second_name}`,
          full_name: `${player.first_name} ${player.second_name}`,
          team: teams.find((t) => t.id === player.team)?.name || "Unknown",
          position:
            elementTypes.find((p) => p.id === player.element_type)
              ?.singular_name || "Unknown",
          value: player.now_cost / 10,
          stats: player,
          photo: player.photo,
          team_code: teams.find((t) => t.id === player.team)?.id || null,
        }));

        setPlayers(formattedPlayers);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <Section>
      <div className="bg-gradient-to-r from-blue to-purple">
        <div className="mx-auto max-w-[1700px]">
          <Grid
            columns={2}
            className="flex items-center justify-center h-screen w-full"
          >
            <div className="text-[#38003c]">
              <h1 className="text-9xl mb-4">Form Radar</h1>
              <h2 className="text-5xl mb-4">
                The edge every FPL manager needs
              </h2>
              <h2 className="text-3xl">
                Track form, predict returns, and build a winning squad
              </h2>
            </div>
            <div className="flex justify-center items-center">
              <DropDown
                label="Search a Player"
                items={players}
                onPlayerSelect={(player: Player) => setSelectedPlayer(player)}
                backgroundColor="white"
                borderRadius="3xl"
                selectSize={true}
                inputSelect={true}
              />
            </div>
          </Grid>
        </div>
      </div>
    </Section>
  );
}

export default Home;
