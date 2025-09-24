"use client"

import { Button } from "@/components/ui/button"
import { Menu, Bell, Calendar } from "lucide-react"
import { getAuthState } from "@/lib/auth"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const auth = getAuthState()

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Wednesday, September 3, 2025</span>
            <span>03:54 PM</span>
          </div>

          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
            <span className="sr-only">Notifications</span>
          </Button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">{auth?.user?.name?.charAt(0) || "A"}</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{auth?.user?.name || "Admin User"}</p>
              <p className="text-xs text-muted-foreground">HUMAN CAPITAL</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
