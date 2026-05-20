import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';

export default buildConfig({
  db: sqliteAdapter({ client: { url: 'file::memory:?cache=shared' } }),
  editor: lexicalEditor(),
  collections: [],
  secret: 'repro-secret',
  typescript: { outputFile: './payload-types.ts' },
});
