import { create } from "zustand";
import { persist } from "zustand/middleware";

type GameSettings = {
  players: string[];
  mode: string;
  points: number;
  legs: number;
  sets: number;
  legStart: string;
  legFinish: string;
  startPlayerNum: number;
  setSettings: (settings: Partial<GameSettings>) => void;
  reset: () => void;
};

const initialState = {
  players: [],
  mode: "",
  points: 0,
  legs: 0,
  sets: 0,
  legStart: "",
  legFinish: "",
  startPlayerNum: 1
};

export const useGameSettings = create<GameSettings>()(
  persist(
    (set) => ({
      ...initialState,
      setSettings: (settings) => set((state) => ({ ...state, ...settings })),
      reset: () => {
        set(initialState);
        // Optional: clear localStorage key completely
        localStorage.removeItem("game-settings");
      },
    }),
    {
      name: "game-settings", // key u localStorage
    }
  )
);
