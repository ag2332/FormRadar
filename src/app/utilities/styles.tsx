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
  Arsenal: { primary: "#e20613", secondary: "#a1853e", tertiary: "#ca0538" },
  "Aston Villa": {
    primary: "#94bee5",
    secondary: "#002F6C",
    tertiary: "#E6F0FF",
  },
  Bournemouth: {
    primary: "#cb080e",
    secondary: "#000000",
    tertiary: "#FFE5E5",
  },
  Brentford: { primary: "#ffb81c", secondary: "#DA291C", tertiary: "#F0F4FF" },
  Brighton: { primary: "#0054a5", secondary: "#002F5F", tertiary: "#D6E4FF" },
  Chelsea: { primary: "#ffc100", secondary: "#034694", tertiary: "#E6F0FA" },
  "Crystal Palace": {
    primary: "#0055a5",
    secondary: "#1B458F",
    tertiary: "#FFE5E5",
  },
  Everton: { primary: "#00009e", secondary: "#003399", tertiary: "#FFF6E0" },
  Fulham: { primary: "#373a3b", secondary: "#000000", tertiary: "#FFF0F0" },
  Ipswich: { primary: "#de2c37", secondary: "#FFD100", tertiary: "#E6F0FF" },
  Leicester: { primary: "#164193", secondary: "#FFD100", tertiary: "#E6F0FF" },
  Liverpool: { primary: "#bc0122", secondary: "#770000", tertiary: "#FFE6E6" },
  "Man City": { primary: "#97c1e7", secondary: "#6CABDD", tertiary: "#E5F0FF" },
  "Man Utd": { primary: "#d6463d", secondary: "#000000", tertiary: "#FFE6E6" },
  Newcastle: { primary: "#bbbdbf", secondary: "#000000", tertiary: "#F0F0F0" },
  "Nott'm Forest": {
    primary: "#e01a2b",
    secondary: "#DA291C",
    tertiary: "#FFF6E0",
  },
  Southampton: {
    primary: "#ed1a3b",
    secondary: "#000000",
    tertiary: "#FFE6E6",
  },
  Spurs: { primary: "#011b58", secondary: "#1B1F3B", tertiary: "#F0E6F0" },
  "West Ham": { primary: "#2dafe5", secondary: "#7A263A", tertiary: "#E6EBF5" },
  Wolves: { primary: "#fdb913", secondary: "#000000", tertiary: "#FFF8E1" },
};

