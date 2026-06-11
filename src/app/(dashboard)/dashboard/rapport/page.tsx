'use client'

import { useState, useEffect } from 'react'
import { FileText, TrendingUp, CheckCircle, AlertCircle, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getScoreLabel, getScoreColor, formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function RapportPage() {
  const [reportData, setReportData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/rapport')
      .then(r => r.json())
      .then(data => {
        setReportData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-dark-400">Chargement du rapport…</p>
        </div>
      </div>
    )
  }

  if (!reportData || reportData.error) {
    return (
      <div className="p-6 lg:p-8">
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-dark-600 mx-auto mb-4" />
            <p className="text-white font-semibold mb-2">Aucun rapport disponible</p>
            <p className="text-dark-400 text-sm mb-6">Effectuez d'abord une analyse pour générer votre rapport.</p>
            <Link href="/onboarding">
              <Button>Lancer une analyse</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { business, analysis, competitor } = reportData
  const weekInsights = analysis.weekInsights as any
  const breakdown = weekInsights?.breakdown ?? {}

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Rapport d'analyse</h1>
        <p className="text-dark-400 text-sm">Généré le {formatDate(analysis.createdAt)}</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Cover */}
        <Card glow>
          <CardContent className="py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{business.name}</h2>
                </div>
                <p className="text-dark-400 mb-1">{business.address}, {business.city}</p>
                <p className="text-dark-400 text-sm">{business.category}</p>
                {business.website && (
                  <a href={business.website} className="text-primary-400 text-sm hover:underline mt-1 block">
                    {business.website}
                  </a>
                )}
              </div>
              <div className="text-center">
                <p className="text-dark-400 text-sm mb-2">Score Local IA</p>
                <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-br from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  {analysis.score}
                </div>
                <p className="text-dark-400 text-sm">/100</p>
                <Badge
                  variant={analysis.score >= 80 ? 'success' : analysis.score >= 60 ? 'warning' : 'danger'}
                  className="mt-2"
                >
                  {getScoreLabel(analysis.score)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score breakdown */}
        <Card>
          <CardContent>
            <h3 className="text-white font-semibold mb-5">Détail du Score</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { label: 'Avis & Note', value: breakdown.reviews ?? 0, max: 30 },
                { label: 'Photos', value: breakdown.photos ?? 0, max: 20 },
                { label: 'Fiche Google', value: breakdown.googleProfile ?? 0, max: 15 },
                { label: 'Publications', value: breakdown.posts ?? 0, max: 10 },
                { label: 'Engagement', value: breakdown.engagement ?? 0, max: 15 },
                { label: 'Site Web', value: breakdown.website ?? 0, max: 10 },
              ].map(item => (
                <div key={item.label} className="bg-dark-800/50 rounded-xl p-3 text-center">
                  <p className="text-dark-400 text-xs mb-1">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.value / item.max >= 0.7 ? 'text-accent-400' : item.value / item.max >= 0.4 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {item.value}
                  </p>
                  <p className="text-dark-500 text-xs">/{item.max}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Competitor */}
        {competitor && (
          <Card>
            <CardContent>
              <h3 className="text-white font-semibold mb-5">Analyse Concurrentielle</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-dark-400 text-sm mb-2">{business.name}</p>
                  <p className="text-4xl font-bold text-primary-400">{analysis.score}</p>
                  <div className="h-2 bg-dark-800 rounded-full mt-2">
                    <div className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full" style={{ width: `${analysis.score}%` }} />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-dark-400 text-sm mb-2">{competitor.name}</p>
                  <p className="text-4xl font-bold text-orange-400">{competitor.score}</p>
                  <div className="h-2 bg-dark-800 rounded-full mt-2">
                    <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full" style={{ width: `${competitor.score}%` }} />
                  </div>
                </div>
              </div>
              <div className={`mt-4 p-3 rounded-xl text-center text-sm font-medium ${
                competitor.score > analysis.score
                  ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                  : 'bg-accent-500/10 text-accent-400 border border-accent-500/20'
              }`}>
                {competitor.score > analysis.score
                  ? `Votre concurrent a ${competitor.score - analysis.score} points d'avance — récupérables en quelques semaines`
                  : `🏆 Vous êtes en tête de ${analysis.score - competitor.score} points !`}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Coach message */}
        <Card>
          <CardContent>
            <h3 className="text-white font-semibold mb-3">Analyse Coach IA</h3>
            <p className="text-dark-300 text-sm leading-relaxed mb-4">{analysis.coachMessage}</p>
            <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
              <p className="text-xs text-primary-400 font-bold mb-1 uppercase tracking-wide">Action prioritaire</p>
              <p className="text-white font-medium text-sm">{analysis.priorityAction}</p>
            </div>
          </CardContent>
        </Card>

        {/* Details (Google stats) */}
        <Card>
          <CardContent>
            <h3 className="text-white font-semibold mb-5">Données Google Business</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Note', value: analysis.googleRating ? `${analysis.googleRating}/5` : '—' },
                { label: 'Avis', value: analysis.googleReviewCount ?? '—' },
                { label: 'Photos', value: analysis.googlePhotosCount ?? '—' },
                { label: 'Site web', value: analysis.hasWebsite ? '✓' : '✗' },
              ].map(stat => (
                <div key={stat.label} className="bg-dark-800/50 rounded-xl p-3 text-center">
                  <p className="text-dark-400 text-xs mb-1">{stat.label}</p>
                  <p className="text-white font-bold text-lg">{stat.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
