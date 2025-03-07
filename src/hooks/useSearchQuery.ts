'use client'; // Mark as client component since it uses hooks

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const useSearchQuery = (initialSearchTerm: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    searchParams?.get('query') || initialSearchTerm
  );

  // Sync state with URL changes
  useEffect(() => {
    const currentQuery = searchParams?.get('query') || initialSearchTerm;
    if (currentQuery !== searchTerm) {
      setSearchTerm(currentQuery);
    }
  }, [searchParams, initialSearchTerm]);

  const setSearchQuery = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());
    if (value) {
      newSearchParams.set('query', value);
    } else {
      newSearchParams.delete('query');
    }
    // Update URL without full page reload
    router.push(`/?${newSearchParams.toString()}`, { scroll: false });
    setSearchTerm(value);
  };

  return [searchTerm, setSearchQuery] as const;
};

export default useSearchQuery;
