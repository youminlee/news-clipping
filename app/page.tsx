"use client";
import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addKeyword = () => {
    if (keyword && !keywords.includes(keyword)) {
      setKeywords([...keywords, keyword]);
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 relative">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">News Clipping</h1>
        <p className="text-center text-gray-700 mb-6 text-sm">
          📧 매일 아침 9시, 원하는 키워드의 뉴스를 이메일로 받아보세요 :)
        </p>

        {submitted ? (
          <div className="text-green-600 text-center">구독이 완료되었습니다!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">이메일 주소</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">키워드</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center"
                  >
                    {kw}
                    <button
                      type="button"
                      className="ml-1 text-xs"
                      onClick={() => removeKeyword(kw)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addKeyword();
                  }
                }}
                placeholder="예: AI, 보안 등 키워드를 콤마로 구분하여 입력해주세요."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loading || !email || keywords.length === 0}
            >
              {loading ? "구독 중..." : "구독하기"}
            </button>
            {error && <div className="text-red-600 text-center">{error}</div>}
          </form>
        )}
      </div>

      <footer className="absolute bottom-2 left-2 text-xs text-gray-400">
        Designed by youmin
      </footer>
    </main>
  );
}
