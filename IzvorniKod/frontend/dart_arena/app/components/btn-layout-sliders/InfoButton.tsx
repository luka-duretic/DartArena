"use client";
import { LuInfo } from "react-icons/lu";

export default function InfoButton({ text, where }: any) {
  return (
    <div className="relative flex justify-end transition duration-300">
      <LuInfo className="peer w-7 text-2xl cursor-pointer" />
      <div
        className={
          "hidden peer-hover:block z-30 transition duration-300 text-sm sm:text-base cursor-default text-justify bg-background text-textColorDark rounded-xl p-3 w-[17rem] sm:w-[23rem]" +
            (where ===
          "down"
            ? " rounded-tr-none absolute right-8 top-3"
            : " rounded-br-none absolute right-8 -top-32")
        }
      >
        {text}
      </div>
    </div>
  );
}
