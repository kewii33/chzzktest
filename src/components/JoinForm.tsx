// "use client";

// import { USER_DATA_QUERY_KEY } from "@/query/user/userQueryKey";
// import { clientSupabase } from "@/utils/supabase/client";
// import { Button } from "@nextui-org/react";
// import { useQueryClient } from "@tanstack/react-query";
// import { ChangeEventHandler, useState } from "react";

// export default function JoinForm() {
//   const [joinData, setJoinData] = useState({
//     email: "",
//     password: "",
//     nickname: "",
//   });
//   const onChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
//     const { name, value } = e.target;
//     setJoinData((prev) => ({ ...prev, [name]: value }));
//   };

//   const queryClient = useQueryClient();

//   const onSubmitHandler = async (e: React.FormEvent) => {
//     e.preventDefault();

//     //이메일 중복 검사
//     try {
//       const { data: emailData, error: emailError } = await clientSupabase
//         .from("users")
//         .select("email")
//         .eq("email", joinData.email)
//         .single();

//       if (emailData) {
//         alert("이미 사용중인 이메일입니다. 다른 이메일을 입력해주세요.");
//         return;
//       } else {
//         alert("이메일 확인용 메일이 발송되었습니다.");
//       }
//     } catch (error) {
//       console.error("Error during email validation", error);
//       alert("이메일 중복 검사 중 예상치 못한 오류가 발생했습니다.");
//       return;
//     }

//     //회원가입 처리
//     try {
//       const {
//         data: { session },
//         error,
//       } = await clientSupabase.auth.signUp({
//         email: joinData.email,
//         password: joinData.password,
//         options: {
//           data: { nickname: joinData.nickname },
//         },
//       });

//       if (error) {
//         throw error;
//       }

//       if (session) {
//         await queryClient.invalidateQueries({
//           queryKey: [USER_DATA_QUERY_KEY],
//         });
//         alert("회원가입 되었습니다.");

//         //초기화
//         setJoinData({
//           email: "",
//           password: "",
//           nickname: "",
//         });
//       } else if (error) {
//         throw error;
//       }
//     } catch (error: any) {
//       if (error.message.includes("already registered")) {
//         alert("이미 존재하는 계정입니다.");
//       } else {
//         alert("회원가입 중 오류가 발생했습니다.");
//       }
//       console.log("Error during sign up", error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <form onSubmit={onSubmitHandler}>
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={joinData.email}
//               placeholder="이메일을 입력하세요"
//               required
//               onChange={onChangeInput}
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               name="password"
//               value={joinData.password}
//               placeholder="비밀번호를 입력하세요"
//               required
//               onChange={onChangeInput}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               placeholder="닉네임을 입력하세요"
//               name="nickname"
//               value={joinData.nickname}
//               required
//               onChange={onChangeInput}
//             />
//           </div>
//           <Button type="submit">가입하기</Button>
//         </form>
//       </div>
//     </div>
//   );
// }
