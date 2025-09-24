"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Attempting credentials sign in")
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      console.log("[v0] Sign in result:", result)

      if (result?.error) {
        setError("Invalid credentials. Use admin@example.com / password")
        console.error("[v0] Sign in error:", result.error)
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("[v0] Sign in error:", error)
      setError("An error occurred during sign in.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMicrosoftSignIn = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Attempting Microsoft sign in")
      const result = await signIn("azure-ad", {
        callbackUrl: "/dashboard",
        redirect: false,
      })

      console.log("[v0] Sign in result:", result)

      if (result?.error) {
        setError("Microsoft authentication is not configured. Please contact your administrator.")
        console.error("[v0] Sign in error:", result.error)
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (error) {
      console.error("[v0] Sign in error:", error)
      setError("Microsoft authentication is not configured. Please contact your administrator.")
    } finally {
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

        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
            disabled={isLoading}
          >
            <span>{isLoading ? "Signing in..." : "Sign in"}</span>
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleMicrosoftSignIn}
            variant="outline"
            className="w-full h-12 text-base font-medium"
            disabled={isLoading}
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-5 h-5" viewBox="0 0 23 23" fill="currentColor">
                <path d="M1 1h10v10H1z" fill="#f25022" />
                <path d="M12 1h10v10H12z" fill="#00a4ef" />
                <path d="M1 12h10v10H1z" fill="#ffb900" />
                <path d="M12 12h10v10H12z" fill="#7fba00" />
              </svg>
              <span>Sign in with Microsoft</span>
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
