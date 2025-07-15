import { filterDuplicateNews } from "../utils/filterDuplicates";
import { createClient } from "@supabase/supabase-js";
import { fetchNewsArticles, NewsArticle } from "./crawler";
import { summarize } from "./summarizer";
import { buildNewsletterEmail } from "./emailBuilder";
import { sendEmail } from "./sendEmail";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function main() {
  const { data: users, error } = await supabase.from("users").select("email, keywords");
  if (error) throw error;
  if (!users) return;

  for (const user of users) {
    const keywordArticles: Record<string, any[]> = {};
    for (const keyword of user.keywords) {
      const articles = await fetchNewsArticles(keyword);
      const deduped = filterDuplicateNews(articles);

      // Summarize each article
      const summarized = await Promise.all(
        deduped.map(async (a: NewsArticle) => ({
          ...a,
          description: await summarize(a.description),
        }))
      );
      keywordArticles[keyword] = summarized;
    }
    const html = buildNewsletterEmail(user.email, keywordArticles);
    await sendEmail({
      to: user.email,
      subject: "오늘의 뉴스 클리핑",
      html,
    });
    console.log(`Sent newsletter to ${user.email}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}); 