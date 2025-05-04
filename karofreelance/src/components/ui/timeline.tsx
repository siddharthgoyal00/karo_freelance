import type React from "react"
import { cn } from "@/lib/utils"

interface TimelineProps {
  children: React.ReactNode
  className?: string
}

export function Timeline({ children, className }: TimelineProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>
}

interface TimelineItemProps {
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
  active?: boolean
  last?: boolean
}

export function TimelineItem({ children, icon, className, active = false, last = false }: TimelineItemProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border-2",
            active
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground/20 bg-background text-muted-foreground",
          )}
        >
          {icon}
        </div>
        {!last && <div className={cn("w-0.5 flex-1 bg-muted-foreground/20", active && "bg-primary/50")} />}
      </div>
      <div className="pb-6 pt-1">{children}</div>
    </div>
  )
}

interface TimelineItemContentProps {
  title: string
  description?: string
  date?: string
  children?: React.ReactNode
  className?: string
}

export function TimelineItemContent({ title, description, date, children, className }: TimelineItemContentProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-medium">{title}</h4>
        {date && <time className="text-xs text-muted-foreground">{date}</time>}
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children}
    </div>
  )
}
