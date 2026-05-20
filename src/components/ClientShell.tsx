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
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              <a href={`/${item.slug}`}>{item.title}</a>
              <ul>
                {item.children.map((child) => (
                  <li key={child.id}><a href={`/${item.slug}/${child.slug}`}>{child.title}</a></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <p>Cached content: {content}</p>
        <p>Draft mode: {isDraft ? 'yes' : 'no'}</p>
      </main>
      <Suspense fallback={<p>Loading...</p>}>
        <DynamicSection dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
}
