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

export function calculateHighest(values: number[], lookback: number = 3): number {
  if (!Array.isArray(values) || values.length === 0) return 0;

  const recentSlice = values.slice(-lookback); // take last N values
  const highest = Math.max(...recentSlice);
  const rounded = parseFloat(highest.toFixed(1));

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

export const pointsCardData = [
  { title: "Total Points", field: "total_points", source: "filtered" },
  { title: "Game Week Points", field: "event_points", source: "all" },
  { title: "Bonus Points", field: "bonus", source: "all" },
  { title: "Form", field: "form", source: "filtered" },
  { title: "ICT Index", field: "ict_index", source: "filtered" },
  { title: "Selected By %", field: "selected_by_percent", source: "filtered" },
];

export const ICTCardData = [
  { title: "Goals Scored", field: "goals_scored", source: "all" },
  { title: "Assists", field: "assists", source: "all" },
  { title: "Threat Rank", field: "threat_rank", source: "all" },
  { title: "ICT Index", field: "ict_index", source: "all" },
  { title: "Influence", field: "influence", source: "all" },
  { title: "Creativity", field: "creativity", source: "all" },
  { title: "Threat", field: "threat", source: "all" },
];

 export const reliabilityCardData = [
  { title: "Starts", field: "starts", source: "all" },
  { title: "Sub Appearances", field: "substitutes_in", source: "all" },
  { title: "Minutes Played", field: "minutes", source: "all" },
  { title: "Status", field: "status", source: "all" },
  { title: "Yellow Cards", field: "yellow_cards", source: "all" },
  { title: "Red Cards", field: "red_cards", source: "all" },
  { title: "Selected By %", field: "selected_by_percent", source: "all" },
];

 export const ATCardData = [
  { title: "Games Started", field: "starts", source: "all" },
  { title: "Expected Goals", field: "expected_goals", source: "all" },
  { title: "xG Per 90", field: "expected_goals_per_90", source: "all" },
  { title: "xA", field: "expected_assists", source: "all" },
  { title: "xA Per 90", field: "expected_assists_per_90", source: "all" },
  { title: "xGI", field: "expected_goal_involvements", source: "all" },
  {
    title: "xGI Per 90",
    field: "expected_goal_involvements_per_90",
    source: "all",
  },
];

export const DFCardData = [
  { title: "Clean Sheets", field: "clean_sheets", source: "all" },
  {
    title: "Clean Sheets Per 90",
    field: "clean_sheets_per_90",
    source: "all",
  },
  { title: "Goals Conceded", field: "goals_conceded", source: "all" },
  {
    title: "Goals Conceded Per 90",
    field: "goals_conceded_per_90",
    source: "all",
  },
  {
    title: "Expected Goals Conceded",
    field: "expected_goals_conceded",
    source: "all",
  },
  { title: "Own Goals", field: "own_goals", source: "all" },
  { title: "Blocks", field: "blocks", source: "all" },
];

export const GKCardData = [
  { title: "Saves", field: "saves", source: "all" },
  { title: "Save %", field: "save_percentage", source: "computed" },
  { title: "Clean Sheets", field: "clean_sheets", source: "all" },
  { title: "Goals Conceded", field: "goals_conceded", source: "all" },
  { title: "Penalties Saved", field: "penalties_saved", source: "all" },
  { title: "Goals Prevented", field: "goals_prevented", source: "computed" },
  { title: "Saves Per 90", field: "saves_per_90", source: "computed" },
];
