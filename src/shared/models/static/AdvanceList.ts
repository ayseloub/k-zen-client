import { StaticImageData } from "next/image";
import icon1 from '@/shared/assets/images/Advance-Icon/icon1-lp2&3.png'
import icon2lp2 from '@/shared/assets/images/Advance-Icon/icon2-lp2.png'
import icon3lp2 from '@/shared/assets/images/Advance-Icon/icon3-lp2.png'
import icon4lp2 from '@/shared/assets/images/Advance-Icon/icon4-lp2.png'
import icon5lp2 from '@/shared/assets/images/Advance-Icon/icon5-lp2.png'
import icon6lp2 from '@/shared/assets/images/Advance-Icon/icon6-lp2.png'
import icon7lp2 from '@/shared/assets/images/Advance-Icon/icon7-lp2.png'
import icon8lp2 from '@/shared/assets/images/Advance-Icon/icon8-lp2.png'

interface IStatisticItem {
    title: string;
    value: string;
    icon: string | StaticImageData;
}

export const AdvanceListLP2: IStatisticItem[] = [
    {
        title: "World Economy",
        value: "#2",
        icon: icon1,
    },
    {
        title: "Universitas",
        value: "Top 20",
        icon: icon2lp2,
    },
    {
        title: "Peringkat Asia",
        value: "Top 3",
        icon: icon3lp2,
    },
    {
        title: "Peringkat Riset",
        value: "#3",
        icon: icon4lp2,
    },
    {
        title: "Inovasi",
        value: "Top 15",
        icon: icon5lp2,
    },
    {
        title: "Global Study",
        value: "#1",
        icon: icon6lp2,
    },
    {
        title: "STEM",
        value: "#1 Asia",
        icon: icon7lp2,
    },
    {
        title: "Global Trade",
        value: "#1",
        icon: icon8lp2,
    },

]