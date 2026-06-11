export interface Business {
  id: string
  name: string
  address: string
  city: string
  category: string
  website?: string | null
  phone?: string | null
  placeId?: string | null
}

export interface ScoreBreakdown {
  googleProfile: number
  reviews: number
  photos: number
  posts: number
  website: number
  engagement: number
}

export interface AnalysisResult {
  score: number
  previousScore?: number
  scoreDelta?: number
  breakdown: ScoreBreakdown
  googleRating?: number
  googleReviewCount?: number
  googlePhotosCount?: number
  hasWebsite: boolean
  hasPhone: boolean
  hasHours: boolean
  hasDescription: boolean
  competitor?: CompetitorResult
  coachMessage: string
  priorityAction: string
  weekTasks: WeekTask[]
  level: number
  xpPoints: number
  alerts: AlertItem[]
}

export interface CompetitorResult {
  name: string
  score: number
  rating?: number
  reviewCount?: number
  scoreDiff: number
}

export interface WeekTask {
  id: string
  title: string
  description: string
  category: 'REVIEWS' | 'PHOTOS' | 'POSTS' | 'INFO' | 'WEBSITE' | 'ENGAGEMENT'
  impact: number
  isCompleted: boolean
}

export interface AlertItem {
  id: string
  type: 'COMPETITOR_GAIN' | 'RATING_DROP' | 'QUICK_WIN' | 'PROGRESS' | 'WEEKLY_DIGEST'
  title: string
  message: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  isRead: boolean
  createdAt: string
}

export interface ScoreHistory {
  date: string
  score: number
  competitorScore?: number
}

export interface UserLevel {
  level: number
  name: string
  minXp: number
  maxXp: number
  color: string
}

export interface OnboardingData {
  businessName: string
  address: string
  city: string
  category: string
  website?: string
  phone?: string
  competitorName?: string
}

export interface CoachSection {
  id: string
  title: string
  content: string
  insight?: string
  actions?: string[]
  priority: 'critical' | 'high' | 'medium' | 'low'
  score?: number
}

export interface CoachReport {
  summary: string
  priorityAction: string
  sections: CoachSection[]
  generatedAt?: string
}

export type PlanType = 'FREE' | 'PRO' | 'BUSINESS'

export interface PricingPlan {
  id: PlanType
  name: string
  price: number
  priceId?: string
  features: string[]
  limitations?: string[]
  highlighted?: boolean
}
