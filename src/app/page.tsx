import { cookies } from 'next/headers';
import { ClientShell } from '../components/ClientShell';

// Reads cookies() so it's dynamic/uncached — must be in Suspense for PPR
async function getDynamicData(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get('theme')?.value ?? 'no theme cookie set';
}

export default function Page() {
  // Not awaited — passed as Promise to client component for PPR
  const dataPromise = getDynamicData();

  return <ClientShell dataPromise={dataPromise} />;
}
