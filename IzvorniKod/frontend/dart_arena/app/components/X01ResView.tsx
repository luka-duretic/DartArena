"use client";

import { FaRegUser } from "react-icons/fa";
import { GiArrowFlights, GiDart } from "react-icons/gi";

export default function X01ResView({ gameSettings, player1, player2, end }: any) {
  return (
    <>
      <div className="w-full flex justify-center text-textColorDark font-medium animate-bounce">
        FIRST TO{" "}
        {gameSettings.sets > 1
          ? gameSettings.sets +
            ` SETS (win ${gameSettings.legs} ` +
            (gameSettings.legs === 1 ? `leg` : `legs`) +
            ` for 1 set)`
          : `${gameSettings.legs} ` +
            (gameSettings.legs === 1 ? `LEG` : `LEGS`)}
      </div>
      {/* modal za rezultat */}
      <div className="flex flex-col gap-3 p-5 pt-3 bg-modalBg rounded-xl shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300">
        {gameSettings.mode === "duel" ? (
          <div className="w-full flex h-[4rem]">
            {/* players names */}
            <div className="w-[40%] flex justify-between items-center">
              <div className="w-10">
                {player1.onTurn && (
                  <GiDart className="h-6 w-6 text-indigo-500" />
                )}
              </div>
              <div className="text-textColorDark font-semibold">
                {player1.name.toUpperCase()}
              </div>
              <div className="opacity-0 w-10">hidden</div>
            </div>
            <div className="w-[20%] bg-background2/40 rounded-xl p-2 flex flex-col gap-2 justify-center items-center text-textColorDark font-semibold">
              <div className="flex flex-row justify-around w-full">
                <p>{player1.setsWon}</p>
                <p>SETS</p>
                <p>{player2.setsWon}</p>
              </div>
              <div className="flex flex-row justify-around w-full">
                <p>{player1.legsWon}</p>
                <p>LEGS</p>
                <p>{player2.legsWon}</p>
              </div>
            </div>
            <div className="w-[40%] flex flex-row-reverse justify-between items-center">
              <div className="w-10">
                {player2.onTurn && (
                  <GiDart className="h-6 w-6 text-indigo-500" />
                )}
              </div>
              <div className="text-textColorDark font-semibold">
                {player2.name.toUpperCase()}
              </div>
              <div className="opacity-0 w-10">hidden</div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center text-textColorDark font-semibold">
            <div className="w-full flex justify-center items-center gap-3">
              <div className="bg-background2/40 rounded-xl p-2 px-3 flex justify-center items-center text-textColorDark">
                {player1.name.toUpperCase()}
              </div>
              <div className="bg-background2/40 rounded-xl p-2 px-3 flex justify-center items-center text-textColorDark">
                SETS: {player1.setsWon}
              </div>
              <div className="bg-background2/40 rounded-xl p-2 px-3 flex justify-center items-center text-textColorDark">
                LEGS: {player1.legsWon}
              </div>
            </div>
          </div>
        )}
        {/* player image and score */}
        <div className="w-full flex justify-center items-center gap-3">
          <div
            className={
              "h-[18rem] flex flex-col gap-5 items-center justify-center bg-background2/40 rounded-xl" +
              (gameSettings.mode === "duel" ? " w-[50%]" : " w-full")
            }
          >
            {player1.imgUrl ? (
              <img
                src={player1.imgUrl}
                alt="profile picture"
                className="object-cover h-20 w-20 border-2 border-indigo-600 rounded-full p-0 m-0"
              />
            ) : (
              <FaRegUser className="p-1 h-20 w-20 text-indigo-500 border-4 border-indigo-500 rounded-full" />
            )}
            <div className="flex text-textColorDark font-semibold justify-around items-center w-[80%]">
              <div className="flex gap-2">
                <GiArrowFlights className="h-5 w-5" />
                <p>({player1.dartsUsed})</p>
              </div>
              <div>avg: {player1.threeDartAverage}</div>
            </div>
            <div className={"text-7xl font-semibold" + (end ? " text-teal-200" : " text-teal-500")}>
              {player1.score}
            </div>
          </div>
          {gameSettings.mode === "duel" && (
            <div className="w-[50%] h-[18rem] flex flex-col gap-5 items-center justify-center bg-background2/40 rounded-xl">
              {player2.imgUrl ? (
                <img
                  src={player2.imgUrl}
                  alt="profile picture"
                  className="object-cover h-20 w-20 border-2 border-indigo-600 rounded-full p-0 m-0"
                />
              ) : (
                <FaRegUser className="p-1 h-20 w-20 text-indigo-500 border-4 border-indigo-500 rounded-full" />
              )}
              <div className="flex text-textColorDark font-semibold justify-around items-center w-[80%]">
                <div className="flex gap-2">
                  <GiArrowFlights className="h-5 w-5" />
                  <p>({player2.dartsUsed})</p>
                </div>
                <div>avg: {player2.threeDartAverage}</div>
              </div>
              <div className={"text-7xl font-semibold" + (end ? " text-teal-200" : " text-teal-500")}>
                {player2.score}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
