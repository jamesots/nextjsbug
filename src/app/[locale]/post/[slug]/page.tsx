import { cookies, draftMode } from 'next/headers';
import { setRequestLocale } from 'next-intl/server';
import { ClientShell } from '../../../../components/ClientShell';
import { cacheLife, cacheTag } from 'next/cache';

const POSTS = ['hello', 'world', 'foo', 'bar'];
const LOCALES = ['en', 'de'];

type MenuItem = { id: string; title: string; slug: string; children: { id: string; title: string; slug: string }[] };

async function getCachedMenu(locale: string): Promise<MenuItem[]> {
  'use cache';
  cacheTag('menu');
  cacheLife('max');
  // Simulate a large Payload CMS menu with many pages and subpages
  return Array.from({ length: 12 }, (_, i) => ({
    id: `page-${locale}-${i}`,
    title: `Section ${i} (${locale}) — ${'Lorem ipsum dolor sit amet '.repeat(3)}`,
    slug: `section-${i}`,
    children: Array.from({ length: 8 }, (_, j) => ({
      id: `page-${locale}-${i}-${j}`,
      title: `Subsection ${i}.${j} — ${'consectetur adipiscing elit '.repeat(3)}`,
      slug: `subsection-${i}-${j}`,
    })),
  }));
}

async function getCachedContent(slug: string, locale: string): Promise<string> {
  'use cache';
  cacheTag('content');
  cacheLife('max');
  // Simulate a large Lexical rich text document
  return Array.from({ length: 80 }, (_, i) =>
    `Paragraph ${i} for ${slug} (${locale}): ${'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(4)}`
  ).join('\n\n');
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
  const [content, menu] = await Promise.all([getCachedContent(slug, locale), getCachedMenu(locale)]);
  const dataPromise = getDynamicData();

  return <ClientShell content={content} isDraft={isDraft} dataPromise={dataPromise} menu={menu} />;
}
