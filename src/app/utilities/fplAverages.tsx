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
  form: number;
  ict_index: number;
  selected_by_percent: number;
}

export function calculateAverage(values: number[]): number {
  if (!Array.isArray(values) || values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  const average = sum / values.length;
  const rounded = parseFloat(average.toFixed(1));
  return isNaN(rounded) ? 0 : rounded;
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

export async function filteredPlayers(): Promise<PlayerRawData[]> {
  const allPlayers = await allPlayersRaw();
  return allPlayers.filter((p) => p.selected_by_percent > 0.5);
}
