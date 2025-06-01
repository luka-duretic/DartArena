import { Pair } from "../interfaces/player";

export const handleUndo = (history:Pair[], setHistory:any) => {
    const historyTmp = [...history];
    historyTmp.pop();

    if (historyTmp.length !== 0) {
      setHistory(historyTmp);
      localStorage.removeItem("history");
      localStorage.setItem("history", JSON.stringify(historyTmp));
    } else {
      setHistory(history);
      localStorage.removeItem("history");
    }
    console.log(historyTmp);
  };