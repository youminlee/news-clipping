"use client";
import React, { useState } from "react";
import "./reset.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addKeyword = () => {
    const trimmed = keyword.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setKeyword("");
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, keywords }),
      });
      if (!res.ok) throw new Error("Failed to subscribe");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="full-wrapper">
      <div className="card">
        <h1>News Clipping</h1>
        <p className="subtitle">📧 매일 점심, 키워드 뉴스 받아보세요</p>

        {submitted ? (
          <div className="success">🎉 구독이 완료되었습니다!</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              이메일
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </label>

            <label>
              키워드
              <div className="keywords">
                {keywords.map((kw) => (
                  <span className="tag" key={kw}>
                    {kw}
                    <button type="button" onClick={() => removeKeyword(kw)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addKeyword();
                  }
                }}
                placeholder="키워드 입력 후 엔터"
              />
            </label>

            <button type="submit" disabled={loading || !email || keywords.length === 0}>
              {loading ? "구독 중..." : "구독하기"}
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        )}

        <footer>Designed by youmin</footer>
      </div>
    </div>
  );
}
