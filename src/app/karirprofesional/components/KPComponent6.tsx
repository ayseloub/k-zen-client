import React from 'react';
import PackageCard from '@/shared/container/Package-card/PackageCard';
import karirHero from "@/shared/assets/images/karirPackageHero.png";
import { KarirPackage } from "@/shared/models/static/LearningPackageList";

export default function KPComponent() {
  return (
    <PackageCard
      packageData={KarirPackage}
      heroImage={karirHero}
      title='Masih Kurang <span class="text-Kzen-primary">Percaya Diri?</span>'
      subtitle='Paket Belajar Bahasa untuk Bekal Kamu Nanti!'
    />
  );
}