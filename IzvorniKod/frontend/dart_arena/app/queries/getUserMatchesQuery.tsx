"use client"

import { apiCall } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetUserMatches = () => {
  return useQuery({
    queryKey: ["user-matches"],
    retry: 10,
    queryFn: async () => {
      const [data, status] = await apiCall(`/match/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (status !== 200) {
        console.log("Fetching user failed with status: " + status);
        return null;
      }
      console.log(data);
      
      return data;
    },
  });
};