export const metricDefinitions = {
  "Value Efficiency": {
    description:
      "Measures points earned per million in price per gameweek — highlights players offering strong value.",
    legend: "70+: Excellent | 50–69: Solid | <50: Poor value",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 50 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 69 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 100 },
    },
  },
  "Return On Investment": {
    description:
      "Evaluates total points earned per million spent — rewards long-term value picks.",
    legend: "15+: Excellent | 10–14.9: Decent | <10: Low return",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 10 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 14.9 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 100 },
    },
  },
  "Points Per 90": {
    description:
      "Average points scored per 90 minutes — helps compare players with different playtime.",
    legend: "6+: Elite | 4–5.9: Solid | <4: Low impact",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 4 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 5.9 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 10 },
    },
  },
  "Price vs Output Trend": {
    description:
      "Compares form change to price change — identifies rising or declining value.",
    legend: "2+: Increasing value | 0–1.9: Stable | <0: Declining",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 0 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 1.9 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 10 },
    },
  },
  "Performance Uplift": {
    description:
      "Difference in average points between recent and early games — shows form trends.",
    legend: "2+: Improving | 0–1.9: Neutral | <0: Declining",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 0 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 1.9 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 10 },
    },
  },
  "Consistency Score": {
    description:
      "Standard deviation of recent points — lower values indicate more reliable output.",
    legend: "0–2: High consistency | 2.1–4: Variable | >4: Inconsistent",
    levels: {
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 2 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 4 },
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 100 },
    },
  },
  "Points Momentum": {
    description:
      "Recent average points per game — used to identify form surges or slumps.",
    legend: "6+: On fire | 4–5.9: In form | <4: Low form",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 4 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 5.9 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 15 },
    },
  },
  "Explosiveness": {
    description:
      "Percentage of games with 10+ points — identifies high-ceiling players.",
    legend: "25%+: Highly explosive | 10–24%: Occasional spikes | <10%: Low ceiling",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 10 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 24 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 100 },
    },
  },
  "Goal Involvement Rate": {
    description:
      "Goals + assists per 90 mins — shows how directly involved a player is in goals.",
    legend: "0.8+: Key contributor | 0.4–0.79: Active | <0.4: Low involvement",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 0.4 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 0.79 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 2 },
    },
  },
  "Differential Potential": {
    description:
      "Form adjusted by ownership — highlights under-the-radar players with high output.",
    legend: "15+: Big differential | 5–14.9: Emerging | <5: Low upside",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 5 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 14.9 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 100 },
    },
  },
  "Exploitability": {
    description:
      "Measures points per unit of fixture difficulty — identifies strong performers in easy runs.",
    legend: "4+: Great run | 2–3.9: Moderate | <2: Poor output vs fixtures",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 2 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 3.9 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 10 },
    },
  },
  "Market Movement": {
    description:
      "Combines net transfers and price shift — shows how demand is affecting player value.",
    legend: "2+: Rapid rise | 0–1.9: Neutral | <0: Falling out of favor",
    levels: {
      low: { color: "#ef4444", background: "#fee2e2", maxLevel: 0 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 1.9 },
      high: { color: "#15803d", background: "#dcfce7", maxLevel: 10 },
    },
  },
  "Discipline Risk": {
    description:
      "Low bonus points per minute can hint at erratic or risky players.",
    legend: "<0.2: High risk | 0.2–0.4: Moderate | >0.4: Safe",
    levels: {
      high: { color: "#ef4444", background: "#fee2e2", maxLevel: 0.2 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 0.4 },
      low: { color: "#15803d", background: "#dcfce7", maxLevel: 100 },
    },
  },
  "Inconsistency Risk": {
    description:
      "High standard deviation relative to mean — flags unpredictable scoring.",
    legend: ">1: Very inconsistent | 0.5–1: Unstable | <0.5: Reliable",
    levels: {
      high: { color: "#ef4444", background: "#fee2e2", maxLevel: 1 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 0.99 },
      low: { color: "#15803d", background: "#dcfce7", maxLevel: 0.49 },
    },
  },
  "Low Minutes Risk": {
    description:
      "Shows the percent of minutes missed — helps spot rotation or injury risks.",
    legend: ">40%: High risk | 20–39%: Moderate | <20%: Safe",
    levels: {
      high: { color: "#ef4444", background: "#fee2e2", maxLevel: 40 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 39 },
      low: { color: "#15803d", background: "#dcfce7", maxLevel: 19 },
    },
  },
  "Fixture Difficulty Risk": {
    description:
      "Upcoming average fixture difficulty — helps assess threat of tough schedule.",
    legend: "4+: Tough fixtures | 3–3.9: Mixed | <3: Favorable",
    levels: {
      high: { color: "#ef4444", background: "#fee2e2", maxLevel: 4 },
      moderate: { color: "#f97316", background: "#fef3c7", maxLevel: 3.9 },
      low: { color: "#15803d", background: "#dcfce7", maxLevel: 2.9 },
    },
  },
};

export const dataLevels = {
  low: {
    color: "#ef4444",
    background: "#fee2e2",
    description:
      " is considered low value for their price, offering limited returns relative to their market cost. These players often fail to justify their expense as their contributions to your team’s performance are minimal.",
    recommendation:
      "It's generally advisable to avoid or transfer out these players, as they provide poor value for money. Your budget could be better allocated to more cost-effective options that deliver stronger and more consistent.",
    maxLevel: 25,
  },
  moderate: {
    color: "#f97316",
    background: "#fef3c7",
    description:
      " is a moderately efficient player who offers a balanced return relative to their price. While they may not produce standout performances regularly, their contributions are steady and provide acceptable value for their cost.",
    recommendation:
      "Players in this category provide acceptable value for their cost and can help maintain squad stability without overspending. While not typically game-changers, they are useful budget options for filling necessary roles and supporting star performers.",
    maxLevel: 50,
  },
  high: {
    color: "#15803d",
    background: "#dcfce7",
    description:
      " delivers good value for money by consistently generating strong returns relative to their price tag. These players represent efficient use of budget, combining affordability with reliable and impactful performances.",
    recommendation:
      "Players at this level are smart investments, offering an excellent balance between cost and output. They should form the backbone of your squad, helping you maximize points without overspending.",
    maxLevel: 75,
  },
};

export function getMetricStyle(metricName: string, rawValue: number) {
  const metric = metricDefinitions[metricName];
  if (!metric) return null;

  const levels = metric.levels;
  const entries = Object.entries(levels);

  for (const [key, level] of entries) {
    if (rawValue <= level.maxLevel) {
      return { ...level, levelName: key };
    }
  }

  // fallback if not matched
  return entries[entries.length - 1][1];
}

export function getDataLevel(
  value: number,
  levels: typeof dataLevels
): "low" | "moderate" | "high" {
  if (value < levels.low.maxLevel) return "low";
  if (value < levels.moderate.maxLevel) return "moderate";
  return "high";
}
