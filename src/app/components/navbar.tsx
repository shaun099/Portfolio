import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className=" text-white flex items-center justify-between px-8 py-6 md:px-32">
      <div className="text-xl font-bold">SMR</div>

      <ul className="hidden lg:flex items-center gap-12 font-semibold text-base">
        <li className="p-3 hover:text-red-600 transition-all">Home</li>
        <li className="p-3 hover:text-red-600 transition-all">About Me</li>
        <li className="p-3 hover:text-red-600 transition-all">Projects</li>
        <li className="p-3 hover:text-red-600 transition-all">Contact Me</li>
      </ul>

      <Menu className="lg:hidden" />
    </nav>
  );
}
