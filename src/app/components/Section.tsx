export default function Section({
  children = false as any,
  size = "md",
  className = "",
  innerClass = "",
  id = null,
}) {
  const sizes = {
    none: "py-0",
    xs: "py-section-xs",
    sm: "py-section-sm",
    md: "py-section-sm lg:py-section",
    lg: "py-section-sm lg:py-section-lg",
    xl: "py-section-sm lg:py-section-xl",
    "2xl": "py-section-2xl",
  }[size];

  if (children) {
    return (
      <section
        id={id ? id : ""}
        className={`w-full ${sizes} rounded-2xl ${className}`}
      >
        <div className={`mx-auto w-full ${innerClass} max-w-site`}>
          {children}
        </div>
      </section>
    );
  } else {
    return null;
  }
}
