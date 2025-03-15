"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import CountryInput from "../components/CountryInput";

const signUpSchema = z.object({
  first_name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .regex(/^[A-ZČĆŠĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect first_name format"),
  last_name: z
    .string()
    .min(2, "last_name must be at least 2 characters long")
    .regex(/^[A-ZŠČĆĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect last_name format"),
  nickname: z
    .string()
    .min(4, "Nickname must be at least 4 characters long")
    .regex(/^[a-zA-Z][a-zA-Z0-9._]*$/, "Incorrect nickname format"),
  country: z.string(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  team: z
    .string()
    .min(4, "Team name must be at least 4 characters long")
    .regex(/^[a-zA-Z][a-zA-Z0-9._]*$/, "Incorrect team name format"),
  league: z
    .string()
    .min(4, "League name must be at least 4 characters long")
    .regex(/^[a-zA-Z][a-zA-Z0-9._]*$/, "Incorrect league name format"),
});

function SignUpPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    nickname: "",
    country: "",
    email: "",
    password: "",
    team: "",
    league: "",
  });

  // varijabla koja mijenja stanje je objekt
  const [errors, setErrors] = useState<any>({});
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountry = (value:any) => {
    setFormData({ ...formData, ["country"]: value });
  }

  //provjera formata inputa na submit
  const handleSubmit = async (e: any) => {
    /*ova funkcija sprecava refresh stranice nakon submit-anja form-a / klika na link / itd. */
    e.preventDefault();

    // SALJEMO I DATUM PRIDRUZIVANJA

    /*try {
      signUpSchema.parse(formData);
      setErrors({});

      apiCall(`/registrations`, {
        method: "POST",
        body: JSON.stringify({
          user: {
            ...formData,
            gender: formData.gender.toLowerCase(),
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(([data, status]) => {
          if (status === 201) {
            console.log(data);

            localStorage.setItem("token", data.token);
            router.push("/homepage");
          } else {
            console.log(data);
            setServerErrorMessage(data.error);
          }
        })
        .catch((error) => {
          setServerErrorMessage(error.message);
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
    }*/
  };

  return (
    <div
      className="min-h-screen max-w-screen bg-cover  pb-[8rem] xs:pb-0"
      style={{ backgroundImage: "url('./images/bg1.png')" }}
    >
      <div className="flex justify-center md:justify-between items-center h-[16%]">
        <img
          src="/images/logo.png"
          className="pt-[1.5rem] pl-[1.5rem] w-[15rem]"
        />

        <Link href={"/sign-in"} className="no-underline pr-[2.5rem] hidden md:block">
          <div className="group flex flex-row gap-1 cursor-pointer w-[200px] md:w-[260px] bg-background text-textColorDark p-[0.8rem] md:p-[1rem] text-xs md:text-sm rounded-[0.7rem] hover:bg-modalHover transition duration-300 hover:text-white">
            <span className="message">Already have an account? </span>
            <span className="signUp text-indigo-500 pr-5 group-hover:pr-0">
              Sign in
            </span>
            <span className="arrow text-white hidden group-hover:block">
              ➜
            </span>
          </div>
        </Link>
      </div>
      <div className="h-[80%] flex justify-center items-start pt-5 pb-10">
        <div className=" bg-background rounded-[0.7rem] p-[1.4rem] pb-5 mt-[2rem] sm:mt-[3.5rem] w-[85%] xs:w-[90%] sm:w-[75%] md:w-[65%] lg:w-[50%] h-[auto] text-textColorDark">
          <h3 className="w-full flex justify-center items-center text-2xl font-semibold cursor-default">
            Create an account
          </h3>

          <form onSubmit={handleSubmit}>
            <div className=" form-container mt-4 flex flex-col xs:flex-row justify-center items-center xs:gap-2 w-full">
              <div className="flex flex-col xs:gap-3 w-full xs:w-1/2">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Firstname"
                  className={
                    "bg-inputBg py-2 px-3 w-full rounded-md mt-3 border-1 border-inputBorder " +
                    (errors.first_name
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                  required
                />
                {errors.first_name && (
                  <div className="text-red-700 text-xs md:text-sm">
                    {errors.first_name}
                  </div>
                )}

                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Lastname"
                  className={
                    "bg-inputBg py-2 px-3 w-full rounded-md mt-3 border-1 border-inputBorder " +
                    (errors.last_name
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                  required
                />
                {errors.last_name && (
                  <div className="text-red-700 text-xs md:text-sm">
                    {errors.last_name}
                  </div>
                )}

                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="Nickname"
                  className={
                    "bg-inputBg py-2 px-3 w-full rounded-md mt-3 border-1 border-inputBorder " +
                    (errors.nickname
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                  required
                />
                {errors.nickname && (
                  <div className="text-red-700 text-xs md:text-sm">
                    {errors.nickname}
                  </div>
                )}

                <CountryInput handleCountry={handleCountry}/>
              </div>

              <div className="flex flex-col w-full xs:gap-3 xs:w-1/2">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  className={
                    "bg-inputBg py-2 px-3 w-full rounded-md mt-3 border-1 border-inputBorder " +
                    (errors.email
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={50}
                  required
                />
                {errors.email && (
                  <div className="text-red-700 text-xs md:text-sm">
                    {errors.email}
                  </div>
                )}

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={
                    "bg-inputBg py-2 px-3 w-full rounded-md mt-3 border-1 border-inputBorder " +
                    (errors.password
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                  required
                />
                {errors.password && (
                  <div className="text-red-700 text-xs md:text-sm">
                    {errors.password}
                  </div>
                )}

                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  placeholder="Team (optional)"
                  className={
                    "bg-inputBg py-2 px-3 w-full rounded-md mt-3 border-1 border-inputBorder " +
                    (errors.team
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                />
                {errors.team && (
                  <div className="text-red-700 text-xs md:text-sm">
                    {errors.team}
                  </div>
                )}

                <input
                  type="text"
                  name="league"
                  value={formData.league}
                  onChange={handleChange}
                  placeholder="League (optional)"
                  className={
                    "bg-inputBg py-2 px-3 w-full rounded-md mt-3 border-1 border-inputBorder " +
                    (errors.league
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                />
                {errors.league && (
                  <div className="text-red-700 text-xs md:text-sm">
                    {errors.league}
                  </div>
                )}
              </div>
            </div>

            <div className="buttons ml-2 mt-[1.4rem] xs:mt-[3rem] flex justify-center items-center">
              <button
                type="submit"
                className="cursor-pointer rounded-[0.5rem] mr-3 py-[0.4rem] px-[0.6rem] bg-indigo-500 text-buttonLetter hover:bg-indigo-700 transition duration-300 md:py-2 md:px-[1.8rem]"
              >
                Continue
              </button>
              <Link href={"/"} className="no-underline">
                <button className="cursor-pointer mr-2 py-[0.4rem] px-[0.8rem] bg-gray-500 text-buttonLetter rounded-[0.5rem] hover:bg-red-600 transition duration-300 md:py-2 md:px-[1.8rem]">
                  Close
                </button>
              </Link>
            </div>

            {serverErrorMessage && (
              <div style={{ color: "red" }} className="lg:text-[15px] mt-3">
                {serverErrorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
