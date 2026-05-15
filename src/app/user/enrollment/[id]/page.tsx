import { Suspense } from 'react';
import EnrollmentDetailContainer from './container/EnrollmentDetailContainer';
import Navbar from '@/shared/container/navbar/navbar';
import Footer from '@/shared/container/footer/footer';

export default async function EnrollmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
      <Suspense fallback={<div className='flex items-center justify-center py-20 text-gray-400'>Memuat...</div>}>
        <Navbar />
      <EnrollmentDetailContainer id={id} />
        <Footer />
    </Suspense>
  );
}