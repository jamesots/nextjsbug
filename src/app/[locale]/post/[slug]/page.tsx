import { cookies, draftMode } from 'next/headers';
import { setRequestLocale } from 'next-intl/server';
import { ClientShell } from '../../../../components/ClientShell';
import { ContentTree } from '../../../../components/ContentTree';
import { payload } from '../../../../lib/data';

const POSTS = ['hello', 'world', 'foo', 'bar'];
const LOCALES = ['en', 'de'];

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
  const dataPromise = getDynamicData();

  return (
    <ClientShell isDraft={isDraft} dataPromise={dataPromise}>
      <ContentTree paragraphs={40} slug={`${slug} (${payload.config.serverURL})`} />
    </ClientShell>
  );
}
