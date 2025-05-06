import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BriefcaseBusiness, MessageSquare, Search, Clock, DollarSign, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function FreelancerDashboard() {
  // Sample data for freelancer dashboard
  const stats = [
    {
      title: "Active Projects",
      value: "2",
      icon: BriefcaseBusiness,
      description: "Projects in progress",
      color: "text-green-500",
    },
    {
      title: "Pending Bids",
      value: "5",
      icon: Clock,
      description: "Awaiting client review",
      color: "text-orange-500",
    },
    {
      title: "Total Earned",
      value: "$3,750",
      icon: DollarSign,
      description: "Across all projects",
      color: "text-blue-500",
    },
    {
      title: "Rating",
      value: "4.8/5",
      icon: Star,
      description: "From 15 reviews",
      color: "text-yellow-500",
    },
  ]

  const activeProjects = [
    {
      id: "proj-1",
      title: "E-commerce Website Development",
      description: "Building a full-stack e-commerce platform with React and Node.js",
      client: "ABC Company",
      budget: "$2,500",
      progress: 65,
      dueDate: "May 15, 2023",
      status: "In Progress",
    },
    {
      id: "proj-2",
      title: "API Integration for Payment Gateway",
      description: "Integrating Stripe payment gateway with an existing web application",
      client: "XYZ Startup",
      budget: "$1,800",
      progress: 30,
      dueDate: "June 5, 2023",
      status: "In Progress",
    },
  ]

  const recentMessages = [
    {
      id: "msg-1",
      from: "John Smith",
      preview: "Can you provide an update on the e-commerce project milestone?",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: "msg-2",
      from: "Sarah Williams",
      preview: "I've reviewed your proposal for the API integration project...",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "msg-3",
      from: "Tech Innovations Inc.",
      preview: "We'd like to discuss a new project opportunity with you...",
      time: "3 days ago",
      unread: false,
    },
  ]

  const recommendedProjects = [
    {
      id: "rec-1",
      title: "MERN Stack Developer Needed",
      description: "Looking for an experienced MERN stack developer to build a social media platform",
      budget: "$3,000 - $5,000",
      skills: ["MongoDB", "Express", "React", "Node.js"],
      postedDate: "2 days ago",
    },
    {
      id: "rec-2",
      title: "Full-Stack Developer for E-learning Platform",
      description:
        "Need a developer to create an interactive e-learning platform with user authentication and course management",
      budget: "$2,500 - $4,000",
      skills: ["React", "Node.js", "PostgreSQL"],
      postedDate: "1 day ago",
    },
  ]

  return (
    <DashboardSidebar userType="freelancer">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, Jane</h2>
            <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/freelancer/projects">
              <Search className="mr-2 h-4 w-4" />
              Find New Projects
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BriefcaseBusiness className="mr-2 h-5 w-5" />
                Active Projects
              </CardTitle>
              <CardDescription>Your currently active projects and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeProjects.map((project) => (
                  <div key={project.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{project.title}</h3>
                      <Badge>{project.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    <div className="flex items-center text-sm">
                      <Avatar className="h-4 w-4 mr-1">
                        <AvatarFallback className="text-[8px]">{project.client.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="mr-4">{project.client}</span>
                      <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{project.budget}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress: {project.progress}%</span>
                      <span>Due: {project.dueDate}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" asChild className="w-full">
                  <Link href="/freelancer/active-projects">View All Projects</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Recent Messages
              </CardTitle>
              <CardDescription>Latest communications from your clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={message.from} />
                      <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{message.from}</p>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{message.preview}</p>
                      {message.unread && (
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" asChild className="w-full">
                  <Link href="/freelancer/messages">View All Messages</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Recommended Projects
            </CardTitle>
            <CardDescription>Projects that match your skills and experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendedProjects.map((project) => (
                <div key={project.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{project.title}</h3>
                    <span className="text-xs text-muted-foreground">{project.postedDate}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex items-center text-sm">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="mr-4">{project.budget}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm">Submit Proposal</Button>
                </div>
              ))}
              <Button variant="outline" asChild className="w-full">
                <Link href="/freelancer/projects">View More Projects</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardSidebar>
  )
}
