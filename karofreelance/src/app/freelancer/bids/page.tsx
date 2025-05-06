import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BriefcaseBusiness, Clock, DollarSign, MessageSquare, Search, Users, Star } from "lucide-react"

export default function FreelancerBids() {
  // Sample data for freelancer bids
  const activeBids = [
    {
      id: "bid-1",
      project: {
        id: "proj-1",
        title: "MERN Stack Developer Needed",
        description: "Looking for an experienced MERN stack developer to build a social media platform",
        client: {
          name: "Tech Innovations Inc.",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.8,
        },
        budget: "$3,000 - $5,000",
        postedDate: "2 days ago",
        deadline: "30 days",
        skills: ["MongoDB", "Express", "React", "Node.js"],
      },
      bidAmount: "$3,800",
      deliveryTime: "25 days",
      status: "Pending",
      submittedDate: "Yesterday",
      competingBids: 8,
    },
    {
      id: "bid-2",
      project: {
        id: "proj-2",
        title: "API Integration for Payment Gateway",
        description: "Integrate Stripe and PayPal payment gateways into an existing e-commerce platform",
        client: {
          name: "Global Shop",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.7,
        },
        budget: "$1,000 - $2,000",
        postedDate: "2 days ago",
        deadline: "14 days",
        skills: ["API Integration", "Stripe", "PayPal", "JavaScript"],
      },
      bidAmount: "$1,500",
      deliveryTime: "10 days",
      status: "Pending",
      submittedDate: "2 days ago",
      competingBids: 12,
    },
    {
      id: "bid-3",
      project: {
        id: "proj-3",
        title: "WordPress E-commerce Website",
        description: "Create a WordPress website with WooCommerce for an online clothing store",
        client: {
          name: "Fashion Forward",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.2,
        },
        budget: "$1,500 - $2,500",
        postedDate: "5 days ago",
        deadline: "21 days",
        skills: ["WordPress", "WooCommerce", "PHP", "CSS"],
      },
      bidAmount: "$2,000",
      deliveryTime: "18 days",
      status: "Shortlisted",
      submittedDate: "4 days ago",
      competingBids: 15,
    },
  ]

  const acceptedBids = [
    {
      id: "bid-4",
      project: {
        id: "proj-4",
        title: "E-commerce Website Development",
        description: "Building a full-stack e-commerce platform with React and Node.js",
        client: {
          name: "ABC Company",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.9,
        },
        budget: "$2,500",
        postedDate: "2 weeks ago",
        deadline: "May 15, 2023",
        skills: ["React", "Node.js", "MongoDB", "Express"],
      },
      bidAmount: "$2,500",
      deliveryTime: "30 days",
      status: "Accepted",
      submittedDate: "2 weeks ago",
      acceptedDate: "10 days ago",
      competingBids: null,
    },
    {
      id: "bid-5",
      project: {
        id: "proj-5",
        title: "API Integration for Payment Gateway",
        description: "Integrating Stripe payment gateway with an existing web application",
        client: {
          name: "XYZ Startup",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.5,
        },
        budget: "$1,800",
        postedDate: "3 weeks ago",
        deadline: "June 5, 2023",
        skills: ["API Integration", "Stripe", "JavaScript"],
      },
      bidAmount: "$1,800",
      deliveryTime: "21 days",
      status: "Accepted",
      submittedDate: "3 weeks ago",
      acceptedDate: "1 week ago",
      competingBids: null,
    },
  ]

  const rejectedBids = [
    {
      id: "bid-6",
      project: {
        id: "proj-6",
        title: "Mobile App Development",
        description: "Develop a cross-platform mobile app for a food delivery service",
        client: {
          name: "Food Express",
          avatar: "/placeholder.svg?height=40&width=40",
          rating: 4.6,
        },
        budget: "$4,000 - $6,000",
        postedDate: "1 month ago",
        deadline: "45 days",
        skills: ["React Native", "Firebase", "Redux"],
      },
      bidAmount: "$5,500",
      deliveryTime: "40 days",
      status: "Rejected",
      submittedDate: "3 weeks ago",
      rejectedDate: "1 week ago",
      competingBids: null,
    },
  ]

  return (
    <DashboardSidebar userType="freelancer">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Bids</h2>
            <p className="text-muted-foreground">Track the status of all your project proposals</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/freelancer/projects">
              <Search className="mr-2 h-4 w-4" />
              Find More Projects
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="active">Active ({activeBids.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({acceptedBids.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedBids.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeBids.map((bid) => (
                <Card key={bid.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{bid.project.title}</CardTitle>
                        <CardDescription className="mt-1">{bid.project.description}</CardDescription>
                      </div>
                      <Badge variant={bid.status === "Shortlisted" ? "default" : "outline"}>{bid.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={bid.project.client.avatar || "/placeholder.svg"}
                              alt={bid.project.client.name}
                            />
                            <AvatarFallback>{bid.project.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{bid.project.client.name}</p>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs text-muted-foreground">{bid.project.client.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">Your bid: {bid.bidAmount}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">Delivery: {bid.deliveryTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {bid.project.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span>Submitted: {bid.submittedDate}</span>
                          {bid.competingBids && (
                            <span className="ml-4">
                              <Users className="inline h-4 w-4 mr-1" />
                              {bid.competingBids} competing bids
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/freelancer/bids/${bid.id}/edit`}>Edit Proposal</Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/freelancer/messages?project=${bid.project.id}`}>
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Contact Client
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accepted">
            <div className="space-y-4">
              {acceptedBids.map((bid) => (
                <Card key={bid.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{bid.project.title}</CardTitle>
                        <CardDescription className="mt-1">{bid.project.description}</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{bid.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={bid.project.client.avatar || "/placeholder.svg"}
                              alt={bid.project.client.name}
                            />
                            <AvatarFallback>{bid.project.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{bid.project.client.name}</p>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs text-muted-foreground">{bid.project.client.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">Your bid: {bid.bidAmount}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">Delivery: {bid.deliveryTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {bid.project.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span>Accepted: {bid.acceptedDate}</span>
                          <span className="ml-4">Deadline: {bid.project.deadline}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" asChild>
                            <Link href={`/freelancer/active-projects/${bid.project.id}`}>
                              <BriefcaseBusiness className="h-4 w-4 mr-1" />
                              View Project
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/freelancer/messages?project=${bid.project.id}`}>
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message Client
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected">
            <div className="space-y-4">
              {rejectedBids.map((bid) => (
                <Card key={bid.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{bid.project.title}</CardTitle>
                        <CardDescription className="mt-1">{bid.project.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {bid.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={bid.project.client.avatar || "/placeholder.svg"}
                              alt={bid.project.client.name}
                            />
                            <AvatarFallback>{bid.project.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{bid.project.client.name}</p>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs text-muted-foreground">{bid.project.client.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">Your bid: {bid.bidAmount}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">Delivery: {bid.deliveryTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {bid.project.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span>Rejected: {bid.rejectedDate}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" asChild>
                            <Link href={`/freelancer/projects`}>
                              <Search className="h-4 w-4 mr-1" />
                              Find Similar Projects
                            </Link>
                          </Button>
                        </div>
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
