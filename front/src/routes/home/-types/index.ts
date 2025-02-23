export interface ShowInfoProps {
  santaPass: Promise<number | null>;
}

export interface RegisterManagePassProps {
  message: string;
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export type Response = boolean
