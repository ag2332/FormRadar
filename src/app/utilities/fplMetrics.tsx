import { calculateAverage } from "./fplData";

export interface PlayerKeyData {
  id: number;
  value: number;
  totalPoints: number;
  minutes: number;
  goalsScored: number;
  assists: number;
  form: number;
    selected_by_percent: string;
  full_name: string;
}

export interface GameweekHistory {
  value: number;
  form: number;
  total_points: number;
  minutes: number;
  bonus: number;
  threat: number;
  influence: number;
  creativity: number;
  ict_index: number;
  was_home: boolean;
  opponent_team: number;
  transfers_in: number;
  transfers_out: number;
  selected_by_percent: string;
  difficulty?: number;
}

export interface MetricResults {
  valueEfficiency: number;
  roi: number;
  pp90: number;
  pot: number;
  uplift: number;
  consistency: number;
  momentum: number;
  explosiveness: number;
  goalInvolvementRate: number;
  differentialPotential: number;
  exploitability: number;
  marketMovement: number;
}

export function calculatePlayerMetrics(
  playerKeyData: PlayerKeyData,
  history: GameweekHistory[],
  completedGameweeks: number
): MetricResults {
  // Value Efficiency
  const valueEfficiency =
    playerKeyData.value > 0
      ? (playerKeyData.totalPoints / completedGameweeks / playerKeyData.value) *
        100
      : 0;

  // ROI
  const roi =
    playerKeyData.value > 0
      ? playerKeyData.totalPoints / playerKeyData.value
      : 0;

  // Points per 90
  const pp90 =
    playerKeyData.minutes > 0
      ? (playerKeyData.totalPoints / playerKeyData.minutes) * 90
      : 0;

  // POT: Price vs Output Trend
  const priceHistory = history.map((gw) => gw.value / 10);
  const priceChange = priceHistory.at(-1)! - priceHistory[0];
  const formHistory = playerKeyData.form || 1;
  const pot = formHistory - priceChange;

  // Performance Uplift
  const first3 = history.slice(0, 3).map((gw) => gw.total_points);
  const last3 = history.slice(-3).map((gw) => gw.total_points);
  const uplift = calculateAverage(last3) - calculateAverage(first3);

  // Consistency (Standard Deviation of last 5 games)
  const recentPoints = history.slice(-5).map((gw) => gw.total_points);
  const mean = calculateAverage(recentPoints);
  const consistency = Math.sqrt(
    recentPoints.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
      recentPoints.length
  );

  // Momentum (Average of last 5 points)
  const momentum = calculateAverage(recentPoints);

  // Explosiveness (10+ points games %)
  const explosiveGames = history.filter((gw) => gw.total_points >= 10).length;
  const explosiveness = (explosiveGames / completedGameweeks) * 100;

  // Goal Involvement Rate (per 90)
  const gir =
    playerKeyData.minutes > 0
      ? ((playerKeyData.goalsScored + playerKeyData.assists) /
          playerKeyData.minutes) *
        90
      : 0;

  // Differential Potential
  const selectedBy = parseFloat(playerKeyData.selected_by_percent);
  const differentialPotential =
    momentum > 0 && selectedBy > 0 ? (momentum / selectedBy) * 10 : 0;

  // Exploitability
  const difficultyValues = history
    .map((gw) => gw.difficulty)
    .filter((d): d is number => typeof d === "number");
  const avgDifficulty = difficultyValues.length
    ? calculateAverage(difficultyValues)
    : 3;
  const form = isNaN(playerKeyData.form) ? 1 : playerKeyData.form;
  const exploitability = avgDifficulty > 0 ? (form / avgDifficulty) * 10 : 0;

  // Market Movement
  const totalTransfersIn = history.reduce(
    (sum, gw) => sum + gw.transfers_in,
    0
  );
  const totalTransfersOut = history.reduce(
    (sum, gw) => sum + gw.transfers_out,
    0
  );
  const netTransfers = totalTransfersIn - totalTransfersOut;
  const marketStart = history[0].value / 10;
  const marketEnd = history[history.length - 1].value / 10;
  const marketChange = marketEnd - marketStart;
  const marketMovement = netTransfers / 10000 + marketChange;

  return {
    valueEfficiency,
    roi,
    pp90,
    pot,
    uplift,
    consistency,
    momentum,
    explosiveness,
    goalInvolvementRate: gir,
    differentialPotential,
    exploitability,
    marketMovement,
  };
}
