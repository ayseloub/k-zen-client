'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { message, Modal } from 'antd';
import {
  getUserDocuments,
  downloadDocument,
  deleteDocument,
  updateDocument,
  IDocument,
} from '@/shared/actions/userService';
import uncomplete from '@/shared/assets/images/uncomplete-profile.png';
import Image from 'next/image';

const DOC_LABELS: Record<string, string> = {
  'KTP': 'Kartu Tanda Penduduk (KTP)',
  'Kartu Keluarga': 'Kartu Keluarga',
  'Akta Kelahiran': 'Akta Kelahiran',
};

interface IDocumentRowProps {
  doc: IDocument;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, file: File) => void;
  isDownloading: boolean;
}

function DocumentRow({ doc, onDownload, onDelete, onUpdate, isDownloading }: IDocumentRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileName = `${doc.type}.pdf`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpdate(doc.id, file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className='mb-4'>
      <p className='text-sm font-medium text-gray-700 mb-2'>
        {DOC_LABELS[doc.type] ?? doc.type}
      </p>
      <div className='flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3'>
        <div className='flex items-center gap-2 text-gray-700'>
          <Icon icon="basil:document-outline" width="20" className='text-Kzen-primary' />
          <span className='text-sm'>{fileName}</span>
        </div>
        <div className='flex items-center gap-2'>
          <button
            className='text-Kzen-primary hover:opacity-70'
            onClick={() => fileInputRef.current?.click()}
            title='Ganti dokumen'
          >
            <Icon icon="mynaui:edit" width="18" />
          </button>
          <button
            className='text-Kzen-primary hover:opacity-70 disabled:opacity-40'
            onClick={() => onDownload(doc.id)}
            disabled={isDownloading}
            title='Download'
          >
            <Icon icon="basil:download-outline" width="20" />
          </button>
          <button
            className='text-red-400 hover:opacity-70'
            onClick={() => onDelete(doc.id)}
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
        <p className='text-gray-800 font-semibold'>Dokumen Legal Belum Ditambahkan</p>
        <p className='text-gray-400 text-sm mt-1'>
          Tambah dokumen legal untuk melengkapi pendaftaran.
        </p>
      </div>
      <button
        onClick={onUpload}
        className='bg-gradient-to-r from-Kzen-secondary to-Kzen-primary text-white px-10 py-2 rounded-full font-light hover:opacity-90 transition-opacity'
      >
        Daftar Dokumen
      </button>
    </div>
  );
}

export default function DokumenLegalContainer() {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const router = useRouter();

  const fetchDocuments = () => {
    setIsLoading(true);
    getUserDocuments()
      .then(setDocuments)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const legalDocs = documents.filter(
    (doc) => doc.type === 'KTP' || doc.type === 'Kartu Keluarga' || doc.type === 'Akta Kelahiran'
  );

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
          fetchDocuments();
        } else {
          message.error(result.message);
        }
      },
    });
  };

  const handleUpdate = async (id: string, file: File) => {
    const fd = new FormData();
    fd.append('document', file);
    fd.append('_method', 'PATCH');

    const result = await updateDocument(id, fd);
    if (result.success) {
      message.success(result.message);
      fetchDocuments();
    } else {
      message.error(result.message);
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
    <div className='bg-white border-2 border-Kzen-neutral/30 rounded-2xl p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold'>Dokumen Legal</h2>
        {legalDocs.length > 0 && (
          <button
            className='text-Kzen-primary hover:opacity-70'
            onClick={() => router.push('/user/update/edit')}
          >
            <Icon icon="mynaui:edit" width="22" height="22" />
          </button>
        )}
      </div>

      {legalDocs.length > 0 ? (
        <>
          <div className='w-full border-t-[1px] border-Kzen-neutral mb-4'></div>
          {legalDocs.map((doc) => (
            <DocumentRow
              key={doc.id}
              doc={doc}
              onDownload={handleDownload}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              isDownloading={downloadingId === doc.id}
            />
          ))}
        </>
      ) : (
        <EmptyState onUpload={() => router.push('/user/update/edit')} />
      )}
    </div>
  );
}