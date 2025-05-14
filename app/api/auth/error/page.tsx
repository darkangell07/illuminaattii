"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { ParticleBackground } from "@/components/particle-background"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>("An authentication error occurred")
  const [errorDescription, setErrorDescription] = useState<string>(
    "There was a problem with your sign-in attempt. Please try again.",
  )

  useEffect(() => {
    // Get error type from URL
    const error = searchParams?.get("error")

    if (error) {
      switch (error) {
        case "Configuration":
          setErrorMessage("Server configuration error")
          setErrorDescription("There is a problem with the server configuration. Please contact support.")
          break
        case "AccessDenied":
          setErrorMessage("Access denied")
          setErrorDescription("You do not have permission to sign in.")
          break
        case "Verification":
          setErrorMessage("Verification error")
          setErrorDescription("The verification link may have expired or already been used.")
          break
        case "OAuthSignin":
        case "OAuthCallback":
        case "OAuthCreateAccount":
        case "EmailCreateAccount":
        case "Callback":
        case "OAuthAccountNotLinked":
          setErrorMessage("Sign in error")
          setErrorDescription(
            "There was a problem with your sign-in attempt. Please try again with a different method.",
          )
          break
        case "EmailSignin":
          setErrorMessage("Email sign in error")
          setErrorDescription("The email could not be sent or the email link expired.")
          break
        case "CredentialsSignin":
          setErrorMessage("Invalid credentials")
          setErrorDescription("The email or password you entered is incorrect.")
          break
        default:
          setErrorMessage("Authentication error")
          setErrorDescription("An unexpected error occurred during authentication. Please try again.")
      }
    }
  }, [searchParams])

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <div className="relative z-10">
        <SiteHeader />
        <main className="container max-w-md mx-auto py-16 px-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-destructive mb-2">
                <AlertCircle className="h-5 w-5" />
                <CardTitle>Authentication Error</CardTitle>
              </div>
              <CardDescription>{errorMessage}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{errorDescription}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button asChild className="w-full">
                <Link href="/login">Try Again</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">Return to Home</Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  )
}
