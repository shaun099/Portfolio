import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconMessages,
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-red-600" />
      ),
      href: "#Home",
    },
    {
      title: "About Me",
      icon: (
        <IconUser className="h-full w-full text-red-600" />
      ),
      href: "#About",
    },
    {
      title: "Projects",
      icon: (
        <IconBriefcase className="h-full w-full text-red-600" />
      ),
      href: "#Projects",
    },
    {
      title: "Contact Me",
      icon: (
        <IconMessages className="h-full w-full text-red-600" />
      ),
      href: "#Contact",
    },
  ];
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 rounded-full">
      <FloatingDock items={links} />
    </div>
  );
}