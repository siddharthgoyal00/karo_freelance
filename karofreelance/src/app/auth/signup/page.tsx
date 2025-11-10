"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-tost"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userType = searchParams.get("type")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>, userType: "client" | "freelancer") => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const form = new FormData(e.currentTarget)
      const payload =
        userType === "client"
          ? {
              firstName: String(form.get("client-first-name") || ""),
              lastName: String(form.get("client-last-name") || ""),
              email: String(form.get("client-email") || ""),
              password: String(form.get("client-password") || ""),
              company: String(form.get("client-company") || ""),
              role: "client" as const,
            }
          : {
              firstName: String(form.get("freelancer-first-name") || ""),
              lastName: String(form.get("freelancer-last-name") || ""),
              email: String(form.get("freelancer-email") || ""),
              password: String(form.get("freelancer-password") || ""),
              skills: String(form.get("freelancer-skills") || ""),
              role: "freelancer" as const,
            }

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to sign up")

      toast({
        title: "Account created successfully",
        description: `Welcome to FreelanceHub as a ${userType}.`,
      })

      router.push(`/${userType}/dashboard`)
    } catch (err: any) {
      toast({
        title: "Sign up failed",
        description: err.message || "Please check your details and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-10">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details to create your FreelanceHub account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={userType === "freelancer" ? "freelancer" : "client"} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="client">Client</TabsTrigger>
              <TabsTrigger value="freelancer">Freelancer</TabsTrigger>
            </TabsList>

            <TabsContent value="client">
              <form
                onSubmit={(e) => handleSignUp(e, "client")}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-first-name">First name</Label>
                      <Input id="client-first-name" name="client-first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-last-name">Last name</Label>
                      <Input id="client-last-name" name="client-last-name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input id="client-email" name="client-email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-company">Company (optional)</Label>
                    <Input id="client-company" name="client-company" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-password">Password</Label>
                    <Input id="client-password" name="client-password" type="password" required />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="client-terms" required />
                    <label
                      htmlFor="client-terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                        privacy policy
                      </Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Client Account"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="freelancer">
              <form
                onSubmit={(e) => handleSignUp(e, "freelancer")}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="freelancer-first-name">First name</Label>
                      <Input id="freelancer-first-name" name="freelancer-first-name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="freelancer-last-name">Last name</Label>
                      <Input id="freelancer-last-name" name="freelancer-last-name" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="freelancer-email">Email</Label>
                    <Input id="freelancer-email" name="freelancer-email" type="email" placeholder="jane@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="freelancer-skills">Skills</Label>
                    <Input id="freelancer-skills" name="freelancer-skills" placeholder="e.g., Web Development, MERN Stack, UI/UX" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="freelancer-password">Password</Label>
                    <Input id="freelancer-password" name="freelancer-password" type="password" required />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="freelancer-terms" required />
                    <label
                      htmlFor="freelancer-terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                        privacy policy
                      </Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Freelancer Account"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
