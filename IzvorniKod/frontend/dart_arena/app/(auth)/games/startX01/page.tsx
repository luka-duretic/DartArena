"use client";

import InfoButton from "@/app/components/InfoButton";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import GameStart from "@/app/components/GameStart";

export default function StartX01Page() {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    legs: 1,
    sets: 1,
    points: 180,
    mode: "training",
  });
  const points = [180, 301, 501, 701, 901];
  const start = ["Single in", "Double in", "Master in"];
  const finish = ["Single out", "Double out", "Master out"];
  const leg_set_number = Array.from({ length: 35 }, (_, i) => i + 1);

  useEffect(() => {
    if (!token) return;
  }, []);

  if (!user) {
    return (
      <div className="absolute top-[50%] left-[50%] text-textColorDark flex flex-col justify-center items-center gap-2">
        <div>Loading...</div>
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // DOVRSI
  const handleSubmit = () => {
    console.log(formData);
    alert("Success");
  };

  return (
    <div className="min-h-screen min-w-screen bg-background2 text-textColorDark flex justify-center items-start">
      {/* sadrzaj u sredini */}
      <div className="w-[50%] h-full flex flex-col gap-3 pt-5">
        {/* logo traka */}
        <div className="rounded-lg bg-gradient-to-l from-purple-500 to-purple-900 p-[2px]">
          <div
            className="w-full h-[12%] bg-cover flex justify-center items-center rounded-lg"
            style={{ backgroundImage: "url('../images/bg1.png')" }}
          >
            <span className="m-8 font-semibold text-white text-2xl">
              SETUP NEW X01 MATCH
            </span>
          </div>
        </div>
        {/* ostali modali */}
        <div className="flex flex-col gap-3 w-full h-[88%]">
          <GameStart
            userInfo={user}
            formData={formData}
            handleChange={handleChange}
          />
          <div className="flex flex-col gap-4 justify-between items-center p-5 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300">
            <div className="flex gap-2 items-center w-full">
              <div className="p-2 rounded-full bg-background2">
                <LuSettings2 className="text-textColorDark w-6 h-6" />
              </div>
              <span className="text-textColorDark font-semibold text-xl">
                GAME SETTINGS
              </span>
            </div>
            {/* legs/sets odabir */}
            <div className="flex gap-2 justify-around items-center mt-2 w-[82%]">
              <div className="flex">
                <div className="bg-modalBg rounded-tl-lg rounded-bl-lg text-textColorDark border-[1.2px] border-textColorDark/60 p-2 w-35">
                  Number of legs
                </div>
                <select
                  name="legs"
                  className="form-select bg-textColorDark/55 rounded-tr-lg rounded-br-lg text-white p-2 w-15 border-[1px] border-textColorDark/55"
                  onChange={handleChange}
                >
                  {leg_set_number.map((i) => (
                    <option key={i} className="p-2">
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex">
                <div className="bg-modalBg rounded-tl-lg rounded-bl-lg text-textColorDark border-[1.2px] border-textColorDark/60 p-2 w-35">
                  Number of sets
                </div>
                <select
                  name="sets"
                  className="form-select bg-textColorDark/55 rounded-tr-lg rounded-br-lg text-white p-2 w-15 border-[1px] border-textColorDark/55"
                  onChange={handleChange}
                >
                  {leg_set_number.map((i) => (
                    <option key={i} className="p-2 w-50">
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex">
                <div className="bg-modalBg rounded-tl-lg rounded-bl-lg text-textColorDark border-[1.2px] border-textColorDark/60 p-2 w-30">
                  X01 points
                </div>
                <select
                  name="points"
                  className="form-select bg-textColorDark/55 rounded-tr-lg rounded-br-lg text-white p-2 w-18 border-[1px] border-textColorDark/55"
                  onChange={handleChange}
                >
                  {points.map((i) => (
                    <option key={i} className="p-2">
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* in gumbi */}
            <div className="relative flex justify-center items-center gap-2">
              <div className="w-40 absolute top-[18%] left-[-27%]">
                <InfoButton text={"Leg start mode."} />
              </div>
              {start.map((i) => (
                <label
                  key={i}
                  className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white text-textColorDark bg-modalBg border-[1.5px] border-textColorDark rounded-lg w-50 h-9 flex justify-center items-center transition duration-250"
                >
                  <input
                    key={i + i}
                    type="radio"
                    className="opacity-0 absolute"
                    onChange={handleChange}
                    name="start"
                    value={i}
                    required
                  />
                  {i}
                </label>
              ))}
            </div>
            {/* out gumbi */}
            <div className="relative flex justify-center items-center gap-2">
              <div className="w-40 absolute top-[18%] left-[-27%]">
                <InfoButton text={"Leg finish mode."} />
              </div>
              {finish.map((i) => (
                <label
                  key={i}
                  className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white text-textColorDark bg-modalBg border-[1.5px] border-textColorDark rounded-lg w-50 h-9 flex justify-center items-center transition duration-250"
                >
                  <input
                    key={i + i}
                    type="radio"
                    className="opacity-0 absolute"
                    onChange={handleChange}
                    name="finish"
                    value={i}
                    required
                  />
                  {i}
                </label>
              ))}
            </div>
          </div>
          <button
            className="font-semibold text-xl text-white bg-teal-500 hover:bg-teal-600 ease-in-out rounded-lg shadow-lg shadow-modalShadow p-[10px] cursor-pointer hover:scale-[102.5%] transition duration-300"
            onClick={handleSubmit}
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}
