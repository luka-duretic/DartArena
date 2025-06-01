"use client";

import { useEffect, useState } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi2";
import { apiCall } from "@/api";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { IoMdRemoveCircle } from "react-icons/io";

interface MyJwtPayload {
  id: number;
  email: string;
  exp: number;
}

export default function GameStart({
  userInfo,
  formData,
  handleChange,
  handleSettings,
}: any) {
  const { token } = useAuth();
  const [opponent, setOponent] = useState({ name: "", profileImg: "" });
  const [newSubprofile, setNewSubprofile] = useState("");
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [error, setError] = useState("");
  const [deleted, setDeleted] = useState("");
  const [opponentList, setOponentList] = useState([]);
  const [subprofileList, setSubprofileList] = useState([]);
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    if (token) {
      apiCall(`/subprofile/all/${jwtDecode<MyJwtPayload>(token).id}`, {
        method: "GET",
      })
        .then(([data, status]) => {
          if (status === 200) {
            console.log(data);
            setSubprofileList(data);
          } else {
            setError(error);
          }
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [open, deleted]);

  const searchUser = (e: any) => {
    if (e.target.value) {
      apiCall(`/user/search/${e.target.value}`, {
        method: "GET",
      })
        .then(([data, status]) => {
          if (status === 200) {
            setOpenList(true);
            setOponentList(data);
            console.log(data);
          } else {
            console.log(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const createSubprofile = () => {
    const data = new FormData();
    data.append("nickname", newSubprofile);
    apiCall(`/subprofile/create/${jwtDecode<MyJwtPayload>(token).id}`, {
      method: "POST",
      body: data,
    })
      .then(([data, status]) => {
        if (status === 200) {
          console.log(data);
          setCreateOpen(false);
          setOpen(true);
        } else {
          setError(data.split(": ")[1]);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const deleteSubprofile = (id: any) => {
    apiCall(`/subprofile/delete/${id}`, {
      method: "DELETE",
    })
      .then(([data, status]) => {
        console.log(data);
        setDeleted(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubprofile = (e: any) => {
    const newProfile = e.target.value;
    setNewSubprofile(newProfile);
  };

  return (
    <>
      <div className="flex flex-col gap-4 justify-between items-center p-5 bg-modalBg rounded-lg shadow-lg shadow-modalShadow hover:scale-[102%] transition duration-300">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2 items-center">
            <div className="rounded-full bg-background2 p-[6px]">
              <BiSolidUserDetail className="text-textColorDark h-7 w-7" />
            </div>
            <span className="font-semibold text-xl text-textColorDark">
              PLAYER DETAILS
            </span>
          </div>
          <div className="flex">
            <label className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white text-textColorDark bg-modalBg border-[1.5px] border-textColorDark rounded-tl-lg rounded-bl-lg w-40 h-9 flex justify-center items-center transition duration-250">
              <input
                type="radio"
                className="opacity-0 absolute"
                onChange={handleChange}
                name="mode"
                value="training"
                required
                defaultChecked
              />
              Training
            </label>
            <label className="has-[:checked]:bg-indigo-500 has-[:checked]:border-none has-[:checked]:text-white text-textColorDark bg-modalBg border-[1.5px] border-textColorDark rounded-tr-lg rounded-br-lg w-40 h-9 flex justify-center items-center transition duration-250">
              <input
                type="radio"
                className="opacity-0 absolute"
                onChange={handleChange}
                name="mode"
                value="duel"
                required
              />
              Duel
            </label>
          </div>
        </div>
        <div
          className={
            "flex items-center w-full" +
            (formData.mode === "training"
              ? " justify-center"
              : " justify-around")
          }
        >
          <div className="flex flex-col justify-center items-center gap-2">
            {userInfo?.profileImgURL ? (
              <img
                src={userInfo?.profileImgURL}
                alt="profile picture"
                className="object-cover h-17 w-17 border-2 border-indigo-600 rounded-full p-0 m-0"
              />
            ) : (
              <FaRegUser className="p-1 h-17 w-17 text-indigo-500 border-4 border-indigo-500 rounded-full" />
            )}
            <span className="flex justify-center font-medium text-textColorDark text-lg">
              {userInfo?.nickName}
            </span>
          </div>
          {formData.mode === "duel" && (
            <span className="text-textColorDark text-2xl font-semibold">
              vs
            </span>
          )}
          {formData.mode === "duel" &&
            (opponent.name !== "" ? (
              <div className="flex flex-col justify-center items-center">
                <div className="relative">
                  <IoMdRemoveCircle
                    className="absolute top-[10%] left-[75%] h-4 w-4 text-red-500 hover:scale-115 transition duration-300"
                    onClick={() => setOponent({ name: "", profileImg: "" })}
                  />
                  {opponent?.profileImg ? (
                    <img
                      src={opponent?.profileImg}
                      alt="profile picture"
                      className="object-cover h-17 w-17 border-2 border-indigo-600 rounded-full p-0 m-0"
                    />
                  ) : (
                    <HiUserCircle className="h-17 w-17 text-indigo-500 rounded-full" />
                  )}
                </div>
                <span className="flex justify-center font-medium text-textColorDark text-lg">
                  {opponent.name}
                </span>
              </div>
            ) : (
              <div>
                <IoIosAddCircleOutline
                  className="h-17 w-17 text-textColorDark cursor-pointer"
                  onClick={() => setOpen(true)}
                />
              </div>
            ))}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 flex justify-center items-center">
          <div className="h-[21rem] w-[45%] bg-background rounded-lg flex flex-col items-center gap-6 p-5">
            <div className="flex justify-between items-center w-full">
              <div></div>
              <span className="text-textColorDark text-lg font-semibold">
                SELECT USER OPPONENT
              </span>
              <div
                className="group w-7 h-7 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <IoCloseCircleOutline className="h-6 w-6 text-textColorDark group-hover:hidden" />
                <IoCloseCircle className="h-6 w-6 hidden group-hover:flex text-red-500 transition duration-300" />
              </div>
            </div>
            <div className="w-full relative">
              <input
                type="text"
                name="nickName"
                onChange={searchUser}
                onFocus={() => setOpenList(true)}
                onBlur={() => setTimeout(() => setOpenList(false), 500)}
                placeholder="Enter user's nickname 🔎"
                className={
                  "bg-inputBg py-2 px-3 w-full text-sm xs:text-base rounded-md border-[1.5px] border-background2/20 outline-indigo-500"
                }
                maxLength={20}
                required
              />
              {openList && (
                <div className="absolute bg-modalBg z-30 h-30 w-full rounded-md mt-1 p-3 flex flex-col gap-2 overflow-x-auto">
                  {opponentList.length === 0 && (
                    <div key={2312} className="text-textColorDark/50">
                      No user found.
                    </div>
                  )}
                  {opponentList.map((op: any) => (
                    <div
                      key={op.joinDate}
                      className="p-2 text-textColorDark/50 rounded-lg flex gap-3 items-center hover:bg-background/70"
                      onClick={() => {
                        setOponent({name: op.nickName, profileImg: op?.profileImgURL});
                        setOpen(false);
                        handleSettings({ players: [userInfo.email, op.email] });
                      }}
                    >
                      {op?.profileImgURL ? (
                        <img
                          src={op?.profileImgURL}
                          alt="profile picture"
                          className="object-cover h-10 w-10 border-2 border-indigo-600 rounded-full p-0 m-0"
                        />
                      ) : (
                        <FaRegUser className="p-1 h-10 w-10 text-indigo-500 border-2 border-indigo-500 rounded-full" />
                      )}
                      <span key={op.id + "1"} className="text-textColorDark">
                        {op.nickName}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="text-textColorDark font-semibold w-[70%] break-before flex flex-col justify-center items-center">
              <span>Your friend doesn't have an account, don't worry</span>
              <span>you can use temporary user instead</span>
            </div>
            <div className="w-[90%] overflow-x-auto overflow-y-hidden px-4">
              <div className="inline-flex gap-2 items-center min-w-full justify-center">
                {subprofileList.map((op: any) => (
                  <div
                    key={op.id}
                    className="flex flex-col items-center hover:scale-[107%] transition duration-300"
                  >
                    <div className="relative">
                      <IoMdRemoveCircle
                        className="absolute top-[10%] left-[75%] h-4 w-4 text-red-500 hover:scale-115 transition duration-300"
                        onClick={() => deleteSubprofile(op.id)}
                      />
                      <HiUserCircle
                        className="h-17 w-17 text-textColorDark cursor-pointer"
                        onClick={() => {
                          setOponent({name: op.nickName, profileImg: ""});
                          setOpen(false);
                          handleSettings({
                            players: [userInfo.email, op.nickName],
                          });
                        }}
                      />
                    </div>
                    <span className="text-textColorDark font-medium">
                      {op.nickName}
                    </span>
                  </div>
                ))}

                <div key={341414} className="flex flex-col items-center">
                  <IoIosAddCircleOutline
                    className="h-17 w-17 text-textColorDark hover:scale-105 transition duration-300 cursor-pointer"
                    onClick={() => {
                      setOpen(false);
                      setCreateOpen(true);
                    }}
                  />
                  <span className="text-textColorDark font-medium opacity-0">
                    hidden
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {createOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 flex justify-center items-center">
          <div className="h-[15rem] w-[35%] bg-background rounded-lg flex flex-col items-center gap-6 p-5">
            <span className="font-semibold text-textColorDark text-lg">
              CREATE NEW SUBPROFILE
            </span>
            <div className="flex flex-col w-full">
              <input
                type="text"
                name="nickName"
                placeholder="Enter new subprofiles nickname"
                className={
                  "bg-inputBg py-2 px-3 w-full text-sm xs:text-base rounded-md border-[1.5px] border-background2/20 outline-indigo-500"
                }
                onChange={handleSubprofile}
                maxLength={20}
                required
              />
              {error && (
                <div className="text-red-500 w-full flex justify-center">
                  {error}.
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <button
                className="text-white font-semibold bg-teal-500 hover:bg-teal-600 hover:scale-105 transition duration-300 p-2 w-25 rounded-lg"
                onClick={createSubprofile}
              >
                Create
              </button>
              <button
                className="text-white font-semibold bg-red-500/80 hover:bg-red-600 hover:scale-105 transition duration-300 p-2 w-25 rounded-lg"
                onClick={() => {
                  setCreateOpen(false);
                  setOpen(true);
                }}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
