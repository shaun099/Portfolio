import Navbar from "./nav";
import GlassBox from "./GlassBox";
import Image from "next/image";
export default function Hero() {
  return (
    <section id="Home" className="min-h-screen w-full scroll-mt-20 bg-black text-white">
      <GlassBox />
      <div className="w-full h-full">
        {/* <Navbar /> */}
      </div>
      <div className="w-full h-full flex flex-col lg:flex-row gap-10 md:gap-15 items-center justify-between md:justify-around px-8 py-6 md:px-32 ">
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-4xl lg:text-6xl max-w-4xl text-red-500 font-bold">
            SHAUN MR
          </h1>
          <h2 className="text-lg md:text-xl">Full Stack Developer</h2>
          <p className="max-w-lg mt-4 text-md text-white text-justify">
            Computer Science Engineer and Full Stack Developer passionate about
            building modern, scalable, and user-focused digital experiences.
            Skilled in developing responsive frontend interfaces, backend
            systems, and seamless web applications using technologies like
            React, Next.js, and modern development tools. Focused on creating
            clean, efficient, and impactful solutions that combine functionality
            with strong design.
          </p>
        </div>
        <div className="w-[70%] sm:w-2/5 md:w-1/2 lg:w-1/3 h-full flex items-center justify-center relative transition-transform duration-300 hover:scale-105">
          <Image
            src="/profile.webp"
            alt="hero"
            width={678}
            height={830}
            className="object-cover "
          />
        </div>
      </div>
    </section>
  );
}
