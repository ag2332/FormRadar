export interface PlayerRawData {
  [x: string]: number;
  threat_rank: any;
  chance: any;
  clean_sheets: number;
  goals_conceded: number;
  saves: number;
  minutes: any;
  starts: number;
  substitutes_in: number;
  status: any;
  yellow_cards: any;
  red_cards: any;
  id: number;
  team: any;
  element_type: any;
  first_name: any;
  second_name: any;
  now_cost: number;
  creativity: number;
  threat: number;
  goals_scored: number;
  assists: number;
  influence: number;
  total_points: number;
  event_points: number;
  bonus: number;
  form: string;
  ict_index: string;
  selected_by_percent: string;
}

export interface Averages {
  avgTotalPoints: number;
  avgGameWeekPoints: number;
  avgBonusPoints: number;
  avgForm: number;
  avgIctIndex: number;
  avgSelectedByPercent: number;
}

export function calculateAverages(players: PlayerRawData[]): Averages {
  const count = players.length;

  if (count === 0) {
    return {
      avgTotalPoints: 0,
      avgGameWeekPoints: 0,
      avgBonusPoints: 0,
      avgForm: 0,
      avgIctIndex: 0,
      avgSelectedByPercent: 0,
    };
  }

  let totalPointsSum = 0;
  let gameWeekPointsSum = 0;
  let bonusPointsSum = 0;
  let formSum = 0;
  let ictIndexSum = 0;
  let selectedByPercentSum = 0;

  players.forEach((p) => {
    totalPointsSum += p.total_points;
    gameWeekPointsSum += p.event_points;
    bonusPointsSum += p.bonus;
    formSum += parseFloat(p.form) || 0;
    ictIndexSum += parseFloat(p.ict_index) || 0;
    selectedByPercentSum += parseFloat(p.selected_by_percent) || 0;
  });

  return {
    avgTotalPoints: totalPointsSum / count,
    avgGameWeekPoints: gameWeekPointsSum / count,
    avgBonusPoints: bonusPointsSum / count,
    avgForm: formSum / count,
    avgIctIndex: ictIndexSum / count,
    avgSelectedByPercent: selectedByPercentSum / count,
  };
}

export function getCompletedGameweeks(events: any[]): number {
  return events.filter((event) => event.finished).length;
}

export function calculatePercentile(
  allValues: number[],
  playerSelectedByPercent: number
): number {
  const countLower = allValues.filter(
    (v) => v < playerSelectedByPercent
  ).length;
  const percentile = (countLower / allValues.length) * 100;
  return parseFloat(percentile.toFixed(1));
}

export async function allPlayersRaw(): Promise<PlayerRawData[]> {
  const response = await fetch("/api/fpl");
  const data = await response.json();
  return data.elements;
}

export function filteredPlayers(players: PlayerRawData[], threshold: number): PlayerRawData[] {
  return players.filter((player) => parseFloat(player.selected_by_percent) > threshold);
}