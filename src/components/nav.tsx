"use client";
import React from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <nav className=" text-white top-6 md:top-3 flex items-center justify-between py-1 px-6 lg:justify-around fixed left-1/2 translate-x-[-50%] bg-black/50 backdrop-blur-3xl z-50 rounded-full w-[94%] max-w-4xl shadow-lg" >
      <Image src="/logo.png" alt="Logo" width={90} height={40} />

      <ul className="hidden md:flex items-center gap-12  font-semibold text-base">
        <li className="p-3 hover:text-red-600 transition-all">
          <a href="#Home" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            Home
          </a>
        </li>
        <li className="p-3 hover:text-red-600 transition-all">
          <a href="#About" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            About Me
          </a>
        </li>
        <li className="p-3 hover:text-red-600 transition-all">
          <a href="#Projects" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            Projects
          </a>
        </li>
        <li
          className="p-3 hover:text-red-600 transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <a href="#Contact">Contact Me</a>
        </li>
      </ul>

      {!isMenuOpen ? (
        <Menu
          className="md:hidden block text-5xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      ) : (
        <X
          className="md:hidden block text-5xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      )}

      <div
        className={`absolute md:hidden top-20 left-1/2 translate-x-[-50%] w-full bg-black flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform rounded-2xl ${isMenuOpen ? "opacity-100" : "hidden"}`}
        style={{ transition: "transform 0.3s ease,opacity 0.3s ease" }}
      >
        <li
          className="list-none w-full text-center p-4 hover:text-red-500 transition-all cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <a href="#Home">Home</a>
        </li>
        <li
          className="list-none w-full text-center p-4 hover:text-red-500 transition-all cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <a href="#About">About Me</a>
        </li>
        <li
          className="list-none w-full text-center p-4 hover:text-red-500 transition-all cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <a href="#Projects">Projects</a>
        </li>
        <li
          className="list-none w-full text-center p-4 hover:text-red-500 transition-all cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <a href="#Contact">Contact Me</a>
        </li>
      </div>
    </nav>
  );
}
