import { cookies, draftMode } from 'next/headers';
import { ClientShell } from '../../../components/ClientShell';
import { cacheLife, cacheTag } from 'next/cache';

const POSTS = ['hello', 'world', 'foo', 'bar'];

async function getCachedContent(slug: string): Promise<string> {
  'use cache';
  cacheTag('content');
  cacheLife('max');
  return `Cached CMS content for: ${slug}`;
}

async function getDynamicData(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get('theme')?.value ?? 'no theme cookie set';
}

export async function generateStaticParams() {
  return POSTS.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const content = await getCachedContent(slug);
  const dataPromise = getDynamicData();

  return <ClientShell content={content} isDraft={isDraft} dataPromise={dataPromise} />;
}
