import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BriefcaseBusiness, Clock, DollarSign, MessageSquare, Users, Star } from "lucide-react"

export default function ClientProjects() {
  // Sample data for client projects
  const activeProjects = [
    {
      id: "proj-1",
      title: "E-commerce Website Development",
      description: "Building a full-stack e-commerce platform with React and Node.js",
      freelancer: {
        name: "Jane Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      budget: "$2,500",
      progress: 65,
      dueDate: "May 15, 2023",
      status: "In Progress",
      bids: null,
    },
    {
      id: "proj-2",
      title: "Mobile App UI Design",
      description: "Creating UI/UX design for a fitness tracking mobile application",
      freelancer: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      budget: "$1,200",
      progress: 80,
      dueDate: "April 30, 2023",
      status: "In Progress",
      bids: null,
    },
    {
      id: "proj-3",
      title: "Content Writing for Blog",
      description: "Writing 10 SEO-optimized blog posts for a tech company",
      freelancer: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.5,
      },
      budget: "$550",
      progress: 40,
      dueDate: "May 20, 2023",
      status: "In Progress",
      bids: null,
    },
  ]

  const pendingProjects = [
    {
      id: "proj-4",
      title: "WordPress Website Redesign",
      description: "Redesigning an existing WordPress website with a modern look and improved functionality",
      freelancer: null,
      budget: "$1,800",
      progress: 0,
      dueDate: "June 15, 2023",
      status: "Open",
      bids: 8,
    },
    {
      id: "proj-5",
      title: "Social Media Marketing Campaign",
      description: "Creating and executing a social media marketing campaign for a new product launch",
      freelancer: null,
      budget: "$1,000",
      progress: 0,
      dueDate: "June 1, 2023",
      status: "Open",
      bids: 12,
    },
  ]

  const completedProjects = [
    {
      id: "proj-6",
      title: "Logo Design for Startup",
      description: "Designing a modern logo for a tech startup",
      freelancer: {
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5.0,
      },
      budget: "$350",
      progress: 100,
      completedDate: "March 15, 2023",
      status: "Completed",
      bids: null,
    },
    {
      id: "proj-7",
      title: "Database Optimization",
      description: "Optimizing PostgreSQL database for better performance",
      freelancer: {
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      budget: "$800",
      progress: 100,
      completedDate: "February 28, 2023",
      status: "Completed",
      bids: null,
    },
  ]

  return (
    <DashboardSidebar userType="client">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Projects</h2>
            <p className="text-muted-foreground">Manage and track all your projects in one place</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/client/post-project">
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              Post a New Project
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="active">Active ({activeProjects.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingProjects.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="mt-1">{project.description}</CardDescription>
                      </div>
                      <Badge>{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={project.freelancer?.avatar || "/placeholder.svg"}
                              alt={project.freelancer?.name}
                            />
                            <AvatarFallback>{project.freelancer?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{project.freelancer?.name}</p>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs text-muted-foreground">{project.freelancer?.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">{project.budget}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">Due: {project.dueDate}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Progress: {project.progress}%</p>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" asChild>
                          <Link href={`/client/projects/${project.id}`}>View Details</Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/client/messages?project=${project.id}`}>
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="space-y-4">
              {pendingProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="mt-1">{project.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm font-medium">{project.bids} bids received</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">{project.budget}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">Due: {project.dueDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" asChild>
                          <Link href={`/client/projects/${project.id}/bids`}>View Bids</Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/client/projects/${project.id}/edit`}>Edit Project</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="mt-1">{project.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={project.freelancer?.avatar || "/placeholder.svg"}
                              alt={project.freelancer?.name}
                            />
                            <AvatarFallback>{project.freelancer?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{project.freelancer?.name}</p>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs text-muted-foreground">{project.freelancer?.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">{project.budget}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">Completed: {project.completedDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" asChild>
                          <Link href={`/client/projects/${project.id}`}>View Details</Link>
                        </Button>
                        {!project.freelancer?.rating && (
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/client/projects/${project.id}/review`}>
                              <Star className="h-4 w-4 mr-1" />
                              Leave Review
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardSidebar>
  )
}
