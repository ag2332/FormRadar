import React from "react";

interface CardProps {
  children?: React.ReactNode;
  className: string;
}

const Card = ({ children, className = "" }: CardProps) => {

  return (<div className={`${className} bg-white rounded-2xl p-12 my-8 w-full`}>{children}</div>)
};

export default Card;