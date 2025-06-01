"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineFlipCameraIos } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdRemoveDone } from "react-icons/md";
import countryList from "react-select-country-list";
import ProfileDetails from "@/app/components/ProfileDetails";
import { z } from "zod";
import { apiCall } from "@/api";
import { jwtDecode } from "jwt-decode";
import { useGetUser, User } from "@/app/queries/getUserQuery";

interface MyJwtPayload {
  id: number;
  email: string;
  exp: number;
}

interface UserStats {
  user: User | null;
  total170: number;
  total170Plus: number;
  total180: number;
  totalMatches: number;
}

const editSchema = z.object({
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
  email: z.string().email("Invalid email format"),
  dartsName: z
    .string()
    .min(4, "Darts name must be at least 4 characters long")
    .regex(/^[a-zA-Z][a-zA-Z0-9._\s]*$/, "Incorrect darts name format")
    .optional(),
  dartsWeight: z
    .number()
    .min(10, "Darts weight is between 10 and 50 grams")
    .max(50, "Darts weight is between 10 and 50 grams")
    .optional(),
  team: z
    .string()
    .min(4, "Team name must be at least 4 characters long")
    .regex(/^[a-zA-Z][a-zA-Z0-9._\s]*$/, "Incorrect team name format")
    .optional(),
  league: z
    .string()
    .min(4, "League name must be at least 4 characters long")
    .regex(/^[a-zA-Z][a-zA-Z0-9._\s]*$/, "Incorrect league name format")
    .optional(),
});

