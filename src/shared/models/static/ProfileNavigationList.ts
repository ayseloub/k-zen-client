import { StaticImageData } from 'next/image';

interface INavItem {
  title: string;
  href?: string;
  icon?: string;
  description?: string;
  children?: INavItem[];
}

export const ProfileNavigationList: INavItem[] = [
  {
    title: "Akun Saya",
    href: "#",
    children: [
      {
        title: "Personal Info",
        href: "/user/profile/personal-info",
        icon: "iconamoon:profile-circle-thin",
      },
      {
        title: "Dokumen Legal",
        href: "/user/profile/dokumen-legal",
        icon: "pepicons-pencil:file",
      },
      {
        title: "Pendidikan Terakhir",
        href: "/user/profile/pendidikan-terakhir",
        icon: "ph:certificate-light",
      },
      {
        title: "Kata Sandi",
        href: "/user/profile/change-password",
        icon: "quill:lock",
      },
    ],
  },
  {
    title: "Transaksi Saya",
    href: "/profile/transaksi-saya",
  },
];