export interface Player {
    name: string;
    imgUrl: string;
    score: number;
    threeDartAverage: number;
    dartsUsed: number;
    onTurn: boolean;
    legsWon: number;
    setsWon: number;
    dartsUsedPerLeg: [number, boolean][];
    score60Plus: number;
    score100Plus: number;
    score140Plus: number;
    score170: number;
    score170Plus: number;
    score180: number;
  }
  
export interface Pair {
    playerFirst: Player;
    playerSecond: Player;
}

export interface NumbersPair {
  throwFirst: number[];
  throwSecond: number[];
}