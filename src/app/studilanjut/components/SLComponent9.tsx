import React from 'react';
import BenefitCard from '@/shared/container/benefit-card/BenefitCard';
import hero from "@/shared/assets/images/StudiBenefitHero.png";
import { StudiBenefit } from "@/shared/models/static/BenefitList";

export default function SLComponent() {
  return (
    <BenefitCard
      heroImage={hero}
      benefitData={StudiBenefit}
      title='<span class="text-Kzen-primary">1000+ K-Zeners</span> Telah Percaya<br/> Kepada Kami'
      subtitle='Tingkatkan karier profesional dan studi lanjut kamu<br/> bersama K-Zen'
      buttonText='Daftar Sekarang'
    />
  );
}