"use client";

import { useGetUserMatches } from "../queries/getUserMatchesQuery";
import MatchModal from "./MatchModal";
import { useGetUser } from "../queries/getUserQuery";

export default function ViewMatchesStatistics() {
  const matchQuery = useGetUserMatches();
  const userQuery = useGetUser();

  if(!matchQuery.data || matchQuery.data.length === 0){
    return (
      <div className="h-full text-textColorDark flex flex-col justify-center items-center gap-2">
        No matches played yet.
      </div>
    );
  }

  if (matchQuery.isLoading || matchQuery.isPending || userQuery.isLoading) {
    return (
      <div className="h-full text-textColorDark flex flex-col justify-center items-center gap-2">
        <div>Loading...</div>
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  return (
    <div className="pt-5 w-full flex flex-col justify-center items-center gap-3">
      {matchQuery.data?.map((m:any, i:number) => (
        <div key={i} className="w-full h-[9.5rem] cursor-pointer">
            <MatchModal match={m} />
        </div>
      ))}
    </div>
  );
}
