interface IFAQItem {
  question: string;
  answer: string;
  point?: string[];
}

export const FAQList: IFAQItem[] = [
  {
    question: "Apa itu KZEN?",
    answer: "KZEN merupakan platform yang berfokus pada layanan pendampingan pendidikan dan karier internasional. KZEN membantu peserta dalam merencanakan, mempersiapkan, hingga merealisasikan studi maupun pekerjaan di luar negeri melalui sistem yang terstruktur dan profesional."
  },
  {
    question: "Program apa saja yang tersedia di KZEN?",
    answer: "KZEN menyediakan beberapa program utama, antara lain:",
    point: [
      "Program pendidikan ke luar negeri (study abroad), seperti kuliah di China",
      "Program kerja ke luar negeri (work abroad), seperti Kanada dan Jepang"
    ]
  },
  {
    question: "Apakah tersedia program beasiswa?",
    answer: "Ya, tersedia beasiswa parsial hingga penuh, mencakup biaya pendidikan dan fasilitas tertentu."
  },
  {
    question: "Apakah perlu bahasa asing?",
    answer: "Tidak semua program mewajibkan kemampuan bahasa atau interview."
  },
];