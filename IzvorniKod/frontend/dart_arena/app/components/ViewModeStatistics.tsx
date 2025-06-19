"use client";

import { useState } from "react";
import { useGetAllStats } from "../queries/getStatsAllGamesQuery";
import { ScoreLineChart } from "./charts/ScoreLineChart";
import { AvgCheckLineChart } from "./charts/AvgCheckLineChart";
import { useRouter } from "next/navigation";

export default function ViewModeStatistics({ mode }: any) {
  const [option, setOption] = useState("averages");
  const statsQuery = useGetAllStats(mode);
  const router = useRouter();

  if (statsQuery.isLoading) {
    return (
      <div className="absolute top-[50%] left-[50%] text-textColorDark flex flex-col justify-center items-center gap-2">
        <div>Loading...</div>
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  if(!statsQuery.data || !statsQuery.data.dates || statsQuery.data.dates.length === 0){
    return (
      <div className="h-full text-textColorDark flex flex-col justify-center items-center gap-2">
        No mode matches played yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4 w-full px-3">
      {mode === "X01" || mode === "CountUp" ? (
        <div className="bg-background/40 rounded-xl shadow-modalShadow shadow-2xl p-4 pl-0 flex justify-center items-center w-full">
          {option === "averages" && (
            <AvgCheckLineChart data={statsQuery.data} />
          )}
          {option === "scores" && <ScoreLineChart data={statsQuery.data} />}
        </div>
      ) : (
        <div className="bg-background/40 rounded-xl shadow-modalShadow shadow-2xl p-4 pl-0 flex justify-center items-center w-full">
          <AvgCheckLineChart data={statsQuery.data} />
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between h-full items-end w-full">
        <div className="flex gap-2 justify-between sm:justify-start w-full">
          <label className={
              (mode === "X01" || mode === "CountUp"
                ? "has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white bg-modalBg"
                : "bg-indigo-500 text-white") +
              " flex justify-center items-center w-[7rem] py-2 rounded-lg shadow-lg shadow-modalShadow hover:scale-[103%] transition duration-300 cursor-pointer"
            }>
            <input
              type="radio"
              className="opacity-0 absolute"
              onChange={() => setOption("averages")}
              value={"charts"}
              name="chartOpt"
              required
              defaultChecked
            />
            Average
          </label>
          <label
            className={
              (mode === "X01" || mode === "CountUp"
                ? "has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white"
                : "") +
              " flex justify-center items-center w-[7rem] py-2 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[103%] transition duration-300 cursor-pointer"
            }
          >
            <input
              type="radio"
              className="opacity-0 absolute"
              onChange={
                mode === "X01" || mode === "CountUp"
                  ? () => setOption("scores")
                  : () => console.log("Forbidden")
              }
              value={"charts"}
              name="chartOpt"
              required
            />
            {mode === "X01" || mode === "CountUp" ? "Score" : "Forbidden"}
          </label>
        </div>
        <div
          onClick={() => router.push("/games/start" + mode)}
          className="flex justify-center items-center w-full sm:w-[15rem] py-2 bg-indigo-500 text-white rounded-lg shadow-lg shadow-modalShadow hover:scale-[103%] transition duration-300 cursor-pointer"
        >
          Start {mode} match
        </div>
      </div>
    </div>
  );
}
