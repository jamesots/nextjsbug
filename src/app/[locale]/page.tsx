import { cookies, draftMode } from 'next/headers';
import { setRequestLocale } from 'next-intl/server';
import { ClientShell } from '../../components/ClientShell';

async function getDynamicData(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get('theme')?.value ?? 'no theme cookie set';
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { isEnabled: isDraft } = await draftMode();
  const dataPromise = getDynamicData();

  return <ClientShell isDraft={isDraft} dataPromise={dataPromise}><p>Home page</p></ClientShell>;
}
