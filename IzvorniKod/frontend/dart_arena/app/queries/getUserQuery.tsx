"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiCall } from "@/api";

export interface User {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  country: string;
  joinDate: string;
  team: string;
  league: string;
  dartsName: string;
  dartsWeight: number;
  profileImgURL: string;
}

export const useGetUser = () => {
  const router = useRouter();
  return useQuery({
    queryKey: ["user"],
    retry: 10,
    queryFn: async () => {
      const [data, status] = await apiCall(`/user/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (status !== 200) {
        console.log("Fetching user failed with status: " + status);
        return null;
      }

      return data;
    },
  });
};

/* 
React Query (TanStack Query) je moćna biblioteka za upravljanje podacima koje dohvaćaš s API-ja. 
Umjesto da sam ručno radiš useEffect, fetch, loading, error 
i refetch logiku — React Query to automatski rješava za tebe.
*/
