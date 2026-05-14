import { Suspense } from 'react';

// Mirrors what withPayload does when cacheComponents: true (Payload 3.84.1, PR #16020)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Suspense>
  );
}
