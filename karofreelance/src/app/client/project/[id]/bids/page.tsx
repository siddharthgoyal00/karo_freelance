"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, Clock, Star, MessageSquare, ArrowLeft, Check, X } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-tost"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectBids({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const projectId = params.id
  const [selectedTab, setSelectedTab] = useState("all")

  // Sample project data
  const project = {
    id: projectId,
    title: "WordPress E-commerce Website",
    description: "Create a WordPress website with WooCommerce for an online clothing store",
    budget: "$1,500 - $2,500",
    postedDate: "5 days ago",
    deadline: "21 days",
    skills: ["WordPress", "WooCommerce", "PHP", "CSS"],
    status: "Open",
  }

  // Sample bids data
  const allBids = [
    {
      id: "bid-1",
      freelancer: {
        id: "freelancer-1",
        name: "Jane Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Full Stack Developer",
        rating: 4.9,
        completedProjects: 32,
        location: "United States",
      },
      bidAmount: "$2,200",
      deliveryTime: "18 days",
      coverLetter:
        "I have extensive experience with WordPress and WooCommerce, having built over 20 e-commerce sites. I can create a custom theme that matches your brand and implement all the necessary features for your online clothing store.",
      status: "pending",
      submittedDate: "4 days ago",
    },
    {
      id: "bid-2",
      freelancer: {
        id: "freelancer-2",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "WordPress Developer",
        rating: 4.7,
        completedProjects: 28,
        location: "Canada",
      },
      bidAmount: "$1,800",
      deliveryTime: "21 days",
      coverLetter:
        "I specialize in WordPress development with a focus on e-commerce solutions. I've worked with numerous clothing brands to create beautiful and functional online stores using WooCommerce.",
      status: "pending",
      submittedDate: "5 days ago",
    },
    {
      id: "bid-3",
      freelancer: {
        id: "freelancer-3",
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Web Designer & WordPress Expert",
        rating: 5.0,
        completedProjects: 20,
        location: "Australia",
      },
      bidAmount: "$2,500",
      deliveryTime: "15 days",
      coverLetter:
        "As a web designer with expertise in WordPress and WooCommerce, I can create a visually stunning and highly functional e-commerce website for your clothing store. I pay special attention to user experience and mobile responsiveness.",
      status: "pending",
      submittedDate: "3 days ago",
    },
  ]

  // Filter bids based on selected tab
  const filteredBids = allBids.filter((bid) => {
    if (selectedTab === "all") return true
    return bid.status === selectedTab
  })

  const handleAcceptBid = (bidId: string) => {
    toast({
      title: "Bid accepted",
      description: "You have successfully accepted this bid. The freelancer has been notified.",
    })
  }

  const handleRejectBid = (bidId: string) => {
    toast({
      title: "Bid rejected",
      description: "You have rejected this bid. The freelancer has been notified.",
    })
  }

  return (
    <DashboardSidebar userType="client">
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/client/projects">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Link>
          </Button>
          <h2 className="text-2xl font-bold">Bids for Project</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                <span>Budget: {project.budget}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                <span>Deadline: {project.deadline}</span>
              </div>
              <Badge>{project.status}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-xl font-semibold mb-4">Proposals ({allBids.length})</h3>

          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All ({allBids.length})</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted (0)</TabsTrigger>
              <TabsTrigger value="rejected">Rejected (0)</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="space-y-6">
                {filteredBids.length > 0 ? (
                  filteredBids.map((bid) => (
                    <Card key={bid.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex flex-col items-center md:items-start">
                            <Avatar className="h-20 w-20 mb-2">
                              <AvatarImage
                                src={bid.freelancer.avatar || "/placeholder.svg"}
                                alt={bid.freelancer.name}
                              />
                              <AvatarFallback>{bid.freelancer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex items-center mb-1">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="font-medium">{bid.freelancer.rating}</span>
                              <span className="text-muted-foreground text-sm ml-1">
                                ({bid.freelancer.completedProjects} projects)
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">{bid.freelancer.location}</div>
                          </div>

                          <div className="flex-1 space-y-4">
                            <div>
                              <h3 className="text-xl font-semibold">{bid.freelancer.name}</h3>
                              <p className="text-primary font-medium">{bid.freelancer.title}</p>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                                <span>
                                  Bid: <strong>{bid.bidAmount}</strong>
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                <span>
                                  Delivery: <strong>{bid.deliveryTime}</strong>
                                </span>
                              </div>
                              <div className="text-muted-foreground">Submitted: {bid.submittedDate}</div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-1">Cover Letter</h4>
                              <p className="text-sm">{bid.coverLetter}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    <Check className="h-4 w-4 mr-1" />
                                    Accept Bid
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Accept Bid</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to accept this bid from {bid.freelancer.name}?
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p>
                                      By accepting this bid, you agree to work with this freelancer on your project. The
                                      freelancer will be notified and you can start communicating to begin the project.
                                    </p>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => {}}>
                                      Cancel
                                    </Button>
                                    <Button onClick={() => handleAcceptBid(bid.id)}>Accept Bid</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Reject Bid</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to reject this bid from {bid.freelancer.name}?
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => {}}>
                                      Cancel
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleRejectBid(bid.id)}>
                                      Reject Bid
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/client/messages?freelancer=${bid.freelancer.id}`}>
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Message
                                </Link>
                              </Button>

                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/client/freelancers/${bid.freelancer.id}`}>View Profile</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No bids found</h3>
                    <p className="text-muted-foreground">There are no bids in this category yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardSidebar>
  )
}
