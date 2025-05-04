import { ProjectCard } from "@/components/ui/project-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
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

interface ProjectGridProps {
  projects: Project[]
  columns?: 1 | 2 | 3
  compact?: boolean
  className?: string
  emptyMessage?: string
  showViewAll?: boolean
  viewAllHref?: string
  viewAllLabel?: string
}

export function ProjectGrid({
  projects,
  columns = 2,
  compact = false,
  className,
  emptyMessage = "No projects found",
  showViewAll = false,
  viewAllHref = "/projects",
  viewAllLabel = "View All Projects",
}: ProjectGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }

  const renderProjectActions = (project: Project) => (
    <>
      <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90" asChild>
        <Link href={`/projects/${project.id}`}>
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Link>
      </Button>
      <Button size="sm" variant="outline" asChild>
        <Link href={`/messages?project=${project.id}`}>
          <MessageSquare className="h-4 w-4 mr-1" />
          Message
        </Link>
      </Button>
    </>
  )

  return (
    <div className="space-y-6">
      {projects.length > 0 ? (
        <div className={cn(`grid gap-4 ${gridCols[columns]}`, className)}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} actions={renderProjectActions(project)} compact={compact} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}

      {showViewAll && projects.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" asChild>
            <Link href={viewAllHref}>{viewAllLabel}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
