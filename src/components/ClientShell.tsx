'use client';
import { Suspense, use } from 'react';

function DynamicSection({ dataPromise }: { dataPromise: Promise<string> }) {
  const data = use(dataPromise);
  return <p>Dynamic: {data}</p>;
}

export function ClientShell({
  content,
  isDraft,
  dataPromise,
}: {
  content: string;
  isDraft: boolean;
  dataPromise: Promise<string>;
}) {
  return (
    <div>
      <p>Cached content: {content}</p>
      <p>Draft mode: {isDraft ? 'yes' : 'no'}</p>
      <Suspense fallback={<p>Loading...</p>}>
        <DynamicSection dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}
