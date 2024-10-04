import { create } from "zustand";

export const enum Languages {
  RU = "RU",
  ENG = "EN",
}

type MainStore = {
  wordsAmount: number;
  currentLang: Languages;
  isTypeActive: boolean;
  timer: number;
  changeWordsAmount: (wordsAmount: number) => void;
  changeTimer: (timer: number) => void;
  changeLang: (lang: Languages) => void;
  changeTypeActive: (typeActive: boolean) => void;
};

export const useMainStore = create<MainStore>((set) => ({
  wordsAmount: 30,
  currentLang: Languages.ENG,
  isTypeActive: false,
  timer: 30,
  changeWordsAmount: (wordsAmount: number) =>
    set(() => ({
      wordsAmount: wordsAmount,
    })),
  changeLang: (lang: Languages) =>
    set(() => ({
      currentLang: lang,
    })),
  changeTypeActive: (typeActive: boolean) =>
    set(() => ({
      isTypeActive: typeActive,
    })),
  changeTimer: (timer: number) =>
    set(() => ({
      timer: timer,
    })),
}));
