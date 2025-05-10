import InfoButton from "@/app/components/InfoButton";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { GiTargetArrows } from "react-icons/gi";

export default function Games() {
  const { token, user, logout } = useAuth();

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

  let x01 =
    'X01: This is a series of dart games where players start with a score of 301, 501, or another variant and aim to reduce their score to exactly zero. Players take turns throwing three darts per round, and the goal is to "check out" by finishing with a single, double or triple.';
  let shanghai =
    'Shanghai: In this game, players aim to score points by hitting numbers 1 through 7. In each round, the player must hit the corresponding number in order. A "Shanghai" occurs when a player hits a single, double, and triple of the same number in a single turn.';
  let cricket =
    "Cricket: In Cricket, players aim to hit numbers 15 through 20 and the bullseye three times each. Once a player hits a number three times, it is “closed,” and they can score points by hitting that number again before their opponent.";
  let countup =
    "Count Up: In Count Up, the goal is to score as many points as possible within a set number of turns. Each throw counts towards the player’s total score, and there is no specific target area, unlike games like X01 or Cricket.";
  let splitup =
    "Split Up: In Split Up, each player starts with 40 points and plays 9 rounds. In each round, players throw three darts aiming for a specific target: 15, 16, any double, 17, 18, any triple, 19, 20, and finally the bullseye. Players earn points for every successful hit, with doubles and triples counted as well. However, if a player fails to hit the designated target with any of the three darts in a round, their total score is halved.";

  return (
    <div className="min-h-screen min-w-screen bg-background2 text-textColorDark flex justify-center items-start">
      {/* sadrzaj u sredini */}
      <div className="w-[55%] h-full flex flex-col gap-3 pt-5">
        {/* logo traka */}
        <div className="rounded-lg bg-gradient-to-l from-purple-500 to-purple-900 p-[2px]">
          <div
            className="w-full h-[12%] bg-cover flex justify-center items-center rounded-lg"
            style={{ backgroundImage: "url('./images/bg1.png')" }}
          >
            <span className="m-8 font-semibold text-white text-2xl">
              START NEW GAME
            </span>
          </div>
        </div>
        {/* ostali modali */}
        <div className="flex flex-col gap-3 w-full h-[88%]">
          <div className="flex justify-between items-center p-7 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300">
            <div className="font-semibold text-2xl flex items-center gap-2">
              <GiTargetArrows />
              X01
            </div>
            <div className="w-[50%] flex justify-end">
              <InfoButton text={x01} />
            </div>
          </div>

          <div className="flex justify-between items-center p-7 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300">
            <div className="font-semibold text-2xl flex items-center gap-2">
              <GiTargetArrows />
              CRICKET
            </div>
            <div className="w-[50%] flex justify-end">
              <InfoButton text={cricket} />
            </div>
          </div>

          <div className="flex justify-between items-center p-7 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300">
            <div className="font-semibold text-2xl flex items-center gap-2">
              <GiTargetArrows />
              SHANGHAI
            </div>
            <div className="w-[50%] flex justify-end">
              <InfoButton text={shanghai} />
            </div>
          </div>

          <div className="flex justify-between items-center p-7 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300">
            <div className="font-semibold text-2xl flex items-center gap-2">
              <GiTargetArrows />
              SPLIT UP
            </div>
            <div className="w-[50%] flex justify-end">
              <InfoButton text={splitup} />
            </div>
          </div>

          <div className="flex justify-between items-center p-7 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300">
            <div className="font-semibold text-2xl flex items-center gap-2">
              <GiTargetArrows />
              COUNT UP
            </div>
            <div className="w-[50%] flex justify-end">
              <InfoButton text={countup} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
