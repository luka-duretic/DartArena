"use client"

import { apiCall } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllStats = (mode:string) => {
  return useQuery({
    queryKey: ["stats-all-games"],
    retry: 10,
    queryFn: async () => {
      const [data, status] = await apiCall(`/match-participant/getStats/${mode}`, {
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