import Link from "next/link";
import { useState } from "react";

interface ListProps {}

const List = ({}: ListProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="flex justify-center relative">
      <div className="cursor-pointer" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul
        className={`list-none flex items-center space-x-12 text-[#38003c] text-xl ${
          menuOpen
            ? "absolute top-10 right-0 w-full bg-black flex flex-col justify-end items-center space-y-4 transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Players</Link>
        </li>
        <li>
          <Link href="/">Teams</Link>
        </li>
        <li>
          <Link href="/">Trending</Link>
        </li>
        <li>
          <Link href="/">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default List;
