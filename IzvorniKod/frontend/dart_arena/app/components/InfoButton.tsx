"use client";
import { LuInfo } from "react-icons/lu";

export default function InfoButton({ text }: any) {
  return (
    <div className="relative flex justify-end transition duration-300">
      <LuInfo className="peer w-7 text-2xl cursor-pointer" />
      <div className={"opacity-0 peer-hover:opacity-100 transition duration-300 cursor-default text-justify absolute top-2 right-8 bg-background text-textColorDark rounded-xl rounded-tr-none p-3 w-[23rem]"}>
        {text}
      </div>
    </div>
  );
}
