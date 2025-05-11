import { useSearchParams } from 'next/navigation';

export function useSearchQuery() {
  const searchParams = useSearchParams();
  return searchParams.get('search') || '';
}
