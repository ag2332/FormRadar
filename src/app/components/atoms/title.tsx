import React from "react";

interface TitleProps {
  className: string;
  title: string;
}

const Title = ({ className = "", title }: TitleProps) => {
  const colors = [
    "white",
    "black",
    "blue",
    "red",
  ]
  return (
    <div className={`${className} text-white rounded-2xl p-12 w-full`}>
      {title && <h1 className="text-8xl font-semibold justify-center text-center">{title}</h1>}
    </div>
  );
};

export default Title;
