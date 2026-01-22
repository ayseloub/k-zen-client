import { StaticImageData } from 'next/image';
import pict from '@/shared/assets/images/testimonyProfile.png'

interface ITestimonyDummy {
    name: string;
    program: string;
    testimony: string;
    image: string | StaticImageData;
}

export const TestimonyDummy: ITestimonyDummy[] = [
    {
        name: "Kevin Alexander ",
        program: "Mahasiswa China",
        testimony: "Kzen telah membantu saya dalam mempersiapkan studi lanjut di luar negeri. Materi yang disediakan sangat relevan dan praktis.",
        image: pict,
    },
    {
        name: "Kevin Alexander ",
        program: "Mahasiswa Canada",
        testimony: "Kzen telah membantu saya dalam mempersiapkan studi lanjut di luar negeri. Materi yang disediakan sangat relevan dan praktis.",
        image: pict,
    },
    {
        name: "Kevin Alexander ",
        program: "Kerja Jepang",
        testimony: "Kzen telah membantu saya dalam mempersiapkan studi lanjut di luar negeri. Materi yang disediakan sangat relevan dan praktis.",
        image: pict,
    },
    {
        name: "Kevin Alexander ",
        program: "Kerja Korea",
        testimony: "Kzen telah membantu saya dalam mempersiapkan studi lanjut di luar negeri. Materi yang disediakan sangat relevan dan praktis.",
        image: pict,
    }
]