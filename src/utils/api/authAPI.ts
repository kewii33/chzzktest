import { clientSupabase } from "@/utils/supabase/client";

export const getUserId = async () => {
  const {
    data: { user },
    error,
  } = await clientSupabase.auth.getUser();
  if (error) {
    return { status: "fail", result: error } as const;
  }
  return { status: "success", result: user!.id } as const;
};

export const getUserNickname = async () => {
  const {
    data: { user },
    error,
  } = await clientSupabase.auth.getUser();
  if (error) {
    return { status: "fail", result: error } as const;
  }
  return { status: "success", result: user?.user_metadata.nickname } as const;
};

export const googleLogin = async () => {
  const { data, error } = await clientSupabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
        // scope: "https://www.googleapis.com/auth/youtube.readonly ",
      },
      redirectTo: "/",
    },
  });
  if (data) {
    console.log("구글 로그인 성공");
  }
  if (error) {
    return console.error("구글 로그인 에러:", error);
  }
};

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
//   const nickname = user.user_metadata.nickname || "";
//   const avatar_url = user.user_metadata.avatar_url || "";

//   const { data, error: insertError } = await clientSupabase
//     .from("users")
//     .insert([{ email, nickname, avatar_url }]);

//   if (insertError) {
//     console.error("사용자 정보를 저장하는 중 에러 발생:", insertError);
//   } else {
//     console.log("사용자 정보가 성공적으로 저장되었습니다:", data);
//   }
// };
