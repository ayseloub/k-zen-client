import { StaticImageData } from 'next/image';
import StudiLanjutIcon from '@/shared/assets/images/Nav-Icon/StudiLanjut.png';
import KarierIcon from '@/shared/assets/images/Nav-Icon/Karir.png';
import ECourseIcon from '@/shared/assets/images/Nav-Icon/E-Course.png';
import WebinarIcon from '@/shared/assets/images/Nav-Icon/Webinar.png';
import SertifikasiIcon from '@/shared/assets/images/Nav-Icon/Sertifikasi.png';

interface INavItem {
  title: string;
  href?: string;
  icon?: StaticImageData; // Icon untuk dropdown children
  description?: string; // Description untuk dropdown children
  children?: INavItem[];
}

export const NavigationList: INavItem[] = [
  {
    title: "Tentang Kami",
    href: "/home",
  },
  {
    title: "Program",
    href: "#",
    children: [
      {
        title: "Studi Lanjut",
        href: "/studilanjut",
        icon: StudiLanjutIcon,
        description: "Daftarkan dirimu untuk program studi lanjut ke luar negeri",
      },
      {
        title: "Karier Profesional",
        href: "/karirprofesional",
        icon: KarierIcon,
        description: "Persiapkan dirimu untuk berkarir di kancah global",
      },
    ],
  },
  {
    title: "Produk",
    href: "#",
    children: [
      {
        title: "E-Course",
        href: "/kursus",
        icon: ECourseIcon,
        description: "Temukan solusi terbaik untuk menunjang persiapan karier dan studi kamu",
      },
      {
        title: "Webinar",
        href: "/webinar",
        icon: WebinarIcon,
        description: "Pengalaman sharing langsung bersama mentor agar kamu makin yakin!",
      },
      {
        title: "Sertifikasi",
        href: "/sertifikasi",
        icon: SertifikasiIcon,
        description: "Partner sertifikasi terakreditasi internasional untuk kebutuhan karier dan studimu",
      },
    ],
  },
  {
    title: "Blog",
    href: "/artikel",
  },
];