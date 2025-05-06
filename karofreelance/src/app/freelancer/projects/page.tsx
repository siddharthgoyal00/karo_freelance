"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, Clock, Star, Search, Filter, BriefcaseBusiness } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-tost"

export default function FreelancerProjects() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Sample data for available projects
  const allProjects = [
    {
      id: "proj-1",
      title: "MERN Stack Developer Needed",
      description: "Looking for an experienced MERN stack developer to build a social media platform",
      client: {
        name: "Tech Innovations Inc.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      budget: "$3,000 - $5,000",
      budgetValue: 4000,
      postedDate: "2 days ago",
      deadline: "30 days",
      skills: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
      id: "proj-2",
      title: "Full-Stack Developer for E-learning Platform",
      description:
        "Need a developer to create an interactive e-learning platform with user authentication and course management",
      client: {
        name: "EduTech Solutions",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.5,
      },
      budget: "$2,500 - $4,000",
      budgetValue: 3250,
      postedDate: "1 day ago",
      deadline: "45 days",
      skills: ["React", "Node.js", "PostgreSQL"],
    },
    {
      id: "proj-3",
      title: "React Native Mobile App Development",
      description: "Develop a cross-platform mobile app for a fitness tracking service with social features",
      client: {
        name: "FitLife Inc.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      budget: "$4,000 - $6,000",
      budgetValue: 5000,
      postedDate: "3 days ago",
      deadline: "60 days",
      skills: ["React Native", "Firebase", "Redux"],
    },
    {
      id: "proj-4",
      title: "WordPress E-commerce Website",
      description: "Create a WordPress website with WooCommerce for an online clothing store",
      client: {
        name: "Fashion Forward",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.2,
      },
      budget: "$1,500 - $2,500",
      budgetValue: 2000,
      postedDate: "5 days ago",
      deadline: "21 days",
      skills: ["WordPress", "WooCommerce", "PHP", "CSS"],
    },
    {
      id: "proj-5",
      title: "API Integration for Payment Gateway",
      description: "Integrate Stripe and PayPal payment gateways into an existing e-commerce platform",
      client: {
        name: "Global Shop",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      budget: "$1,000 - $2,000",
      budgetValue: 1500,
      postedDate: "2 days ago",
      deadline: "14 days",
      skills: ["API Integration", "Stripe", "PayPal", "JavaScript"],
    },
  ]

  // Filter projects based on search query, price range, and selected skills
  const filteredProjects = allProjects.filter((project) => {
    // Filter by search query
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by price range
    const projectBudget = project.budgetValue
    const matchesPriceRange = projectBudget >= priceRange[0] && projectBudget <= priceRange[1]

    // Filter by selected skills
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) =>
        project.skills.some((projectSkill) => projectSkill.toLowerCase().includes(skill.toLowerCase())),
      )

    return matchesSearch && matchesPriceRange && matchesSkills
  })

  // Available skills for filtering
  const availableSkills = [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "JavaScript",
    "TypeScript",
    "React Native",
    "WordPress",
    "PHP",
    "CSS",
    "Firebase",
    "PostgreSQL",
    "API Integration",
    "Redux",
  ]

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleSubmitProposal = (projectId: string) => {
    toast({
      title: "Proposal submitted",
      description: "Your proposal has been submitted successfully.",
    })
  }

  return (
    <DashboardSidebar userType="freelancer">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Find Projects</h2>
            <p className="text-muted-foreground">Browse available projects that match your skills and experience</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by title, description, or skills..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:w-auto w-full">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle>Filter Projects</CardTitle>
              <CardDescription>Narrow down projects based on your preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Budget Range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0, 5000]}
                    max={10000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => handleSkillToggle(skill)}
                      />
                      <label
                        htmlFor={`skill-${skill}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-xs text-muted-foreground">{project.postedDate}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={project.client.avatar || "/placeholder.svg"} alt={project.client.name} />
                          <AvatarFallback>{project.client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{project.client.name}</p>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-xs text-muted-foreground">{project.client.rating}/5</span>
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
                          <span className="text-sm">Deadline: {project.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <BriefcaseBusiness className="h-4 w-4 mr-1" />
                            Submit Proposal
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Proposal</DialogTitle>
                            <DialogDescription>Submit your proposal for "{project.title}"</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="bid-amount">Your Bid Amount ($)</Label>
                              <Input id="bid-amount" type="number" placeholder="Enter your bid amount" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="delivery-time">Delivery Time (days)</Label>
                              <Input id="delivery-time" type="number" placeholder="Enter estimated delivery time" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cover-letter">Cover Letter</Label>
                              <Textarea
                                id="cover-letter"
                                placeholder="Explain why you're the best fit for this project..."
                                className="min-h-[150px]"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => handleSubmitProposal(project.id)}>Submit Proposal</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters to find more projects.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardSidebar>
  )
}
