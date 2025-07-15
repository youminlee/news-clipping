// utils/filterDuplicates.ts

import { NewsArticle } from "../lib/crawler";

function similarity(s1: string, s2: string): number {
    let longer = s1.length > s2.length ? s1 : s2;
    let shorter = s1.length > s2.length ? s2 : s1;
    let longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    let sameCount = 0;
    for (let i = 0; i < shorter.length; i++) {
      if (shorter[i] === longer[i]) sameCount++;
    }
    return sameCount / longerLength;
  }
  
  export function filterDuplicateNews(newsList: NewsArticle[]): NewsArticle[] {
    const filtered: NewsArticle[] = [];
  
    for (const news of newsList) {
      const isDuplicate = filtered.some(existing =>
        similarity(existing.title, news.title) > 0.8
      );
      if (!isDuplicate) {
        filtered.push(news);
      }
    }
  
    return filtered;
  }
  