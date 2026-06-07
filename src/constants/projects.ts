import { Project } from "@/types/projects";

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Exam Seating Management System",
    shortDesc:
      "Automated exam hall allocation platform supporting KTU and autonomous college examinations.",
    fullDesc:
      "Built a full-stack multi-portal system for Admins, Staff, and Students using React.js, FastAPI, and Supabase PostgreSQL. The platform supports over 2,000 students with automated alternating-column seating allocation based on department and hall capacity constraints. Implemented dynamic hall management, PDF report generation, exam session management, and a timed student seat lookup feature. Successfully demonstrated the system to faculty members for institutional adoption.",
    image: "/projects/exam_seating.png",
    imageAlt: "Exam Seating Management System Dashboard",
    tag: "Full Stack Application",
    technologies: ["React", "TypeScript", "FastAPI", "Supabase", "PostgreSQL"],
    projectLink: "https://exam-seating-system-rho.vercel.app/",
    githubLink: "https://github.com/shaun099/exam-seating-system",
    gridClass: "col-span-12 sm:col-span-5",
    corners: "tl-br",
  },
  {
    id: 2,
    title: "ReliefLex – Smart Therapeutic Wearable",
    shortDesc:
      "Patented IoT wearable delivering heat, cold, and haptic therapy with mobile app integration.",
    fullDesc:
      "Developed a patented healthcare wearable that provides multi-modal therapeutic treatment through controlled heat, cold, and vibration feedback. Built a React Native companion application for remote monitoring and device control. Implemented Bluetooth Low Energy (BLE) communication for real-time connectivity and integrated Supabase for device management, user authentication, and cloud-based data handling.",
    image: "/projects/relieflex.png",
    imageAlt: "ReliefLex Smart Wearable",
    tag: "IoT & Healthcare",
    technologies: [
      "React Native",
      "BLE",
      "Supabase",
      "IoT",
      "Embedded Systems",
    ],
    projectLink: "",
    githubLink: "https://github.com/shaun099/Relieflex",
    gridClass: "col-span-12 sm:col-span-7",
    corners: "tr-bl",
  },
  {
    id: 3,
    title: "SkyZero – NASA Space Apps Challenge 2025",
    shortDesc:
      "Climate intelligence platform featuring rainfall analytics, weather insights, and AI assistance.",
    fullDesc:
      "Built with a team of four during the NASA Space Apps Challenge 2025 in under 24 hours. Developed a climate and rainfall analysis platform that integrates live weather APIs, AI-powered voice interaction, and advanced environmental insights. Implemented export capabilities for CSV, PDF, and JSON formats to support data accessibility and reporting.",
    image: "/projects/skyzero.png",
    imageAlt: "SkyZero Climate Analytics Platform",
    tag: "Hackathon Project",
    technologies: [
      "React",
      "Weather APIs",
      "AI Assistant",
      "JavaScript",
      "Data Visualization",
    ],
    projectLink: "https://skyzero.netlify.app/",
    githubLink: "https://github.com/shaun099/Will_it_rain_on_my_parade",
    gridClass: "col-span-12 sm:col-span-6 lg:col-span-4",
    corners: "tr-bl",
  },
  {
    id: 4,
    title: "Asthra National Techfest Website",
    shortDesc:
      "Official event platform for a national-level technical festival with department-wise event management.",
    fullDesc:
      "Designed and developed responsive event pages for a national-level technical fest. Built department-specific event sections, registration flows, and mobile-friendly interfaces while ensuring fast performance and accessibility. Delivered the project within the event launch deadline for official deployment.",
    image: "/projects/asthra.png",
    imageAlt: "Asthra Techfest Website",
    tag: "Web Development",
    technologies: ["React", "Next.js", "Tailwind CSS", "Responsive Design"],
    projectLink: "https://asthra.sjcet.in/",
    githubLink: "https://github.com/Milansuman/asthra-10",
    gridClass: "col-span-12 sm:col-span-6 lg:col-span-4",
    corners: "tr-bl",
  },
  {
    id: 5,
    title: "NoshHeaven",
    shortDesc:
      "Food waste reduction platform connecting donors, NGOs, restaurants, farms, and communities in need.",
    fullDesc:
      "Designed and developed a social-impact platform focused on reducing food waste and improving food accessibility. The system enables food donations, food requests, waste collection workflows, and collaboration between restaurants, NGOs, farms, schools, orphanages, and underserved communities. Features include role-based portals, request management, and food redistribution tracking.",
    image: "/projects/noshheaven.png",
    imageAlt: "NoshHeaven Food Management Platform",
    tag: "Social Impact",
    technologies: ["React", "Firebase", "JavaScript", "HTML", "CSS"],
    projectLink: "https://nosh-heaven.netlify.app/",
    githubLink: "https://github.com/shaun099/Food-Distribution",
    gridClass: "col-span-12 sm:col-span-12 lg:col-span-4",
    corners: "tl-br",
  },
  {
    id: 6,
    title: "Fork'd",
    shortDesc:
      "Food marketplace connecting customers with home cooks and professional chefs.",
    fullDesc:
      "Developed a mobile-first platform that enables customers to order home-cooked meals or hire chefs for events and private cooking experiences. Built customer and cook workflows, dish management, chef hiring, favorites, filtering systems, and scheduling capabilities. Integrated Supabase, Expo Router, React Query, and image storage for a scalable mobile application architecture.",
    image: "/projects/forkd.png",
    imageAlt: "Fork'd Food Marketplace App",
    tag: "Mobile Application",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "TanStack Query",
    ],
    projectLink: "",
    githubLink: "https://github.com/shaun099/Forkd",
    gridClass: "col-span-12 sm:col-span-7",
    corners: "tr-bl",
  },
  {
    id: 7,
    title: "IEDC SUMMIT 2025",
    shortDesc:
      "Official event website developed for IEDC Summit 2025 with speaker, event, and registration information.",
    fullDesc:
      "Designed and developed the official website for IEDC Summit 2025, creating a responsive and modern user experience for attendees. Built dedicated sections for event details, schedules, speakers, partners, and registration workflows while ensuring fast performance across devices. Delivered a scalable frontend architecture and optimized user journeys to support event promotion and participant engagement.",
    image: "/projects/iedc.png",
    imageAlt: "IEDC Summit 2025 Website",
    tag: "Web Development",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    projectLink: "https://iedcsummit25.vercel.app/",
    githubLink: "https://github.com/shaun099/iedcsummit25/tree/main",
    gridClass: "col-span-12 sm:col-span-5",
    corners: "tl-br",
  },
];
