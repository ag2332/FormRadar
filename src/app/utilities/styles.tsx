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
      " is considered low value for their price, offering limited returns relative to their market cost. These players often fail to justify their expense as their contributions to your team’s performance are minimal. Unless there is a clear improvement in form or a change in role, keeping them may restrict your squad’s overall efficiency and potential.",
    recommendation:
      "It's generally advisable to avoid or transfer out these players, as they provide poor value for money. Your budget could be better allocated to more cost-effective options that deliver stronger and more consistent returns, helping you optimize overall squad efficiency and maximize points gained per investment.",
    maxLevel: 25,
  },
  moderate: {
    color: "#b45309",
    background: "#fef3c7",
    description:
      " is a moderately efficient player who offers a balanced return relative to their price. While they may not produce standout performances regularly, their contributions are steady and provide acceptable value for their cost. These players help maintain squad stability and can act as reliable role players in your overall team structure.",
    recommendation:
      "Players in this category provide acceptable value for their cost and can help maintain squad stability without overspending. While not typically game-changers, they are useful budget options for filling necessary roles and supporting star performers. Consider keeping them if they fit your tactical needs, but remain vigilant for opportunities to upgrade to more efficient alternatives.",
    maxLevel: 50,
  },
  good: {
    color: "#15803d",
    background: "#dcfce7",
    description:
      " delivers good value for money by consistently generating strong returns relative to their price tag. These players represent efficient use of budget, combining affordability with reliable and impactful performances that contribute significantly to your team’s success over the season.",
    recommendation:
      "Players at this level are smart investments, offering an excellent balance between cost and output. They should form the backbone of your squad, helping you maximize points without overspending. Prioritize acquiring and retaining such players to build a competitive yet cost-effective team capable of sustained success.",
    maxLevel: 70,
  },
  high: {
    color: "#1d4ed8",
    background: "#dbeafe",
    description:
      " is an elite value player who consistently outperforms their cost, delivering exceptional returns and maximizing budget efficiency. These players are rare assets who provide outstanding value for money, often exceeding expectations and enabling you to optimize your squad’s performance while freeing up resources.",
    recommendation:
      "Top-tier value players should be your highest priority when building your squad. Their superior cost-effectiveness allows you to invest budget elsewhere while maintaining or increasing your team’s scoring potential. Targeting and retaining these players gives you a strong strategic advantage, enabling optimal squad construction and a higher ceiling for success.",
    maxLevel: 100,
  },
};

