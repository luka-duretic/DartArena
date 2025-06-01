import { GiArrowFlights } from "react-icons/gi";

export default function ProfileDetails({
  user,
  data,
  errors,
  serverError,
  handleChange,
  handleChangeNum
}: any) {

  return (
    <div className="h-[98%] p-4 flex gap-1 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300">
      <div className="flex flex-col gap-1 w-[50%]">
        <div className="p-2 bg-background2/55 h-[7rem] rounded-lg w-full">
          <span className="font-semibold text-base pl-1">FIRSTNAME</span>
          <div className="flex gap-1 justify-start items-center w-full">
            <GiArrowFlights className="h-5 w-5 mt-2" />
            <div className="w-full">
              <input
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                placeholder="-"
                className={
                  "bg-background2/20 py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-background2/20 " +
                  (errors.firstName
                    ? "border-[1.5px] border-red-500 outline-red-500"
                    : "outline-indigo-500")
                }
                maxLength={20}
                required
              />
              {errors.firstName && (
                <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                  {errors.firstName}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2 bg-background2/55 h-[7rem] rounded-lg w-full">
          <span className="font-semibold text-base pl-1">LASTNAME</span>
          <div className="flex gap-1 justify-start items-center w-full">
            <GiArrowFlights className="h-5 w-5 mt-2" />
            <div className="w-full">
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                placeholder="-"
                className={
                  "bg-background2/20 py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-background2/20 " +
                  (errors.lastName
                    ? "border-[1.5px] border-red-500 outline-red-500"
                    : "outline-indigo-500")
                }
                maxLength={20}
                required
              />
              {errors.lastName && (
                <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2 bg-background2/55 h-[7rem] rounded-lg w-full">
          <span className="font-semibold text-base pl-1">EMAIL</span>
          <div className="flex gap-1 justify-start items-center w-full">
            <GiArrowFlights className="h-5 w-5 mt-2" />
            <div className="w-full">
              <input
                type="text"
                name="email"
                value={data.email}
                placeholder="-"
                onChange={handleChange}
                className={
                  "bg-background2/20 py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-background2/20 " +
                  (errors.email
                    ? "border-[1.5px] border-red-500 outline-red-500"
                    : "outline-indigo-500")
                }
                maxLength={20}
                required
              />
              {errors.email && (
                <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                  {errors.email}
                </div>
              )}
              {serverError && (
                <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                  {serverError}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2 bg-background2/55 h-[7rem] rounded-lg w-full">
          <span className="font-semibold text-base pl-1">NICKNAME</span>
          <div className="flex gap-1 justify-start items-center w-full">
            <GiArrowFlights className="h-5 w-5 mt-2" />
            <div className="w-full">
              <input
                type="text"
                name="nickName"
                value={data.nickName}
                onChange={handleChange}
                placeholder="-"
                className={
                  "bg-background2/20 py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-background2/20 " +
                  (errors.nickName
                    ? "border-[1.5px] border-red-500 outline-red-500"
                    : "outline-indigo-500")
                }
                maxLength={20}
                required
              />
              {errors.nickName && (
                <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                  {errors.nickName}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-[50%]">
        <div className="p-2 bg-background2/55 h-[7rem] rounded-lg w-full">
          <span className="font-semibold text-base pl-1">DARTS NAME</span>
          <div className="flex gap-1 justify-start items-center w-full">
            <GiArrowFlights className="h-5 w-5 mt-2" />
            <div className="w-full">
              <input
                type="text"
                name="dartsName"
                value={data.dartsName }
                onChange={handleChange}
                placeholder="-"
                className={
                  "bg-background2/20 py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-background2/20 " +
                  (errors.dartsName
                    ? "border-[1.5px] border-red-500 outline-red-500"
                    : "outline-indigo-500")
                }
                maxLength={20}
                required
              />
              {errors.dartsName && (
                <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                  {errors.dartsName}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2 bg-background2/55 h-[7rem] rounded-lg w-full">
          <span className="font-semibold text-base pl-1">DARTS WEIGHT</span>
          <div className="flex gap-1 justify-start items-center w-full">
            <GiArrowFlights className="h-5 w-5 mt-2" />
            <div className="w-full">
              <input
                type="text"
                name="dartsWeight"
                value={data.dartsWeight || ""}
                onChange={handleChangeNum}
                placeholder="-"
                className={
                  "bg-background2/20 py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-background2/20 " +
                  (errors.dartsWeight
                    ? "border-[1.5px] border-red-500 outline-red-500"
                    : "outline-indigo-500")
                }
                maxLength={20}
                required
              />
              {errors.dartsWeight && (
                <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                  {errors.dartsWeight}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2 bg-background2/55 h-[7rem] rounded-lg w-full">
          <span className="font-semibold text-base pl-1">LEAGUE</span>
          <div className="flex gap-1 justify-start items-center w-full">
            <GiArrowFlights className="h-5 w-5 mt-2" />
            <div className="w-full">
              <input
                type="text"
                name="league"
                value={data.league}
                onChange={handleChange}
                placeholder="-"
                className={
                  "bg-background2/20 py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-background2/20 " +
                  (errors.league
                    ? "border-[1.5px] border-red-500 outline-red-500"
                    : "outline-indigo-500")
                }
                maxLength={20}
                required
              />
              {errors.league && (
                <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                  {errors.league}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2 bg-background2/55 h-[7rem] rounded-lg w-full">
          <span className="font-semibold text-base pl-1">TEAM</span>
          <div className="flex gap-1 justify-start items-center w-full">
            <GiArrowFlights className="h-5 w-5 mt-2" />
            <div className="w-full">
              <input
                type="text"
                name="team"
                value={data.team}
                onChange={handleChange}
                placeholder="-"
                className={
                  "bg-background2/20 py-2 px-3 w-full text-sm xs:text-base rounded-md mt-3 border-[1.5px] border-background2/20 " +
                  (errors.team
                    ? "border-[1.5px] border-red-500 outline-red-500"
                    : "outline-indigo-500")
                }
                maxLength={20}
                required
              />
              {errors.team && (
                <div className="text-red-700 text-xs md:text-sm ml-1 mt-[2px] xs:mt-[-2px]">
                  {errors.team}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
