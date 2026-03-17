import { ApiResponse } from "./generalinterfaces";

export interface ILoginPayloadRoot {
  email: string;
  password: string;
}

interface IAuthToken {
  token: string;
  type: "Bearer";
}

export type ILoginResponseRoot = ApiResponse<IAuthToken>;

export interface IRegisterPayloadRoot {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export type IRegisterResponseRoot = ApiResponse<null>;

export interface IVerifyOTPPayloadRoot {
  email: string;
  otp: string;
}

export type IVerifyOTPResponseRoot = ApiResponse<null>;

export interface IResendVerificationPayloadRoot {
  email: string;
}

export type IResendVerificationResponseRoot = ApiResponse<null>;

export interface IForgotPasswordPayloadRoot {
  email: string;
}

export type IForgotPasswordResponseRoot = ApiResponse<null>;

export interface IResetPasswordPayloadRoot {
  email: string;
  password: string;
  otp: string;
}

export type IResetPasswordResponseRoot = ApiResponse<null>;