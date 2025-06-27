# news-clipping

A free service to get daily news summaries by keyword, delivered to your email.

## Setup

1. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

2. Run the app:

```
npm install
npm run dev
```

## Email Setup

Add these to your `.env.local` for SMTP (Nodemailer):
```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=yourpassword
SMTP_FROM=Your Service <your@email.com>
```

## Features
- Subscribe with your email and keywords
- Daily news crawling, summarization, and email delivery
- Built with Next.js, Supabase, TailwindCSS 