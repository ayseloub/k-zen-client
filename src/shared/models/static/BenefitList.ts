interface IBenefit {
    value: string[];
    country: string;
    description?: string;
}

export const KarirBenefit: IBenefit[] = [
    {
        value: [
            "Fasilitas akomodasi lengkap",
            "Raih kesempatan untuk meniti karier gemilang",
            "Bersama K-Zen karier di luar negeri akan menjadi kenyataan"
        ],
        country: "japan",
        description: "Kesempatan berkarier di perusahaan Jepang dengan kurikulum bahasa dan sertifikasi terpercaya."
    },
    {
        value: [
            "Work permit yang legal",
            "Gaji kompetitif sesuai standar",
            "Jalur menuju permanent residence"
        ],
        country: "kanada",
        description: "Program karir profesional di Kanada dengan benefit menarik."
    },
]

export const StudiBenefit: IBenefit[] = [
    {
        value: [
            "Mentoring dengan mentor berpengalaman",
            "Kesempatan raih beasiswa 100%",
            "Jaringan alumni global"
        ],
        country: "china",
        description: "Program studi lanjut di China dengan beasiswa penuh."
    },
]