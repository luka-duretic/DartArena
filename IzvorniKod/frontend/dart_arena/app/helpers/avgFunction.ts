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

export function checkCricket(inputs:number[]){
  let counter = 0;
  for(let s of inputs){
    if(s !== 0){
      counter += 1;
    }
  }

  return counter < 1;
}

export function calculateCricketThrow(inputs:string[], targetsCount:number[], targetsCountOpp:number[]){
  let response = {
    score: 0,
    newthrow: [0]
  }
  let targets = ["15", "16", "17", "18", "19", "20", "25", "50"]
  let newTargets = targetsCount;
  let newScore = 0;

  for(let s of inputs){
    if(s.startsWith("D")){

      let num = s.replace("D", "")
      let ind = targets.findIndex(t => t === num)
      if(newTargets[ind] >= 2){
        newTargets[ind] = newTargets[ind] - 2
      } else {
        if(targetsCountOpp[ind] !== 0){
          if(newTargets[ind] === 0)
            newScore += 2*Number(num)
          else
            newScore += Number(num)
        }
        newTargets[ind] = 0;
      }

    } else if(s.startsWith("T")){

      let num = s.replace("T", "")
      let ind = targets.findIndex(t => t === num)

      if(targetsCountOpp[ind] !== 0){
        let x = 3 - newTargets[ind]
        newScore += x * Number(num)
      }
      newTargets[ind] = 0;

    } else if(s.startsWith("M")){
    } else {

      let ind = targets.findIndex(t => t === s)
      if(s === "50"){
        if(newTargets[ind - 1] >= 2){
          newTargets[ind - 1] = newTargets[ind - 1] - 2
        } else {
          if(targetsCountOpp[ind - 1] !== 0){
            if(newTargets[ind] === 0)
              newScore += 50
            else
              newScore += 25
          }
          newTargets[ind - 1] = 0;
        }
      } else {
        if(newTargets[ind] >= 1){
          newTargets[ind] = newTargets[ind] - 1
        } else {
          if(targetsCountOpp[ind] !== 0){
              newScore += Number(s)
          }
          newTargets[ind] = 0;
        }
      }
    }
  }

  response.score = newScore;
  response.newthrow = newTargets;
  return response;
}