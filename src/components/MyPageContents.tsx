"use client";

import { useGetUserDataQuery } from "@/hooks/useQueries/useUserQuery";
import Image from "next/image";
import MyPageTabs from "./MyPageTabs";
import { fullTimeAgo } from "@/utils/fullTimeAgo";

export default function MyPageContents() {
  const {
    data: user,
    isPending,
    isError,
    error,
    isLoggedIn,
  } = useGetUserDataQuery();

  const thumbnailUrl = user?.avatar_url as string;
  const userCreateAt = user?.created_at as string;

  return (
    <div>
      <div className="flex">
        <div>
          <Image
            width={50}
            height={50}
            alt="유저 썸네일"
            src={thumbnailUrl}
            className="rounded-full"
          />
        </div>
        <div>
          <p>{user?.full_name}</p>
          <p>{user?.email}</p>
          <p>{fullTimeAgo(userCreateAt)}</p>
        </div>
      </div>
      <div>
        <MyPageTabs />
      </div>
      <div></div>
    </div>
  );
}
