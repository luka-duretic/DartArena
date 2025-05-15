"use client";

import Link from "next/link";
import { useState } from "react";
import { TbTargetArrow } from "react-icons/tb";
import { RiHome9Line } from "react-icons/ri";
import { MdOutlineSsidChart } from "react-icons/md";
import { GiDart } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SideBar />
      {children}
    </div>
  );
}

const SideBar = () => {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    logout();
  };

  return (
    <div>
      {/* gumb za otvaranje/zatvaranje SideBar-a */}
      <div className="fixed top-5 left-5">
        <MenuButton isOpen={isOpen} toggleSideBar={toggleSideBar} />
      </div>

      {/* SideBar */}
      <div
        className={`flex flex-col fixed top-0 ${
          isOpen ? "left-0" : "-left-[330px]"
        } w-[330px] h-screen bg-background text-textColorDark transition-all duration-300 ease-in-out p-4 ${
          isOpen ? "shadow-md" : "shadow-none"
        } z-50`}
      >
        {/* close gumb */}
        <div className="flex justify-between items-center mb-[3.5rem]">
          <span className="text-xl font-semibold cursor-default">
            DartArena
          </span>
          <MenuButton isOpen={isOpen} toggleSideBar={toggleSideBar} />
        </div>

        <ul className="flex flex-col gap-5">
          <li className="flex items-center gap-2 hover:scale-105 transition duration-300">
            <Link href="/home" className="text-textColorDark">
              Home
            </Link>
            <RiHome9Line className="mt-[2px] cursor-pointer" />
          </li>
          <li className="flex items-center gap-2 hover:scale-105 transition duration-300">
            <Link href="/games" className="text-textColorDark">
              Games
            </Link>
            <TbTargetArrow className="mt-[2px] cursor-pointer" />
          </li>
          <li className="flex items-center gap-2 hover:scale-105 transition duration-300">
            <Link href="/statistics" className="text-textColorDark">
              Statistics
            </Link>
            <MdOutlineSsidChart className="mt-[2px] cursor-pointer" />
          </li>
          <li className="flex items-center gap-2 hover:scale-105 transition duration-300">
            <Link href="/profile" className="text-textColorDark">
              Profile
            </Link>
            <GiDart className="mt-[2px] cursor-pointer" />
          </li>
        </ul>

        {/* logout gumb */}
        <div className="h-full mb-3 mt-2 flex justify-end items-end">
          <div className="flex gap-2 items-center mr-3 cursor-pointer hover:scale-105 transition duration-300">
            <div onClick={handleClick}>Sign out</div>
            <CiLogout className="mt-[2px]" />
          </div>
        </div>
        <div className="h-[2px] bg-textColorDark mb-3 mt-1"></div>
        <Footer />
      </div>
      {/* preklapanje kad je SideBar otvoren */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 min-h-screen min-w-screen z-30 bg-black/20"
          onClick={toggleSideBar}
        />
      )}
    </div>
  );
};

const MenuButton = ({ isOpen, toggleSideBar }: any) => {
  return (
    <div
      className="flex flex-col gap-[4.5px] cursor-pointer w-[2rem]"
      onClick={toggleSideBar}
    >
      <div
        className={`bg-textColorDark w-6 h-1 rounded-sm ${
          isOpen ? "rotate-45" : ""
        } origin-left ease-in-out duration-500`}
      />
      <div
        className={`bg-textColorDark w-6 h-1 rounded-sm ${
          isOpen ? "opacity-0" : ""
        } ease-in-out duration-500`}
      />
      <div
        className={`bg-textColorDark w-6 h-1 rounded-sm ${
          isOpen ? "-rotate-45" : ""
        } origin-left ease-in-out duration-500`}
      />
    </div>
  );
};
