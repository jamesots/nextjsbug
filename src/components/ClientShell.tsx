'use client';
import { Suspense, use } from 'react';

function DynamicSection({ dataPromise }: { dataPromise: Promise<string> }) {
  const data = use(dataPromise);
  return <p>Dynamic: {data}</p>;
}

export function ClientShell({ dataPromise }: { dataPromise: Promise<string> }) {
  return (
    <div>
      <p>Static content (pre-rendered)</p>
      <Suspense fallback={<p>Loading...</p>}>
        <DynamicSection dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}
