import type React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, Clock, AlertCircle } from "lucide-react"
import { Rating } from "@/components/ui/rating"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    budget: string
    deadline?: string
    status: string
    skills?: string[]
    client?: {
      name: string
      avatar?: string
      rating?: number
    }
    freelancer?: {
      name: string
      avatar?: string
      rating?: number
    }
    progress?: number
    alerts?: number
  }
  actions?: React.ReactNode
  className?: string
  compact?: boolean
}

export function ProjectCard({ project, actions, className, compact = false }: ProjectCardProps) {
  const person = project.client || project.freelancer

  return (
    <Card className={cn("project-card border border-gray-100 dark:border-gray-800 overflow-hidden", className)}>
      <CardHeader className={cn("pb-2", compact && "p-4")}>
        <div className="flex items-center justify-between">
          <CardTitle className={cn(compact && "text-base")}>{project.title}</CardTitle>
          <div className="flex items-center gap-2">
            {project.alerts && project.alerts > 0 && (
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                <AlertCircle className="h-3 w-3 mr-1" /> {project.alerts}
              </Badge>
            )}
            <Badge
              className={cn(
                project.status === "Completed"
                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                  : project.status === "In Progress"
                    ? "bg-primary/10 text-primary border-primary/10"
                    : "bg-amber-100 text-amber-700 border-amber-200",
              )}
            >
              {project.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn("space-y-3", compact && "p-4 pt-0")}>
        {!compact && <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>}

        {person && (
          <div className="flex items-center text-sm">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
              <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                {person.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="mr-4 flex items-center">
              {person.name}
              {person.rating && (
                <span className="ml-1 flex items-center">
                  <Rating value={person.rating} size="sm" className="ml-1" />
                </span>
              )}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
            <span>{project.budget}</span>
          </div>
          {project.deadline && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-1" />
              <span>{project.deadline}</span>
            </div>
          )}
        </div>

        {project.skills && project.skills.length > 0 && !compact && (
          <div className="flex flex-wrap gap-1 pt-1">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {project.progress !== undefined && (
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress: {project.progress}%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${project.progress}%` }} />
            </div>
          </div>
        )}
      </CardContent>

      {actions && <CardFooter className={cn("flex flex-wrap gap-2", compact && "p-4 pt-0")}>{actions}</CardFooter>}
    </Card>
  )
}
