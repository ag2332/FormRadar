export interface FPLPlayer {
  id: number;
  first_name: string;
  second_name: string;
  team: number;
  element_type: number;
  now_cost: number;
  [key: string]: any;
}

export interface Team {
  id: number;
  name: string;
}

export interface Position {
  id: number;
  singular_name: string;
}

export interface Player {
  photo: any;
  team_code: any;
  id: number;
  name: string;
  full_name: string;
  team: string;
  position: string;
  value: number;
  stats: FPLPlayer;
}

export interface DropDownProps {
  label: string;
  items: Player[];
  onPlayerSelect: (player: Player) => void;
  backgroundColor: string;
  borderRadius: string;
  selectSize: boolean;
  inputSelect: boolean;
}

export interface PlayerBannerProps {
  fullName: string;
  playerImageUrl: string;
  teamName: string;
  teamBadgeUrl: string;
  player: Player;
  className?: string;
}

export interface PointsFormCardProps {
  totalPoints: number;
  form: string;
  ictIndex: string;
  selectedByPercent: string;
  percentiles: {
    totalPoints: number;
    gameWeekPoints: number;
    bonusPoints: number;
    form: number;
    ictIndex: number;
    selectedByPercent: number;
  };
  gameWeekPoints: number;
  bonusPoints: number;
  player: Player;
  averages: {
    avgTotalPoints: number;
    avgGameWeekPoints: number;
    avgBonusPoints: number;
    avgForm: number;
    avgIctIndex: number;
    avgSelectedByPercent: number;
  };
}

export interface ValueEfficiencyProps {
  valueEfficiencyLevel: "low" | "moderate" | "good" | "high";
  valueEfficiencyDisplay: string;
  valueEfficiencyRaw: number;
  fullName: string;
}

export interface DFStatsCardProps {
  cleanSheets: number;
  cleanSheetsPer90: number;
  goalsConceded: number;
  goalsConcededPer90: number;
  expectedGoalsConceded: number;
  ownGoals: number;
  blocks: number;
}

export interface ATStatsCardProps {
  numberOfGamesStarted: number;
  expectedGoals: number;
  expectedGoalsPer90: number;
  expectedAssists: number;
  expectedAssistsPer90: number;
  expectedGoalInvolvements: number;
  expectedGoalInvolvementsPer90: number;
}

export interface ReliabilityStatsCardProps {
  minutesPlayed: number;
  starts: number;
  subAppearances: number;
  status: string; // "available", "injured", etc.
  yellowCards: number;
  redCards: number;
  selectedByPercent: number;
}

export interface ICTCardProps {
  influence: number;
  creativity: number;
  threat: number;
  ictIndex: number;
  goalsScored: number;
  assists: number;
  threatRank: number;
}

export interface GKStatsCardProps {
  saves: number;
  savePercentage: number;
  cleanSheets: number;
  goalsConceded: number;
  penaltiesSaved: number;
  goalsPrevented: number;
  savesPer90: number;
}
