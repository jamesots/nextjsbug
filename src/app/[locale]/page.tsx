import { cookies, draftMode } from 'next/headers';
import { setRequestLocale } from 'next-intl/server';
import { ClientShell } from '../../components/ClientShell';
import { cacheLife, cacheTag } from 'next/cache';

async function getCachedContent(locale: string): Promise<string> {
  'use cache';
  cacheTag('content');
  cacheLife('max');
  return `This is cached CMS content (${locale})`;
}

async function getDynamicData(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get('theme')?.value ?? 'no theme cookie set';
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { isEnabled: isDraft } = await draftMode();
  const content = await getCachedContent(locale);
  const dataPromise = getDynamicData();

  return <ClientShell content={content} isDraft={isDraft} dataPromise={dataPromise} menu={[]} />;
}
