// Simulates a module-level await like the original app's:
//   export const payload = await getPayload({ config: configPromise });
async function initDataSource() {
  // Simulate async initialisation (DB connection, etc.)
  return { name: 'data-source', ready: true };
}

export const dataSource = await initDataSource();
