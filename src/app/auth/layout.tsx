import { ErrorBoundary } from 'react-error-boundary';
import Image from 'next/image';
import CustomErrorBoundary from '@/shared/container/custom-error-boundary/CustomErrorBoundary';
import authImage from '@/shared/assets/images/authimg.png';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ErrorBoundary FallbackComponent={CustomErrorBoundary}>
        <div className='flex justify-center items-center gap-32 px-32 h-screen'>
            <div className='w-2/3'>
                {children}
            </div>

            <Image
                src={authImage}
                alt="Auth Image"
                width={500}
            />
        </div>
    </ErrorBoundary>
    );
}