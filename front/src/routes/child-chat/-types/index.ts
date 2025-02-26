export interface PassModalProps {
  message: string;
  setPassOk: React.Dispatch<React.SetStateAction<boolean>>;
  room: string;
}

export type Response = boolean
