"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SignInModal from "../components/SignInModal";

export default function SignInPage() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    // provjeri sirinu prozora nakon mountanja komponente
    const checkMobile = () => setMobile(window.innerWidth < 450);

    checkMobile(); // runnaj na mount

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) setMobile(true);
      else setMobile(false);
    };

    window.addEventListener("resize", handleResize);

    // Uklanjamo event listener kada se komponenta unmountuje
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      {" "}
      {/* ovo iskopirano sa pocetnog page-a ce sve biti samo pozadina modala */}
      {mobile ? (
        <div
          className="h-screen max-w-screen bg-cover flex flex-col items-start overflow-y-hidden"
          style={{ backgroundImage: "url('./images/bg1.png')" }}
        >
          {/* gornji dio */}
          <div className="flex h-[35vh] w-full justify-center items-start pt-10">
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-[6rem] w-[14rem]"
            />
          </div>
          {/* donji dio */}
          <div className="flex flex-col h-[65vh] w-full items-center justify-around">
            {/* tekst */}
            <div className="flex flex-col items-center gap-5 w-[80%] -mt-8 cursor-default">
              <span className="text-white font-extrabold text-2xl break-before-left w-[90%] flex items-start">
                <div className="w-[90%]">Level Up Your Dart Skills!🏆</div>
              </span>
              <span className="text-white font-medium text-sm text-justify w-[90%]">
                DartArena is an online platform for darts enthusiasts that
                allows you to track all your scores and statistics in one place.
              </span>
            </div>
            {/* gumbi */}
            <div className="flex flex-col h-full justify-center items-center">
              <div className="flex flex-col gap-4 mb-5 mt-23">
                <Link
                  href="/sign-in"
                  className="rounded-xl w-65 h-11 bg-gradient-to-r from-purple-500 to-purple-900 text-white font-semibold flex justify-center items-center hover:scale-105 hover:from-purple-700 hover:to-purple-900 transition duration-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-xl w-65 h-11 border-2 border-purple-400 text-purple-400 font-semibold flex justify-center items-center hover:scale-105 transition duration-300"
                >
                  Create an account
                </Link>
              </div>
              <Link href={"/#about"} className="">
                <img
                  src="images//arrows.png"
                  alt="arrows"
                  className="h-30 w-70 hover:scale-[115%] transition duration-200"
                />
              </Link>
            </div>
          </div>
          <div className="fixed overflow-y-auto inset-0 bg-black/20 backdrop-blur-sm z-30">
            <div className="flex min-h-screen max-w-screen justify-center items-center">
              <SignInModal />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="h-screen max-w-screen bg-cover flex flex-col items-start overflow-y-hidden"
          style={{ backgroundImage: "url('./images/bg1.png')" }}
        >
          {/* gornji dio */}
          <div className="flex h-full justify-center items-start md:justify-start pl-[9%] lg:pl-[11%] pt-7 md:pt-10 w-full">
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-[10rem] w-[20rem] md:h-[14rem] md:w-[26rem]"
            />
          </div>
          {/* donji dio */}
          <div className="flex flex-col-reverse md:flex-row h-full items-center justify-around pl-[2rem]">
            {/* gumbi */}
            <div className="flex flex-col h-full justify-center items-center mt-10 md:mt-0">
              <div className="flex flex-col gap-4 mt-17 mb-6 md:mb-35 md:mt-30">
                <Link
                  href="/sign-in"
                  className="rounded-xl w-65 h-11 bg-gradient-to-r from-purple-500 to-purple-900 text-white font-semibold flex justify-center items-center hover:scale-105 hover:from-purple-700 hover:to-purple-900 transition duration-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-xl w-65 h-11 border-2 border-purple-400 text-purple-400 font-semibold flex justify-center items-center hover:scale-105 transition duration-300"
                >
                  Create an account
                </Link>
              </div>
              <Link href={"/#about"} className="">
                <img
                  src="images/arrows.png"
                  alt="arrows"
                  className="h-30 w-70 hover:scale-[115%] transition duration-200"
                />
              </Link>
            </div>
            {/* tekst */}
            <div className="flex flex-col gap-5 w-[92%] md:w-[40%] sm:ml-8 mt-15 md:ml-0 md:-mt-12 cursor-default">
              <span className="text-white font-extrabold text-3xl md:text-4xl lg:text-5xl break-before-left w-full lg:w-[70%]">
                Level Up Your Dart Skills!🏆
              </span>
              <span className="text-white font-medium xs:text-sm sm:text-base text-justify w-[90%]">
                DartArena is an online platform for darts enthusiasts that
                allows you to track all your scores and statistics in one place.
                Whether you're a beginner or an experienced player, DartArena
                provides everything you need to monitor your progress, master
                and enjoy the game.
              </span>
            </div>
          </div>
          <div className="fixed overflow-y-auto inset-0 bg-black/20 backdrop-blur-sm z-30">
            <div className="flex min-h-screen max-w-screen justify-center items-center">
              <SignInModal />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
