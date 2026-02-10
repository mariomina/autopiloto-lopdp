
"use client";

import { Landing } from '@/components/Landing';
import { ViewState } from '@/types';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleNavigate = (view: ViewState) => {
    if (view === ViewState.LOGIN) {
      router.push('/login');
    } else if (view === ViewState.REGISTER) {
      router.push('/login'); // Register uses same auth flow for now or separate page
    } else {
      // Default to login for any app access attempt
      router.push('/login');
    }
  };

  return <Landing setView={handleNavigate} />;
}
