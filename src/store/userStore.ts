import { UserType } from "@/types/userTypes";
import { create } from "zustand";

type UserState = {
  user: UserType | null;
  isLoggedIn: boolean;

  setUser: (data: UserType | null) => void;
  ClearUser: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const userStore = create<UserState>()((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({user}),
    ClearUser: () => set({user: null}),
    setIsLoggedIn: (isLoggedIn) => set({isLoggedIn})
}))
