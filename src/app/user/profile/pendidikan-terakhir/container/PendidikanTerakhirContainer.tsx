'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { message, Modal } from 'antd';
import Image from 'next/image';
import { getUserProfile } from '@/shared/actions/authService';
import { IUserProfile } from '@/shared/models/interface/authinterfaces';
import {
  getUserDocuments,
  downloadDocument,
  deleteDocument,
  updateDocument,
  IDocument,
} from '@/shared/actions/userService';
import uncomplete from '@/shared/assets/images/uncomplete-profile.png';

interface IInfoRow {
  label: string;
  value: string | null;
}

function InfoRow({ label, value }: IInfoRow) {
  return (
    <div className='flex items-center py-3'>
      <span className='w-48 text-gray-500 font-light'>{label}</span>
      <span className='flex-1 text-gray-800'>{value ?? '-'}</span>
    </div>
  );
}

function EmptyState({ onUpload }: { onUpload: () => void }) {
  return (
    <div className='flex flex-col items-center justify-center py-16 gap-4'>
      <div className='rounded-2xl flex items-center justify-center'>
        <Image src={uncomplete} alt='Belum ada dokumen' width={120} height={120} />
      </div>
      <div className='text-center'>
        <p className='text-gray-800 font-semibold'>Dokumen Pendidikan Belum Ditambahkan</p>
        <p className='text-gray-400 text-sm mt-1'>
          Tambah dokumen untuk melanjutkan pendaftaran
        </p>
      </div>
      <button
        onClick={onUpload}
        className='bg-gradient-to-r from-Kzen-secondary to-Kzen-primary text-white px-10 py-2 rounded-full font-light hover:opacity-90 transition-opacity'
      >
        Tambah Dokumen
      </button>
    </div>
  );
}

export default function PendidikanTerakhirContainer() {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [profile, docs] = await Promise.all([
        getUserProfile(),
        getUserDocuments(),
      ]);
      if (profile) setUser(profile);
      setDocuments(docs);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ijazahDoc = documents.find((doc) => doc.type === 'Ijazah') ?? null;

  const handleDownload = async (id: string) => {
    setDownloadingId(id);
    try {
      const result = await downloadDocument(id);
      if (result.success && result.url) {
        window.location.href = result.url;
      } else {
        message.error('Gagal mendownload dokumen');
      }
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Hapus Dokumen',
      content: 'Apakah kamu yakin ingin menghapus dokumen ini?',
      okText: 'Hapus',
      cancelText: 'Batal',
      okButtonProps: { danger: true },
      onOk: async () => {
        const result = await deleteDocument(id);
        if (result.success) {
          message.success(result.message);
          fetchData();
        } else {
          message.error(result.message);
        }
      },
    });
  };

  const handleUpdate = async (file: File) => {
    if (!ijazahDoc) return;
    const fd = new FormData();
    fd.append('document', file);
    fd.append('_method', 'PATCH');

    const result = await updateDocument(ijazahDoc.id, fd);
    if (result.success) {
      message.success(result.message);
      fetchData();
    } else {
      message.error(result.message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpdate(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className='bg-white border-2 border-Kzen-neutral/30 rounded-2xl p-6'>
        <span className='text-gray-400'>Memuat data...</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-white border-2 border-Kzen-neutral/30 rounded-2xl p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold'>Pendidikan Terakhir</h2>
          <button
            className='text-Kzen-primary hover:opacity-70'
            onClick={() => router.push('/user/update/edit')}
          >
            <Icon icon="mynaui:edit" width="22" height="22" />
          </button>
        </div>

        <div className='w-full border-t-[1px] border-Kzen-neutral'></div>

        <InfoRow label='Pendidikan Terakhir' value={user?.last_education ?? null} />
        <InfoRow label='Program Studi' value={user?.major ?? null} />
      </div>

      <div className='bg-white border-2 border-Kzen-neutral/30 rounded-2xl p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold'>Dokumen Pendidikan</h2>
          {ijazahDoc && (
            <button
              className='text-Kzen-primary hover:opacity-70'
              onClick={() => router.push('/user/update/edit')}
            >
              <Icon icon="mynaui:edit" width="22" height="22" />
            </button>
          )}
        </div>

        {ijazahDoc ? (
          <>
            <div className='w-full border-t-[1px] border-Kzen-neutral mb-4'></div>
            <p className='text-sm font-medium text-gray-700 mb-2'>Ijazah Terakhir</p>
            <div className='flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3'>
              <div className='flex items-center gap-2 text-gray-700'>
                <Icon icon="basil:document-outline" width="20" className='text-Kzen-primary' />
                <span className='text-sm'>Ijazah.pdf</span>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  className='text-Kzen-primary hover:opacity-70 disabled:opacity-40'
                  onClick={() => handleDownload(ijazahDoc.id)}
                  disabled={downloadingId === ijazahDoc.id}
                  title='Download'
                >
                  <Icon icon="basil:download-outline" width="20" />
                </button>
                <button
                  className='text-red-400 hover:opacity-70'
                  onClick={() => handleDelete(ijazahDoc.id)}
                  title='Hapus'
                >
                  <Icon icon="basil:trash-outline" width="20" />
                </button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type='file'
              accept='.pdf,.jpg,.jpeg,.png'
              className='hidden'
              onChange={handleFileChange}
            />
          </>
        ) : (
          <EmptyState onUpload={() => router.push('/user/update/edit')} />
        )}
      </div>
    </div>
  );
}