import { Player } from "../interfaces/player";

export default function setPlayers(playerLast:Player, player:any){
    const data = {
        ...player,
        ["name"]: playerLast.name,
        ["imgUrl"]: playerLast.imgUrl,
        ["score"]: playerLast.score,
        ["threeDartAverage"]: playerLast.threeDartAverage || 0.0,
        ["dartsUsed"]: playerLast.dartsUsed || 0,
        ["onTurn"]: playerLast.onTurn || false,
        ["legsWon"]: playerLast.legsWon || 0,
        ["setsWon"]: playerLast.setsWon || 0,
        ["dartsUsedPerLeg"]:
          playerLast.dartsUsedPerLeg ||
          ([] as [number, boolean][]),
        ["score60Plus"]: playerLast.score60Plus || 0,
        ["score100Plus"]: playerLast.score100Plus || 0,
        ["score140Plus"]: playerLast.score140Plus || 0,
        ["score170"]: playerLast.score170 || 0,
        ["score170Plus"]: playerLast.score170Plus || 0,
        ["score180"]: playerLast.score180 || 0,
      }

    return data;
}