"use client";

import { apiCall } from "@/api";
import MatchSummary from "@/app/components/stats-modals/MatchSummary";
import ValidateOpponent from "@/app/components/ValidateOpponent";
import X01ResView from "@/app/components/games-modals/X01ResView";
import { cricketInput } from "@/app/constants/defaultMatchInputs";
import {
  initialGameSettings,
  initialPlayer,
} from "@/app/constants/initalMatchObjects";
import {
  calculateCricketThrow,
  calculateNewAverage,
  checkCricket,
} from "@/app/helpers/avgFunction";
import {
  calculatecheckoutDartsAverage,
  calculateCheckoutPercentage,
  calculateCricketCheckoutPercentage,
  totalLegsWon,
} from "@/app/helpers/checkoutFunctions";
import {
  fetchUserByEmail,
  submitMatchData,
} from "@/app/helpers/fetchFunctions";
import setPlayers from "@/app/helpers/setPlayers";
import { handleUndo } from "@/app/helpers/undoHistory";
import { Match } from "@/app/interfaces/match";
import { NumbersPair, Pair } from "@/app/interfaces/player";
import { useGetUser } from "@/app/queries/getUserQuery";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrUndo } from "react-icons/gr";

export default function Cricket() {
  const [gameSettings, setGameSettings] = useState(initialGameSettings);
  const [player1, setPlayer1] = useState(initialPlayer);
  const [player2, setPlayer2] = useState(initialPlayer);
  const [history, setHistory] = useState<Pair[]>([]);
  const [formData, setFormdata] = useState<Match>();
  const userQuery = useGetUser();
  const [userInput, setUserInput] = useState<string[]>([]);
  const [end, setEnd] = useState(false);
  const router = useRouter();
  const [validate, setValidate] = useState(false);
  const [passwdErr, setPasswdErr] = useState("");
  const [passwd, setPasswd] = useState("");
  const [round, setRound] = useState<number[]>([1]);
  const [throws, setThrows] = useState<NumbersPair[]>([]);

  useEffect(() => {
    const init = async () => {
      const settings = localStorage.getItem("game-settings");
      const histLocStor = localStorage.getItem("history");
      const endLocStor = localStorage.getItem("end");
      const matchLocStor = localStorage.getItem("match");
      const validateLocStor = localStorage.getItem("validate");
      const roundLocStor = localStorage.getItem("round");
      const throwsLOcStor = localStorage.getItem("throws");

      if (endLocStor === "true") setEnd(true);

      if (validateLocStor === "true") setValidate(true);

      if (matchLocStor) setFormdata(JSON.parse(matchLocStor));

      if (localStorage.length < 3) {
        router.push("/games/startCricket");
      }

      let r: number[] = [];
      if (roundLocStor) {
        r = JSON.parse(roundLocStor);
        setRound(r);
      }

      let hist: Pair[] = [];
      if (histLocStor) {
        hist = JSON.parse(histLocStor);
        setHistory(hist);
      }

      let t: NumbersPair[] = [];
      if (throwsLOcStor) {
        t = JSON.parse(throwsLOcStor);
        setThrows(t);
      } else {
        setThrows([
          {
            throwFirst: [3, 3, 3, 3, 3, 3, 3],
            throwSecond: [3, 3, 3, 3, 3, 3, 3],
          },
        ]);
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
          ["score"]: historyLast?.playerFirst.score || 0,
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
        };
        setPlayer1(newPlayer1);

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
              ["score"]: historyLast?.playerSecond.score || 0,
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
            ["score"]: historyLast?.playerSecond.score || 0,
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

  const handleInput = (number: string) => {
    if (userInput.length < 3) setUserInput([...userInput, number]);
    else setUserInput([userInput[0], userInput[1], number]);
  };

  const roundUndo = () => {
    if (player1.dartsUsed === player2.dartsUsed || player2.name === "") {
      const roundTmp = [...round];
      roundTmp.pop();

      if (roundTmp.length !== 0) {
        setRound(roundTmp);
        localStorage.removeItem("round");
        localStorage.setItem("round", JSON.stringify(roundTmp));
      } else {
        setRound(round);
        localStorage.removeItem("round");
      }
      console.log(roundTmp);
    }
  };

  const throwUndo = () => {
    const throwTmp = [...throws];

    if (throwTmp.length > 2) {
      throwTmp.pop();
      setThrows(throwTmp);
      localStorage.removeItem("throws");
      localStorage.setItem("throws", JSON.stringify(throwTmp));
    } else {
      setThrows(throwTmp);
      localStorage.removeItem("throws");
    }
    console.log(throwTmp);
  };

  const handleScore = () => {
    if (userInput.length < 3) return;
    let newThrow;
    let newHistory;
    const legCount =
      history.filter(
        (h) => h.playerFirst.score === 0 && h.playerSecond.score === 0
      ).length - 1;

    let lastThrow = throws[throws.length - 1];
    let throwData = calculateCricketThrow(
      userInput,
      player1.onTurn ? lastThrow.throwFirst : lastThrow.throwSecond,
      player1.onTurn ? lastThrow.throwSecond : lastThrow.throwFirst
    );
    const cricket = checkCricket(throwData.newthrow);
    const userScore = throwData.score;
    const r = round[round.length - 1];

    if (player1.onTurn && player2.name !== "") {
      let newValue = player1.score + userScore;
      let totalDarts = 0;
      newThrow = [
        ...throws,
        {
          throwFirst: [...throwData.newthrow],
          throwSecond: [...lastThrow.throwSecond],
        },
      ];

      player1.dartsUsedPerLeg.forEach((d) => (totalDarts += d[0]));
      newHistory = [
        ...history,
        {
          playerFirst: {
            ...player1,
            score:
              (r === 15 && player1.dartsUsed + 3 === player2.dartsUsed) ||
              (cricket && newValue >= player2.score)
                ? 0
                : newValue,
            onTurn:
              (r === 15 && player1.dartsUsed + 3 === player2.dartsUsed) ||
              (cricket && newValue >= player2.score)
                ? ((legCount + 1) % 2 === 1 &&
                    gameSettings.startPlayerNum == 1) ||
                  ((legCount + 1) % 2 === 0 && gameSettings.startPlayerNum == 2)
                  ? false
                  : true
                : false,
            threeDartAverage: calculateNewAverage(
              player1.threeDartAverage,
              totalDarts + player1.dartsUsed,
              Number(userScore),
              3
            ),
            dartsUsed:
              (r === 15 && player1.dartsUsed + 3 === player2.dartsUsed) ||
              (cricket && newValue >= player2.score)
                ? 0
                : player1.dartsUsed + 3,
            legsWon:
              (r === 15 && player1.dartsUsed + 3 === player2.dartsUsed) ||
              (cricket && newValue >= player2.score)
                ? (newValue >= player2.score &&
                    !cricket &&
                    player1.legsWon + 1 == gameSettings.legs) ||
                  (newValue < player2.score &&
                    player2.legsWon + 1 == gameSettings.legs) ||
                  (cricket &&
                    newValue >= player2.score &&
                    player1.legsWon + 1 == gameSettings.legs)
                  ? 0
                  : newValue >= player2.score || cricket
                  ? player1.legsWon + 1
                  : player1.legsWon
                : player1.legsWon,
            setsWon:
              ((r === 15 &&
                player1.dartsUsed + 3 === player2.dartsUsed &&
                newValue > player2.score) ||
                (cricket && newValue >= player2.score)) &&
              player1.legsWon + 1 == gameSettings.legs
                ? player1.setsWon + 1
                : player1.setsWon,
            dartsUsedPerLeg:
              (r === 15 && player1.dartsUsed + 3 === player2.dartsUsed) ||
              (cricket && newValue >= player2.score)
                ? newValue >= player2.score
                  ? [
                      ...player1.dartsUsedPerLeg,
                      [player1.dartsUsed + 3, true] as [number, boolean],
                    ]
                  : [
                      ...player1.dartsUsedPerLeg,
                      [player1.dartsUsed + 3, false] as [number, boolean],
                    ]
                : player1.dartsUsedPerLeg,
          },
          playerSecond: {
            ...player2,
            onTurn:
              (r === 15 && player1.dartsUsed + 3 === player2.dartsUsed) ||
              (cricket && newValue >= player2.score)
                ? ((legCount + 1) % 2 === 1 &&
                    gameSettings.startPlayerNum == 2) ||
                  ((legCount + 1) % 2 === 0 && gameSettings.startPlayerNum == 1)
                  ? false
                  : true
                : true,
            score:
              (r === 15 && player1.dartsUsed + 3 === player2.dartsUsed) ||
              (cricket && newValue >= player2.score)
                ? 0
                : player2.score,
            dartsUsed:
              (r === 15 && player1.dartsUsed + 3 === player2.dartsUsed) ||
              (cricket && newValue >= player2.score)
                ? 0
                : player2.dartsUsed,
            dartsUsedPerLeg:
              (r === 15 && player1.dartsUsed + 3 === player2.dartsUsed) ||
              (cricket && newValue >= player2.score)
                ? newValue < player2.score
                  ? [
                      ...player2.dartsUsedPerLeg,
                      [player2.dartsUsed, true] as [number, boolean],
                    ]
                  : [
                      ...player2.dartsUsedPerLeg,
                      [player2.dartsUsed, false] as [number, boolean],
                    ]
                : player2.dartsUsedPerLeg,
            legsWon:
              (r === 15 && player1.dartsUsed + 3 === player2.dartsUsed) ||
              (cricket && newValue >= player2.score)
                ? (newValue < player2.score &&
                    !cricket &&
                    player2.legsWon + 1 == gameSettings.legs) ||
                  (newValue >= player2.score &&
                    player1.legsWon + 1 == gameSettings.legs) ||
                  (cricket &&
                    newValue >= player2.score &&
                    player1.legsWon + 1 == gameSettings.legs)
                  ? 0
                  : newValue < player2.score && !cricket
                  ? player2.legsWon + 1
                  : player2.legsWon
                : player2.legsWon,
            setsWon:
              r === 15 &&
              player1.dartsUsed + 3 === player2.dartsUsed &&
              newValue <= player2.score &&
              player2.legsWon + 1 == gameSettings.legs &&
              !cricket
                ? player2.setsWon + 1
                : player2.setsWon,
          },
        },
      ];
      setHistory(newHistory);
      localStorage.removeItem("history");
      localStorage.setItem("history", JSON.stringify(newHistory));
      setThrows(newThrow);
      localStorage.removeItem("throws");
      localStorage.setItem("throws", JSON.stringify(newThrow));

      let rd = round[round.length - 1] + 1;
      checkEnd(rd, newHistory, cricket);
    } else if (player2.onTurn && player2.name !== "") {
      let newValue = player2.score + userScore;
      let totalDarts = 0;
      newThrow = [
        ...throws,
        {
          throwFirst: [...lastThrow.throwFirst],
          throwSecond: [...throwData.newthrow],
        },
      ];

      player2.dartsUsedPerLeg.forEach((d) => (totalDarts += d[0]));
      newHistory = [
        ...history,
        {
          playerFirst: {
            ...player1,
            onTurn:
              (r === 15 && player2.dartsUsed + 3 === player1.dartsUsed) ||
              (cricket && newValue >= player1.score)
                ? ((legCount + 1) % 2 === 1 &&
                    gameSettings.startPlayerNum == 2) ||
                  ((legCount + 1) % 2 === 0 && gameSettings.startPlayerNum == 1)
                  ? true
                  : false
                : true,
            score:
              (r === 15 && player2.dartsUsed + 3 === player1.dartsUsed) ||
              (cricket && newValue >= player1.score)
                ? 0
                : player1.score,
            dartsUsed:
              (r === 15 && player2.dartsUsed + 3 === player1.dartsUsed) ||
              (cricket && newValue >= player1.score)
                ? 0
                : player1.dartsUsed,
            dartsUsedPerLeg:
              (r === 15 && player2.dartsUsed + 3 === player1.dartsUsed) ||
              (cricket && newValue >= player1.score)
                ? newValue <= player1.score
                  ? [
                      ...player1.dartsUsedPerLeg,
                      [player1.dartsUsed, true] as [number, boolean],
                    ]
                  : [
                      ...player1.dartsUsedPerLeg,
                      [player1.dartsUsed, false] as [number, boolean],
                    ]
                : player1.dartsUsedPerLeg,
            legsWon:
              (r === 15 && player2.dartsUsed + 3 === player1.dartsUsed) ||
              (cricket && newValue >= player1.score)
                ? (newValue <= player1.score &&
                    !cricket &&
                    player1.legsWon + 1 == gameSettings.legs) ||
                  (newValue > player1.score &&
                    player2.legsWon + 1 == gameSettings.legs) ||
                  (cricket &&
                    newValue >= player1.score &&
                    player2.legsWon + 1 == gameSettings.legs)
                  ? 0
                  : newValue <= player1.score && !cricket
                  ? player1.legsWon + 1
                  : player1.legsWon
                : player1.legsWon,
            setsWon:
              r === 15 &&
              player2.dartsUsed + 3 === player1.dartsUsed &&
              newValue <= player1.score &&
              player1.legsWon + 1 == gameSettings.legs &&
              !cricket
                ? player1.setsWon + 1
                : player1.setsWon,
          },

          playerSecond: {
            ...player2,
            score:
              (r === 15 && player2.dartsUsed + 3 === player1.dartsUsed) ||
              (cricket && newValue >= player1.score)
                ? 0
                : newValue,
            onTurn:
              (r === 15 && player2.dartsUsed + 3 === player1.dartsUsed) ||
              (cricket && newValue >= player1.score)
                ? ((legCount + 1) % 2 === 1 &&
                    gameSettings.startPlayerNum == 1) ||
                  ((legCount + 1) % 2 === 0 && gameSettings.startPlayerNum == 2)
                  ? true
                  : false
                : false,
            threeDartAverage: calculateNewAverage(
              player2.threeDartAverage,
              totalDarts + player2.dartsUsed,
              Number(userScore),
              3
            ),
            dartsUsed:
              (r === 15 && player2.dartsUsed + 3 === player1.dartsUsed) ||
              (cricket && newValue >= player1.score)
                ? 0
                : player2.dartsUsed + 3,
            legsWon:
              (r === 15 && player2.dartsUsed + 3 === player1.dartsUsed) ||
              (cricket && newValue >= player1.score)
                ? (newValue <= player1.score &&
                    !cricket &&
                    player1.legsWon + 1 == gameSettings.legs) ||
                  (newValue > player1.score &&
                    player2.legsWon + 1 == gameSettings.legs) ||
                  (cricket &&
                    newValue >= player1.score &&
                    player2.legsWon + 1 == gameSettings.legs)
                  ? 0
                  : newValue > player1.score || cricket
                  ? player2.legsWon + 1
                  : player2.legsWon
                : player2.legsWon,
            setsWon:
              ((r === 15 &&
                player2.dartsUsed + 3 === player1.dartsUsed &&
                newValue > player1.score) ||
                (cricket && newValue >= player1.score)) &&
              player2.legsWon + 1 == gameSettings.legs
                ? player2.setsWon + 1
                : player2.setsWon,
            dartsUsedPerLeg:
              (r === 15 && player2.dartsUsed + 3 === player1.dartsUsed) ||
              (cricket && newValue >= player1.score)
                ? newValue > player1.score
                  ? [
                      ...player2.dartsUsedPerLeg,
                      [player2.dartsUsed + 3, true] as [number, boolean],
                    ]
                  : [
                      ...player2.dartsUsedPerLeg,
                      [player2.dartsUsed + 3, false] as [number, boolean],
                    ]
                : player2.dartsUsedPerLeg,
          },
        },
      ];
      setHistory(newHistory);
      localStorage.removeItem("history");
      localStorage.setItem("history", JSON.stringify(newHistory));
      setThrows(newThrow);
      localStorage.removeItem("throws");
      localStorage.setItem("throws", JSON.stringify(newThrow));

      let rd = round[round.length - 1] + 1;
      checkEnd(rd, newHistory, cricket);
    } else {
      let newValue = player1.score + userScore;
      let totalDarts = 0;
      newThrow = [
        ...throws,
        {
          throwFirst: [...throwData.newthrow],
          throwSecond: [...lastThrow.throwSecond],
        },
      ];

      player1.dartsUsedPerLeg.forEach((d) => (totalDarts += d[0]));
      newHistory = [
        ...history,
        {
          playerFirst: {
            ...player1,
            score: r === 15 || cricket ? 0 : newValue,
            onTurn: true,
            threeDartAverage: calculateNewAverage(
              player1.threeDartAverage,
              totalDarts + player1.dartsUsed,
              Number(userScore),
              3
            ),
            dartsUsed: r === 15 || cricket ? 0 : player1.dartsUsed + 3,
            legsWon:
              r === 15 || cricket
                ? player1.legsWon + 1 == gameSettings.legs
                  ? 0
                  : player1.legsWon + 1
                : player1.legsWon,
            setsWon:
              (r === 15 || cricket) && player1.legsWon + 1 == gameSettings.legs
                ? player1.setsWon + 1
                : player1.setsWon,
            dartsUsedPerLeg:
              r === 15 || cricket
                ? [
                    ...player1.dartsUsedPerLeg,
                    [player1.dartsUsed + 3, true] as [number, boolean],
                  ]
                : player1.dartsUsedPerLeg,
          },
          playerSecond: player2,
        },
      ];
      setHistory(newHistory);
      localStorage.removeItem("history");
      localStorage.setItem("history", JSON.stringify(newHistory));
      setThrows(newThrow);
      localStorage.removeItem("throws");
      localStorage.setItem("throws", JSON.stringify(newThrow));

      let rd = round[round.length - 1] + 1;
      checkEnd(rd, newHistory, cricket);
    }
    setUserInput([]);
  };

  const checkEnd = (r: number, newHistory: any, cricket: boolean) => {
    const latest = newHistory[newHistory.length - 1];
    const p1 = latest.playerFirst.dartsUsed;
    const p2 = latest.playerSecond.dartsUsed;

    let bool = false;
    if (
      latest.playerSecond.onTurn &&
      latest.playerFirst.score >= latest.playerSecond.score &&
      cricket
    ) {
      bool = true;
    } else if (
      latest.playerFirst.onTurn &&
      latest.playerSecond.score >= latest.playerFirst.score &&
      cricket
    ) {
      bool = true;
    }

    if ((r > 15 && (p1 === p2 || player2.name === "")) || bool) {
      setThrows([
        ...throws,
        {
          throwFirst: [3, 3, 3, 3, 3, 3, 3],
          throwSecond: [3, 3, 3, 3, 3, 3, 3],
        },
      ]);
      setRound([...round, 1]);
      localStorage.setItem("round", JSON.stringify([...round, 1]));
      const latest = newHistory[newHistory.length - 1];
      if (!latest) return;

      const p1Sets = latest.playerFirst.setsWon;
      const p2Sets = latest.playerSecond.setsWon;

      if (p1Sets >= gameSettings.sets || p2Sets >= gameSettings.sets) {
        setEnd(true);
        localStorage.setItem("end", "true");
        handleMatchData(latest);
      }
    } else if (r < 16 && (p1 === p2 || player2.name === "")) {
      setRound([...round, r]);
      localStorage.setItem("round", JSON.stringify([...round, r]));
    }
  };

  const handleMatchData = (latest: any) => {
    const first = latest.playerFirst;
    const second = latest.playerSecond;
    const data = {
      gameMode: "Cricket",
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
          : calculateCricketCheckoutPercentage(latest),
      score60Plus: [0, 0],
      score100Plus: [0, 0],
      score140Plus: [0, 0],
      score170: [0, 0],
      score170Plus: [0, 0],
      score180: [0, 0],
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
          if (formData) submitMatchData(formData, "startCricket", router);
          else alert("Error: validating successfull, but new error accured");
        } else {
          console.log(data);
          setPasswdErr(data.split("d: ")[1]);
        }
      })
      .catch((error) => {
        console.log(error);
        try {
          setPasswdErr(error.split("d: ")[1]);
        } catch (err) {
          setPasswdErr(JSON.stringify(error));
        }
      });
  };

  const passwdChange = (e: any) => {
    setPasswd(e.target.value);
  };

  if (userQuery.isLoading || gameSettings.points == null) {
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
          throws={throws[throws.length - 1]}
        />
        {/* modal za unos */}
        <div className="w-full text-xl flex flex-col gap-3 p-4 bg-modalBg rounded-xl shadow-lg shadow-modalShadow">
          <div className="w-full flex gap-2 pl-2 pr-2">
            <div
              onClick={() => {
                handleUndo(history, setHistory);
                roundUndo();
                throwUndo();
              }}
              className="flex justify-center items-center rounded-lg bg-indigo-500 p-3 hover:bg-indigo-600 hover:scale-[102%] transition duration-[340ms] cursor-pointer"
            >
              <GrUndo className="h-7 w-7 text-gray-100 mr-1" />
            </div>
            <div className="w-full h-13 bg-background/50 flex justify-center items-center gap-3 rounded-lg p-2">
              {userInput.map((s: string, i: number) => (
                <div key={i}>{s}</div>
              ))}
              {userInput.length === 0 && "-"}
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 w-full">
            {cricketInput.map((sArr: string[]) =>
              sArr.map((s: string) => (
                <div
                  key={s}
                  onClick={() => handleInput(s)}
                  className={
                    "relative w-[15.3%] flex justify-center items-center p-3 rounded-lg hover:scale-[102%] transition duration-[340ms] " +
                    (userInput.includes(s)
                      ? "bg-indigo-500/25 border-1 border-indigo-500 text-white hover:bg-indigo-500/40"
                      : "bg-background/60 hover:bg-background/80")
                  }
                >
                  {s}
                  {userInput.filter((el) => el === s).length > 1 && (
                    <div className="absolute font-semibold text-indigo-400 top-[60%] right-[4%] text-sm">
                      +{userInput.filter((el) => el === s).length}
                    </div>
                  )}
                </div>
              ))
            )}
            <div
              onClick={() => handleInput("25")}
              className={
                "relative w-[32%] flex justify-center items-center p-3 rounded-lg hover:scale-[102%] transition duration-[340ms] " +
                (userInput.includes("25")
                  ? "bg-indigo-500/25 border-1 border-indigo-500 text-white hover:bg-indigo-500/40"
                  : "bg-background/60 hover:bg-background/80")
              }
            >
              25
              {userInput.filter((el) => el === "25").length > 1 && (
                <div className="absolute font-semibold text-indigo-400 top-[60%] right-[4%] text-sm">
                  +{userInput.filter((el) => el === "25").length}
                </div>
              )}
            </div>
            <div
              onClick={() => handleInput("50")}
              className={
                "relative w-[32%] flex justify-center items-center p-3 rounded-lg hover:scale-[102%] transition duration-[340ms] " +
                (userInput.includes("50")
                  ? "bg-indigo-500/25 border-1 border-indigo-500 text-white hover:bg-indigo-500/40"
                  : "bg-background/60 hover:bg-background/80")
              }
            >
              50
              {userInput.filter((el) => el === "50").length > 1 && (
                <div className="absolute font-semibold text-indigo-400 top-[60%] right-[4%] text-sm">
                  +{userInput.filter((el) => el === "50").length}
                </div>
              )}
            </div>
            <div
              onClick={() => handleInput("MISS")}
              className={
                " relative w-[32%] flex justify-center items-center p-3 rounded-lg hover:scale-[102%] transition duration-[340ms] " +
                (userInput.includes("MISS")
                  ? "bg-indigo-500/25 border-1 border-indigo-500 text-white hover:bg-indigo-500/40"
                  : "bg-background/60 hover:bg-background/80")
              }
            >
              MISS
              {userInput.filter((el) => el === "MISS").length > 1 && (
                <div className="absolute font-semibold text-indigo-400 top-[60%] right-[4%] text-sm">
                  +{userInput.filter((el) => el === "MISS").length}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 w-full -mt-1">
            <div
              onClick={() => setUserInput([])}
              className="w-[32%] flex justify-center items-center p-3 bg-indigo-500 text-gray-100 rounded-lg hover:bg-indigo-600 hover:scale-[102%] transition duration-[340ms] cursor-pointer"
            >
              CLEAR
            </div>
            <div
              className={
                "relative w-[32%] flex justify-center items-center p-3 rounded-lg hover:scale-[102%] transition duration-[340ms] bg-background/60 hover:bg-background/80"
              }
            >
              <p className="opacity-0">fake</p>
            </div>
            <div
              onClick={handleScore}
              className="w-[32%] flex justify-center items-center p-3 bg-indigo-500 text-gray-100 rounded-lg hover:bg-indigo-600 hover:scale-[102%] transition duration-[340ms] cursor-pointer"
            >
              OK
            </div>
          </div>
        </div>
        <div className="w-full mb-4 flex justify-center items-center gap-3 font-semibold text-textColorDark bg-modalBg p-2 rounded-xl shadow-lg shadow-modalShadow">
          <p>CLOSE UP SECTIONS BEFORE OPPONENT</p>
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
          back={"startCricket"}
        />
      )}
      {/* password check */}
      {validate && (
        <ValidateOpponent
          player2={player2}
          passwdErr={passwdErr}
          passwdChange={passwdChange}
          handleValidate={handleValidate}
          back={"startCricket"}
        />
      )}
    </div>
  );
}
