// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: '📬News Clipping',
  description: '키워드 기반 뉴스 요약 서비스',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="h-screen w-screen">
      <body className="h-screen w-screen flex items-center justify-center bg-gray-50">
        {children}
      </body>
    </html>
  );
}
