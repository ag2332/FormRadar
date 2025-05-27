"use client";

import React from "react";
import { Player } from "@/app/page";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
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

          setPlayer(transformedPlayer);
        }
      } catch (err) {
        console.error("Failed to load player data:", err);
      }
    };

    if (id) fetchPlayers();
  }, [id]);

  if (!player) return <div className="p-8 text-[#38003c]">Loading...</div>

  return (
    <div className="bg-white text-[#38003c] p-6 rounded-3xl shadow-xl max-w-md w-full transition-all duration-300">
      <h3 className="text-3xl font-bold mb-4">{player.full_name}</h3>

      <div className="text-lg mb-2">
        <span className="font-semibold">Team:</span> {player.team}
      </div>

      <div className="text-lg mb-2">
        <span className="font-semibold">Position:</span> {player.position}
      </div>

      <div className="text-lg mb-2">
        <span className="font-semibold">Value:</span> £{player.value.toFixed(1)}m
      </div>

      <div className="mt-4">
        <h4 className="text-xl font-semibold mb-2">Recent Stats</h4>
        <ul className="text-sm space-y-1">
          <li>Form: {player.stats.form}</li>
          <li>Points per game: {player.stats.points_per_game}</li>
          <li>Total points: {player.stats.total_points}</li>
          <li>Minutes played: {player.stats.minutes}</li>
          <li>Goals scored: {player.stats.goals_scored}</li>
          <li>Assists: {player.stats.assists}</li>
          <li>Clean sheets: {player.stats.clean_sheets}</li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerProfile;
