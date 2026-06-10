import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ScoreHistoryChart } from '@/components/dashboard/score-history'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default async function HistoriquePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const userId = (session.user as any).id

  const business = await prisma.business.findFirst({
    where: { userId, isActive: true },
    include: {
      analyses: {
        orderBy: { createdAt: 'desc' },
        take: 52,
      },
      competitors: { where: { isMain: true }, take: 1 },
    },
  })

  if (!business) redirect('/onboarding')

  const analyses = business.analyses.reverse()
  const scoreHistory = analyses.map(a => ({
    date: a.createdAt.toISOString(),
    score: a.score,
    competitorScore: a.competitorScore ?? undefined,
  }))

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Historique</h1>
        <p className="text-dark-400">Toute l'évolution de votre Score Local</p>
      </div>

      <div className="mb-6">
        <ScoreHistoryChart
          data={scoreHistory}
          competitorName={business.competitors[0]?.name}
        />
      </div>

      <Card>
        <CardContent>
          <h3 className="text-white font-semibold mb-5">Analyses précédentes</h3>
          <div className="space-y-3">
            {analyses.reverse().map((analysis, i) => {
              const delta = analysis.scoreDelta ?? 0
              return (
                <div
                  key={analysis.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/30 border border-dark-700 hover:border-dark-600 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-600/20 to-accent-500/20 border border-primary-500/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{analysis.score}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{formatDate(analysis.createdAt)}</p>
                    {analysis.coachMessage && (
                      <p className="text-dark-400 text-xs mt-0.5 line-clamp-1">{analysis.coachMessage}</p>
                    )}
                  </div>
                  {delta !== 0 && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${delta > 0 ? 'text-accent-400' : 'text-red-400'}`}>
                      {delta > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {delta > 0 ? '+' : ''}{delta}
                    </div>
                  )}
                  {analysis.competitorScore && (
                    <div className="text-right">
                      <p className="text-dark-400 text-xs">Concurrent</p>
                      <p className="text-white font-bold">{analysis.competitorScore}</p>
                    </div>
                  )}
                </div>
              )
            })}
            {analyses.length === 0 && (
              <p className="text-dark-400 text-center py-6">Aucune analyse disponible</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
