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
import { DollarSign, Filter, MessageSquare, Search, Star } from "lucide-react"
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

export default function ClientFreelancers() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingRange, setRatingRange] = useState([3, 5])
  const [hourlyRateRange, setHourlyRateRange] = useState([10, 100])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Sample data for freelancers
  const allFreelancers = [
    {
      id: "freelancer-1",
      name: "Jane Doe",
      title: "Full Stack Developer",
      description: "Experienced MERN stack developer with 5+ years of experience building web applications.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.9,
      hourlyRate: 45,
      skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
      completedProjects: 32,
      location: "United States",
    },
    {
      id: "freelancer-2",
      name: "Alex Johnson",
      title: "UI/UX Designer & Frontend Developer",
      description: "Creative designer and developer specializing in responsive web design and user experience.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.7,
      hourlyRate: 55,
      skills: ["UI/UX Design", "React", "Figma", "CSS", "HTML"],
      completedProjects: 28,
      location: "Canada",
    },
    {
      id: "freelancer-3",
      name: "Michael Brown",
      title: "Content Writer & SEO Specialist",
      description: "Professional writer with expertise in creating SEO-optimized content for various industries.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.5,
      hourlyRate: 35,
      skills: ["Content Writing", "SEO", "Copywriting", "Research"],
      completedProjects: 45,
      location: "United Kingdom",
    },
    {
      id: "freelancer-4",
      name: "Emily Chen",
      title: "Mobile App Developer",
      description: "Specialized in developing cross-platform mobile applications using React Native and Flutter.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5.0,
      hourlyRate: 60,
      skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
      completedProjects: 20,
      location: "Australia",
    },
    {
      id: "freelancer-5",
      name: "David Wilson",
      title: "Backend Developer & Database Expert",
      description: "Specialized in building robust backend systems and optimizing database performance.",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 4.8,
      hourlyRate: 50,
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "AWS"],
      completedProjects: 37,
      location: "Germany",
    },
  ]

  // Filter freelancers based on search query, rating range, hourly rate range, and selected skills
  const filteredFreelancers = allFreelancers.filter((freelancer) => {
    // Filter by search query
    const matchesSearch =
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by rating range
    const matchesRating = freelancer.rating >= ratingRange[0] && freelancer.rating <= ratingRange[1]

    // Filter by hourly rate range
    const matchesHourlyRate = freelancer.hourlyRate >= hourlyRateRange[0] && freelancer.hourlyRate <= hourlyRateRange[1]

    // Filter by selected skills
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) =>
        freelancer.skills.some((freelancerSkill) => freelancerSkill.toLowerCase().includes(skill.toLowerCase())),
      )

    return matchesSearch && matchesRating && matchesHourlyRate && matchesSkills
  })

  // Available skills for filtering
  const availableSkills = [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "JavaScript",
    "UI/UX Design",
    "Content Writing",
    "SEO",
    "React Native",
    "Flutter",
    "PostgreSQL",
    "AWS",
    "Python",
    "CSS",
    "HTML",
  ]

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleContactFreelancer = (freelancerId: string) => {
    toast({
      title: "Message sent",
      description: "Your message has been sent to the freelancer.",
    })
  }

  return (
    <DashboardSidebar userType="client">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Find Freelancers</h2>
            <p className="text-muted-foreground">Browse talented freelancers to work on your projects</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search freelancers by name, title, skills..."
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
              <CardTitle>Filter Freelancers</CardTitle>
              <CardDescription>Find the perfect match for your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Rating</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[3, 5]}
                    min={1}
                    max={5}
                    step={0.1}
                    value={ratingRange}
                    onValueChange={setRatingRange}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{ratingRange[0].toFixed(1)}</span>
                    <span className="text-sm">{ratingRange[1].toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Hourly Rate ($)</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[10, 100]}
                    min={5}
                    max={200}
                    step={5}
                    value={hourlyRateRange}
                    onValueChange={setHourlyRateRange}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${hourlyRateRange[0]}</span>
                    <span className="text-sm">${hourlyRateRange[1]}</span>
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
          {filteredFreelancers.length > 0 ? (
            filteredFreelancers.map((freelancer) => (
              <Card key={freelancer.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center md:items-start">
                      <Avatar className="h-20 w-20 mb-2">
                        <AvatarImage src={freelancer.avatar || "/placeholder.svg"} alt={freelancer.name} />
                        <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center mb-1">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{freelancer.rating}</span>
                        <span className="text-muted-foreground text-sm ml-1">
                          ({freelancer.completedProjects} projects)
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-3 w-3 mr-1" />
                        <span>${freelancer.hourlyRate}/hr</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold">{freelancer.name}</h3>
                        <p className="text-primary font-medium">{freelancer.title}</p>
                        <p className="text-sm text-muted-foreground">{freelancer.location}</p>
                      </div>

                      <p className="text-sm">{freelancer.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {freelancer.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Contact
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Contact {freelancer.name}</DialogTitle>
                              <DialogDescription>Send a message to discuss your project requirements</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="project-title">Project Title</Label>
                                <Input id="project-title" placeholder="Enter your project title" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                  id="message"
                                  placeholder="Describe your project and requirements..."
                                  className="min-h-[150px]"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => handleContactFreelancer(freelancer.id)}>Send Message</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          Invite to Project
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No freelancers found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters to find more freelancers.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardSidebar>
  )
}
