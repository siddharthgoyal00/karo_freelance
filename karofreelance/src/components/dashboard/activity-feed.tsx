import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Timeline, TimelineItem, TimelineItemContent } from "@/components/ui/timeline"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, CheckCircle, AlertCircle, DollarSign, Clock, Users, FileText, Star } from "lucide-react"

interface ActivityItem {
  id: string
  type: "message" | "milestone" | "payment" | "bid" | "review" | "alert" | "contract"
  title: string
  description: string
  date: string
  project?: {
    id: string
    name: string
  }
  user?: {
    id: string
    name: string
  }
  action?: {
    label: string
    href: string
  }
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  title?: string
  description?: string
  limit?: number
  showViewAll?: boolean
  viewAllHref?: string
}

export function ActivityFeed({
  activities,
  title = "Recent Activity",
  description = "Your latest updates and notifications",
  limit = 5,
  showViewAll = true,
  viewAllHref = "/activity",
}: ActivityFeedProps) {
  const limitedActivities = limit ? activities.slice(0, limit) : activities

  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "milestone":
        return <CheckCircle className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
      case "bid":
        return <Users className="h-4 w-4" />
      case "review":
        return <Star className="h-4 w-4" />
      case "alert":
        return <AlertCircle className="h-4 w-4" />
      case "contract":
        return <FileText className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getBadgeStyles = (type: ActivityItem["type"]) => {
    switch (type) {
      case "message":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "milestone":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "payment":
        return "bg-green-100 text-green-700 border-green-200"
      case "bid":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "review":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "alert":
        return "bg-red-100 text-red-700 border-red-200"
      case "contract":
        return "bg-indigo-100 text-indigo-700 border-indigo-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {limitedActivities.length > 0 ? (
          <Timeline>
            {limitedActivities.map((activity, index) => (
              <TimelineItem
                key={activity.id}
                icon={getIcon(activity.type)}
                active={index === 0}
                last={index === limitedActivities.length - 1}
              >
                <TimelineItemContent title={activity.title} description={activity.description} date={activity.date}>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {activity.project && (
                      <Badge variant="outline" className="text-xs">
                        {activity.project.name}
                      </Badge>
                    )}
                    <Badge variant="outline" className={`text-xs ${getBadgeStyles(activity.type)}`}>
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </Badge>
                    {activity.action && (
                      <Button size="sm" variant="outline" asChild className="text-xs">
                        <Link href={activity.action.href}>{activity.action.label}</Link>
                      </Button>
                    )}
                  </div>
                </TimelineItemContent>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        )}

        {showViewAll && activities.length > limit && (
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link href={viewAllHref}>View all activity</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
