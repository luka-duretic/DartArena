"use client";

import InfoButton2 from "@/app/components/btn-layout-sliders/InfoButton2";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import GameStart from "@/app/components/games-modals/GameStart";
import { useGetUser } from "@/app/queries/getUserQuery";
import { useGameSettings } from "@/app/settings/GameSettings";
import { useRouter } from "next/navigation";

export default function StartSplitUpPage() {
  const { token } = useAuth();
  const userQuery = useGetUser();
  const [formData, setFormData] = useState({
    legs: 1,
    sets: 1,
    points: 40,
    mode: "training",
    players: [userQuery.data?.email],
    startPlayerNum: 1,
  });
  const leg_set_number = Array.from({ length: 35 }, (_, i) => i + 1);
  const setSettings = useGameSettings((state) => state.setSettings);
  const router = useRouter();
  const clean = [
    "history",
    "game-settings",
    "end",
    "match",
    "validate",
    "round",
  ];

  useEffect(() => {
    for (let s of clean) {
      localStorage.removeItem(s);
    }

    if (!token) return;
  }, []);

  useEffect(() => {
    setFormData({ ...formData, ["players"]: [userQuery.data?.email] });
  }, [userQuery.data?.email]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSettings = (e: any) => {
    setFormData({ ...formData, ["players"]: e.players });
  };

  const handleStart = (e: any) => {
    e.preventDefault();
    console.log(formData);

    if (formData.players.length !== 2 && formData.mode === "duel") {
      alert("Select your opponent");
    } else {
      alert("Begin your match");

      setSettings({
        players:
          formData.players.length === 1
            ? [...formData.players, ""]
            : formData.players,
        mode: formData.mode,
        points: 40,
        legs: formData.legs,
        sets: formData.sets,
        startPlayerNum: formData.startPlayerNum,
      });

      router.push("/games/splitUp");
    }
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
      <div className="w-[80%] sm:w-[70%] md:w-[65%] lg:w-[50%] h-full flex flex-col gap-3 pt-5">
        {/* logo traka */}
        <div className="rounded-lg bg-gradient-to-l from-purple-500 to-purple-900 p-[2px]">
          <div
            className="w-full h-[12%] bg-cover flex justify-center items-center rounded-lg"
            style={{ backgroundImage: "url('../images/bg1.png')" }}
          >
            <span className="m-8 font-semibold text-white text-2xl">
              SETUP NEW SPLIT UP MATCH
            </span>
          </div>
        </div>
        {/* ostali modali */}
        <div className="flex flex-col gap-3 w-full h-[88%]">
          <GameStart
            userInfo={userQuery.data}
            formData={formData}
            handleChange={handleChange}
            handleSettings={handleSettings}
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
            <div className="flex gap-3 justify-around items-center mt-2 w-[82%]">
              <div className="flex w-full">
                <div className="hidden md:block bg-modalBg rounded-tl-lg rounded-bl-lg text-textColorDark border-[1.2px] border-textColorDark/60 p-2 w-[86%]">
                  Number of legs
                </div>
                <div className="block md:hidden bg-modalBg rounded-tl-lg rounded-bl-lg text-textColorDark border-[1.2px] border-textColorDark/60 p-2 w-[86%]">
                  Legs
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
              <div className="flex w-full">
                <div className="hidden md:block bg-modalBg rounded-tl-lg rounded-bl-lg text-textColorDark border-[1.2px] border-textColorDark/60 p-2 w-[86%]">
                  Number of sets
                </div>
                <div className="block md:hidden bg-modalBg rounded-tl-lg rounded-bl-lg text-textColorDark border-[1.2px] border-textColorDark/60 p-2 w-[86%]">
                  Sets
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
            </div>
            <form
              id="myForm"
              onSubmit={handleStart}
              className="flex flex-col gap-4 w-full"
            >
              {!(formData.mode === "training") && (
                <div className="relative flex justify-center items-center gap-3">
                  <label className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white text-textColorDark bg-modalBg border-[1.5px] border-textColorDark rounded-lg w-[26.5%] h-10 flex justify-center items-center transition duration-250">
                    <input
                      type="radio"
                      className="opacity-0 absolute"
                      onChange={handleChange}
                      name="startPlayerNum"
                      value={1}
                      required
                    />
                    Player1
                  </label>
                  <label className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white text-textColorDark bg-modalBg border-[1.5px] border-textColorDark rounded-lg w-[26.5%] h-10 flex justify-center items-center transition duration-250">
                    <input
                      type="radio"
                      className="opacity-0 absolute"
                      onChange={handleChange}
                      name="startPlayerNum"
                      value={2}
                      required
                    />
                    Player 2
                  </label>
                  <div className="w-10 absolute top-[18%] right-[0%]">
                    <InfoButton2 text={"Select who starts first."} />
                  </div>
                </div>
              )}
            </form>
          </div>
          <button
            type="submit"
            form="myForm"
            className="font-semibold text-xl text-white bg-teal-500 hover:bg-teal-600 ease-in-out rounded-lg shadow-lg shadow-modalShadow p-[10px] cursor-pointer hover:scale-[102.5%] transition duration-300"
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}
