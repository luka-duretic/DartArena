export function calculateNewAverage(
    oldAvg: number,
    oldDarts: number,
    newScore: number,
    newDarts: number
  ): number {
    if (oldDarts === 0) {
      return parseFloat(newScore.toFixed(2));
    }
  
    const totalScore = oldAvg * (oldDarts / 3);
    const newTotalScore = totalScore + newScore;
    const totalDarts = oldDarts + newDarts;
  
    return parseFloat((newTotalScore / (totalDarts / 3)).toFixed(2));
  }