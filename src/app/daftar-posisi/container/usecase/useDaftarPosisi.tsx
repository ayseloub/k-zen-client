'use client'

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IPosition, IProductMeta, IRegion } from '@/shared/models/interface/productInterfaces';
import { getPositions, getRegions, getProducts } from '@/shared/actions/productService';

type ProgramTab = 'karier' | 'studi';

const PROGRAM_MAP: Record<ProgramTab, number> = {
  'karier': 1,
  'studi': 2,
};

export const useDaftarPosisi = () => {
  const searchParams = useSearchParams();

  const [positions, setPositions] = useState<IPosition[]>([]);
  const [meta, setMeta] = useState<IProductMeta>({ page: 1, limit: 9, total: 0, last_page: 1 });
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainProductId, setMainProductId] = useState<string>('');

  const [activeTab, setActiveTab] = useState<ProgramTab>(
    (searchParams.get('program') as ProgramTab) || 'karier'
  );
  const [activeRegionId, setActiveRegionId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getRegions().then((data) => {
      setRegions(data);
      if (data.length > 0 && !activeRegionId) {
        const countryParam = searchParams.get('country');
        const matchedRegion = countryParam
          ? data.find((r) => r.name.toLowerCase() === countryParam.toLowerCase())
          : null;
        setActiveRegionId(matchedRegion?.id ?? data[0].id);
      }
    });
  }, []);

  const fetchPositions = useCallback(async () => {
    if (!activeRegionId) return;
    setIsLoading(true);
    try {
      const programId = PROGRAM_MAP[activeTab];
      const result = await getPositions(programId, activeRegionId, page, 9);
      setPositions(result.data);
      setMeta(result.meta);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, activeRegionId, page]);

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  useEffect(() => {
    if (!activeRegionId) return;
    const programId = PROGRAM_MAP[activeTab];
    getProducts(1, 10, programId, activeRegionId).then((result) => {
      const mainProduct = result.data.find((p) => p.type === 'Main Program');
      setMainProductId(mainProduct?.id ?? '');
    });
  }, [activeTab, activeRegionId]);

  useEffect(() => {
    setPage(1);
  }, [activeTab, activeRegionId, search]);

  const filteredPositions = positions.filter((pos) => {
    if (!search) return true;
    return pos.name.toLowerCase().includes(search.toLowerCase());
  });

  return {
    positions: filteredPositions,
    meta,
    regions,
    isLoading,
    mainProductId,
    activeTab, setActiveTab,
    activeRegionId, setActiveRegionId,
    search, setSearch,
    page, setPage,
  };
};