"use client";
import "./reset.css"; // 이거 추가

export default function Home() {
  return (
    <html lang="ko">
      <head>
        <title>News Clipping</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="full-wrapper">
          <div className="card">
            <h1>News Clipping</h1>
            <p>📧 매일 점심, 키워드 뉴스 받아보세요</p>
            <form>
              <label>이메일</label>
              <input type="email" placeholder="example@email.com" />
              <label>키워드</label>
              <input type="text" placeholder="키워드 입력 후 엔터" />
              <button type="submit">구독하기</button>
            </form>
            <footer>Designed by youmin</footer>
          </div>
        </div>
      </body>
    </html>
  );
}
