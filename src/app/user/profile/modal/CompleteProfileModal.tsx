'use client'

import { Button, Modal } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import OwlQuestion from '@/shared/assets/images/Owl;.png';

interface ICompleteProfileModal {
  open: boolean;
  onClose: () => void;
}

export default function CompleteProfileModal({ open, onClose }: ICompleteProfileModal) {
  const router = useRouter();

  return (
    <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={440}
    >
      <div className='text-center space-y-4 py-4'>
        <Image src={OwlQuestion} alt='owl' width={140} className='mx-auto' />
        <h2 className='text-xl font-semibold'>Lengkapi Data Diri Yuk!</h2>
        <p className='text-gray-500 text-sm'>
          Lengkapi data diri kamu berarti selangkah lebih dekat dengan karier impianmu
        </p>
        <div className='flex gap-3 justify-center mt-2'>
          <Button
            size='large'
            className='rounded-full px-8 border-Kzen-primary text-Kzen-primary'
            onClick={onClose}
          >
            Lewati
          </Button>
          <Button
            size='large'
            type='primary'
            className='rounded-full px-8'
            onClick={() => {
              onClose();
              router.push('/user/update/edit');
            }}
          >
            Lengkapi
          </Button>
        </div>
      </div>
    </Modal>
  );
}