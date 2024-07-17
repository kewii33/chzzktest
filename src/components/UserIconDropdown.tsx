import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { useGetUserDataQuery } from "@/hooks/useQueries/useUserQuery";
import { useQueryClient } from "@tanstack/react-query";
import { clientSupabase } from "@/utils/supabase/client";
import { USER_DATA_QUERY_KEY } from "@/query/user/userQueryKey";
import { useRouter } from "next/navigation";

export default function UserIconDropdown() {
  const {
    data: user,
    isPending,
    isError,
    error,
    isLoggedIn,
  } = useGetUserDataQuery();
  const queryClient = useQueryClient();
  const router = useRouter();

  const signOut = async () => {
    await clientSupabase.auth.signOut();
    queryClient.invalidateQueries({
      queryKey: [USER_DATA_QUERY_KEY],
    });
    alert("로그아웃 되었습니다.");
    router.replace("/");
  };

  const route = useRouter();
  const goMyPage = () => {
    route.push("/mypage");
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={`${user?.avatar_url}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">{user?.full_name}님, 반갑습니다!</p>
          </DropdownItem>
          <DropdownItem key="settings" onClick={goMyPage}>
            마이페이지
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={signOut}>
            로그아웃
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
