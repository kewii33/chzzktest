"use client";

import Link from "next/link";
import { BsYoutube } from "react-icons/bs";
import SignInIconDropdown from "./SignInIconDropdown";
import SearchInput from "./SearchInput";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUserDataQuery } from "@/hooks/useQueries/useUserQuery";

import { USER_DATA_QUERY_KEY } from "@/query/user/userQueryKey";
import { clientSupabase } from "@/utils/supabase/client";
import UserIconDropdown from "./UserIconDropdown";
import { useRouter } from "next/navigation";

// const saveUserData = async () => {
//   const {
//     data: { user },
//     error,
//   } = await clientSupabase.auth.getUser();
//   if (error || !user) {
//     console.error("사용자 정보를 가져오는 중 에러 발생:", error);
//     return;
//   }
//   const email = user.email || "";
//   const nickname = user.user_metadata?.name;
//   const avatar_url = user.user_metadata?.avatar_url;

//   const { data, error: insertError } = await clientSupabase
//     .from("users")
//     .upsert([
//       {
//         email,
//         nickname,
//         avatar_url,
//       },
//     ]);
//   if (insertError) {
//     console.error("사용자 정보를 저장하는 중 에러 발생", insertError);
//   } else {
//     console.log("사용자 정보가 성공적으로 저장되었습니다:", data);
//   }
// };

export default function NavbarContents() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    data: user,
    isPending,
    isError,
    error,
    isLoggedIn,
  } = useGetUserDataQuery();

  //   if (isPending) {
  //     return <span>Loading...</span>;
  //   }
  //   if (isError) {
  //     return <span>{error?.message}</span>;
  //   }

  // if (user) {
  //   saveUserData();
  // }

  // console.log(user);

  return (
    <header className="flex justify-center shrink-0 py-[10px] h-auto sticky z-50 top-0 inset-x-0 backdrop-blur-lg bg-white bg-opacity-70 w-full">
      <div className="flex items-center justify-between w-full ml-8 mr-8">
        <div>
          <Link href="/">
            <div className="flex items-center">
              <BsYoutube />
              <h1 className="ml-2">{"BlockTube"}</h1>
            </div>
          </Link>
        </div>
        <div>
          <SearchInput />
        </div>
        <div className="flex items-center">
          {isLoggedIn ? <UserIconDropdown /> : <SignInIconDropdown />}
        </div>
      </div>
    </header>
  );
}
