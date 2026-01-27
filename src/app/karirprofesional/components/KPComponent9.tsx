import React from 'react';
import BenefitCard from '@/shared/container/benefit-card/BenefitCard';
import Hero from "@/shared/assets/images/KarirBenefitHero.png";
import { KarirBenefit } from "@/shared/models/static/BenefitList";

export default function KPComponent9() {
  return (
    <BenefitCard
      heroImage={Hero}
      benefitData={KarirBenefit}
      title='<span class="text-Kzen-primary">1000+ K-Zeners</span> Telah Percaya<br/> Kepada Kami'
      subtitle='Tingkatkan karier profesional dan studi lanjut kamu<br/> bersama K-Zen'
      buttonText='Daftar Sekarang'
    />
  );
}