export function getPlayerImage(photo: string) {
  const id = photo.split(".")[0];
  return `https://resources.premierleague.com/premierleague/photos/players/110x140/p${id}.png`;
}

export function getTeamBadge(teamCode: number) {
  return `https://resources.premierleague.com/premierleague/badges/t${teamCode}.png`;
}

export function borderRadiusStyles(radius: string) {
  const borderRadiusStylesList = {
    none: "rounded-none",
    xs: "rounded-xs",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  }[radius];
  return borderRadiusStylesList;
}

export function borderRadiusTopStyles(radius: string) {
  const borderRadiusTopStylesList = {
    none: "rounded-none",
    xs: "rounded-t-xs",
    sm: "rounded-t-sm",
    md: "rounded-t-md",
    lg: "rounded-t-lg",
    xl: "rounded-t-xl",
    "2xl": "rounded-t-2xl",
    "3xl": "rounded-t-3xl",
    full: "rounded-t-full",
  }[radius];
  return borderRadiusTopStylesList;
}

export function borderRadiusBottomStyles(radius: string) {
  const borderRadiusBottomStylesList = {
    none: "rounded-none",
    xs: "rounded-b-xs",
    sm: "rounded-b-sm",
    md: "rounded-b-md",
    lg: "rounded-b-lg",
    xl: "rounded-b-xl",
    "2xl": "rounded-b-2xl",
    "3xl": "rounded-b-3xl",
    full: "rounded-b-full",
  }[radius];
  return borderRadiusBottomStylesList;
}

export const TEAM_COLORS: Record<
  string,
  {
    primary: string;
    secondary: string;
    tertiary: string;
  }
> = {
  "Arsenal": { primary: "#e20613", secondary: "#a1853e", tertiary: "#ca0538" },
  "Aston Villa": { primary: "#94bee5", secondary: "#002F6C", tertiary: "#E6F0FF" },
  "Bournemouth": { primary: "#cb080e", secondary: "#000000", tertiary: "#FFE5E5" },
  "Brentford": { primary: "#ffb81c", secondary: "#DA291C", tertiary: "#F0F4FF" },
  "Brighton": { primary: "#0054a5", secondary: "#002F5F", tertiary: "#D6E4FF" },
  "Chelsea": { primary: "#ffc100", secondary: "#034694", tertiary: "#E6F0FA" },
  "Crystal Palace": { primary: "#0055a5", secondary: "#1B458F", tertiary: "#FFE5E5" },
  "Everton": { primary: "#00009e", secondary: "#003399", tertiary: "#FFF6E0" },
  "Fulham": { primary: "#373a3b", secondary: "#000000", tertiary: "#FFF0F0" },
  "Ipswich": { primary: "#de2c37", secondary: "#FFD100", tertiary: "#E6F0FF" },
  "Leicester": { primary: "#164193", secondary: "#FFD100", tertiary: "#E6F0FF" },
  "Liverpool": { primary: "#bc0122", secondary: "#770000", tertiary: "#FFE6E6" },
  "Man City": { primary: "#97c1e7", secondary: "#6CABDD", tertiary: "#E5F0FF" },
  "Man Utd": { primary: "#d6463d", secondary: "#000000", tertiary: "#FFE6E6" },
  "Newcastle": { primary: "#bbbdbf", secondary: "#000000", tertiary: "#F0F0F0" },
  "Nott'm Forest": { primary: "#e01a2b", secondary: "#DA291C", tertiary: "#FFF6E0" },
  "Southampton": { primary: "#ed1a3b", secondary: "#000000", tertiary: "#FFE6E6" },
  "Spurs": { primary: "#011b58", secondary: "#1B1F3B", tertiary: "#F0E6F0" },
  "West Ham": { primary: "#2dafe5", secondary: "#7A263A", tertiary: "#E6EBF5" },
  "Wolves": { primary: "#fdb913", secondary: "#000000", tertiary: "#FFF8E1" }
};

export const valueEfficiencyLevels = {
  low: {
    color: "#991b1b",
    background: "#fee2e2",
    description:
      "Poor value - This player is considered low value for their price, contributing few points in relation to their market cost. Often a poor return on investment, such players may be overpriced or underperforming and might not justify their spot in your squad unless their form changes significantly.",
    maxLevel: 25,
  },
  moderate: {
    color: "#b45309",
    background: "#fef3c7",
    description:
      "Moderate value - A moderately efficient pick who offers a fair return in points for their cost. These players are often consistent but not explosive and can serve as dependable options to maintain balance in your squad without overspending.",
    maxLevel: 50,
  },
  good: {
    color: "#15803d",
    background: "#dcfce7",
    description:
      "Good value - This player provides good value, regularly returning a strong points tally in relation to their market price. These are often the most reliable assets to include in your team, offering a mix of affordability and strong performance.",
    maxLevel: 75,
  },
  high: {
    color: "#1d4ed8",
    background: "#dbeafe",
    description:
      "Excellent value - An elite performer who provides exceptional returns for their cost. These players are usually underpriced relative to their impact, making them high-priority targets for budget optimization and maximizing team performance.",
    maxLevel: 100,
  },
};
