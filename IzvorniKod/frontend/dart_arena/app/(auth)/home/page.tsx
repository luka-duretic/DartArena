"use client";

import SliderCustom from "@/app/components/SliderCustom";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { TbTargetArrow } from "react-icons/tb";
import { MdOutlineSsidChart } from "react-icons/md";
import { GiDart } from "react-icons/gi";
import Link from "next/link";
import { useGetUser } from "@/app/queries/getUserQuery";

export default function Home() {
  const { token, logout } = useAuth();
  const userQuery = useGetUser();

  useEffect(() => {
    if (!token) return;
  }, []);

  if (userQuery.isLoading) {
    return (
      <div className="absolute top-[50%] left-[50%] text-textColorDark flex flex-col justify-center items-center gap-2">
        <div>Loading...</div>
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen bg-background2 text-textColorDark flex justify-center items-start">
      {/* sadrzaj u sredini */}
      <div className="w-[55%] h-full flex flex-col gap-3 pt-5">
        {/* logo traka */}
        <div className="rounded-lg bg-gradient-to-l from-purple-500 to-purple-900 p-[2px]">
          <div
            className="w-full h-[12%] bg-cover flex justify-center items-center rounded-lg"
            style={{ backgroundImage: "url('/images/bg1.png')" }}
          >
            <img src="/images/logo.png" alt="logo" className="w-50 h-full" />
          </div>
        </div>
        {/* ostali modali */}
        <div className="flex flex-col gap-3 w-full h-full">
          <div className="w-full h-[26rem] bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[101%] transition duration-300">
            <SliderCustom />
          </div>
          <div className="flex gap-3 w-full h-[25%]">
            <Link
              href="/games"
              className="w-[55%] p-5 bg-modalBg rounded-lg flex flex-col gap-4 shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300"
            >
              <TbTargetArrow className="text-4xl text-indigo-500" />
              <div className="text-textColorDark">
                <div className="font-semibold text-lg">PLAY NOW</div>
                <div className="text-base">
                  Select the game mode and enjoy. Train to improve or play with
                  friends.
                </div>
              </div>
            </Link>
            <Link
              href="/profile"
              className="w-[45%] p-5 bg-modalBg rounded-lg flex flex-col gap-4 shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300"
            >
              <GiDart className="text-4xl text-indigo-500" />
              <div className="text-textColorDark">
                <div className="font-semibold text-lg">VIEW PROFILE</div>
                <div className="text-base">
                  Here you can always see stats summary, edit and update your
                  info.
                </div>
              </div>
            </Link>
          </div>
          <Link
            href="/statistics"
            className="w-full h-[13%] bg-modalBg rounded-lg flex gap-3 p-5 items-center mb-3 shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300"
          >
            <MdOutlineSsidChart className="text-4xl text-indigo-500" />
            <div className="text-textColorDark flex flex-col">
              <div className="font-semibold text-lg">CHECK STATISTICS</div>
              <div className="text-base">
                Track daily progress and enhance your game
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
