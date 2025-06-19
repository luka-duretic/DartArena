"use client";

import { useEffect, useState } from "react";
import { fetchUserByEmail } from "../helpers/fetchFunctions";
import { FaRegUser } from "react-icons/fa";
import { useGetUser } from "../queries/getUserQuery";
import MatchStats from "./stats-modals/MatchStats";

export default function MatchModal({ match }: any) {
  const [player1, setPlayer1] = useState({
    name: match.userEmail[0] || "",
    imgUrl: "",
    average3Darts: match.average3Darts[0] || 0.0,
    checkoutDartsAverage: match.checkoutDartsAverage[0] || 0.0,
    checkoutPercentage: match.checkoutPercentage[0] || 0.0,
    legsWon: match.legsWon[0] || 0,
    setsWon: match.setsWon[0] || 0,
    score60Plus: match.score60Plus[0] || 0,
    score100Plus: match.score100Plus[0] || 0,
    score140Plus: match.score140Plus[0] || 0,
    score170Plus: match.score170Plus[0] || 0,
  });
  const [player2, setPlayer2] = useState({
    name: match.userEmail[1] || "",
    imgUrl: "",
    average3Darts: match.average3Darts[1] || 0.0,
    checkoutDartsAverage: match.checkoutDartsAverage[1] || 0.0,
    checkoutPercentage: match.checkoutPercentage[1] || 0.0,
    legsWon: match.legsWon[1] || 0,
    setsWon: match.setsWon[1] || 0,
    score60Plus: match.score60Plus[1] || 0,
    score100Plus: match.score100Plus[1] || 0,
    score140Plus: match.score140Plus[1] || 0,
    score170Plus: match.score170Plus[1] || 0,
  });
  const userQuery = useGetUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updatePlayers = async () => {
      if (match.userEmail[1].includes("@")) {
        const data = await fetchUserByEmail(match.userEmail[1]);
        setPlayer2({
          ...player2,
          name: data?.nickName,
          imgUrl: data?.profileImgURL,
        });
      } else {
        setPlayer2({
          ...player2,
          name: match.subprofile,
          average3Darts: "/",
          checkoutDartsAverage: "/",
          checkoutPercentage: "/",
          score60Plus: "/",
          score100Plus: "/",
          score140Plus: "/",
          score170Plus: "/",
        });
      }
    };

    setPlayer1({
      ...player1,
      name: userQuery.data?.nickName,
      imgUrl: userQuery.data?.profileImgURL,
    });

    updatePlayers();
  }, [userQuery.isFetched]);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-background/60 hover:scale-[102%] transition duration-300 p-5 flex justify-between rounded-lg w-full h-full"
      >
        <div className="w-[32%] flex flex-col gap-2 justify-center items-center">
          {userQuery.data.profileImgURL ? (
            <img
              src={userQuery.data.profileImgURL}
              alt="profile picture"
              className="object-cover h-12 w-12 sm:h-16 sm:w-16 border-2 border-indigo-600 rounded-full p-0 m-0"
            />
          ) : (
            <FaRegUser className="p-1 h-12 w-12 sm:h-16 sm:w-16 text-indigo-500 border-4 border-indigo-500 rounded-full" />
          )}
          <p className="font-semibold text-sm sm:text-lg">{userQuery.data.nickName}</p>
        </div>
        {player2.name !== "" ? (
          <div className="w-[27%] font-bold flex flex-col justify-between items-center text-xl">
            <p className="-mt-5 bg-modalBg/50 rounded-bl-lg rounded-br-lg py-1 px-3 text-lg">
              {match.gameMode}
            </p>
            <div className="w-full flex justify-between items-center">
              <p className="text-2xl sm:text-3xl">{player1.setsWon}</p>
              <p className="text-base mx-2 sm:mx-0 sm:text-xl">H2H</p>
              <p className="text-2xl sm:text-3xl">{player2.setsWon}</p>
            </div>
            <p className="opacity-0">fake</p>
          </div>
        ) : (
          <div className="w-[59%] bg-amber-00 font-bold -mt-4 flex flex-col gap-1 justify-end items-end text-xl ">
            <p className="w-[10rem] sm:w-[13rem] flex justify-center bg-modalBg/50 rounded-lg py-1 text-sm sm:text-lg">
              MODE: {match?.gameMode}
            </p>
            <p className="w-[10rem] sm:w-[13rem] flex justify-center bg-modalBg/50 rounded-lg py-1 text-sm sm:text-lg">
              SETS: {player1.setsWon}
            </p>
            <p className="w-[10rem] sm:w-[13rem] flex justify-center bg-modalBg/50 rounded-lg py-1 text-sm sm:text-lg">
              AVG: {player1.average3Darts}
            </p>
          </div>
        )}
        {player2.name !== "" && (
          <div className="w-[32%] flex flex-col gap-2 justify-center items-center">
            {player2.imgUrl ? (
              <img
                src={player2.imgUrl}
                alt="profile picture"
                className="object-cover h-12 w-12 sm:h-16 sm:w-16 border-2 border-indigo-600 rounded-full p-0 m-0"
              />
            ) : (
              <FaRegUser className="p-1 h-12 w-12 sm:h-16 sm:w-16 text-indigo-500 border-4 border-indigo-500 rounded-full" />
            )}
            <p className="font-semibold text-sm sm:text-lg">{player2.name}</p>
          </div>
        )}
      </div>
      {open && (
        <MatchStats player1={player1} player2={player2} setOpen={setOpen} />
      )}
    </>
  );
}
