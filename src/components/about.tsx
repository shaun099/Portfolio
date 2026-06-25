

const experience = [
  { role: "Full Stack Developer Intern", company: "Upsmart Solutions" },
  { role: "Full Stack Developer(Freelance)", company: "Precision Quality" },
  { role: "Full Stack Developer(Freelance)", company: "Alturio Group" },
  { role: "IPR & Research Lead", company: "IEDC SJCET" },
];


export default function About() {
  return (
    <section
      id="About"
      className="min-h-screen w-full scroll-mt-20 bg-black text-white px-5 py-8 flex flex-col gap-8 md:gap-12"
    >
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-5xl font-bold text-red-500">About Me</h1>
      </div>
      <div>
        <div className="text-lg leading-8 font-extralight md:max-w-5xl mx-auto">
         I&apos;m Shaun MR, a passionate full stack developer based in India, who loves building modern, scalable, and user-focused web applications. I enjoy transforming ideas into clean digital experiences through intuitive design, efficient backend systems, and responsive frontend development.
        </div>
        <div className="text-lg leading-8 font-extralight mt-4 flex flex-col md:flex-row md:gap-1 md:justify-center max-w-5xl gap-4 mx-auto pt-7">
          <div className="flex flex-col gap-4 md:w-5/12 ">
            <h2
              className="text-2xl font-bold text-red-500
            "
            >
              Experience
            </h2>
            {experience.map((item) => (
              <div key={item.company} className="mb-4">
                <h4 className="text-lg font-bold tracking-wider">
                  {item.role}
                </h4>
                <p className="text-gray-400">{item.company}</p>
              </div>
            ))}
          </div>
          <div className="hidden md:block w-1 h-117.5 bg-red-500 mx-auto" />
          <div className="flex flex-col gap-4 md:w-5/12 ">
            <h2
              className="text-2xl font-bold text-red-500
            "
            >
              Education
            </h2>
            <h4 className="text-lg font-bold tracking-wider">
              B.Tech in Computer Science
            </h4>
            <p className="text-gray-400">
              St.Joseph&apos;s College of Engineering & Technology(SJCET),
              <br />
              palai
              <br />
              2023-2027
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
