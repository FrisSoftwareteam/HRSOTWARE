import type { NextAuthOptions } from "next-auth"
import AzureAd from "next-auth/providers/azure-ad"

const authConfig: NextAuthOptions = {
  providers: [
    AzureAd({
      clientId: process.env.AZURE_AD_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "dummy-client-secret",
      tenantId: process.env.AZURE_AD_TENANT_ID || "dummy-tenant-id",
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, account, profile }) {
      if (process.env.NODE_ENV === "development") {
        console.log("[v0] JWT callback - account:", account?.provider)
        console.log("[v0] JWT callback - profile:", profile?.name)
      }
      if (account && profile) {
        token.role = "user"
        token.name = profile.name
        token.email = profile.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
}

export const authOptions = authConfig
export default authConfig
