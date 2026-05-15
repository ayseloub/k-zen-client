export interface IRegion {
  id: number;
  name: string;
}

export interface IPosition {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface IProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  type: string;
  region: string;
  program: string;
  image_url?: string;
  is_active: boolean;
}

export interface IProductMeta {
  page: number;
  limit: number;
  total: number;
  last_page: number;
}


export interface IUserEnrollment {
  id: string;
  name: string;
  category: string;
  region: string;
  program: string;
  position: string;
  expiry_date: string | null;
  expiry_status: string | null;
  registration_step: string;
}

export interface ITotalEnrollment {
  type_name: string;
  total_enrollments: number;
}