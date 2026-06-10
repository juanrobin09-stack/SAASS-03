import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const badges = [
    { slug: 'first-analysis', name: 'Premier Audit', description: 'Votre première analyse est terminée', icon: '🎯', color: '#6366f1', xpReward: 50 },
    { slug: 'score-70', name: 'Score 70+', description: 'Atteindre un score de 70 ou plus', icon: '⭐', color: '#f59e0b', xpReward: 100 },
    { slug: 'score-80', name: 'Score 80+', description: 'Atteindre un score de 80 ou plus', icon: '🌟', color: '#f59e0b', xpReward: 200 },
    { slug: 'score-90', name: 'Elite Local', description: 'Atteindre un score de 90 ou plus', icon: '💎', color: '#06b6d4', xpReward: 500 },
    { slug: 'week-1', name: 'Première Semaine', description: 'Une semaine de suivi continu', icon: '📅', color: '#10b981', xpReward: 75 },
    { slug: 'week-4', name: 'Un Mois', description: 'Un mois de suivi continu', icon: '📆', color: '#10b981', xpReward: 150 },
    { slug: 'beat-competitor', name: 'Champion Local', description: 'Dépasser votre concurrent principal', icon: '🏆', color: '#f59e0b', xpReward: 300 },
    { slug: 'task-10', name: 'Actif', description: 'Compléter 10 missions', icon: '✅', color: '#6366f1', xpReward: 100 },
    { slug: 'task-50', name: 'Pro', description: 'Compléter 50 missions', icon: '🚀', color: '#6366f1', xpReward: 250 },
    { slug: 'review-hero', name: 'Héros des Avis', description: 'Répondre à 20 avis', icon: '💬', color: '#ec4899', xpReward: 150 },
  ]

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: badge,
      create: badge,
    })
  }

  console.log('Seed completed successfully')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
