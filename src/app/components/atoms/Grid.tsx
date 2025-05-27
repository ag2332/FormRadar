import React from "react";

interface GridProps {
  children?: React.ReactNode;
  className: string;
  columns: number;
}

const Grid = ({ children, className = "", columns = 2 }: GridProps) => {
  const gridStyles = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    6: "grid-cols-6",
    8: "grid-cols-8",
    12: "grid-cols-12",
  }[columns];

  return (<div className={`${className} grid gap-8 text-center ${gridStyles}`}>{children}</div>)
};

export default Grid;
