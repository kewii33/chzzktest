import { Tables } from "./database.types";

export type UserType = Tables<"users">;

export interface IsValidateShow {
  [key: string]: boolean;
}

export interface LoginData {
  userId: string;
  password: string;
}

export type UserTypeFromTable = {
  avatar: string | null;
  created_at: string | null;
  gender: string | null;
  intro: string | null;
  login_email: string;
  nickname: string | null;
  user_id: string;
};
