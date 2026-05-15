'use server'

import { IRegion, IPosition, IProduct, IProductMeta } from '@/shared/models/interface/productInterfaces';
import { cookies } from 'next/headers';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getRegions(): Promise<IRegion[]> {
  try {
    const response = await fetch(`${BASE_API_URL}/product/region?limit=50`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    const result = await response.json();
    if (!response.ok || result.status !== 'success') return [];
    return result.data ?? [];
  } catch (error) {
    console.error('[getRegions error]', error);
    return [];
  }
}

export async function getPositions(
  programId: number,
  regionId: number,
  page = 1,
  limit = 9,
): Promise<{ data: IPosition[]; meta: IProductMeta }> {
  const emptyMeta: IProductMeta = { page: 1, limit: 9, total: 0, last_page: 1 };
  try {
    const params = new URLSearchParams({
      program_id: String(programId),
      region_id: String(regionId),
      page: String(page),
      limit: String(limit),
    });

    const response = await fetch(`${BASE_API_URL}/product/position?${params}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    const result = await response.json();
    if (!response.ok || result.status !== 'success') return { data: [], meta: emptyMeta };
    return { data: result.data ?? [], meta: result.meta ?? emptyMeta };
  } catch (error) {
    console.error('[getPositions error]', error);
    return { data: [], meta: emptyMeta };
  }
}

export async function getProducts(
  page = 1,
  limit = 10,
  programId?: number,
  regionId?: number,
): Promise<{ data: IProduct[]; meta: IProductMeta }> {
  const emptyMeta: IProductMeta = { page: 1, limit: 10, total: 0, last_page: 1 };
  try {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (programId) params.append('program', String(programId));
    if (regionId) params.append('region', String(regionId));

    const response = await fetch(`${BASE_API_URL}/product?${params}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    const result = await response.json();
    if (!response.ok || result.status !== 'success') return { data: [], meta: emptyMeta };
    return { data: result.data ?? [], meta: result.meta ?? emptyMeta };
  } catch (error) {
    console.error('[getProducts error]', error);
    return { data: [], meta: emptyMeta };
  }
}

export async function enrollProduct(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    if (!BASE_URL) throw new Error('API URL is not configured');

    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (!token) throw new Error('Token tidak ditemukan');

    const response = await fetch(`${BASE_URL}/product/enroll`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
      body: formData,
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'success') {
      return { success: false, message: data.message || 'Gagal mendaftar' };
    }
    return { success: true, message: data.message };
  } catch (error) {
    console.error('[enrollProduct error]', error);
    return { success: false, message: error instanceof Error ? error.message : 'Terjadi kesalahan' };
  }
}