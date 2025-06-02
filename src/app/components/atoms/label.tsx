import React from "react";

interface LabelProps {
  children?: React.ReactNode;
  className?: string;
}

const Label = ({ children, className = "" }: LabelProps) => {

  return (<div className={`${className} p-8`}>{children}</div>)
};

export default Label;