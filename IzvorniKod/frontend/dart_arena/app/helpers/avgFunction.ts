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

export function calculateSplitScore(inputs:string[]){
  let sum = 0;

  for(let s of inputs){
    if(s.startsWith("D")){
      let num = s.replace("D", "")
      sum += 2 * Number(num)
    } else if(s.startsWith("T")){
      let num = s.replace("T", "")
      sum += 3 * Number(num)
    } else if(s.startsWith("M")){
      sum += 0
    } else {
      sum += Number(s)
    }
  }  
  return sum;
}

export function checkShanghai(inputs:string[]){
  let single = "";
  for(let s of inputs){
    if(!s.startsWith("D") && !s.startsWith("T") && !s.startsWith("M")){
      single = s
    }
  }

  if(inputs.includes("D"+single) && inputs.includes("T"+single))
    return true;

  return false;
}