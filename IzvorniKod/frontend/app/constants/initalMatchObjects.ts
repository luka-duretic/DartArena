export const initialPlayer = {
    name: "",
    imgUrl: "",
    score: 0,
    threeDartAverage: 0.0,
    dartsUsed: 0,
    onTurn: false,
    legsWon: 0,
    setsWon: 0,
    dartsUsedPerLeg: [] as [number, boolean][],
    score60Plus: 0,
    score100Plus: 0,
    score140Plus: 0,
    score170: 0,
    score170Plus: 0,
    score180: 0,
}

export const initialGameSettings = {
    players: [""],
    mode: "",
    points: 0,
    legs: 0,
    sets: 0,
    legStart: "",
    legFinish: "",
    startPlayerNum: 0,
}