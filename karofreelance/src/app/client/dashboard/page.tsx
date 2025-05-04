"use client"

import { AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BriefcaseBusiness,
  MessageSquare,
  Users,
  Clock,
  DollarSign,
  ChevronRight,
  CheckCircle,
  PlusCircle,
  Calendar,
  BarChart3,
  FileText,
} from "lucide-react"
import { StatsGrid } from "@/components/dashboard/stats-grid"
import { ProjectGrid } from "@/components/dashboard/project-grid"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { DatePicker } from "@/components/ui/date-picker"
import { useState } from "react"
import { Rating } from "@/components/ui/rating"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClientDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>()

  // Sample data for client dashboard
  const stats = [
    {
      title: "Active Projects",
      value: "3",
      description: "Projects in progress",
      icon: <BriefcaseBusiness className="h-5 w-5 text-primary" />,
      trend: {
        value: "+1 this week",
        positive: true,
      },
      iconClassName: "bg-primary/10",
    },
    {
      title: "Pending Bids",
      value: "12",
      description: "Awaiting your review",
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      trend: {
        value: "+5 this week",
        positive: true,
      },
      iconClassName: "bg-amber-500/10",
    },
    {
      title: "Total Spent",
      value: "$4,250",
      description: "Across all projects",
      icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
      trend: {
        value: "+$750 this month",
        positive: true,
      },
      iconClassName: "bg-emerald-500/10",
    },
    {
      title: "Completed Projects",
      value: "8",
      description: "Successfully delivered",
      icon: <CheckCircle className="h-5 w-5 text-indigo-500" />,
      trend: {
        value: "+2 this month",
        positive: true,
      },
      iconClassName: "bg-indigo-500/10",
    },
  ]

  const activeProjects = [
    {
      id: "proj-1",
      title: "E-commerce Website Development",
      description: "Building a full-stack e-commerce platform with React and Node.js",
      budget: "$2,500",
      deadline: "May 15, 2023",
      status: "In Progress",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      freelancer: {
        name: "Jane Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      progress: 65,
      alerts: 2,
    },
    {
      id: "proj-2",
      title: "Mobile App UI Design",
      description: "Creating UI/UX design for a fitness tracking mobile application",
      budget: "$1,200",
      deadline: "April 30, 2023",
      status: "In Progress",
      skills: ["UI/UX Design", "Figma", "Mobile Design"],
      freelancer: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      progress: 80,
      alerts: 0,
    },
    {
      id: "proj-3",
      title: "Content Writing for Blog",
      description: "Writing 10 SEO-optimized blog posts for a tech company",
      budget: "$550",
      deadline: "May 20, 2023",
      status: "In Progress",
      skills: ["Content Writing", "SEO", "Copywriting"],
      freelancer: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.5,
      },
      progress: 40,
      alerts: 1,
    },
  ]

  const recentMessages = [
    {
      id: "msg-1",
      from: "Jane Doe",
      preview: "I've completed the first milestone for the e-commerce project...",
      time: "2 hours ago",
      unread: true,
      avatar: "/placeholder.svg?height=40&width=40",
      project: "E-commerce Website Development",
    },
    {
      id: "msg-2",
      from: "Alex Johnson",
      preview: "Here are the updated UI mockups for your review...",
      time: "Yesterday",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
      project: "Mobile App UI Design",
    },
    {
      id: "msg-3",
      from: "Michael Brown",
      preview: "I've submitted the first three blog posts. Let me know...",
      time: "2 days ago",
      unread: false,
      avatar: "/placeholder.svg?height=40&width=40",
      project: "Content Writing for Blog",
    },
  ]

  const topFreelancers = [
    {
      id: "freelancer-1",
      name: "Jane Doe",
      title: "Full Stack Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      hourlyRate: "$45/hr",
      skills: ["React", "Node.js", "MongoDB"],
    },
    {
      id: "freelancer-2",
      name: "Alex Johnson",
      title: "UI/UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      hourlyRate: "$55/hr",
      skills: ["Figma", "Adobe XD", "UI Design"],
    },
    {
      id: "freelancer-3",
      name: "Emily Chen",
      title: "Mobile Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5.0,
      hourlyRate: "$60/hr",
      skills: ["React Native", "Flutter", "iOS"],
    },
  ]

  const activities = [
    {
      id: "activity-1",
      type: "milestone",
      title: "Project milestone completed",
      description: "Jane Doe has completed the first milestone for your e-commerce project",
      date: "2 hours ago",
      project: {
        id: "proj-1",
        name: "E-commerce Website",
      },
      action: {
        label: "Review",
        href: "/client/projects/proj-1",
      },
    },
    {
      id: "activity-2",
      type: "message",
      title: "New message received",
      description: "Alex Johnson sent you a message about the Mobile App UI Design",
      date: "Yesterday",
      project: {
        id: "proj-2",
        name: "Mobile App UI",
      },
      action: {
        label: "Reply",
        href: "/client/messages?project=proj-2",
      },
    },
    {
      id: "activity-3",
      type: "bid",
      title: "New bid received",
      description: "You have received a new bid for your WordPress project",
      date: "2 days ago",
      project: {
        id: "proj-4",
        name: "WordPress Website",
      },
      action: {
        label: "View Bids",
        href: "/client/projects/proj-4/bids",
      },
    },
    {
      id: "activity-4",
      type: "payment",
      title: "Payment processed",
      description: "Your payment of $500 for the Content Writing project has been processed",
      date: "3 days ago",
      project: {
        id: "proj-3",
        name: "Content Writing",
      },
    },
    {
      id: "activity-5",
      type: "alert",
      title: "Project deadline approaching",
      description: "The Mobile App UI Design project is due in 3 days",
      date: "3 days ago",
      project: {
        id: "proj-2",
        name: "Mobile App UI",
      },
      action: {
        label: "View Project",
        href: "/client/projects/proj-2",
      },
    },
  ]

  const upcomingDeadlines = [
    {
      id: "deadline-1",
      project: "Mobile App UI Design",
      date: "April 30, 2023",
      daysLeft: 3,
      freelancer: "Alex Johnson",
    },
    {
      id: "deadline-2",
      project: "E-commerce Website Development",
      date: "May 15, 2023",
      daysLeft: 18,
      freelancer: "Jane Doe",
    },
    {
      id: "deadline-3",
      project: "Content Writing for Blog",
      date: "May 20, 2023",
      daysLeft: 23,
      freelancer: "Michael Brown",
    },
  ]

  return (
    <DashboardSidebar userType="client">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, John</h2>
            <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <DatePicker
              date={selectedDate}
              setDate={setSelectedDate}
              placeholder="Select date"
              className="w-full sm:w-auto"
            />
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/client/post-project">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post a New Project
              </Link>
            </Button>
          </div>
        </div>

        <StatsGrid stats={stats} />

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="active" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="active">Active Projects</TabsTrigger>
                  <TabsTrigger value="pending">Pending Bids</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm" asChild className="text-primary">
                  <Link href="/client/projects" className="flex items-center">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <TabsContent value="active" className="mt-0">
                <ProjectGrid projects={activeProjects} columns={1} />
              </TabsContent>

              <TabsContent value="pending" className="mt-0">
                <ProjectGrid projects={[]} columns={1} emptyMessage="You don't have any projects with pending bids" />
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <ProjectGrid projects={[]} columns={1} emptyMessage="You don't have any completed projects yet" />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {/* <ActivityFeed
              activities={activities}
              title="Recent Activity"
              description="Your latest updates and notifications"
              limit={3}
              viewAllHref="/client/activity"
            /> */}

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>Project deadlines approaching soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div
                      key={deadline.id}
                      className="flex items-start justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800"
                    >
                      <div>
                        <h4 className="font-medium">{deadline.project}</h4>
                        <p className="text-sm text-muted-foreground">Due: {deadline.date}</p>
                        <p className="text-sm">Freelancer: {deadline.freelancer}</p>
                      </div>
                      <Badge
                        className={
                          deadline.daysLeft <= 3
                            ? "bg-red-100 text-red-700 border-red-200"
                            : deadline.daysLeft <= 7
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : "bg-emerald-100 text-emerald-700 border-emerald-200"
                        }
                      >
                        {deadline.daysLeft} days left
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <Card className="border-0 shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                Project Analytics
              </CardTitle>
              <CardDescription>Overview of your project performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/30 rounded-md">
                <p className="text-muted-foreground">Project analytics visualization will appear here</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Top Rated Freelancers
              </CardTitle>
              <CardDescription>Highly-rated talent for your next project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topFreelancers.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className="flex items-start space-x-4 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={freelancer.avatar || "/placeholder.svg"} alt={freelancer.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {freelancer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{freelancer.name}</p>
                        <span className="text-sm font-medium">{freelancer.hourlyRate}</span>
                      </div>
                      <p className="text-sm text-primary">{freelancer.title}</p>
                      <div className="flex items-center">
                        <Rating value={freelancer.rating} size="sm" />
                        <span className="text-xs text-muted-foreground ml-1">{freelancer.rating}/5.0</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {freelancer.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" asChild className="w-full">
                  <Link href="/client/freelancers" className="flex items-center justify-center">
                    Browse All Freelancers
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              Recent Messages
            </CardTitle>
            <CardDescription>Latest communications from your freelancers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex flex-col p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary transition-colors"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.from} />
                      <AvatarFallback className="bg-primary/10 text-primary">{message.from.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{message.from}</p>
                      <p className="text-xs text-muted-foreground">{message.time}</p>
                    </div>
                    {message.unread && (
                      <Badge
                        variant="outline"
                        className="ml-auto bg-primary/10 text-primary border-primary/10 animated-badge"
                      >
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{message.preview}</p>
                  <div className="mt-auto">
                    <Badge variant="outline" className="text-xs">
                      {message.project}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="mt-3 w-full" asChild>
                    <Link href={`/client/messages?from=${message.from.toLowerCase().replace(/\s+/g, "-")}`}>Reply</Link>
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/client/messages" className="flex items-center justify-center">
                  View All Messages
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Recent Contracts
              </CardTitle>
              <CardDescription>Your active and recent contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">E-commerce Website Development</h4>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Contract with Jane Doe</p>
                  <div className="flex justify-between text-sm">
                    <span>Value: $2,500</span>
                    <span>Started: April 1, 2023</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Mobile App UI Design</h4>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Contract with Alex Johnson</p>
                  <div className="flex justify-between text-sm">
                    <span>Value: $1,200</span>
                    <span>Started: March 15, 2023</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Logo Design</h4>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Contract with Emily Chen</p>
                  <div className="flex justify-between text-sm">
                    <span>Value: $350</span>
                    <span>Completed: March 5, 2023</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/client/contracts">View All Contracts</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <DollarSign className="mr-2 h-5 w-5 text-primary" />
                Payment History
              </CardTitle>
              <CardDescription>Recent payments and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">E-commerce Website - Milestone 1</h4>
                    <span className="text-emerald-600 font-medium">$1,000</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Paid to Jane Doe</p>
                  <div className="flex justify-between text-sm">
                    <span>Transaction ID: #TRX-2023-001</span>
                    <span>April 10, 2023</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Mobile App UI - Initial Payment</h4>
                    <span className="text-emerald-600 font-medium">$600</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Paid to Alex Johnson</p>
                  <div className="flex justify-between text-sm">
                    <span>Transaction ID: #TRX-2023-002</span>
                    <span>March 20, 2023</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Logo Design - Full Payment</h4>
                    <span className="text-emerald-600 font-medium">$350</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Paid to Emily Chen</p>
                  <div className="flex justify-between text-sm">
                    <span>Transaction ID: #TRX-2023-003</span>
                    <span>March 5, 2023</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/client/payments">View All Payments</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardSidebar>
  )
}
