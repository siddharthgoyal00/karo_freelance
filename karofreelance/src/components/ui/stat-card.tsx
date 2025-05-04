import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
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

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  iconClassName,
  valueClassName,
}: StatCardProps) {
  return (
    <Card className={cn("stat-card border-0 shadow-md overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            {trend && (
              <div className="flex items-center mt-2">
                {trend.positive ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={cn("text-xs font-medium", trend.positive ? "text-emerald-500" : "text-red-500")}>
                  {trend.value}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center",
                iconClassName || "bg-primary/10",
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
