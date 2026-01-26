import { StaticImageData } from "next/image";
import icon1 from '@/shared/assets/images/Advance-Icon/icon1-lp2&3.png'
import icon2lp2 from '@/shared/assets/images/Advance-Icon/icon2-lp2.png'
import icon2lp3 from '@/shared/assets/images/Advance-Icon/icon2-lp3.png'
import icon3lp2 from '@/shared/assets/images/Advance-Icon/icon3-lp2.png'
import icon3lp3 from '@/shared/assets/images/Advance-Icon/icon3-lp3.png'
import icon4lp2 from '@/shared/assets/images/Advance-Icon/icon4-lp2.png'
import icon4lp3 from '@/shared/assets/images/Advance-Icon/icon4-lp3.png'
import icon5lp2 from '@/shared/assets/images/Advance-Icon/icon5-lp2.png'
import icon5lp3 from '@/shared/assets/images/Advance-Icon/icon5-lp3.png'
import icon6lp2 from '@/shared/assets/images/Advance-Icon/icon6-lp2.png'
import icon6lp3 from '@/shared/assets/images/Advance-Icon/icon6-lp3.png'
import icon7lp2 from '@/shared/assets/images/Advance-Icon/icon7-lp2.png'
import icon7lp3 from '@/shared/assets/images/Advance-Icon/icon7-lp3.png'
import icon8lp2 from '@/shared/assets/images/Advance-Icon/icon8-lp2.png'
import icon8lp3 from '@/shared/assets/images/Advance-Icon/icon8-lp3.png'

interface IStatisticItem {
    title: string;
    value: string;
    icon: string | StaticImageData;
}

export const AdvanceListChina: IStatisticItem[] = [
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

export const AdvanceListJepang: IStatisticItem[] = [
    {
        title: "World Economy",
        value: "#4",
        icon: icon1,
    },
    {
        title: "Stabilitas",
        value: "Top 10",
        icon: icon2lp3,
    },
    {
        title: "Manufaktur",
        value: "#1",
        icon: icon3lp3,
    },
    {
        title: "Kualitas Hidup",
        value: "TOP 10",
        icon: icon4lp3,
    },
    {
        title: "Keamanan",
        value: "Top 5",
        icon: icon5lp3,
    },
    {
        title: "Trasportasi",
        value: "#1",
        icon: icon6lp3,
    },
    {
        title: "Industri",
        value: "Global Leader",
        icon: icon7lp3,
    },
    {
        title: "Pendapatan",
        value: "~¥3.5M/tahun",
        icon: icon8lp3,
    },
]

export const AdvanceListCanada: IStatisticItem[] = [
    {
        title: "World Economy",
        value: "#9",
        icon: icon1,
    },
    {
        title: "Stabilitas",
        value: "Top 10",
        icon: icon2lp3,
    },
    {
        title: "Manufaktur",
        value: "Top 10",
        icon: icon3lp3,
    },
    {
        title: "Kualitas Hidup",
        value: "TOP 10",
        icon: icon4lp3,
    },
    {
        title: "Keamanan",
        value: "Top 5",
        icon: icon5lp3,
    },
    {
        title: "Trasportasi",
        value: "Baik",
        icon: icon6lp3,
    },
    {
        title: "Industri",
        value: "Global Leader",
        icon: icon7lp3,
    },
    {
        title: "Pendapatan",
        value: "~$53K/Tahun",
        icon: icon8lp3,
    },
]