"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Bell, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<"client" | "freelancer" | null>(null)
  const [showSearch, setShowSearch] = useState(false)

  // Check if user is logged in (would use actual auth in real app)
  useEffect(() => {
    // This is just for demo purposes
    const checkAuth = () => {
      if (pathname.includes("/client/")) {
        setIsLoggedIn(true)
        setUserType("client")
      } else if (pathname.includes("/freelancer/")) {
        setIsLoggedIn(true)
        setUserType("freelancer")
      } else if (pathname.includes("/demo")) {
        setIsLoggedIn(true)
        setUserType(pathname.includes("client") ? "client" : "freelancer")
      } else {
        setIsLoggedIn(false)
        setUserType(null)
      }
    }

    checkAuth()
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Find Work",
      href: isLoggedIn && userType === "freelancer" ? "/freelancer/projects" : "/projects",
    },
    {
      name: "Find Talent",
      href: isLoggedIn && userType === "client" ? "/client/freelancers" : "/freelancers",
    },
    {
      name: "How It Works",
      href: "/how-it-works",
    },
  ]

  const dashboardLink = userType === "client" ? "/client/dashboard" : "/freelancer/dashboard"

  const notifications = [
    {
      id: 1,
      title: "New message received",
      description: "Jane Doe sent you a message about your project",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Bid accepted",
      description: "Your bid for the WordPress project was accepted",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Payment received",
      description: "You received a payment of $250 for your work",
      time: "Yesterday",
      unread: false,
    },
  ]

  return (
    <div
      className={cn(
        "fixed top-4 inset-x-0 z-50 mx-auto w-full max-w-screen-xl px-4 transition-all duration-300",
        isScrolled ? "top-2" : "top-4",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between rounded-full border border-border bg-background/90 px-4 py-2 backdrop-blur-md shadow-lg",
          isScrolled ? "py-1.5" : "py-2",
        )}
      >
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl mr-2 flex items-center">
            <span className="text-primary mr-1">karo</span>
            <span>Freelance</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant="ghost"
                className={cn("text-sm", pathname === item.href && "bg-accent text-accent-foreground")}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {showSearch ? (
            <div className="relative animate-fade-in">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="w-[200px] pl-9 h-9 rounded-full bg-muted/50 border-muted focus-visible:ring-primary"
                placeholder="Search..."
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="hidden md:flex">
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <ModeToggle />

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {notifications.filter((n) => n.unread).length}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                      <div className="flex items-start justify-between w-full">
                        <span className="font-medium">{notification.title}</span>
                        {notification.unread && (
                          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-[10px]">
                            New
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground mt-1">{notification.description}</span>
                      <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center font-medium text-primary">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {userType === "client" ? "JS" : "JD"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={dashboardLink}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${userType}/profile`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${userType}/settings`}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/">Sign out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="font-bold text-xl flex items-center">
                  <span className="text-primary mr-1">Talent</span>
                  <span>Hub</span>
                </Link>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Search..." />
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors",
                        pathname === item.href && "text-foreground font-medium",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2 mt-auto">
                  {isLoggedIn ? (
                    <Button asChild>
                      <Link href={dashboardLink}>Dashboard</Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/auth/signin">Sign In</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/auth/signup">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
