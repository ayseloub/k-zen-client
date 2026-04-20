'use server'

import { cookies } from 'next/headers';

const BASE_API_URL = process.env.BASE_API_URL;

export interface IDocument {
  id: string;
  type: string;
}

export interface IActionResult {
  success: boolean;
  message: string;
}

export async function getUserDocuments(): Promise<IDocument[]> {
  try {
    if (!BASE_API_URL) throw new Error('API URL is not configured');

    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) throw new Error('Token tidak ditemukan');

    const response = await fetch(`${BASE_API_URL}/user/document`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'success') return [];

    return data.data ?? [];
  } catch (error) {
    console.error('[getUserDocuments error]', error);
    return [];
  }
}

export async function downloadDocument(id: string): Promise<{ success: boolean; url?: string }> {
  try {
    if (!BASE_API_URL) throw new Error('API URL is not configured');

    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) throw new Error('Token tidak ditemukan');

    const response = await fetch(`${BASE_API_URL}/user/document/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) return { success: false };

    const url = await response.text();

    return { success: true, url: url.trim() };
  } catch (error) {
    console.error('[downloadDocument error]', error);
    return { success: false };
  }
}

export async function deleteDocument(id: string): Promise<IActionResult> {
  try {
    if (!BASE_API_URL) throw new Error('API URL is not configured');

    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) throw new Error('Token tidak ditemukan');

    const response = await fetch(`${BASE_API_URL}/user/document/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'success') {
      return { success: false, message: data.message || 'Gagal menghapus dokumen' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('[deleteDocument error]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan',
    };
  }
}

export async function updateDocument(id: string, file: FormData): Promise<IActionResult> {
  try {
    if (!BASE_API_URL) throw new Error('API URL is not configured');

    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) throw new Error('Token tidak ditemukan');

    const response = await fetch(`${BASE_API_URL}/user/document/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
      body: file,
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'success') {
      return { success: false, message: data.message || 'Gagal mengupdate dokumen' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error('[updateDocument error]', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan',
    };
  }
}