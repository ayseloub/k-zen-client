'use client'

import { ErrorBoundary } from 'react-error-boundary';
import CustomErrorBoundary from '@/shared/container/custom-error-boundary/CustomErrorBoundary';
import { ProfileNavigationList } from '@/shared/models/static/ProfileNavigationList';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/shared/container/navbar/navbar';
import Footer from '@/shared/container/footer/footer';
import { Icon } from '@iconify/react';
import { IUserProfile } from '@/shared/models/interface/authinterfaces';
import { getUserProfile } from '@/shared/actions/authService';
import CompleteProfileModal from './modal/CompleteProfileModal';

const REQUIRED_FIELDS: (keyof IUserProfile)[] = [
  'fullname', 'nik', 'gender', 'phone',
  'date_of_birth', 'address', 'domicile_address',
];

function hasIncompleteProfile(user: IUserProfile | null): boolean {
  if (!user) return false;
  return REQUIRED_FIELDS.some((field) => !user[field]);
}

function ProfileSider() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>(['Akun Saya']);
  const [user, setUser] = useState<IUserProfile | null>(null);

  useEffect(() => {
    getUserProfile().then(setUser);
  }, []);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isValidAvatar = (url: string | null): boolean => {
    if (!url) return false;
    if (url.endsWith('/0')) return false;
    return true;
  };

  return (
    <aside className='w-64 border-2 border-Kzen-neutral/30 bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2'>
      <div className='flex items-center gap-5 p-4 border-b border-Kzen-neutral/20 mb-2'>
        {isValidAvatar(user?.avatar ?? null) ? (
          <Image
            src={user!.avatar!}
            alt={user!.fullname}
            width={64}
            height={64}
            className='rounded-full object-cover w-16 h-16'
          />
        ) : (
          <Icon icon="iconamoon:profile-circle-light" width="64" height="64" className='text-Kzen-primary' />
        )}
        <p className='font-semibold text-gray-800'>{user?.fullname ?? '-'}</p>
      </div>

      {ProfileNavigationList.map((item) => (
        <div key={item.title}>
          {item.children ? (
            <div>
              <button
                onClick={() => toggleSection(item.title)}
                className='w-full flex items-center justify-between px-3 py-2 rounded-full hover:bg-Kzen-secondary/20 font-semibold text-Kzen-primary'
              >
                <span>{item.title}</span>
                {openSections.includes(item.title) ? (
                  <Icon icon="basil:caret-up-outline" width="24" height="24" />
                ) : (
                  <Icon icon="basil:caret-down-outline" width="24" height="24" />
                )}
              </button>

              {openSections.includes(item.title) && (
                <div className='ml-2 mt-1 flex flex-col gap-1'>
                  {item.children.map((child) => {
                    const isActive = pathname === child.href;
                    return (
                      <a
                        key={child.title}
                        href={child.href}
                        className={`flex items-center gap-3 px-3 py-3 font-light rounded-full transition-colors ${
                          isActive
                            ? 'bg-Kzen-secondary/25 text-Kzen-primary'
                            : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        {child.icon && (
                          <Icon
                            icon={child.icon}
                            width="20"
                            height="20"
                            className={isActive ? 'text-Kzen-primary' : 'text-gray-400'}
                          />
                        )}
                        <span className='text-sm'>{child.title}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <a
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-full transition-colors font-semibold ${
                pathname === item.href
                  ? 'bg-Kzen-secondary/25 text-Kzen-primary'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span>{item.title}</span>
            </a>
          )}
        </div>
      ))}
    </aside>
  );
}

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    getUserProfile().then((data) => {
      setUser(data);
      // hanya tampilkan modal di halaman profile, bukan di halaman edit
      if (data && hasIncompleteProfile(data) && pathname !== '/profile/edit') {
        setShowCompleteModal(true);
      }
    });
  }, []);

  return (
    <ErrorBoundary FallbackComponent={CustomErrorBoundary}>
      <Navbar />
      <div className=''>
        <div className='max-w-7xl mx-auto px-6 py-8 flex gap-6'>
          <ProfileSider />
          <main className='flex-1'>
            {children}
          </main>
        </div>
      </div>
      <Footer />

      <CompleteProfileModal
        open={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
      />
    </ErrorBoundary>
  );
}