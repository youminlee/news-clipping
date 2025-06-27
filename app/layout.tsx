// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import React from 'react';

export const metadata = {
  title: '뉴스 클리핑',
  description: '키워드 기반 뉴스 요약 구독 서비스',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head />
      <body>{children}</body>
    </html>
  );
}