export default function ProfilePage() {
  const { token, logout } = useAuth();
  const userQuery = useGetUser();
  const [change, setChange] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [userStats, setUserStats] = useState<UserStats>({
    user: userQuery.data,
    total170: 0,
    total170Plus: 0,
    total180: 0,
    totalMatches: 0,
  });
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState({
    firstName: userQuery.data?.firstName,
    lastName: userQuery.data?.lastName,
    nickName: userQuery.data?.nickName,
    email: userQuery.data?.email || "",
    team: userQuery.data?.team || "",
    league: userQuery.data?.league || "",
    dartsName: userQuery.data?.dartsName || "",
    dartsWeight: userQuery.data?.dartsWeight || null,
  });

  const countries = useMemo(() => countryList().getData(), []);
  const myCountry = countries.find((f) => f.label === userQuery.data?.country);
  const flagUrl = `https://flagcdn.com/w40/${myCountry?.value.toLowerCase()}.png`;

  useEffect(() => {
    if (!token) return;    
  }, []);

  useEffect(() => {
    setFormData({
      firstName: userQuery.data?.firstName || "",
      lastName: userQuery.data?.lastName || "",
      nickName: userQuery.data?.nickName || "",
      email: userQuery.data?.email || "",
      team: userQuery.data?.team || "",
      league: userQuery.data?.league || "",
      dartsName: userQuery.data?.dartsName || "",
      dartsWeight: userQuery.data?.dartsWeight || null,
    });

    if (token) {
      let userId = jwtDecode<MyJwtPayload>(token).id;

      apiCall(`/userstats/${userId}`, {
        method: "GET",
      })
        .then(([data, status]) => {
          if (status === 200) {
            setUserStats(data);
          } else {
            console.log(data);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [userQuery.data, token]);

  if (userQuery.isLoading && !token) {
    return (
      <div className="absolute top-[50%] left-[50%] text-textColorDark flex flex-col justify-center items-center gap-2">
        <div>Loading...</div>
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  const handleImageUpload = (e: any) => {
    let image = e.target.files?.[0];
    if (image != null) {
      setSelectedFile(image);
      setSubmit(true);
    }
  };

  const submitImage = () => {    
    let userId = jwtDecode<MyJwtPayload>(token).id;

    const formDataFile = new FormData();
    if (selectedFile) {
      console.log(selectedFile);
      formDataFile.append("image", selectedFile);
    }

    apiCall(`/user/update-profile-picture/${userId}`, {
      method: "POST",
      body: formDataFile,
    })
      .then(([data, status]) => {
        if (status === 200) {
          console.log(data);
          userQuery.refetch();
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    setSubmit(false);
    setSelectedFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setChange(true);
  };

  const handleChangeNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
    setChange(true);
  };

  const handleSubmit = () => {
    setServerError("");
    setErrors({});

    try {
      const data = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          value === ""
            ? undefined
            : value === 0 || value === null
            ? undefined
            : value,
        ])
      );

      editSchema.parse(data);
      let userId = jwtDecode<MyJwtPayload>(token).id;

      apiCall(`/user/update/${userId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(([data, status]) => {
          if (status === 200) {
            console.log(data);
            setChange(false);
            userQuery.refetch();
          } else {
            console.log(data);
            setServerError(data);
          }
        })
        .catch((error) => {
          setServerError(error.message);
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

  const handleUndo = () => {
    setFormData({
      firstName: userQuery.data?.firstName || "",
      lastName: userQuery.data?.lastName || "",
      nickName: userQuery.data?.nickName || "",
      email: userQuery.data?.email || "",
      team: userQuery.data?.team || "",
      league: userQuery.data?.league || "",
      dartsName: userQuery.data?.dartsName || "",
      dartsWeight: userQuery.data?.dartsWeight || null,
    });
    setChange(false);
  };

  return (
    <div className="min-h-screen min-w-screen bg-background2 text-textColorDark flex justify-center items-start">
      {/* sadrzaj u sredini */}
      <div className="w-[55%] h-full bg-yellow flex flex-col gap-3 pt-5">
        {/* logo traka */}
        <div className="rounded-lg bg-gradient-to-l from-purple-500 to-purple-900 p-[2px]">
          <div
            className="w-full h-[12%] bg-cover flex justify-center items-center rounded-lg"
            style={{ backgroundImage: "url('/images/bg1.png')" }}
          >
            <img src="/images/logo.png" alt="logo" className="w-50 h-full" />
          </div>
        </div>
        {/* ostali modali */}
        <div className="flex flex-col gap-3 w-full h-[80vh]">
          {/* profile summary */}
          <div className="flex justify-between h-[25%] bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300">
            {/* left div */}
            <div className="flex flex-col justify-between p-4">
              <div className="flex gap-5 justify-center items-center">
                <div className="relative">
                  {userQuery.data?.profileImgURL ? (
                    <img
                      src={userQuery.data?.profileImgURL}
                      alt="profile picture"
                      className="object-cover h-20 w-20 border-2 border-indigo-600 rounded-full p-0 m-0"
                    />
                  ) : (
                    <FaRegUser className="p-1 h-20 w-20 text-indigo-500 border-4 border-indigo-500 rounded-full" />
                  )}
                  <label
                    htmlFor="imageUpload"
                    className="absolute text-indigo-500 top-13 left-13 h-8 w-8 rounded-full bg-background2 p-1"
                  >
                    <MdOutlineFlipCameraIos className="h-6 w-6 cursor-pointer" />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <span className="font-semibold text-2xl">
                  {userQuery.data?.nickName}
                </span>
              </div>
              <div className="opacity-50 flex gap-3 items-center justify-center">
                <i>Date joined: {userQuery.data?.joinDate.split("T")[0]}</i>
                <img src={flagUrl} alt="flag" className="h-4 w-7 mt-1"></img>
              </div>
            </div>
            {/* right div */}
            <div className="flex flex-col p-4 pr-6 justify-center items-center">
              {/* upper div */}
              <div className="flex">
                {/* left */}
                <div className="flex flex-col justify-center items-center border-r-2 border-b-2 w-40 p-1">
                  <div className="font-semibold text-2xl">
                    {userStats.total170Plus}
                  </div>
                  <div className="opacity-60 text-sm font-semibold">
                    170+ score
                  </div>
                </div>
                {/* right */}
                <div className="flex flex-col justify-center items-center border-b-2 border-l-2 w-40 p-1">
                  <div className="font-semibold text-2xl">
                    {userStats.total180}
                  </div>
                  <div className="opacity-60 text-sm font-semibold">
                    180s score
                  </div>
                </div>
              </div>
              {/* lower div */}
              <div className="flex">
                {/* left */}
                <div className="flex flex-col justify-center items-center border-t-2 border-r-2 w-40 p-1">
                  <div className="font-semibold text-2xl">
                    {userStats.total170}
                  </div>
                  <div className="opacity-60 text-sm font-semibold">
                    "Big fish" (170 finishes)
                  </div>
                </div>
                {/* right */}
                <div className="flex flex-col justify-center items-center border-t-2 border-l-2 w-40 p-1">
                  <div className="font-semibold text-2xl">
                    {userStats.totalMatches}
                  </div>
                  <div className="opacity-60 text-sm font-semibold">
                    matches played
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* profile data */}
          <div className="relative h-[75%] w-full">
            <ProfileDetails
              user={userQuery.data}
              data={formData}
              errors={errors}
              serverError={serverError}
              handleChange={handleChange}
              handleChangeNum={handleChangeNum}
            />
            {/* gumbi za potvrdu/odbacivanje promjena informacija profila */}
            {change && (
              <div className="absolute top-[83%] left-[103%] flex flex-col gap-2">
                <div
                  className="group hover:bg-gray-300 hover:scale-110 transition duration-300 rounded-xl p-1 cursor-pointer"
                  onClick={handleSubmit}
                >
                  <IoCheckmarkDoneOutline className="h-6 w-6 text-green-500 group-hover:scale-110 transition duration-300 " />
                </div>
                <div
                  className="group hover:bg-gray-300 hover:scale-110 transition duration-300 rounded-xl p-1 cursor-pointer"
                  onClick={handleUndo}
                >
                  <MdRemoveDone className="h-6 w-6 text-red-500 group-hover:scale-110 transition duration-300 " />
                </div>
              </div>
            )}
            {/* modal za submit nove slike */}
            {submit && selectedFile && (
              <div className="inset-0 fixed flex justify-center items-center gap-2 bg-black/30">
                <div className="bg-modalBg p-7 flex flex-col gap-4 rounded-xl">
                  <div className="flex gap-2 justify-center items-center">
                    <span>
                      Are you sure you want to upload this profile picture?{" "}
                      <br />
                      Once submitted, it will replace your current profile
                      image.
                    </span>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="new photo"
                      className="object-cover rounded-full h-15 w-15 border-2 border-textColorDark"
                    />
                  </div>
                  <div className="bg-textColorDark h-[2px]"></div>

                  <div className="flex gap-2 justify-center items-center">
                    <div
                      className="group hover:bg-background2 hover:scale-110 transition duration-300 rounded-xl p-[6px] cursor-pointer"
                      onClick={submitImage}
                    >
                      <IoCheckmarkDoneOutline className="h-6 w-6 text-green-500 group-hover:scale-110 transition duration-300 " />
                    </div>
                    <div
                      className="group hover:bg-background2 hover:scale-110 transition duration-300 rounded-xl p-[6px] cursor-pointer"
                      onClick={() => {
                        setSubmit(false);
                        setSelectedFile(null);
                      }}
                    >
                      <MdRemoveDone className="h-6 w-6 text-red-500 group-hover:scale-110 transition duration-300 " />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
