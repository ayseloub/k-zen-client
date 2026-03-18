import { Suspense } from 'react';
import { Spin } from 'antd';
import CallbackHandler from './CallbackHandler';

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen'>
          <Spin size='large' />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}