'use server';

import { BACKEND_URL } from '@/lib/constants';

export async function getCardTemplates() {
  const response = await fetch(`${BACKEND_URL}/templates`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch card templates');
  }

  const data = await response.json();
  return data.data;
}
