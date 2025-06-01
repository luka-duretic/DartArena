"use client"

import { apiCall } from "@/api";
import { Match } from "../interfaces/match";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const fetchUserByEmail = async (email: string) => {
    const [data, status] = await apiCall(`/user/get/${email}`, {
      method: "GET",
    });

    if (status === 200) {
      try {
        let tmp = data;
        return tmp;
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else console.log(data);
    return "error";
};

// salji na backend
export const submitMatchData = (data:Match, back:string, router:AppRouterInstance) => {  
    apiCall(`/match/save`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(([data, status]) => {
        if (status === 200) {
          console.log(data.message);
          alert("Match archived.");
          router.push("/games/" + back);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
};