// Server component — each instance is a separate RSC entry, like Lexical nodes
async function TextNode({ text }: { text: string }) {
  return <span>{text}</span>;
}

async function ParagraphNode({ index, slug }: { index: number; slug: string }) {
  return (
    <p>
      <TextNode text={`[${index}] ${slug}: `} />
      <TextNode text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. " />
      <TextNode text="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " />
      <TextNode text="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. " />
    </p>
  );
}

async function HeadingNode({ text }: { text: string }) {
  return <h2><TextNode text={text} /></h2>;
}

export async function ContentTree({ paragraphs, slug }: { paragraphs: number; slug: string }) {
  const nodes = Array.from({ length: paragraphs }, (_, i) => i);
  return (
    <article>
      {nodes.map((i) => (
        <section key={i}>
          <HeadingNode text={`Section ${i}`} />
          <ParagraphNode index={i} slug={slug} />
          <ParagraphNode index={i} slug={`${slug}-b`} />
        </section>
      ))}
    </article>
  );
}
