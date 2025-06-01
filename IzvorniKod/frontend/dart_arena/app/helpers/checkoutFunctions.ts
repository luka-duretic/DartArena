// funkcija za racunanje prosjecno bacenih strelica u pobijedenim legovima
export function calculatecheckoutDartsAverage(latest:any){
    const firstData = latest.playerFirst.dartsUsedPerLeg.filter((d:any) => d[1] === true);
    const secondData = latest.playerSecond.dartsUsedPerLeg.filter((d:any) => d[1] === true);

    let firstSum = 0
    firstData.forEach((el:any) => firstSum += el[0])
    let secondSum = 0
    secondData.forEach((el:any) => secondSum += el[0])    

    // zaokruzi na cijeli br
    return [Math.round(firstSum/(firstData.length === 0 ? 1 : firstData.length)), Math.round(secondSum/(secondData.length === 0 ? 1 : secondData.length))];
}

// funkcija za racunanje postotka pobijedenih legova
export function calculateCheckoutPercentage(history:any, gameSettings:any, latest:any){
    const totalLegsPlayed =
    history.filter(
      (h:any) =>
        h.playerFirst.score === gameSettings.points &&
        h.playerSecond.score === gameSettings.points
    ).length - 1;
    
    const firstWon = latest.playerFirst.dartsUsedPerLeg.filter((d:any) => d[1] === true).length;
    const secondWon = latest.playerSecond.dartsUsedPerLeg.filter((d:any) => d[1] === true).length;
    
    // zaokruzi na 2 decimale
    return [Math.round((firstWon/(totalLegsPlayed + 1))*100), Math.round((secondWon/(totalLegsPlayed + 1))*100)];
}

export function totalLegsWon(player:any){
    const won = player.dartsUsedPerLeg.filter((d:any) => d[1] === true).length;
    return won; 
}