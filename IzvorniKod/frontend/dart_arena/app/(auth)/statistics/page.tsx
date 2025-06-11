"use client";

import ViewMatchesStatistics from "@/app/components/ViewMatchesStatistics";
import { useAuth } from "@/app/context/AuthContext";
import { useGetUser } from "@/app/queries/getUserQuery";
import { useState, useEffect } from "react";
import ViewModeStatistics from "@/app/components/ViewModeStatistics";

export default function Statistics() {
  const { token, logout } = useAuth();
  const [selectedOption, setSelectedOption] = useState("Matches");
  const userQuery = useGetUser();
  const options = ["X01", "Cricket", "Shanghai", "Split Up", "Count Up"];

  useEffect(() => {
    if (!token) return;
  }, []);

  const handleChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

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
      <div className="w-[80%] sm:w-[70%] md:w-[65%] lg:w-[50%] h-full flex flex-col gap-3 pt-[14px]">
        {/* logo traka */}
        <div className="rounded-lg bg-gradient-to-l from-purple-500 to-purple-900 p-[2px]">
          <div
            className="w-full h-[12%] bg-cover flex justify-center items-center rounded-lg"
            style={{ backgroundImage: "url('/images/bg1.png')" }}
          >
            <span className="m-8 font-semibold text-white text-2xl">
              CHECK YOUR PROGRESS
            </span>
          </div>
        </div>
        {/* options to select */}
        <div className="w-full flex justify-center gap-2 text-textColorDark/75 font-semibold text-lg">
          <label className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white flex justify-center items-center w-[15.5%] py-2 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[103%] transition duration-300 cursor-pointer">
            <input
              type="radio"
              className="opacity-0 absolute"
              onChange={handleChange}
              value={"Matches"}
              name="option"
              required
              defaultChecked
            />
            Matches
          </label>
          {options.map((i) => (
            <label
              key={i}
              className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white flex justify-center items-center w-[15.5%] py-2 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[103%] transition duration-300 cursor-pointer"
            >
              <input
                key={i}
                type="radio"
                className="opacity-0 absolute"
                onChange={handleChange}
                value={i}
                name="option"
                required
              />
              {i}
            </label>
          ))}
        </div>
        <div className={"scrollbar-hidden p-4 h-[76vh] items-center bg-modalBg rounded-lg shadow-lg shadow-modalShadow" + (selectedOption === "Matches" ? " overflow-y-auto pt-1" : " flex justify-center items-start pt-7")}>
          {selectedOption === "Matches" && <ViewMatchesStatistics />}
          {selectedOption === "X01" && <ViewModeStatistics mode={"X01"}/>}
          {selectedOption === "Cricket" && <ViewModeStatistics mode={"Cricket"} />}
          {selectedOption === "Shanghai" && <ViewModeStatistics mode={"Shanghai"} />}
          {selectedOption === "Count Up" && <ViewModeStatistics mode={"CountUp"} />}
          {selectedOption === "Split Up" && <ViewModeStatistics mode={"SplitUp"} />}
        </div>
      </div>
    </div>
  );
}
