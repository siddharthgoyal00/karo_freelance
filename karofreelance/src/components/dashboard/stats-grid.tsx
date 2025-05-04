import type React from "react"
import { StatCard } from "@/components/ui/stat-card"
import { cn } from "@/lib/utils"

interface Stat {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: string | number
    positive: boolean
  }
  className?: string
  iconClassName?: string
  valueClassName?: string
}

interface StatsGridProps {
  stats: Stat[]
  columns?: 2 | 3 | 4
  className?: string
}

export function StatsGrid({ stats, columns = 4, className }: StatsGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn(`grid gap-4 ${gridCols[columns]}`, className)}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={stat.trend}
          className={stat.className}
          iconClassName={stat.iconClassName}
          valueClassName={stat.valueClassName}
        />
      ))}
    </div>
  )
}
