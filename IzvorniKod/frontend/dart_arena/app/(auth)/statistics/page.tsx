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
  const options1 = ["X01", "Cricket"];
  const options2 = ["Shanghai", "Split Up", "Count Up"];

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
      <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[55%] h-full flex flex-col gap-3 pt-[14px]">
        {/* logo traka */}
        <div className="opacity-0 xs:opacity-100 rounded-lg bg-gradient-to-l from-purple-500 to-purple-900 p-[2px]">
          <div
            className="w-full h-[2.5rem] xs:h-[6.4rem] bg-cover flex justify-center items-center rounded-lg"
            style={{ backgroundImage: "url('/images/bg1.png')" }}
          >
            <span className="m-8 font-semibold text-white text-2xl">
              CHECK YOUR PROGRESS
            </span>
          </div>
        </div>
        {/* options to select */}
        <div className="w-full flex flex-wrap justify-center gap-2 text-textColorDark/75 font-semibold text-base sm:text-lg">
          <div className="flex gap-2 w-full sm:w-[48%]">
            <label className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white flex justify-center items-center w-[32%] py-2 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[103%] transition duration-300 cursor-pointer">
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
            {options1.map((i) => (
              <label
                key={i}
                className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white flex justify-center items-center w-[32%] py-2 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[103%] transition duration-300 cursor-pointer"
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
          <div className="flex gap-2 w-full sm:w-[48%]">
            {options2.map((i) => (
              <label
                key={i}
                className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white flex justify-center items-center w-[32%] py-2 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[103%] transition duration-300 cursor-pointer"
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
        </div>
        <div
          className={
            "scrollbar-hidden p-4 px-1 sm:px-4 items-center bg-modalBg rounded-lg shadow-lg shadow-modalShadow" +
            (selectedOption === "Matches"
              ? " overflow-y-auto pt-1 h-[35rem] sm:h-[40rem]"
              : " flex justify-center items-start pt-7 h-[40rem]")
          }
        >
          {selectedOption === "Matches" && <ViewMatchesStatistics />}
          {selectedOption === "X01" && <ViewModeStatistics mode={"X01"} />}
          {selectedOption === "Cricket" && (
            <ViewModeStatistics mode={"Cricket"} />
          )}
          {selectedOption === "Shanghai" && (
            <ViewModeStatistics mode={"Shanghai"} />
          )}
          {selectedOption === "Count Up" && (
            <ViewModeStatistics mode={"CountUp"} />
          )}
          {selectedOption === "Split Up" && (
            <ViewModeStatistics mode={"SplitUp"} />
          )}
        </div>
      </div>
    </div>
  );
}
