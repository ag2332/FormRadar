"use client";
import React, { useState } from "react";
import Link from "next/link";
import Grid from "../atoms/Grid";
import Logo from "../assets/logo.png";
import List from "../molecules/list";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header = ({ children, className = "" }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Grid
      columns={3}
      className={
        "absolute px-12 py-3 flex justify-between items-center bg-white w-full"
      }
    >
      <div className={`${className} ${menuOpen ? "open" : ""}`}>
        <a href="/" className="logo">
          <h1 className="text-5xl">Form Radar</h1>
        </a>
      </div>
      <div>
        <List />
      </div>
      <div className="flex justify-end">
        <img src={Logo.src} alt="Logo" className="max-w-[70px]" />
      </div>
    </Grid>
  );
};

export default Header;
