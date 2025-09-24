"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Copy } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const [copied, setCopied] = useState(false)

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "OAuthSignin":
      case "OAuthSigninError":
        return {
          title: "Microsoft OAuth Sign-in Error",
          message:
            "There was an error connecting to Microsoft Azure AD. This usually indicates a configuration issue.",
          details: [
            "Check that your Azure AD app redirect URIs include BOTH:",
            "  • http://localhost:3000/api/auth/callback/azure-ad",
            "  • https://v0-appraisal-solution-build.vercel.app/api/auth/callback/azure-ad",
            "Verify AZURE_AD_CLIENT_ID, AZURE_AD_CLIENT_SECRET, and AZURE_AD_TENANT_ID in Vercel",
            "Ensure your app has required permissions: openid, profile, email, offline_access",
            "Confirm that the Azure AD app is configured for the correct tenant",
          ],
        }
      case "Configuration":
        return {
          title: "Configuration Error",
          message: "There is a problem with the server configuration.",
          details: ["Contact your administrator to check the authentication setup"],
        }
      case "AccessDenied":
        return {
          title: "Access Denied",
          message: "Access denied. You do not have permission to sign in.",
          details: ["You may not have access to this application", "Contact your administrator for access"],
        }
      case "Verification":
        return {
          title: "Verification Error",
          message: "The verification token has expired or has already been used.",
          details: ["Try signing in again", "Clear your browser cache if the problem persists"],
        }
      default:
        return {
          title: "Authentication Error",
          message: "An unknown error occurred during authentication.",
          details: ["Try signing in again", "Contact support if the problem persists"],
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  const copyErrorDetails = () => {
    const params = Array.from(searchParams.entries())
      .map(([key, val]) => `${key}: ${val}`)
      .join("\n")

    const details = `Error: ${error}\nURL: ${window.location.href}\nTimestamp: ${new Date().toISOString()}\n\nParams:\n${params}`
    navigator.clipboard.writeText(details)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-red-600">{errorInfo.title}</CardTitle>
            <CardDescription className="mt-2">{errorInfo.message}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Troubleshooting Steps:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {errorInfo.details.map((detail, index) => (
                <li key={index} className="flex items-start whitespace-pre-wrap">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-red-900">Error Details:</h3>
                <Button variant="outline" size="sm" onClick={copyErrorDetails} className="text-xs bg-transparent">
                  <Copy className="w-3 h-3 mr-1" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <p className="text-sm text-red-700 font-mono bg-red-100 p-2 rounded">
                Error Code: {error}
              </p>
              <pre className="text-xs text-gray-700 bg-gray-100 p-2 rounded mt-2 max-h-40 overflow-auto">
                {Array.from(searchParams.entries())
                  .map(([k, v]) => `${k}: ${v}`)
                  .join("\n")}
              </pre>
            </div>
          )}

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              If you continue to experience issues, please share the error details above with your administrator.
            </p>
            <Link href="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Back to Sign In</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
