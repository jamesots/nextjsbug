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
  menu,
}: {
  content: string;
  isDraft: boolean;
  dataPromise: Promise<string>;
  menu: { id: string; title: string; slug: string; children: { id: string; title: string; slug: string }[] }[];
}) {
  return (
    <div>
      <p>✅ PAGE RENDERED OK — if you see raw JSON below this or the page repeats, the bug is present.</p>
      <p>Menu items: {menu.length} sections, {menu.reduce((n, m) => n + m.children.length, 0)} children</p>
      <p>Content length: {content.length} chars</p>
      <p>Draft mode: {isDraft ? 'yes' : 'no'}</p>
      <nav aria-label="menu" style={{ display: 'none' }}>
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              {item.title}
              <ul>
                {item.children.map((child) => (
                  <li key={child.id}>{child.title}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <Suspense fallback={<p>Loading dynamic section...</p>}>
        <DynamicSection dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}
