'use client';
import { Suspense, use } from 'react';

function DynamicSection({ dataPromise }: { dataPromise: Promise<string> }) {
  const data = use(dataPromise);
  return <p>Dynamic: {data}</p>;
}

export function ClientShell({
  isDraft,
  dataPromise,
  children,
}: {
  isDraft: boolean;
  dataPromise: Promise<string>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p>✅ PAGE RENDERED OK — if you see raw JSON below this or the page repeats, the bug is present.</p>
      <p>Draft mode: {isDraft ? 'yes' : 'no'}</p>
      <Suspense fallback={<p>Loading dynamic section...</p>}>
        <DynamicSection dataPromise={dataPromise} />
      </Suspense>
      {children}
    </div>
  );
}
