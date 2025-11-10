"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-tost"

export default function SignInPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>, userType: "client" | "freelancer") => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const form = new FormData(e.currentTarget)
      const email = String(form.get(`${userType}-email`) || "")
      const password = String(form.get(`${userType}-password`) || "")

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to sign in")

      toast({
        title: "Signed in successfully",
        description: `Welcome back to FreelanceHub as a ${userType}.`,
      })
      router.push(`/${userType}/dashboard`)
    } catch (err: any) {
      toast({
        title: "Sign in failed",
        description: err.message || "Please check your credentials and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="client">Client</TabsTrigger>
              <TabsTrigger value="freelancer">Freelancer</TabsTrigger>
            </TabsList>

            <TabsContent value="client">
              <form
                onSubmit={(e) => handleSignIn(e, "client")}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input id="client-email" name="client-email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="client-password">Password</Label>
                      <Link
                        href="/auth/reset-password"
                        className="text-sm text-primary underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="client-password" name="client-password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in as Client"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/demo/client")}
                  >
                    Try Client Demo
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="freelancer">
              <form
                onSubmit={(e) => handleSignIn(e, "freelancer")}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="freelancer-email">Email</Label>
                    <Input id="freelancer-email" name="freelancer-email" type="email" placeholder="jane@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="freelancer-password">Password</Label>
                      <Link
                        href="/auth/reset-password"
                        className="text-sm text-primary underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="freelancer-password" name="freelancer-password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in as Freelancer"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/demo/freelancer")}
                  >
                    Try Freelancer Demo
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
