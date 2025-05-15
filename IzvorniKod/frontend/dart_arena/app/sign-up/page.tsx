"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import CountryInput from "../components/CountryInput";
import { apiCall } from "@/api";

const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "Firstname must be at least 2 characters long")
    .regex(/^[A-ZČĆŠĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect firstname format"),
  lastName: z
    .string()
    .min(2, "Lastname must be at least 2 characters long")
    .regex(/^[A-ZŠČĆĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect lastname format"),
  nickName: z
    .string()
    .min(4, "Nickame must be at least 4 characters long")
    .regex(/^[a-zA-Z][a-zA-Z0-9._]*$/, "Incorrect nickname format"),
  country: z.string(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  team: z
    .string()
    .min(4, "Team name must be at least 4 characters long")
    .regex(/^[a-zA-Z][a-zA-Z0-9._\s]*$/, "Incorrect team name format"),
  league: z
    .string()
    .min(4, "League name must be at least 4 characters long")
    .regex(/^[a-zA-Z][a-zA-Z0-9._\s]*$/, "Incorrect league name format"),
});

function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
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

  const handleCountry = (value: any) => {
    setFormData({ ...formData, ["country"]: value });
  };

  //provjera formata inputa na submit
  const handleSubmit = async (e: any) => {
    /*ova funkcija sprecava refresh stranice nakon submit-anja form-a / klika na link / itd. */
    e.preventDefault();

    try {
      signUpSchema.parse(formData);
      setErrors({});

      apiCall(`/user/auth/register`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(([data, status]) => {
          if (status === 200) {
            localStorage.setItem("token", data.token);
            alert("Successfull registration - procceed to homepage");
            router.push("/home");
          } else {
            console.log(data);
            setServerErrorMessage(data.split("format -")[1]);
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
    }
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

        <Link
          href={"/sign-in"}
          className="no-underline pr-[2.5rem] hidden md:block"
        >
          <div className="group flex flex-row gap-1 cursor-pointer w-[200px] md:w-[260px] bg-background text-textColorDark p-[0.8rem] md:p-[1rem] text-xs md:text-sm rounded-[0.7rem] hover:bg-modalHover transition duration-300 hover:text-white">
            <span className="message">Already have an account? </span>
            <span className="signUp text-indigo-500 pr-5 group-hover:pr-0">
              Sign in
            </span>
            <span className="arrow text-white hidden group-hover:block">➜</span>
          </div>
        </Link>
      </div>
      <div className="h-[80%] flex justify-center items-start pt-5 pb-10">
        <div className=" bg-background rounded-[0.7rem] p-[1.4rem] pb-5 mt-[2rem] sm:mt-[3.5rem] w-[82.5%] xs:w-[90%] sm:w-[75%] md:w-[65%] lg:w-[50%] h-[auto] text-textColorDark">
          <h3 className="w-full flex justify-center items-center -mt-[6px] -mb-2 xs:mt-0 xs:mb-0 text-xl xs:text-2xl font-semibold cursor-default">
            Create an account
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mt-4 flex flex-col xs:flex-row justify-center items-start xs:gap-4 w-full">
              <div className="flex flex-col xs:gap-1 w-full xs:w-1/2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Firstname"
                  className={
                    "bg-inputBg py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-inputBorder " +
                    (errors.firstName
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                  required
                />
                {errors.firstName ? (
                  <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                    {errors.firstName}
                  </div>
                ) : (
                  <div className="text-xs md:text-sm opacity-40 ml-1 mt-[2px] xs:mt-[-2px]">
                    (e.g. Luke, Antonio, Xxxxx...)
                  </div>
                )}

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Lastname"
                  className={
                    "bg-inputBg py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-inputBorder " +
                    (errors.lastName
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                  required
                />
                {errors.lastName ? (
                  <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                    {errors.lastName}
                  </div>
                ) : (
                  <div className="text-xs md:text-sm opacity-40 ml-1 mt-[2px] xs:mt-[-2px]">
                    (e.g. Johnson, Lee, Xxxxx...)
                  </div>
                )}

                <input
                  type="text"
                  name="nickName"
                  value={formData.nickName}
                  onChange={handleChange}
                  placeholder="Nickname"
                  className={
                    "bg-inputBg py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-inputBorder " +
                    (errors.nickName
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                  required
                />
                {errors.nickName ? (
                  <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                    {errors.nickName}
                  </div>
                ) : (
                  <div className="text-xs md:text-sm opacity-40 ml-1 mt-[2px] xs:mt-[-2px]">
                    (e.g. king_12, Kin.9g, b_o_s_s...)
                  </div>
                )}

                <CountryInput handleCountry={handleCountry} />
              </div>

              <div className="flex flex-col w-full xs:gap-1 xs:w-1/2">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  className={
                    "bg-inputBg py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-inputBorder " +
                    (errors.email
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={50}
                  required
                />
                {errors.email ? (
                  <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                    {errors.email}
                  </div>
                ) : serverErrorMessage ? (
                  <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                    {serverErrorMessage}
                  </div>
                ) : (
                  <div className="text-xs md:text-sm opacity-40 ml-1 mt-[2px] xs:mt-[-2px]">
                    (e.g. sth@domain.hr, sth@g.c...)
                  </div>
                )}

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={
                    "bg-inputBg py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-inputBorder " +
                    (errors.password
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                  required
                />
                {errors.password ? (
                  <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                    {errors.password}
                  </div>
                ) : (
                  <div className="text-xs md:text-sm opacity-40 ml-1 mt-[2px] xs:mt-[-2px]">
                    (e.g. iamboss123, ASJfdac*+As...)
                  </div>
                )}

                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  placeholder="Team (optional)"
                  className={
                    "bg-inputBg py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-inputBorder " +
                    (errors.team
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                />
                {errors.team ? (
                  <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                    {errors.team}
                  </div>
                ) : (
                  <div className="text-xs md:text-sm opacity-40 ml-1 mt-[2px] xs:mt-[-2px]">
                    (e.g. Janje Alfa Team, Chillersi...)
                  </div>
                )}

                <input
                  type="text"
                  name="league"
                  value={formData.league}
                  onChange={handleChange}
                  placeholder="League (optional)"
                  className={
                    "bg-inputBg py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-inputBorder " +
                    (errors.league
                      ? "border-[1.5px] border-red-500 outline-red-500"
                      : "outline-indigo-500")
                  }
                  maxLength={20}
                />
                {errors.league && (
                  <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                    {errors.league}
                  </div>
                )}
              </div>
            </div>

            <div className="buttons ml-2 mt-[1.4rem] xs:mt-[3rem] flex justify-center items-center">
              <button
                type="submit"
                className="text-sm xs:text-base cursor-pointer rounded-[0.5rem] mr-3 py-[0.45rem] px-[0.9rem] bg-indigo-500 text-buttonLetter hover:bg-indigo-700 transition duration-300 md:py-2 md:px-[1.8rem]"
              >
                Continue
              </button>
              <Link href={"/"} className="no-underline">
                <button className="text-sm xs:text-base cursor-pointer mr-2 py-[0.45rem] px-[1.3rem] bg-gray-500 text-buttonLetter rounded-[0.5rem] hover:bg-red-600 transition duration-300 md:py-2 md:px-[1.8rem]">
                  Close
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
