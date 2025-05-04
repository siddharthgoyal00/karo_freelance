"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  readOnly?: boolean
  onChange?: (value: number) => void
  className?: string
}

export function Rating({ value, max = 5, size = "md", readOnly = true, onChange, className }: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1)

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const handleClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating)
    }
  }

  return (
    <div className={cn("flex items-center", className)}>
      {stars.map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            "mr-0.5",
            star <= value ? "text-primary fill-primary" : "text-muted-foreground/30",
            !readOnly && "cursor-pointer transition-colors hover:text-primary",
          )}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  )
}
