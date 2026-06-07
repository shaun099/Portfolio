"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/loader";

import Hero from "../components/hero";
import About from "../components/about";
import Projects from "../components/projects";
import Contact from "../components/contact";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader visible={loading} />

      <main className="min-h-screen w-full bg-black text-black">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}