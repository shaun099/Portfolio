import Navbar from "./navbar";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="min-h-screen w-full bg-black text-white">
      <div className="w-full h-full">
        <Navbar />
      </div>
      <div className="w-full h-full flex flex-col lg:flex-row gap-10 md:gap-15 items-center justify-between md:justify-around px-8 py-6 md:px-32 ">
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-4xl lg:text-6xl max-w-4xl text-red-500 font-bold">
            SHAUN MR
          </h1>
          <h2 className="text-lg md:text-xl">Full Stack Developer</h2>
          <p className="max-w-lg mt-4 text-md text-white text-justify">
            Aspernatur ut assumenda impedit saepe, voluptatibus alias
            repudiandae. Blanditiis aperiam, cupiditate excepturi corrupti
            provident molestiae et cumque quis optio enim beatae repellat nisi
            laboriosam quibusdam qui saepe nesciunt dolores vero. Blanditiis
            aperiam, cupiditate excepturi corrupti provident molestiae et cumque
            quis optio enim beatae repellat nisi laboriosam quibusdam qui saepe
            nesciunt dolores vero.
          </p>
        </div>
        <div className="w-full sm:w-2/4 md:w-1/2 lg:w-1/3 h-full flex items-center justify-center relative transition-transform duration-300 hover:scale-105">
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
