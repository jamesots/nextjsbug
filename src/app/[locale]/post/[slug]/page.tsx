import { cookies, draftMode } from 'next/headers';
import { setRequestLocale } from 'next-intl/server';
import { ClientShell } from '../../../../components/ClientShell';
import { cacheLife, cacheTag } from 'next/cache';

const POSTS = ['hello', 'world', 'foo', 'bar'];
const LOCALES = ['en', 'de'];

async function getCachedContent(slug: string, locale: string): Promise<string> {
  'use cache';
  cacheTag('content');
  cacheLife('max');
  return `Cached CMS content for: ${slug} (${locale})`;
}

async function getDynamicData(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get('theme')?.value ?? 'no theme cookie set';
}

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) => POSTS.map((slug) => ({ locale, slug })));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { isEnabled: isDraft } = await draftMode();
  const content = await getCachedContent(slug, locale);
  const dataPromise = getDynamicData();

  return <ClientShell content={content} isDraft={isDraft} dataPromise={dataPromise} />;
}
