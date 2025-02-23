import { User } from "@supabase/supabase-js";

export interface PropsType {
  user: Promise<User | null>;
  santaPass: Promise<number | null>;
}
