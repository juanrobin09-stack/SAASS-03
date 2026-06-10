import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
}

export function Card({ children, className, glow, hover }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-dark-800 bg-dark-900/50 backdrop-blur-sm',
        glow && 'shadow-glow border-primary-500/20',
        hover && 'hover:border-dark-700 hover:bg-dark-900/70 transition-all duration-200 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-6 pb-0', className)}>{children}</div>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-6', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-dark-800', className)}>
      {children}
    </div>
  )
}
