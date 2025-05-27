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

export const TEAM_COLORS: Record<string, string> = {
  "Arsenal": "#DA291C",              // red
  "Aston Villa": "#0057B8",          // claret
  "Bournemouth": "#EF0107",          // red/black
  "Brentford": "#1B458F",            // red/white
  "Brighton": "#034694",             // blue
  "Burnley": "#001C58",              // claret
  "Chelsea": "#6CABDD",              // blue
  "Crystal Palace": "#FF0000",       // red/blue
  "Everton": "#FDB913",              // royal blue
  "Fulham": "#DA291C",               // white/black
  "Liverpool": "#D71920",            // red
  "Luton": "#6CABDD",                // orange
  "Man City": "#1C2C5B",             // sky blue
  "Man Utd": "#DA291C",              // red
  "Newcastle": "#1B458F",            // black/white
  "Nott'm Forest": "#FDB913",        // red
  "Sheffield Utd": "#FDB913",        // red/white
  "Spurs": "#7A263A",                // navy
  "West Ham": "#122F67",             // claret/blue
  "Wolves": "#FDB913"                // gold
};