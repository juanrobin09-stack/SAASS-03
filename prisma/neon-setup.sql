-- LocalScore.ai — Schema complet
-- À coller dans : Neon Dashboard → SQL Editor → Run

-- Enums
CREATE TYPE "PlanType" AS ENUM ('FREE', 'PRO', 'BUSINESS');
CREATE TYPE "AlertType" AS ENUM ('COMPETITOR_GAIN', 'RATING_DROP', 'QUICK_WIN', 'PROGRESS', 'WEEKLY_DIGEST');
CREATE TYPE "AlertPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE "TaskCategory" AS ENUM ('REVIEWS', 'PHOTOS', 'POSTS', 'INFO', 'WEBSITE', 'ENGAGEMENT');

-- Users
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "plan" "PlanType" NOT NULL DEFAULT 'FREE',
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "stripeCurrentPeriodEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON "users"("stripeCustomerId");
CREATE UNIQUE INDEX "users_stripeSubscriptionId_key" ON "users"("stripeSubscriptionId");

-- Businesses
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "website" TEXT,
    "phone" TEXT,
    "placeId" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Analyses
CREATE TABLE "analyses" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "previousScore" INTEGER,
    "scoreDelta" INTEGER,
    "googleRating" DOUBLE PRECISION,
    "googleReviewCount" INTEGER,
    "googlePhotosCount" INTEGER,
    "googlePostsCount" INTEGER,
    "hasWebsite" BOOLEAN NOT NULL DEFAULT false,
    "hasPhone" BOOLEAN NOT NULL DEFAULT false,
    "hasHours" BOOLEAN NOT NULL DEFAULT false,
    "hasDescription" BOOLEAN NOT NULL DEFAULT false,
    "responseRate" DOUBLE PRECISION,
    "competitorScore" INTEGER,
    "competitorName" TEXT,
    "scoreDiff" INTEGER,
    "coachMessage" TEXT,
    "priorityAction" TEXT,
    "weekInsights" JSONB,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xpPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "analyses_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "analyses" ADD CONSTRAINT "analyses_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Competitors
CREATE TABLE "competitors" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "placeId" TEXT,
    "score" INTEGER,
    "reviewCount" INTEGER,
    "rating" DOUBLE PRECISION,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "competitors_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "competitors" ADD CONSTRAINT "competitors_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Alerts
CREATE TABLE "alerts" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "type" "AlertType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "priority" "AlertPriority" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Weekly Tasks
CREATE TABLE "weekly_tasks" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "TaskCategory" NOT NULL,
    "impact" INTEGER NOT NULL DEFAULT 1,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "weekOf" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "weekly_tasks_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "weekly_tasks" ADD CONSTRAINT "weekly_tasks_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Badges
CREATE TABLE "badges" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL DEFAULT 50,
    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "badges_slug_key" ON "badges"("slug");

-- User Badges
CREATE TABLE "user_badges" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "user_badges_userId_badgeId_key" ON "user_badges"("userId", "badgeId");
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Prisma migrations table
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" VARCHAR(36) NOT NULL,
    "checksum" VARCHAR(64) NOT NULL,
    "finished_at" TIMESTAMPTZ,
    "migration_name" VARCHAR(255) NOT NULL,
    "logs" TEXT,
    "rolled_back_at" TIMESTAMPTZ,
    "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id")
);

-- Seed : 10 badges
INSERT INTO "badges" ("id", "slug", "name", "description", "icon", "color", "xpReward") VALUES
('badge_01', 'first-analysis',  'Premier Audit',     'Votre première analyse est terminée',    '🎯', '#6366f1', 50),
('badge_02', 'score-70',        'Score 70+',          'Atteindre un score de 70 ou plus',       '⭐', '#f59e0b', 100),
('badge_03', 'score-80',        'Score 80+',          'Atteindre un score de 80 ou plus',       '🌟', '#f59e0b', 200),
('badge_04', 'score-90',        'Elite Local',        'Atteindre un score de 90 ou plus',       '💎', '#06b6d4', 500),
('badge_05', 'week-1',          'Première Semaine',   'Une semaine de suivi continu',            '📅', '#10b981', 75),
('badge_06', 'week-4',          'Un Mois',            'Un mois de suivi continu',                '📆', '#10b981', 150),
('badge_07', 'beat-competitor', 'Champion Local',     'Dépasser votre concurrent principal',     '🏆', '#f59e0b', 300),
('badge_08', 'task-10',         'Actif',              'Compléter 10 missions',                   '✅', '#6366f1', 100),
('badge_09', 'task-50',         'Pro',                'Compléter 50 missions',                   '🚀', '#6366f1', 250),
('badge_10', 'review-hero',     'Héros des Avis',     'Répondre à 20 avis',                      '💬', '#ec4899', 150)
ON CONFLICT (slug) DO NOTHING;
