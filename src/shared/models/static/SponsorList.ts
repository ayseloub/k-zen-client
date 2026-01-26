import { StaticImageData } from 'next/image';
import perusahaan1 from '@/shared/assets/images/sponsors_logo/mitraPerusahaan/perusahaan1.png';
import perusahaan2 from '@/shared/assets/images/sponsors_logo/mitraPerusahaan/perusahaan2.png';
import perusahaan3 from '@/shared/assets/images/sponsors_logo/mitraPerusahaan/perusahaan3.png';
import perusahaan4 from '@/shared/assets/images/sponsors_logo/mitraPerusahaan/perusahaan4.png';
import kampus1 from '@/shared/assets/images/sponsors_logo/mitraKampus/kampus1.png';
import kampus2 from '@/shared/assets/images/sponsors_logo/mitraKampus/kampus2.png';
import kampus3 from '@/shared/assets/images/sponsors_logo/mitraKampus/kampus3.png';
import kampus4 from '@/shared/assets/images/sponsors_logo/mitraKampus/kampus4.png';
import kampus5 from '@/shared/assets/images/sponsors_logo/mitraKampus/kampus5.png';
import kampus6 from '@/shared/assets/images/sponsors_logo/mitraKampus/kampus6.png';
import kampus7 from '@/shared/assets/images/sponsors_logo/mitraKampus/kampus7.png';
import kampus8 from '@/shared/assets/images/sponsors_logo/mitraKampus/kampus8.png';


interface sponsorItem {
    image: string | StaticImageData;
}

export const perusahaan: sponsorItem[] = [
    { image: perusahaan1 },
    { image: perusahaan2 },
    { image: perusahaan3 },
    { image: perusahaan4 },
];

export const kampus: sponsorItem[] = [
    { image: kampus1 },
    { image: kampus2 },
    { image: kampus3 },
    { image: kampus4 },
    { image: kampus5 },
    { image: kampus6 },
    { image: kampus7 },
    { image: kampus8 },
];