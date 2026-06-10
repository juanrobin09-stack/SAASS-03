# LocalScore.ai — Micro-SaaS SEO Local

**Le micro-SaaS premium pour mesurer, améliorer et dominer votre visibilité locale.**

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **AI**: Anthropic Claude (coaching)
- **Charts**: Recharts
- **Deploy**: Docker

## Quick Start

```bash
# 1. Clone & install
npm install

# 2. Copy env
cp .env.example .env.local
# Fill in your API keys

# 3. Start database
docker-compose up postgres -d

# 4. Setup database
npm run db:push
npm run db:seed

# 5. Run dev server
npm run dev
```

## With Docker (full stack)

```bash
cp .env.example .env
# Fill in API keys in .env
docker-compose up
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth sessions |
| `ANTHROPIC_API_KEY` | Claude API key for AI coaching |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `STRIPE_PRO_PRICE_ID` | Stripe price ID for Pro plan (€19/mo) |
| `STRIPE_BUSINESS_PRICE_ID` | Stripe price ID for Business plan (€39/mo) |

## Pricing Plans

| Plan | Price | Features |
|------|-------|----------|
| Free | €0 | 1 analysis, score, PDF basic |
| Pro | €19/mo | Score tracking, AI coach, alerts, PDF premium |
| Business | €39/mo | 5 establishments, advanced exports |

## Stripe Webhook Setup

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Auth pages
│   ├── (dashboard)/    # Protected dashboard
│   ├── api/            # API routes
│   └── onboarding/     # Onboarding flow
├── components/
│   ├── ui/             # Base components
│   ├── landing/        # Landing page sections
│   └── dashboard/      # Dashboard components
└── lib/                # Utilities
    ├── ai.ts           # Anthropic AI integration
    ├── score.ts        # Score calculation
    └── stripe.ts       # Stripe integration
```
