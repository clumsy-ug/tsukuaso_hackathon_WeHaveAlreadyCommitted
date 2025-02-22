import { ChangeEvent } from "react";

export interface LoginProps {
  sectionNumber: number;
  onMailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurMailInput: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  isMailInputEmpty: boolean;
  onPassChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurPassInput: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  isPassInputEmpty: boolean;
  mailAddress: string;
  password: string;
  onLoginSubmit: () => void;
}

export interface SignupProps {
  sectionNumber: number;
  onMailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurMailInput: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  isMailInputEmpty: boolean;
  onPassChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurPassInput: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  isPassInputEmpty: boolean;
  mailAddress: string;
  password: string;
  onSignupSubmit: () => void;
}
