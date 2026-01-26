interface INavItem {
  title: string;
  href?: string;
  children?: INavItem[];
}


export const NavigationList: INavItem[] = [
  {
    title: "Tentang Kami",
    href: "/",
  },
  {
    title: "Studi Lanjut",
    href: "/studilanjut",
    children: [
      {
        title: "Studi Lanjut 1",
        href: "/studilanjut1",
      },
      {
        title: "Studi Lanjut 2",
        href: "/studilanjut 2",
      },
    ],
  },
  {
    title: "Karir Profesional",
    href: "/karirprofesional",
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