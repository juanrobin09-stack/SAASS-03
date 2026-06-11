'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import type { ScoreHistory } from '@/types'
import { formatShortDate } from '@/lib/utils'

interface ScoreHistoryChartProps {
  data: ScoreHistory[]
  competitorName?: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-900 border border-dark-700 rounded-xl p-3 shadow-xl">
        <p className="text-dark-400 text-xs mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function ScoreHistoryChart({ data, competitorName }: ScoreHistoryChartProps) {
  const hasData = data.length > 0
  const formattedData = data.map(d => ({
    ...d,
    date: formatShortDate(d.date),
  }))

  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-3 mb-6 flex-wrap">
          <h3 className="text-white font-semibold text-lg">Évolution du Score</h3>
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <div className="w-3 h-3 rounded-full bg-primary-400 shrink-0" />
              <span className="text-dark-400">Votre score</span>
            </div>
            {competitorName && (
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="w-3 h-3 rounded-full bg-orange-400 shrink-0" />
                <span className="text-dark-400 truncate max-w-[120px]">{competitorName}</span>
              </div>
            )}
          </div>
        </div>

        {hasData ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={formattedData} margin={{ top: 5, right: 8, left: -12, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={{ stroke: '#1e293b' }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                name="Votre score"
                stroke="#818cf8"
                strokeWidth={2.5}
                dot={{ fill: '#818cf8', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#818cf8' }}
              />
              {competitorName && (
                <Line
                  type="monotone"
                  dataKey="competitorScore"
                  name={competitorName}
                  stroke="#f97316"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#f97316', strokeWidth: 0, r: 3 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-center">
            <p className="text-dark-400 text-sm">L'historique apparaîtra après plusieurs semaines de suivi</p>
            <p className="text-dark-600 text-xs mt-1">Revenez chaque semaine pour voir votre progression</p>
          </div>
        )}

        {/* Mini timeline */}
        {data.length > 1 && (
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
            {data.slice(-8).map((d, i) => {
              const delta = i > 0 ? d.score - data[i - 1 + (data.length - Math.min(8, data.length))].score : 0
              return (
                <div key={i} className="flex flex-col items-center min-w-[3rem]">
                  <div className={`text-xs font-bold ${delta > 0 ? 'text-accent-400' : delta < 0 ? 'text-red-400' : 'text-dark-400'}`}>
                    {delta > 0 ? '+' : ''}{delta !== 0 ? delta : '—'}
                  </div>
                  <div className="text-xs text-dark-500">{formatShortDate(d.date)}</div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
