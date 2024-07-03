"use client";

import { useGetUserDataQuery } from "@/hooks/useQueries/useUserQuery";
import Image from "next/image";
import MyPageTabs from "./MyPageTabs";

export default function MyPageContents() {
  const {
    data: user,
    isPending,
    isError,
    error,
    isLoggedIn,
  } = useGetUserDataQuery();

  const thumbnailUrl = user?.avatar_url as string;

  return (
    <div>
      <div className="flex">
        <div>
          <Image
            width={100}
            height={100}
            alt="유저 썸네일"
            src={thumbnailUrl}
          />
        </div>
        <div>
          <p>{user?.full_name}</p>
          <p>{user?.email}</p>
          <p>{user?.created_at}</p>
        </div>
      </div>
      <div>
        {/* <ul className="flex gap-4">
          <li>
            <p>좋아요한 동영상</p>
          </li>
          <li>
            <p>차단한 동영상</p>
          </li>
        </ul> */}
        <MyPageTabs />
      </div>
      <div></div>
    </div>
  );
}
