"use client";

import { userStore } from "@/store/userStore";
import { clientSupabase } from "@/utils/supabase/client";
import React, { useEffect } from "react";

export default function InitUser() {
  const { isLoggedIn, setIsLoggedIn, setUser } = userStore((state) => state);
  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await clientSupabase.auth.getUser();
      console.log("현재 로그인한 사용자 정보:", user);
      if (user) {
        setIsLoggedIn(true);
        const { data: userData } = await clientSupabase
          .from("users")
          .select("*")
          .eq("user_id", String(user?.id));
        if (userData && userData[0]) {
          setUser(userData[0]);
        }
      } else {
        setUser(null);
      }
    };
    fetchUserData();
  }, [isLoggedIn, setIsLoggedIn, setUser]);
  return;
  <></>;
}
