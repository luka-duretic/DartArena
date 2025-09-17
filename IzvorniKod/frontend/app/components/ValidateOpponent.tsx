"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function ValidateOpponent({
  player2,
  passwdErr,
  passwdChange,
  handleValidate,
  back
}: any) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <div className="inset-0 fixed bg-black/30 backdrop-blur-sm z-30 text-textColorDark flex flex-col gap-2 justify-center items-center">
      <div
        className={
          "zoom-in-bounce relative w-[80%] sm:w-[70%] md:w-[55%] lg:w-[40%] flex flex-col items-center gap-4 py-4 px-6 bg-modalBg rounded-xl shadow-lg shadow-modalShadow"
        }
      >
        <p>CONFIRM IT IS YOU {player2.name.toUpperCase()}</p>
        <input
          id="sendPasswd"
          type={show ? "text" : "password"}
          name="password"
          placeholder="Enter your acc. password"
          onChange={passwdChange}
          className={
            "bg-background2 py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-inputBorder " +
            (passwdErr
              ? "border-[1.5px] border-red-500 outline-red-500"
              : "outline-indigo-500")
          }
          maxLength={20}
          required
        />
        {show ? (
          <FiEyeOff
            className="absolute w-[18px] h-[18px] top-[49%] xs:top-[43%] right-[12%] xs:right-[7%] cursor-pointer"
            onClick={() => setShow(!show)}
          />
        ) : (
          <FiEye
            className="absolute w-[18px] h-[18px] top-[49%] xs:top-[43%] right-[12%] xs:right-[7%] cursor-pointer"
            onClick={() => setShow(!show)}
          />
        )}
        {passwdErr && (
          <div className="text-red-500 text-xs md:text-sm ml-1 -mt-[8px] w-full flex justify-start">
            {passwdErr}
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={handleValidate}
            className="cursor-pointer bg-teal-600 hover:bg-teal-700 hover:scale-105 transition duration-300 rounded-xl text-lg text-white font-semibold w-25 py-2"
          >
            confirm
          </button>
          <button
            onClick={() => router.push("/games/" + back)}
            className="cursor-pointer bg-red-700 hover:bg-red-800 hover:scale-105 transition duration-300 rounded-xl text-lg text-white font-semibold w-25 py-2"
          >
            decline
          </button>
        </div>
      </div>
    </div>
  );
}
