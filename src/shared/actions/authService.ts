'use server'

import { cookies } from 'next/headers';
import { ILoginPayloadRoot, 
        ILoginResponseRoot,
        IResendVerificationResponseRoot,
        IRegisterPayloadRoot,
        IRegisterResponseRoot,
        IVerifyOTPPayloadRoot, 
        IVerifyOTPResponseRoot, 
        IResendVerificationPayloadRoot,
        IForgotPasswordPayloadRoot,
        IForgotPasswordResponseRoot,
        IResetPasswordPayloadRoot,
        IResetPasswordResponseRoot } 
from "@/shared/models/interface/authinterfaces";

const BASE_API_URL = process.env.BASE_API_URL;

interface ILoginResult {
  success: boolean;
  message: string;
  token?: string;
}

interface IActionResult {
  success: boolean;
  message: string;
}

export async function login(request: ILoginPayloadRoot): Promise<ILoginResult> {
  try {
    if (!BASE_API_URL) {
      throw new Error('API URL is not configured');
    }

    const response = await fetch(`${BASE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(request),
      cache: 'no-store',
    });

    const data: ILoginResponseRoot = await response.json();

    console.log('[api response status]', response.status);
    console.log('[api response data]', data);

    if (!response.ok || data.status !== 'success') {
      return {
        success: false,
        message: data.message || 'Login gagal',
      };
    }

    const cookieStore = await cookies();
    cookieStore.set('token', data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return {
      success: true,
      token: data.data.token,
      message: data.message,
    };

  } catch (error) {
    console.error('[login error detail]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan saat login',
    };
  }
}

export async function register(request: IRegisterPayloadRoot): Promise<IActionResult> {
  try {
    if (!BASE_API_URL) throw new Error('API URL is not configured');

    const response = await fetch(`${BASE_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(request),
      cache: 'no-store',
    });

    const data: IRegisterResponseRoot = await response.json();

    if (!response.ok || data.status !== 'success') {
      return { success: false, message: data.message || 'Registrasi gagal' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('[register error]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan saat registrasi',
    };
  }
}

export async function verifyOTP(request: IVerifyOTPPayloadRoot): Promise<IActionResult> {
  try {
    if (!BASE_API_URL) throw new Error('API URL is not configured');

    const response = await fetch(`${BASE_API_URL}/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(request),
      cache: 'no-store',
    });

    const data: IVerifyOTPResponseRoot = await response.json();

    if (!response.ok || data.status !== 'success') {
      return { success: false, message: data.message || 'Verifikasi gagal' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('[verifyOTP error]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan saat verifikasi',
    };
  }
}

export async function resendVerification(request: IResendVerificationPayloadRoot): Promise<IActionResult> {
  try {
    if (!BASE_API_URL) throw new Error('API URL is not configured');

    const response = await fetch(`${BASE_API_URL}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(request),
      cache: 'no-store',
    });

    const data: IResendVerificationResponseRoot = await response.json();

    if (!response.ok || data.status !== 'success') {
      return { success: false, message: data.message || 'Gagal mengirim ulang kode' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('[resendVerification error]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan',
    };
  }
}

export async function forgotPassword(request: IForgotPasswordPayloadRoot): Promise<IActionResult> {
  try {
    if (!BASE_API_URL) throw new Error('API URL is not configured');

    const response = await fetch(`${BASE_API_URL}/auth/forget-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(request),
      cache: 'no-store',
    });

    const data: IForgotPasswordResponseRoot = await response.json();

    if (!response.ok || data.status !== 'success') {
      return { success: false, message: data.message || 'Gagal mengirim kode verifikasi' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('[forgotPassword error]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan',
    };
  }
}

export async function resetPassword(request: IResetPasswordPayloadRoot): Promise<IActionResult> {
  try {
    if (!BASE_API_URL) throw new Error('API URL is not configured');

    const response = await fetch(`${BASE_API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(request),
      cache: 'no-store',
    });

    const data: IResetPasswordResponseRoot = await response.json();

    if (!response.ok || data.status !== 'success') {
      return { success: false, message: data.message || 'Gagal mereset password' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('[resetPassword error]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan',
    };
  }
}

export async function googleCallback(code: string): Promise<ILoginResult> {
  try {
    if (!BASE_API_URL) throw new Error('API URL is not configured');

    const response = await fetch(`${BASE_API_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ code }),
      cache: 'no-store',
    });

    const data: ILoginResponseRoot = await response.json();

    if (!response.ok || data.status !== 'success') {
      return { success: false, message: data.message || 'Login Google gagal' };
    }

    const cookieStore = await cookies();
    cookieStore.set('token', data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: true, token: data.data.token, message: data.message };
  } catch (error) {
    console.error('[googleCallback error]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan',
    };
  }
}