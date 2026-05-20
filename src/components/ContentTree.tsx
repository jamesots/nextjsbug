import { getTranslations } from 'next-intl/server';

type Node = {
  type: 'root' | 'paragraph' | 'heading' | 'text' | 'listitem' | 'list';
  text?: string;
  children?: Node[];
};

// Async server component that calls getTranslations at every node,
// exactly like LexicalInternal in the original app
const NodeRenderer = async ({ node, depth }: { node: Node; depth: number }): Promise<React.ReactNode> => {
  // Mirrors: const t = await getTranslations('lexical') in LexicalInternal
  const t = await getTranslations();

  if (node.type === 'text') {
    return <span>{node.text ?? ''}</span>;
  }
  if (node.type === 'paragraph') {
    return (
      <p>
        {node.children?.map((child, i) => (
          <NodeRenderer key={i} node={child} depth={depth + 1} />
        ))}
      </p>
    );
  }
  if (node.type === 'heading') {
    return (
      <h2>
        {node.children?.map((child, i) => (
          <NodeRenderer key={i} node={child} depth={depth + 1} />
        ))}
      </h2>
    );
  }
  if (node.type === 'listitem') {
    return (
      <li>
        {node.children?.map((child, i) => (
          <NodeRenderer key={i} node={child} depth={depth + 1} />
        ))}
      </li>
    );
  }
  if (node.type === 'list') {
    return (
      <ul>
        {node.children?.map((child, i) => (
          <NodeRenderer key={i} node={child} depth={depth + 1} />
        ))}
      </ul>
    );
  }
  // root
  return (
    <>
      {node.children?.map((child, i) => (
        <NodeRenderer key={i} node={child} depth={depth + 1} />
      ))}
    </>
  );
};

function makeDocument(paragraphs: number, slug: string): Node {
  return {
    type: 'root',
    children: Array.from({ length: paragraphs }, (_, i) => ({
      type: i % 5 === 0 ? 'heading' : 'paragraph' as Node['type'],
      children: [
        { type: 'text' as const, text: `[${i}] ${slug}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. ` },
        { type: 'text' as const, text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' },
        { type: 'text' as const, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.' },
      ],
    })),
  };
}

export async function ContentTree({ paragraphs, slug }: { paragraphs: number; slug: string }) {
  const doc = makeDocument(paragraphs, slug);
  return <NodeRenderer node={doc} depth={0} />;
}
