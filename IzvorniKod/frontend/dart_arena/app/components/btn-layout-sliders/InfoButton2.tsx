"use client";
import { LuInfo } from "react-icons/lu";

export default function InfoButton2({ text }: any) {
  return (
    <div className="relative flex justify-end transition duration-300">
      <LuInfo className="peer w-7 text-2xl cursor-pointer" />
      <div className={"hidden peer-hover:block z-30 transition duration-300 cursor-default text-justify absolute top-2 right-8 bg-background text-textColorDark rounded-xl rounded-tr-none p-3 w-[10rem]"}>
        {text}
      </div>
    </div>
  );
}
