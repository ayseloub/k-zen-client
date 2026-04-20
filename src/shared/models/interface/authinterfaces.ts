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

export interface IUserProfile {
  id: number | null;
  avatar: string | null;
  email: string;
  fullname: string;
  nik: string | null;
  gender: string | null;
  phone: string | null;
  address: string | null;
  domicile_address: string | null;
  religion: string | null;
  place_of_birth: string | null;
  date_of_birth: string | null;
  last_education: string | null;
  major: string | null;
  height: number | null;
}

export type IUserProfileResponse = ApiResponse<IUserProfile>;

export interface IUpdateProfilePayload {
  avatar?: File | null;
  fullname?: string;
  nik?: string;
  gender?: string;
  phone?: string;
  address?: string;
  domicile_address?: string;
  religion?: string;
  place_of_birth?: string;
  date_of_birth?: string;
  last_education?: string;
  major?: string;
  height?: string;

  ktp?: File | null;
  kk?: File | null;
  akta_kelahiran?: File | null;

  ijazah?: File | null;
}

export type IUpdateProfileResponse = ApiResponse<IUserProfile>;