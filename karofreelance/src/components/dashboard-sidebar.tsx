"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  BriefcaseBusiness,
  Star,
  Search,
  PlusCircle,
  Bell,
  CreditCard,
  HelpCircle,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface DashboardSidebarProps {
  userType: "client" | "freelancer"
  children: React.ReactNode
}

export function DashboardSidebar({ userType, children }: DashboardSidebarProps) {
  const pathname = usePathname()

  const clientMenuItems = [
    {
      title: "Dashboard",
      href: "/client/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Post a Project",
      href: "/client/post-project",
      icon: PlusCircle,
      highlight: true,
    },
    {
      title: "My Projects",
      href: "/client/projects",
      icon: BriefcaseBusiness,
      badge: "3",
    },
    {
      title: "Find Freelancers",
      href: "/client/freelancers",
      icon: Search,
    },
    {
      title: "Messages",
      href: "/client/messages",
      icon: MessageSquare,
      badge: "5",
    },
    {
      title: "Contracts",
      href: "/client/contracts",
      icon: FileText,
    },
    {
      title: "Payments",
      href: "/client/payments",
      icon: CreditCard,
    },
    {
      title: "Analytics",
      href: "/client/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/client/settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      href: "/client/support",
      icon: HelpCircle,
    },
  ]

  const freelancerMenuItems = [
    {
      title: "Dashboard",
      href: "/freelancer/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Find Projects",
      href: "/freelancer/projects",
      icon: Search,
      highlight: true,
    },
    {
      title: "My Bids",
      href: "/freelancer/bids",
      icon: BriefcaseBusiness,
      badge: "3",
    },
    {
      title: "Active Projects",
      href: "/freelancer/active-projects",
      icon: FileText,
      badge: "2",
    },
    {
      title: "Messages",
      href: "/freelancer/messages",
      icon: MessageSquare,
      badge: "3",
    },
    {
      title: "Reviews",
      href: "/freelancer/reviews",
      icon: Star,
    },
    {
      title: "Earnings",
      href: "/freelancer/earnings",
      icon: CreditCard,
    },
    {
      title: "Analytics",
      href: "/freelancer/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/freelancer/settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      href: "/freelancer/support",
      icon: HelpCircle,
    },
  ]

  const menuItems = userType === "client" ? clientMenuItems : freelancerMenuItems
  const userName = userType === "client" ? "John Smith" : "Jane Doe"
  const userRole = userType === "client" ? "Client" : "Freelancer"
  const userInitials = userType === "client" ? "JS" : "JD"

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" collapsible="icon" className="bg-black text-white">
          <SidebarHeader className="flex flex-col items-center justify-center p-4 border-b border-gray-800">
            <Avatar className="h-16 w-16 mb-2 border-2 border-primary">
              <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={userName} />
              <AvatarFallback className="bg-primary/10 text-primary">{userInitials}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-medium text-white">{userName}</h3>
              <p className="text-xs text-gray-400">{userRole}</p>
              {userType === "freelancer" && (
                <div className="mt-2">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="h-3 w-3 text-primary mr-1" fill="currentColor" />
                    <span className="text-xs text-gray-300">4.9/5</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-gray-400">Profile Completion</span>
                  </div>
                  <div className="w-full mt-1">
                    {/* <Progress value={85} className="h-1 bg-gray-700" indicatorClassName="bg-primary" /> */}
                    <Progress value={85} className="h-1 bg-gray-700 [&>div]:bg-primary" />
                  </div>
                </div>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2 py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className={item.highlight ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}
                  >
                    <Link href={item.href} className={item.highlight ? "sidebar-highlight" : ""}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-primary text-white text-xs min-w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-gray-800">
            <Button
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
              asChild
            >
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-xl font-bold">
                {userType === "client" ? "Client Dashboard" : "Freelancer Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={userName} />
                  <AvatarFallback className="bg-primary/10 text-primary">{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
