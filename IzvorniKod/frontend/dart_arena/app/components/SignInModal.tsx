import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const inputOnChange = (e: any) => {
    setEmail(e.target.value);
    setServerErrorMessage("");
  };

  const passwordOnChange = (e: any) => {
    setPassword(e.target.value);
    setServerErrorMessage("");
  };

  const router = useRouter();

  // slanje i validacija podataka na backend-u
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    /*apiCall(`/auth`, {
      method: "POST",
      body: JSON.stringify({ user: { email: email, password: password } }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(([data, status]) => {
        if (status === 200) {
          localStorage.setItem("token", data.token);
          router.push("/homepage");
        } else {
          console.log(data);
          setServerErrorMessage(data.error);
        }
      })
      .catch((error) => {
        setServerErrorMessage(error.message);
      });*/
  };

  return (
    <>
      <div className="bg-background text-textColorDark rounded-[1rem] h-[31rem] w-[90%] xs:w-[65%] sm:w-[58%] md:w-[47%] lg:w-[38%] border-2 border-background flex flex-col p-8 justify-between">
        <div>
          <h2 className="font-bold text-[21px] sm:text-[22px] md:text-[24px] lg:text-[26px] mb-4 cursor-default">
            Welcome back 👋
          </h2>
          <p className="sm:text-[16px] md:text-[18px] cursor-default">Ready to play ?🎯</p>
          <p className="sm:text-[16px] md:text-[18px] mb-3 cursor-default">
            Hurry up and sign in.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              onChange={inputOnChange}
              placeholder="me@example.com"
              className={
                "bg-inputBg py-2 px-3 w-full rounded-md mt-3 " +
                (serverErrorMessage
                  ? "border-[1.5px] border-red-500 outline-red-500"
                  : "outline-indigo-500")
              }
              maxLength={50}
              required
            />
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                onChange={passwordOnChange}
                placeholder="password"
                className={
                  "bg-inputBg py-2 px-3 w-full rounded-md mt-3 " +
                  (serverErrorMessage
                    ? "border-[1.5px] border-red-500 outline-red-500"
                    : "outline-indigo-500")
                }
                maxLength={20}
                required
              />
              {show ? (
                <FiEyeOff
                  className="absolute top-6 right-2 cursor-pointer"
                  onClick={() => setShow(!show)}
                />
              ) : (
                <FiEye
                  className="absolute top-6 right-2 cursor-pointer"
                  onClick={() => setShow(!show)}
                />
              )}
            </div>

            {serverErrorMessage && (
              <div
                style={{ color: "red" }}
                className="lg:text-[15px] break-all"
              >
                {serverErrorMessage}
              </div>
            )}

            <div className="buttons mt-3">
              <button
                type="submit"
                className="cursor-pointer bg-indigo-500 text-buttonLetter rounded-md px-4 py-2 mr-2 hover:bg-indigo-700 transition duration-300"
              >
                Sign in
              </button>

              <Link href="/">
                <button className="cursor-pointer bg-[#737380] text-buttonLetter rounded-md p-2 px-4 hover:bg-red-600 transition duration-300">
                  Close
                </button>
              </Link>
            </div>
          </form>
        </div>

        <div className="text-[17px]">
          <span className="cursor-default">Don't have an account?</span>
          <Link href="/sign-up">
            <button className="ml-[0.6rem] text-indigo-500 font-semibold cursor-pointer hover:scale-110 transition duration-300">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
