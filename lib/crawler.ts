import Parser from 'rss-parser';

export interface NewsArticle {
  title: string;
  url: string;
  description: string;
}

const parser = new Parser();

export async function fetchNewsArticles(keyword: string): Promise<NewsArticle[]> {
  const feed = await parser.parseURL(
    `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=ko&gl=KR&ceid=KR:ko`
  );

  return feed.items.slice(0, 3).map(item => ({
    title: item.title || '',
    url: item.link || '',
    description: item.contentSnippet || ''
  }));
}
