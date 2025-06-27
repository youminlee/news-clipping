import { NewsArticle } from "./crawler";

export function buildNewsletterEmail(
  email: string,
  keywordArticles: { [keyword: string]: NewsArticle[] }
): string {
  return `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f9fafb; padding: 32px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 32px;">
      <h1 style="font-size: 1.5rem; font-weight: bold; text-align: center; margin-bottom: 24px;">뉴스 클리핑</h1>
      ${Object.entries(keywordArticles)
        .map(
          ([keyword, articles]) => `
            <h2 style="font-size: 1.1rem; font-weight: bold; margin-top: 32px; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 4px;">${keyword}</h2>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${articles
                .map(
                  (a) => `
                    <li style="margin-bottom: 18px;">
                      <a href="${a.url}" style="color: #2563eb; font-weight: 500; text-decoration: none; font-size: 1rem;" target="_blank">${a.title}</a>
                      <div style="color: #444; font-size: 0.97rem; margin-top: 4px;">${a.description}</div>
                    </li>
                  `
                )
                .join("")}
            </ul>
          `
        )
        .join("")}
      <div style="margin-top: 40px; text-align: center; color: #888; font-size: 0.95rem; border-top: 1px solid #eee; padding-top: 16px;">
        Powered by Youmin
      </div>
    </div>
  </div>
  `;
} 