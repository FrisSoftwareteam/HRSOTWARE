import { getServerSession } from "next-auth/next"
import { getSession } from "next-auth/react"
import { authOptions } from "./auth-options"

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface AuthState {
  user: User | null
  token: string | null
}

export async function getAuthState(): Promise<AuthState | null> {
  if (typeof window === "undefined") {
    // Server-side
    const session = await getServerSession(authOptions)
    if (!session?.user) return null

    return {
      user: {
        id: session.user.id || "",
        email: session.user.email || "",
        name: session.user.name || "",
        role: (session.user as any).role || "user",
      },
      token: "nextauth-session", // NextAuth handles tokens internally
    }
  } else {
    // Client-side
    const session = await getSession()
    if (!session?.user) return null

    return {
      user: {
        id: (session.user as any).id || "",
        email: session.user.email || "",
        name: session.user.name || "",
        role: (session.user as any).role || "user",
      },
      token: "nextauth-session",
    }
  }
}

export function clearAuthState(): void {
  // NextAuth handles session clearing through signOut()
  // This function is kept for backward compatibility
  if (typeof window !== "undefined") {
    // Clear any local storage if needed
    localStorage.removeItem("hr_auth")
  }
}

export async function getAuthUser(): Promise<User | null> {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  return {
    id: session.user.id || "",
    email: session.user.email || "",
    name: session.user.name || "",
    role: (session.user as any).role || "user",
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession(authOptions)
  return !!session?.user
}
