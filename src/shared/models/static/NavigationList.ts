interface INavItem {
  title: string;
  href?: string;
  children?: INavItem[];
}


export const NavigationList: INavItem[] = [
  {
    title: "Tentang Kami",
    href: "/aboutus",
  },
  {
    title: "Studi Lanjut",
    children: [
      {
        title: "Studi Lanjut 1",
        href: "/studilanjut",
      },
      {
        title: "Studi Lanjut 2",
        href: "/studilanjut 2",
      },
    ],
  },
  {
    title: "Karir Profesional",
    children: [
      {
        title: "Karir Profesional 1",
        href: "/karirprofesional1",
      },
      {
        title: "Karir Profesional 2",
        href: "/karirprofesional2",
      },
    ],
  },
  {
    title: "Artikel",
    href: "/artikel",
  },
];