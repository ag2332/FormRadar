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
