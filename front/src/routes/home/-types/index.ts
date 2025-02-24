import { User } from "@supabase/supabase-js";

export interface ShowInfoProps {
  user: Promise<User | null>;
  santaPass: Promise<number | null>;
}

export interface RegisterManagePassProps {
  message: string;
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export type Response = boolean
