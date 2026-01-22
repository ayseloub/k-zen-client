interface IContactItem {
  value?: string;
  title: string;
  href?: string;
  icon: string;
}

interface IContactItem2 {
    title: string;
    value: string;
    hour: string;
}

export const ContactList: IContactItem[] = [
  {
    title: "Instagram",
    icon: "ic:baseline-tiktok",
  },
  {
    title: "Facebook",
    icon: "mdi:instagram",
  },
  {
    title: "You Tube",
    icon: "mdi:linkedin",
  },
]

export const ContactListWithValue: IContactItem[] = [
    {
        title: "phone",
        value: "081230675458",
        icon: "ri:phone-fill",
    },
    {
        title: "email",
        value: "cs@kzenkarier.id",
        icon: "mdi:email",
    },
]

export const ContactListWithHour: IContactItem2[] = [
    {
        title: "Alamat Email",
        value: "cs@kzenkarier.id",
        hour: "Senin - Jumat 09:00 - 17:00 WIB",
    },
    {
        title: "Nomor Telepon",
        value: "081230675458",
        hour: "Senin - Jumat 09:00 - 17:00 WIB",
    }
]