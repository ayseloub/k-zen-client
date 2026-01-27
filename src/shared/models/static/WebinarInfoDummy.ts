import pict from '@/shared/assets/images/webinardummy.png';
import pict2 from '@/shared/assets/images/blogdummy1.png';
import pict3 from '@/shared/assets/images/webinardummy.png';
import { StaticImageData } from 'next/image';

interface IWebinarInfoDummy {
    title: string;
    description: string;
    date: string;
    time?: string;
    price: string;
    image?: string | StaticImageData;
    category: 'karir' | 'studi';
}

interface IBlogInfoDummy {
    title: string;
    description: string;
    date: string;
    image?: string | StaticImageData;
    category: 'karir' | 'studi';
}

export const WebinarInfoDummy: IWebinarInfoDummy[] = [
    {
        title: "Lorem ipsum dolor sit amet, consecte adipiscing elit",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.",
        date: "10 januari 2025",
        time: "10:00 AM - 12:00 PM WIB",
        price: "49.000",
        image: pict,
        category: 'karir', 
    },
    {
        title: "Lorem ipsum dolor sit amet, consecte adipiscing elit",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.",
        date: "10 januari 2025",
        time: "2:00 PM - 4:00 PM WIB",
        price: "49.000",
        image: pict,
        category: 'studi',
    },
    {
        title: "Lorem ipsum dolor sit amet, consecte adipiscing elit",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.",
        date: "10 januari 2025",
        time: "11:00 AM - 1:00 PM WIB",
        price: "49.000",
        image: pict,
        category: 'karir',
    },
    {
        title: "Lorem ipsum dolor sit amet, consecte adipiscing elit",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.",
        date: "15 januari 2025",
        time: "3:00 PM - 5:00 PM WIB",
        price: "79.000",
        image: pict,
        category: 'studi',
    },
]

export const BlogInfoDummy: IBlogInfoDummy[] = [
    {
        title: "Lorem ipsum dolor sit amet, consecte adipiscing elit",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.",
        date: "10 januari 2025",
        image: pict2,
        category: 'karir', 
    },
    {
        title: "Lorem ipsum dolor sit amet, consecte adipiscing elit",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.",
        date: "10 januari 2025",
        image: pict2,
        category: 'studi',
    },
    {
        title: "Lorem ipsum dolor sit amet, consecte adipiscing elit",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.",
        date: "10 januari 2025",
        image: pict2,
        category: 'karir',
    },
    {
        title: "Lorem ipsum dolor sit amet, consecte adipiscing elit",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun ut labore et dolore magna aliqua.",
        date: "15 januari 2025",
        image: pict2,
        category: 'studi',
    },
]