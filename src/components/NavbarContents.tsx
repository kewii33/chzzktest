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

  const signOut = async () => {
    await clientSupabase.auth.signOut();
    queryClient.invalidateQueries({
      queryKey: [USER_DATA_QUERY_KEY],
    });
    alert("로그아웃 성공");
    await router.replace("/");
  };

  console.log(user);

  return (
    <Navbar className="py-[20px] h-auto">
      <NavbarBrand>
        <Link href="/">
          <div className="flex">
            <BsYoutube />
            <h1>{"BlockTube"}</h1>
          </div>
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex">
        <NavbarItem>
          <SearchInput />
        </NavbarItem>
      </NavbarContent>
      <div>
        <NavbarContent>
          {isLoggedIn ? <UserIconDropdown /> : <SignInIconDropdown />}
        </NavbarContent>
      </div>
    </Navbar>
  );
}
