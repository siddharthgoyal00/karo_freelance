"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-tost"
import { Loader2 } from "lucide-react"

export default function FreelancerDemoRedirect() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading demo account
    const timer = setTimeout(() => {
      toast({
        title: "Demo account loaded",
        description: "You are now using a freelancer demo account with sample data.",
      })
      router.push("/freelancer/dashboard")
    }, 1500)

    return () => clearTimeout(timer)
  }, [router, toast])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-bold mb-2">Loading Freelancer Demo</h1>
      <p className="text-muted-foreground">Please wait while we set up your demo account...</p>
    </div>
  )
}
