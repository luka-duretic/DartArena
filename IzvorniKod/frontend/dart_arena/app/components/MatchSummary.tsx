"use client";

import { HiMiniTrophy, HiUserCircle } from "react-icons/hi2";
import { submitMatchData } from "@/app/helpers/fetchFunctions";
import { useRouter } from "next/navigation";

export default function MatchSummary({
  player1,
  player2,
  formData,
  gameSettings,
  setValidate,
  back,
}: any) {
  const router = useRouter();

  return (
    <div className="inset-0 fixed bg-black/30 backdrop-blur-sm z-30 text-textColorDark flex flex-col gap-2 justify-center items-center">
      <div
        className={
          "zoom-in-bounce w-[80%] sm:w-[70%] md:w-[65%] lg:w-[50%] flex flex-col items-center gap-4 py-4 px-6 bg-modalBg rounded-xl shadow-lg shadow-modalShadow" +
          (player2.name === "" ? " h-[42.5rem]" : " h-[40.5rem]")
        }
      >
        <div className="w-full flex justify-center items-center font-bold text-xl">
          MATCH SUMMARY
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
            <p>{player1.name.toUpperCase()}</p>
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
              <p>{player2.name.toUpperCase()}</p>
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
              {formData?.average3Darts[0]}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              3 darts avg.
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {formData?.average3Darts[1]}
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
              {formData?.checkoutDartsAverage[0]}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              check. darts avg.
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {formData?.checkoutDartsAverage[1]}
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
              {formData?.checkoutPercentage[0]}%
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              checkout %
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {formData?.checkoutPercentage[1]}%
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
              {formData?.score60Plus[0]}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              60+.
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {formData?.score60Plus[1]}
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
              {formData?.score100Plus[0]}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              100+
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {formData?.score100Plus[1]}
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
              {formData?.score140Plus[0]}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              140+
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {formData?.score140Plus[1]}
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
              {formData?.score170Plus[0]}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              170+
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">
                {formData?.score170Plus[1]}
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
              {formData?.legsWon[0]}
            </p>
            <p className="bg-textColorDark/5 w-33 py-[6px] rounded-md flex justify-center">
              legs (total)
            </p>
            {player2.name !== "" && (
              <p className="w-[30%] flex justify-end">{formData?.legsWon[1]}</p>
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
              {formData?.setsWon[0]}{" "}
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
                <p>{formData?.setsWon[1]}</p>{" "}
                {player1.setsWon < player2.setsWon ? (
                  <HiMiniTrophy className="text-yellow-600" />
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
        {/* submit */}
        {gameSettings.players[1].includes("@") && (
          <button
            onClick={() => {
              setValidate(true);
              localStorage.setItem("validate", "true");
            }}
            className="cursor-pointer bg-teal-700 hover:bg-teal-800 hover:scale-105 transition duration-300 rounded-xl text-lg text-white font-semibold w-33 py-2"
          >
            submit match
          </button>
        )}
        {!gameSettings.players[1].includes("@") && (
          <button
            onClick={() => submitMatchData(formData, back, router)}
            className="cursor-pointer bg-teal-700 hover:bg-teal-800 hover:scale-105 transition duration-300 rounded-xl text-lg text-white font-semibold w-33 py-2"
          >
            submit match
          </button>
        )}
      </div>
    </div>
  );
}
