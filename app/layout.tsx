// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import React from 'react';

export const metadata = {
  title: '📬News Clipping',
  description: '키워드 기반 뉴스 요약 서비스',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head />
      <body className="min-h-screen bg-gray-50 text-black">{children}</body>
    </html>
  );
}
