import React from "react";

interface GridProps {
  children?: React.ReactNode;
  className: string;
}

const Card = ({ children, className = "" }: GridProps) => {

  return (<div className={`${className} bg-white rounded-2xl p-12 w-full`}>{children}</div>)
};

export default Card;