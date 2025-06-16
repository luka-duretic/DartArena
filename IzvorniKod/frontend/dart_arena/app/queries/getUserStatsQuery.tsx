"use client";

import { apiCall } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  id: number;
  email: string;
  exp: number;
}

export const useGetUserStats = () => {
  return useQuery({
    queryKey: ["user-stats"],
    retry: 10,
    queryFn: async () => {
      const token = localStorage.getItem("token");
      let userId;
      if (token) userId = jwtDecode<MyJwtPayload>(token).id;

      const [data, status] = await apiCall(`/userstats/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (status !== 200) {
        console.log("Fetching user stats with status: " + status);
        return null;
      }
      console.log(data);

      return data;
    },
  });
};
