"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleMicrosoftSignIn = async () => {
    console.log("[v0] Button clicked - starting sign in process")
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Checking if signIn function is available:", typeof signIn)
      console.log("[v0] Attempting Microsoft sign in with azure-ad provider")

      const result = await signIn("azure-ad", {
        callbackUrl: "/dashboard",
        redirect: false,
      })

      console.log("[v0] Sign in result:", result)
      console.log("[v0] Result type:", typeof result)
      console.log("[v0] Result keys:", result ? Object.keys(result) : "null")

      if (result?.error) {
        console.error("[v0] Sign in error details:", result.error)
        setError(`Authentication failed: ${result.error}`)
      } else if (result?.url) {
        console.log("[v0] Redirecting to:", result.url)
        window.location.href = result.url
      } else {
        console.log("[v0] No error and no URL - unexpected result")
        setError("Unexpected authentication response. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Exception during sign in:", error)
      console.error("[v0] Error type:", typeof error)
      console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
      setError(`Sign in failed: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      console.log("[v0] Sign in process completed")
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full shadow-2xl border-0">
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">HR Portal</CardTitle>
          <CardDescription className="text-base">Welcome Back</CardDescription>
          <p className="text-sm text-muted-foreground">Sign in to access your HR dashboard</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <Button
            onClick={handleMicrosoftSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
            disabled={isLoading}
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-5 h-5" viewBox="0 0 23 23" fill="currentColor">
                <path d="M1 1h10v10H1z" fill="#f25022" />
                <path d="M12 1h10v10H12z" fill="#00a4ef" />
                <path d="M1 12h10v10H1z" fill="#ffb900" />
                <path d="M12 12h10v10H12z" fill="#7fba00" />
              </svg>
              <span>{isLoading ? "Signing in..." : "Sign in with Microsoft"}</span>
            </div>
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Need help? <button className="text-blue-600 hover:underline">Contact IT Support</button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
