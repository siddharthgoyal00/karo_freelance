import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card"
import {
  BriefcaseBusiness,
  Users,
  DollarSign,
  Shield,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* hero section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 hero-gradient opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/20 py-1 px-3 text-sm">
              The #1 Freelance Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connect with Top Talent &{" "}
              <span className="text-primary">Quality Projects</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Whether you're looking to hire skilled professionals or find your
              next gig, KaroFreelance connects you with opportunities that match
              your skills and requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Link href="/auth/signup?type=client">Hire Talent</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/auth/signup?type=freelancer">Find Work</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center mt-12 space-x-8">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">15k+</span>
                <span className="text-gray-300 text-sm">Freelancers</span>
              </div>
              <div className="h-10 border-l border-gray-600"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">8k+</span>
                <span className="text-gray-300 text-sm">Clients</span>
              </div>
              <div className="h-10 border-l border-gray-600"></div>

              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">25k+</span>
                <span className="text-gray-300 text-sm">Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* Features Section */}
       <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/10 py-1 px-3 text-sm">
              Platform Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why ChooseKaroFreelance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers powerful tools and features to make freelancing and hiring seamless and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="feature-card border-2 border-gray-100 dark:border-gray-800 shadow-sm">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Our escrow system ensures that payments are secure and released only when work is completed to
                  satisfaction.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card border-2 border-gray-100 dark:border-gray-800 shadow-sm">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Verified Talent</h3>
                <p className="text-muted-foreground">
                  All freelancers are vetted and rated, ensuring you work with qualified professionals every time.
                </p>
              </CardContent>
            </Card>

            <Card className="feature-card border-2 border-gray-100 dark:border-gray-800 shadow-sm">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Time Tracking</h3>
                <p className="text-muted-foreground">
                  Built-in time tracking tools help manage projects efficiently and ensure transparency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/10 py-1 px-3 text-sm">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How KaroFreelance Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes it easy to get started, whether you're hiring or looking for work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 relative">
                <BriefcaseBusiness className="h-8 w-8" />
                <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Post a Project</h3>
              <p className="text-muted-foreground">
                Describe your project, set your budget, and specify the skills you need.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 relative">
                <Users className="h-8 w-8" />
                <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Receive Bids</h3>
              <p className="text-muted-foreground">
                Qualified freelancers will submit proposals and bids for your project.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 relative">
                <CheckCircle className="h-8 w-8" />
                <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose & Collaborate</h3>
              <p className="text-muted-foreground">
                Select the best freelancer and work together through our platform.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 relative">
                <DollarSign className="h-8 w-8" />
                <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                  4
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Pay Securely</h3>
              <p className="text-muted-foreground">
                Release payment only when you're completely satisfied with the work.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/how-it-works">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/10 py-1 px-3 text-sm">
              Explore Categories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Skills & Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through the most in-demand skills and categories on our platform.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "Web Development", count: 1250, icon: <Zap className="h-4 w-4" /> },
              { name: "Mobile Development", count: 840, icon: <Zap className="h-4 w-4" /> },
              { name: "UI/UX Design", count: 920, icon: <Zap className="h-4 w-4" /> },
              { name: "Content Writing", count: 780, icon: <Zap className="h-4 w-4" /> },
              { name: "Digital Marketing", count: 650, icon: <Zap className="h-4 w-4" /> },
              { name: "Data Science", count: 480, icon: <Zap className="h-4 w-4" /> },
              { name: "Video Editing", count: 520, icon: <Zap className="h-4 w-4" /> },
              { name: "Graphic Design", count: 890, icon: <Zap className="h-4 w-4" /> },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/projects?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group"
              >
                <Card className="border-2 border-gray-100 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-colors">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} projects</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      {category.icon}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/categories">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
       {/* Testimonials */}
       <section className="py-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/10 py-1 px-3 text-sm">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from freelancers and clients who have found success on TalentHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "UI/UX Designer",
                avatar: "/placeholder.svg?height=80&width=80",
                quote:
                  "TalentHub has transformed my freelance career. I've connected with amazing clients and grown my portfolio significantly.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Tech Startup Founder",
                avatar: "/placeholder.svg?height=80&width=80",
                quote:
                  "As a startup founder, finding quality talent quickly is crucial. TalentHub has been instrumental in helping us build our team.",
                rating: 5,
              },
              {
                name: "Jessica Williams",
                role: "Content Writer",
                avatar: "/placeholder.svg?height=80&width=80",
                quote:
                  "The platform is intuitive and the payment protection gives me peace of mind. I've found consistent work here for over two years.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-2 border-gray-100 dark:border-gray-800 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-primary" : "text-gray-300 dark:text-gray-600"}`}
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/20 py-1 px-3 text-sm">
              Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Work Life?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of freelancers and businesses already using TalentHub to connect, collaborate, and succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Link href="/auth/signup?type=client">Hire Talent</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/auth/signup?type=freelancer">Find Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
 {/* Stats Section */}
 <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="stat-card border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">15,000+</h3>
                <p className="text-muted-foreground">Freelancers</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <BriefcaseBusiness className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">8,000+</h3>
                <p className="text-muted-foreground">Clients</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">25,000+</h3>
                <p className="text-muted-foreground">Projects Completed</p>
              </CardContent>
            </Card>

            <Card className="stat-card border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-1">$50M+</h3>
                <p className="text-muted-foreground">Paid to Freelancers</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
