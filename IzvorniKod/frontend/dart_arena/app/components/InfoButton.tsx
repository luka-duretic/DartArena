"use client";
import { LuInfo } from "react-icons/lu";

export default function InfoButton({ text }: any) {
  return (
    <div className="relative h-full w-full flex justify-end transition duration-300">
      <LuInfo className="peer w-7 text-2xl cursor-pointer" />
      <div className="opacity-0 peer-hover:opacity-100 transition duration-300 w-[90%] cursor-default break-after-auto text-justify absolute top-2 left-0 bg-background text-textColorDark rounded-xl rounded-tr-none p-3">
        {text}
      </div>
    </div>
  );
}
