'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Host() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/account?tab=hosting');
  }, [router]);
  return null;
}
