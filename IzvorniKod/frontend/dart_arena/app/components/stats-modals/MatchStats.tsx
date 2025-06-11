"use client";

import { HiMiniTrophy, HiUserCircle } from "react-icons/hi2";
import { RiCloseCircleLine } from "react-icons/ri";
import { RiCloseCircleFill } from "react-icons/ri";

export default function MatchSummary({ player1, player2, setOpen }: any) {
  return (
    <div className="cursor-default inset-0 fixed bg-black/30 backdrop-blur-sm z-30 text-textColorDark flex flex-col gap-2 justify-center items-center">
      <div
        className={
          "zoom-in-bounce w-[80%] sm:w-[70%] md:w-[65%] lg:w-[50%] flex flex-col items-center gap-4 py-4 px-6 bg-modalBg rounded-xl shadow-lg shadow-modalShadow" +
          (player2.name === "" ? " h-[42.5rem]" : " h-[40.5rem]")
        }
      >
        <div className="flex justify-between items-center w-full">
          <div className="w-[20%]"></div>
          <div className="w-[50%] flex justify-center items-center font-bold text-xl">
            MATCH STATS
          </div>
          <div className="w-[20%] flex justify-end cursor-pointer">
            <div onClick={() => setOpen(false)} className="group flex">
              <RiCloseCircleLine className="block group-hover:hidden w-6 h-6" />
              <RiCloseCircleFill className="hidden group-hover:block w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        {/* players */}
        <div className="w-full font-semibold text-lg flex">
          <div
            className={
              "flex justify-start items-center " +
              (player2.name === ""
                ? "w-full flex-col mt-2 gap-1"
                : "w-[40%] gap-4")
            }
          >
            {player1.imgUrl ? (
              <img
                src={player1.imgUrl}
                alt="profile picture"
                className="object-cover h-12 w-12 border-2 border-indigo-600 rounded-full p-0 m-0"
              />
            ) : (
              <HiUserCircle className="h-[54px] w-[54px] text-indigo-600 rounded-full" />
            )}
            <p className="break-all">{player1.name.toUpperCase()}</p>
          </div>
          {player2.name !== "" && (
            <div className="font-bold flex justify-center items-center w-[20%]">
              H2H
            </div>
          )}
          {player2.name !== "" && (
            <div className="flex flex-row-reverse gap-4 justify-start items-center w-[40%]">
              {player2.imgUrl ? (
                <img
                  src={player2.imgUrl}
                  alt="profile picture"
                  className="object-cover h-12 w-12 border-2 border-indigo-600 rounded-full p-0 m-0"
                />
              ) : (
                <HiUserCircle className="h-[54px] w-[54px] text-indigo-600 p-0 rounded-full" />
              )}
              <p className="break-all">{player2.name.toUpperCase()}</p>
            </div>
          )}
        </div>
        {/* stats */}
        <div className="flex flex-col w-full items-center gap-[6px] mt-2">
          <div
            className={
              "font-normal flex justify-between items-center w-[90%] " +
              (player2.name === "" ? "flex-row-reverse" : "")
            }
          >
            <p
              className={
                "w-[30%] " + (player2.name === "" ? "flex justify-end" : "")
              }
            >
              {player1.average3Darts}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              3 darts avg.
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {player2.average3Darts}
              </p>
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="h-[2px] opacity-5 w-[93%] bg-textColorDark"></div>
          </div>
          <div
            className={
              "font-normal flex justify-between items-center w-[90%] " +
              (player2.name === "" ? "flex-row-reverse" : "")
            }
          >
            <p
              className={
                "w-[30%] " + (player2.name === "" ? "flex justify-end" : "")
              }
            >
              {player1?.checkoutDartsAverage}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              check. darts avg.
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {player2?.checkoutDartsAverage}
              </p>
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="h-[2px] opacity-5 w-[93%] bg-textColorDark"></div>
          </div>
          <div
            className={
              "font-normal flex justify-between items-center w-[90%] " +
              (player2.name === "" ? "flex-row-reverse" : "")
            }
          >
            <p
              className={
                "w-[30%] " + (player2.name === "" ? "flex justify-end" : "")
              }
            >
              {player1?.checkoutPercentage}%
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              checkout %
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {player2?.checkoutPercentage}%
              </p>
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="h-[2px] opacity-5 w-[93%] bg-textColorDark"></div>
          </div>
          <div
            className={
              "font-normal flex justify-between items-center w-[90%] " +
              (player2.name === "" ? "flex-row-reverse" : "")
            }
          >
            <p
              className={
                "w-[30%] " + (player2.name === "" ? "flex justify-end" : "")
              }
            >
              {player1?.score60Plus}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              60+.
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">{player2?.score60Plus}</p>
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="h-[2px] opacity-5 w-[93%] bg-textColorDark"></div>
          </div>
          <div
            className={
              "font-normal flex justify-between items-center w-[90%] " +
              (player2.name === "" ? "flex-row-reverse" : "")
            }
          >
            <p
              className={
                "w-[30%] " + (player2.name === "" ? "flex justify-end" : "")
              }
            >
              {player1.score100Plus}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              100+
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {player2?.score100Plus}
              </p>
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="h-[2px] opacity-5 w-[93%] bg-textColorDark"></div>
          </div>
          <div
            className={
              "font-normal flex justify-between items-center w-[90%] " +
              (player2.name === "" ? "flex-row-reverse" : "")
            }
          >
            <p
              className={
                "w-[30%] " + (player2.name === "" ? "flex justify-end" : "")
              }
            >
              {player1?.score140Plus}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              140+
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {player2?.score140Plus}
              </p>
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="h-[2px] opacity-5 w-[93%] bg-textColorDark"></div>
          </div>
          <div
            className={
              "font-normal flex justify-between items-center w-[90%] " +
              (player2.name === "" ? "flex-row-reverse" : "")
            }
          >
            <p
              className={
                "w-[30%] " + (player2.name === "" ? "flex justify-end" : "")
              }
            >
              {player1?.score170Plus}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              170+
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {player2?.score170Plus}
              </p>
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="h-[2px] opacity-5 w-[93%] bg-textColorDark"></div>
          </div>
          <div
            className={
              "font-normal flex justify-between items-center w-[90%] " +
              (player2.name === "" ? "flex-row-reverse" : "")
            }
          >
            <p
              className={
                "w-[30%] " + (player2.name === "" ? "flex justify-end" : "")
              }
            >
              {player1?.legsWon}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              legs (total)
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">{player2?.legsWon}</p>
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="h-[2px] opacity-5 w-[93%] bg-textColorDark"></div>
          </div>
          <div
            className={
              "font-normal flex justify-between items-center w-[90%] " +
              (player2.name === "" ? "flex-row-reverse" : "")
            }
          >
            <p
              className={
                "flex items-center gap-1 w-[30%] " +
                (player2.name === "" ? "flex justify-end" : "")
              }
            >
              {player1?.setsWon}{" "}
              {player1.setsWon > player2.setsWon ? (
                <HiMiniTrophy className="text-yellow-600" />
              ) : (
                ""
              )}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              sets (total)
            </p>
            {player2.name !== "" && (
              <div className="flex flex-row-reverse justify-start items-center gap-2 w-[30%]">
                <p>{player2?.setsWon}</p>{" "}
                {player1.setsWon < player2.setsWon ? (
                  <HiMiniTrophy className="text-yellow-600" />
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
