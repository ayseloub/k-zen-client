import { Suspense } from 'react';
import EnrollmentStepper from './container/EnrollmentStepper';

export default async function EnrollmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className='min-h-screen bg-gray-50 flex items-center justify-center text-gray-400'>Memuat...</div>}>
      <EnrollmentStepper positionId={id} />
    </Suspense>
  );
}