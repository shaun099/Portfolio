"use client";
import React from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <nav className=" text-white flex items-center justify-between px-8 py-6 md:px-32">
      <div className="text-2xl font-bold">SMR</div>

      <ul className="hidden lg:flex items-center gap-12 font-semibold text-base">
        <li className="p-3 hover:text-red-600 transition-all">
          <a href="#Home">Home</a>
        </li>
        <li className="p-3 hover:text-red-600 transition-all">
          <a href="#About">About Me</a>
        </li>
        <li className="p-3 hover:text-red-600 transition-all">
          <a href="#Projects">Projects</a>
        </li>
        <li className="p-3 hover:text-red-600 transition-all">
          <a href="#Contact">Contact Me</a>
        </li>
      </ul>

      {!isMenuOpen ? (
        <Menu
          className="lg:hidden block text-5xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      ) : (
        <X
          className="lg:hidden block text-5xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      )}

      <div
        className={`absolute lg:hidden top-20 left-0 w-full bg-black flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "hidden"}`}
        style={{ transition: "transform 0.3s ease,opacity 0.3s ease" }}
      >
        <li className="list-none w-full text-center p-4 hover:text-red-500 transition-all cursor-pointer">
          <a href="#Home">Home</a>
        </li>
        <li className="list-none w-full text-center p-4 hover:text-red-500 transition-all cursor-pointer">
          <a href="#About">About Me</a>
        </li>
        <li className="list-none w-full text-center p-4 hover:text-red-500 transition-all cursor-pointer">
          <a href="#Projects">Projects</a>
        </li>
        <li className="list-none w-full text-center p-4 hover:text-red-500 transition-all cursor-pointer">
          <a href="#Contact">Contact Me</a>
        </li>
      </div>
    </nav>
  );
}
