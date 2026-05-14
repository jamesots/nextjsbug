import { cookies, draftMode } from 'next/headers';
import { ClientShell } from '../components/ClientShell';
import { cache } from 'react';
import { cacheLife, cacheTag } from 'next/cache';

// Simulates a 'use cache' data function (like getPage / getMenu)
const getCachedContent = cache(async (): Promise<string> => {
  'use cache';
  cacheTag('content');
  cacheLife('max');
  return 'This is cached CMS content';
});

// Reads cookies() so it's dynamic/uncached — must be in Suspense for PPR
async function getDynamicData(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get('theme')?.value ?? 'no theme cookie set';
}

export default async function Page() {
  // Simulate draftMode() check like the original app
  const { isEnabled: isDraft } = await draftMode();

  // Simulate cached CMS data fetch
  const content = await getCachedContent();

  // Not awaited — passed as Promise to client component for PPR
  const dataPromise = getDynamicData();

  return <ClientShell content={content} isDraft={isDraft} dataPromise={dataPromise} />;
}
