"use client";

import { apiCall } from "@/api";
import MatchSummary from "@/app/components/MatchSummary";
import ValidateOpponent from "@/app/components/ValidateOpponent";
import X01ResView from "@/app/components/X01ResView";
import { initialGameSettings, initialPlayer } from "@/app/constants/initalMatchObjects";
import { calculateNewAverage } from "@/app/helpers/avgFunction";
import {
  calculatecheckoutDartsAverage,
  calculateCheckoutPercentage,
  totalLegsWon,
} from "@/app/helpers/checkoutFunctions";
import { fetchUserByEmail, submitMatchData } from "@/app/helpers/fetchFunctions";
import setPlayers from "@/app/helpers/setPlayers";
import { handleUndo } from "@/app/helpers/undoHistory";
import { Match } from "@/app/interfaces/match";
import { Pair } from "@/app/interfaces/player";
import { useGetUser } from "@/app/queries/getUserQuery";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrUndo } from "react-icons/gr";

export default function X01() {
  const [gameSettings, setGameSettings] = useState(initialGameSettings);
  const [player1, setPlayer1] = useState(initialPlayer);
  const [player2, setPlayer2] = useState(initialPlayer);
  const [history, setHistory] = useState<Pair[]>([]);
  const [formData, setFormdata] = useState<Match>();
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const userQuery = useGetUser();
  const [userInput, setUserInput] = useState("0");
  const [end, setEnd] = useState(false);
  const router = useRouter();
  const points_forbidden = [
    "163",
    "166",
    "169",
    "172",
    "173",
    "175",
    "176",
    "178",
    "179",
  ];
  const DO_forbiden = ["162", "165", "168", "159"];
  const DI_forbiden = ["1"];
  const MI_forbiden = ["1", "2"];
  const [validate, setValidate] = useState(false);
  const [passwdErr, setPasswdErr] = useState("");
  const [passwd, setPasswd] = useState("");

  useEffect(() => {
    const init = async () => {
      const settings = localStorage.getItem("game-settings");
      const histLocStor = localStorage.getItem("history");
      const endLocStor = localStorage.getItem("end");
      const matchLocStor = localStorage.getItem("match");
      const validateLocStor = localStorage.getItem("validate");

      if (endLocStor === "true") setEnd(true);

      if (validateLocStor === "true") setValidate(true);

      if (matchLocStor) setFormdata(JSON.parse(matchLocStor));

      if (localStorage.length < 3) {
        router.push("/games/startX01");
      }

      let hist: Pair[] = [];
      if (histLocStor) {
        hist = JSON.parse(histLocStor);
        setHistory(hist);
      }

      if (settings && userQuery.isFetched) {
        const settingsJSON = JSON.parse(settings).state;
        let newPlayer1;
        let newPlayer2;
        const historyLast = hist[hist.length - 1];

        setGameSettings(settingsJSON);
        newPlayer1 = {
          ...player1,
          ["name"]: historyLast?.playerFirst.name || userQuery.data.nickName,
          ["imgUrl"]:
            historyLast?.playerFirst.imgUrl || userQuery.data.profileImgURL,
          ["score"]: historyLast?.playerFirst.score || settingsJSON.points,
          ["threeDartAverage"]:
            historyLast?.playerFirst.threeDartAverage || 0.0,
          ["dartsUsed"]: historyLast?.playerFirst.dartsUsed || 0,
          ["onTurn"]:
            historyLast?.playerFirst.onTurn ||
            (Number(settingsJSON.startPlayerNum) === 1 ? true : false),
          ["legsWon"]: historyLast?.playerFirst.legsWon || 0,
          ["setsWon"]: historyLast?.playerFirst.setsWon || 0,
          ["dartsUsedPerLeg"]:
            historyLast?.playerFirst.dartsUsedPerLeg ||
            ([] as [number, boolean][]),
          ["score60Plus"]: historyLast?.playerFirst.score60Plus || 0,
          ["score100Plus"]: historyLast?.playerFirst.score100Plus || 0,
          ["score140Plus"]: historyLast?.playerFirst.score140Plus || 0,
          ["score170"]: historyLast?.playerFirst.score170 || 0,
          ["score170Plus"]: historyLast?.playerFirst.score170Plus || 0,
          ["score180"]: historyLast?.playerFirst.score180 || 0,
        };
        setPlayer1(newPlayer1); // prvi user sam uvijek ja, nebitno o treningu/duelu

        // dohvati user-a ako je duel i ako nije subprofil
        if (
          settingsJSON.mode == "duel" &&
          settingsJSON.players[1].includes("@")
        ) {
          const data = await fetchUserByEmail(settingsJSON.players[1]);

          if (data !== "error") {
            newPlayer2 = {
              ...player2,
              ["name"]: historyLast?.playerSecond.name || data.nickName,
              ["imgUrl"]:
                historyLast?.playerSecond.imgUrl || data.profileImgURL,
              ["score"]: historyLast?.playerSecond.score || settingsJSON.points,
              ["threeDartAverage"]:
                historyLast?.playerSecond.threeDartAverage || 0.0,
              ["dartsUsed"]: historyLast?.playerSecond.dartsUsed || 0,
              ["onTurn"]:
                historyLast?.playerSecond.onTurn ||
                (Number(settingsJSON.startPlayerNum) === 2 ? true : false),
              ["legsWon"]: historyLast?.playerSecond.legsWon || 0,
              ["setsWon"]: historyLast?.playerSecond.setsWon || 0,
              ["dartsUsedPerLeg"]:
                historyLast?.playerSecond.dartsUsedPerLeg ||
                ([] as [number, boolean][]),
              ["score60Plus"]: historyLast?.playerSecond.score60Plus || 0,
              ["score100Plus"]: historyLast?.playerSecond.score100Plus || 0,
              ["score140Plus"]: historyLast?.playerSecond.score140Plus || 0,
              ["score170"]: historyLast?.playerSecond.score170 || 0,
              ["score170Plus"]: historyLast?.playerSecond.score170Plus || 0,
              ["score180"]: historyLast?.playerSecond.score180 || 0,
            };
            setPlayer2(newPlayer2);
          }
        } else if (
          settingsJSON.mode === "duel" &&
          !settingsJSON.players[1].includes("@")
        ) {
          newPlayer2 = {
            ...player2,
            ["name"]: historyLast?.playerSecond.name || settingsJSON.players[1],
            ["score"]: historyLast?.playerSecond.score || settingsJSON.points,
            ["threeDartAverage"]:
              historyLast?.playerSecond.threeDartAverage || 0.0,
            ["dartsUsed"]: historyLast?.playerSecond.dartsUsed || 0,
            ["onTurn"]:
              historyLast?.playerSecond.onTurn ||
              (settingsJSON.startPlayerNum == 2 ? true : false),
            ["legsWon"]: historyLast?.playerSecond.legsWon || 0,
            ["setsWon"]: historyLast?.playerSecond.setsWon || 0,
            ["dartsUsedPerLeg"]:
              historyLast?.playerSecond.dartsUsedPerLeg ||
              ([] as [number, boolean][]),
          };
          setPlayer2(newPlayer2);
        }

        if (newPlayer1 && hist.length < 1) {
          if (newPlayer2) {
            setHistory([{ playerFirst: newPlayer1, playerSecond: newPlayer2 }]);
          } else {
            setHistory([{ playerFirst: newPlayer1, playerSecond: player2 }]);
          }
        }
      }
    };

    init();
  }, [userQuery.data]);

  useEffect(() => {
    const historyLast = history[history.length - 1];

    if (!historyLast) return;

    setPlayer1(setPlayers(historyLast?.playerFirst, player1));
    setPlayer2(setPlayers(historyLast?.playerSecond, player2));
  }, [history]);

  // ako je u inputu samo 0, makni i stavi broj, a inace
  // samo zalijepi broj na to ako nije ukupno vece od 180
  const handleInput = (number: any) => {
    if (userInput === "0") {
      const isDoubleIn = gameSettings.legStart === "Double in";
      const isMasterIn = gameSettings.legStart === "Master in";

      if (isDoubleIn && DI_forbiden.includes(number+"")) return;
      if (isMasterIn && MI_forbiden.includes(number+"")) return;
      setUserInput(number + "");
    } else {
      if (Number(userInput + number) < 181) {
        const totalInput = userInput + number;
        const totalInputNum = Number(totalInput);
        const isSingleOut = gameSettings.legFinish === "Single out";
        const isDoubleOut = gameSettings.legFinish === "Double out";
        const isNotForbiddenPoints = !points_forbidden.includes(totalInput);
        const isNotForbiddenDoubleOut = !DO_forbiden.includes(totalInput);

        if (!isNotForbiddenPoints) return;
        if (player1.onTurn) {
          const remainingScore = Number(player1.score) - totalInputNum;
          const isNotOneLeft = remainingScore !== 1;
          const isExactFinish = remainingScore === 0;

          if (totalInputNum > Number(player1.score)) return;
          if (!isSingleOut && !isNotOneLeft) return;
          if (isDoubleOut) {
            if (isExactFinish && !isNotForbiddenDoubleOut) return;
          }
          setUserInput(userInput + "" + number);
        }
        if (player2.onTurn) {
          const remainingScore = Number(player2.score) - totalInputNum;
          const isNotOneLeft = remainingScore !== 1;
          const isExactFinish = remainingScore === 0;

          if (totalInputNum > Number(player2.score)) return;
          if (!isSingleOut && !isNotOneLeft) return;
          if (isDoubleOut) {
            if (isExactFinish && !isNotForbiddenDoubleOut) return;
          }
          setUserInput(userInput + "" + number);
        }
      }
    }
  };

  const handleScore = () => {
    let newHistory;
    const legCount =
      history.filter(
        (h) =>
          h.playerFirst.score === gameSettings.points &&
          h.playerSecond.score === gameSettings.points
      ).length - 1; // zbog prvog zapisa history-a

    if (player1.onTurn && player2.name !== "") {
      const newValue = player1.score - Number(userInput);
      let totalDarts = 0;
      player1.dartsUsedPerLeg.forEach((d) => (totalDarts += d[0]));
      newHistory = [
        ...history,
        {
          playerFirst: {
            ...player1,
            score: newValue === 0 ? gameSettings.points : newValue,
            onTurn:
              newValue === 0
                ? ((legCount + 1) % 2 === 1 &&
                    gameSettings.startPlayerNum == 1) ||
                  ((legCount + 1) % 2 === 0 && gameSettings.startPlayerNum == 2)
                  ? false
                  : true
                : false,
            threeDartAverage: calculateNewAverage(
              player1.threeDartAverage,
              totalDarts + player1.dartsUsed,
              Number(userInput),
              3
            ),
            dartsUsed: newValue === 0 ? 0 : player1.dartsUsed + 3,
            legsWon:
              newValue === 0
                ? player1.legsWon + 1 == gameSettings.legs
                  ? 0
                  : player1.legsWon + 1
                : player1.legsWon,
            setsWon:
              newValue === 0 && player1.legsWon + 1 == gameSettings.legs
                ? player1.setsWon + 1
                : player1.setsWon,
            dartsUsedPerLeg:
              newValue === 0
                ? [
                    ...player1.dartsUsedPerLeg,
                    [player1.dartsUsed + 3, true] as [number, boolean],
                  ]
                : player1.dartsUsedPerLeg,
            score60Plus:
              Number(userInput) >= 60
                ? player1.score60Plus + 1
                : player1.score60Plus,
            score100Plus:
              Number(userInput) >= 100
                ? player1.score100Plus + 1
                : player1.score100Plus,
            score140Plus:
              Number(userInput) >= 140
                ? player1.score140Plus + 1
                : player1.score140Plus,
            score170:
              Number(userInput) === 170
                ? player1.score170 + 1
                : player1.score170,
            score170Plus:
              Number(userInput) >= 170
                ? player1.score170Plus + 1
                : player1.score170Plus,
            score180:
              Number(userInput) === 180
                ? player1.score180 + 1
                : player1.score180,
          },
          playerSecond: {
            ...player2,
            onTurn:
              newValue === 0
                ? ((legCount + 1) % 2 === 1 &&
                    gameSettings.startPlayerNum == 2) ||
                  ((legCount + 1) % 2 === 0 && gameSettings.startPlayerNum == 1)
                  ? false
                  : true
                : true,
            score: newValue === 0 ? gameSettings.points : player2.score,
            dartsUsed: newValue === 0 ? 0 : player2.dartsUsed,
            dartsUsedPerLeg:
              newValue === 0
                ? [
                    ...player2.dartsUsedPerLeg,
                    [player2.dartsUsed + 3, false] as [number, boolean],
                  ]
                : player2.dartsUsedPerLeg,
            legsWon:
              newValue === 0 && player1.legsWon + 1 == gameSettings.legs
                ? 0
                : player2.legsWon,
          },
        },
      ];
      setHistory(newHistory);
      localStorage.removeItem("history");
      localStorage.setItem("history", JSON.stringify(newHistory));
      checkEnd(newValue, newHistory);
    } else if (player2.onTurn && player2.name !== "") {
      const newValue = player2.score - Number(userInput);
      let totalDarts = 0;
      player2.dartsUsedPerLeg.forEach((d) => (totalDarts += d[0]));
      newHistory = [
        ...history,
        {
          playerFirst: {
            ...player1,
            onTurn:
              newValue === 0
                ? ((legCount + 1) % 2 === 1 &&
                    gameSettings.startPlayerNum == 2) ||
                  ((legCount + 1) % 2 === 0 && gameSettings.startPlayerNum == 1)
                  ? true
                  : false
                : true,
            score: newValue === 0 ? gameSettings.points : player1.score,
            dartsUsed: newValue === 0 ? 0 : player1.dartsUsed,
            dartsUsedPerLeg:
              newValue === 0
                ? [
                    ...player1.dartsUsedPerLeg,
                    [player1.dartsUsed + 3, false] as [number, boolean],
                  ]
                : player1.dartsUsedPerLeg,
            legsWon:
              newValue === 0 && player2.legsWon + 1 == gameSettings.legs
                ? 0
                : player1.legsWon,
          },

          playerSecond: {
            ...player2,
            score: newValue === 0 ? gameSettings.points : newValue,
            onTurn:
              newValue === 0
                ? ((legCount + 1) % 2 === 1 &&
                    gameSettings.startPlayerNum == 1) ||
                  ((legCount + 1) % 2 === 0 && gameSettings.startPlayerNum == 2)
                  ? true
                  : false
                : false,
            threeDartAverage: calculateNewAverage(
              player2.threeDartAverage,
              totalDarts + player2.dartsUsed,
              Number(userInput),
              3
            ),
            dartsUsed: newValue === 0 ? 0 : player2.dartsUsed + 3,
            legsWon:
              newValue === 0
                ? player2.legsWon + 1 == gameSettings.legs
                  ? 0
                  : player2.legsWon + 1
                : player2.legsWon,
            setsWon:
              newValue === 0 && player2.legsWon + 1 == gameSettings.legs
                ? player2.setsWon + 1
                : player2.setsWon,
            dartsUsedPerLeg:
              newValue === 0
                ? [
                    ...player2.dartsUsedPerLeg,
                    [player2.dartsUsed + 3, true] as [number, boolean],
                  ]
                : player2.dartsUsedPerLeg,
            score60Plus:
              Number(userInput) >= 60
                ? player2.score60Plus + 1
                : player2.score60Plus,
            score100Plus:
              Number(userInput) >= 100
                ? player2.score100Plus + 1
                : player2.score100Plus,
            score140Plus:
              Number(userInput) >= 140
                ? player2.score140Plus + 1
                : player2.score140Plus,
            score170:
              Number(userInput) === 170
                ? player2.score170 + 1
                : player2.score170,
            score170Plus:
              Number(userInput) >= 170
                ? player2.score170Plus + 1
                : player2.score170Plus,
            score180:
              Number(userInput) === 180
                ? player2.score180 + 1
                : player2.score180,
          },
        },
      ];
      setHistory(newHistory);
      localStorage.removeItem("history");
      localStorage.setItem("history", JSON.stringify(newHistory));
      checkEnd(newValue, newHistory);
    } else {
      const newValue = player1.score - Number(userInput);
      let totalDarts = 0;
      player1.dartsUsedPerLeg.forEach((d) => (totalDarts += d[0]));
      newHistory = [
        ...history,
        {
          playerFirst: {
            ...player1,
            score: newValue === 0 ? gameSettings.points : newValue,
            onTurn: true,
            threeDartAverage: calculateNewAverage(
              player1.threeDartAverage,
              totalDarts + player1.dartsUsed,
              Number(userInput),
              3
            ),
            dartsUsed: newValue === 0 ? 0 : player1.dartsUsed + 3,
            legsWon:
              newValue === 0
                ? player1.legsWon + 1 == gameSettings.legs
                  ? 0
                  : player1.legsWon + 1
                : player1.legsWon,
            setsWon:
              newValue === 0 && player1.legsWon + 1 == gameSettings.legs
                ? player1.setsWon + 1
                : player1.setsWon,
            dartsUsedPerLeg:
              newValue === 0
                ? [
                    ...player1.dartsUsedPerLeg,
                    [player1.dartsUsed + 3, true] as [number, boolean],
                  ]
                : player1.dartsUsedPerLeg,
            score60Plus:
              Number(userInput) >= 60
                ? player1.score60Plus + 1
                : player1.score60Plus,
            score100Plus:
              Number(userInput) >= 100
                ? player1.score100Plus + 1
                : player1.score100Plus,
            score140Plus:
              Number(userInput) >= 140
                ? player1.score140Plus + 1
                : player1.score140Plus,
            score170:
              Number(userInput) === 170
                ? player1.score170 + 1
                : player1.score170,
            score170Plus:
              Number(userInput) >= 170
                ? player1.score170Plus + 1
                : player1.score170Plus,
            score180:
              Number(userInput) === 180
                ? player1.score180 + 1
                : player1.score180,
          },
          playerSecond: player2,
        },
      ];
      setHistory(newHistory);
      localStorage.removeItem("history");
      localStorage.setItem("history", JSON.stringify(newHistory));
      checkEnd(newValue, newHistory);
    }
    setUserInput("0");
  };

  const checkEnd = (score: number, newHistory: any) => {
    if (score === 0) {
      const latest = newHistory[newHistory.length - 1];
      if (!latest) return;

      const p1Sets = latest.playerFirst.setsWon;
      const p2Sets = latest.playerSecond.setsWon;

      if (p1Sets >= gameSettings.sets || p2Sets >= gameSettings.sets) {
        setEnd(true);
        localStorage.setItem("end", "true");
        handleMatchData(latest);
      }
    }
  };

  const handleMatchData = (latest: any) => {
    const first = latest.playerFirst;
    const second = latest.playerSecond;
    const data = {
      gameMode: "X01",
      isTraining: gameSettings.mode === "duel" ? false : true,
      userEmail: [gameSettings.players[0], gameSettings.players[1] || ""],
      subprofile: !gameSettings.players[1].includes("@")
        ? gameSettings.players[1]
        : "",
      average3Darts: [first.threeDartAverage, second.threeDartAverage || 0],
      checkoutDartsAverage: calculatecheckoutDartsAverage(latest),
      checkoutPercentage:
        player2.name === ""
          ? [100, 0]
          : calculateCheckoutPercentage(history, gameSettings, latest),
      score60Plus: [first.score60Plus, second.score60Plus || 0],
      score100Plus: [first.score100Plus, second.score100Plus || 0],
      score140Plus: [first.score140Plus, second.score140Plus || 0],
      score170: [first.score170, second.score170 || 0],
      score170Plus: [first.score170Plus, second.score170Plus || 0],
      score180: [first.score180, second.score180 || 0],
      legsWon: [totalLegsWon(first), totalLegsWon(second) || 0],
      setsWon: [first.setsWon, second.setsWon || 0],
    };

    setFormdata(data);
    localStorage.setItem("match", JSON.stringify(data));
  };

  const handleValidate = () => {
    let data = {};
    if (gameSettings.players[1] && passwd) {
      data = {
        email: gameSettings.players[1],
        password: passwd,
      };
    }

    apiCall(`/user/validate`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(([data, status]) => {
        if (status === 200) {
          console.log(data.message);
          setPasswdErr("");
          if(formData)
            submitMatchData(formData, "startX01", router);
          else
            alert("Error: validating successfull, but new error accured")
        } else {
          console.log(data);
          setPasswdErr(data.split("d: ")[1]);
        }
      })
      .catch((error) => {
        console.log(error);
        try{
          setPasswdErr(error.split("d: ")[1]);
        } catch(err){
          setPasswdErr(JSON.stringify(error))
        }
      });
  };

  const passwdChange = (e: any) => {
    setPasswd(e.target.value);
  };

  if (userQuery.isLoading || gameSettings.points == 0) {
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
        {/* result display modal */}
        <X01ResView
          gameSettings={gameSettings}
          player1={player1}
          player2={player2}
          end={end}
        />
        {/* modal za unos */}
        <div className="w-full text-xl flex flex-col gap-3 p-4 bg-modalBg rounded-xl shadow-lg shadow-modalShadow">
          <div className="w-full flex gap-2 pl-2 pr-2">
            <div
              onClick={() => handleUndo(history, setHistory)}
              className="flex justify-center items-center rounded-lg bg-indigo-500 p-3 hover:bg-indigo-600 hover:scale-[102%] transition duration-[340ms] cursor-pointer"
            >
              <GrUndo className="h-7 w-7 text-gray-100" />
            </div>
            <div className="w-full bg-background/50 flex justify-center items-center font-medium rounded-lg p-2">
              {userInput}
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 w-full">
            {numbers.map((i) => (
              <div
                key={i}
                onClick={() => handleInput(i)}
                className="w-[32%] flex justify-center items-center p-3 bg-background/60 rounded-lg hover:bg-background/80 hover:scale-[102%] transition duration-[340ms]"
              >
                {i}
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 w-full -mt-1">
            <div
              onClick={() => setUserInput("0")}
              className="w-[32%] flex justify-center items-center p-3 bg-indigo-500 text-gray-100 rounded-lg hover:bg-indigo-600 hover:scale-[102%] transition duration-[340ms] cursor-pointer"
            >
              CLEAR
            </div>
            <div
              onClick={() => handleInput(0)}
              className="w-[32%] flex justify-center items-center p-3 bg-background/60 rounded-lg hover:bg-background/80 hover:scale-[102%] transition duration-[340ms]"
            >
              0
            </div>
            <div
              onClick={handleScore}
              className="w-[32%] flex justify-center items-center p-3 bg-indigo-500 text-gray-100 rounded-lg hover:bg-indigo-600 hover:scale-[102%] transition duration-[340ms] cursor-pointer"
            >
              OK
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between font-semibold text-textColorDark bg-modalBg p-2 rounded-xl shadow-lg shadow-modalShadow">
          <p className="ml-5">{gameSettings.legStart.toUpperCase()}</p>
          <p className="mr-5">{gameSettings.legFinish.toUpperCase()}</p>
        </div>
      </div>
      {/* match summary modal */}
      {end && (
        <MatchSummary
          player1={player1}
          player2={player2}
          formData={formData}
          gameSettings={gameSettings}
          setValidate={setValidate}
          back={"startX01"}
        />
      )}
      {/* password check */}
      {validate && (
        <ValidateOpponent
          player2={player2}
          passwdErr={passwdErr}
          passwdChange={passwdChange}
          handleValidate={handleValidate}
          back={"startX01"}
        />
      )}
    </div>
  );
}
