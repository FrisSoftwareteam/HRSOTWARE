"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { clearAuthState, getAuthState } from "@/lib/auth"
import { Building2, Users, BarChart3, ChevronDown, Database, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const router = useRouter()
  const auth = getAuthState()

  const handleSignOut = () => {
    clearAuthState()
    router.push("/")
  }

  const menuItems = [
    {
      title: "CORE HR",
      items: [
        {
          title: "Employee Mgt.",
          icon: Users,
          items: [
            { title: "Employee Dashboard", href: "/dashboard" },
            { title: "Add Department", href: "/dashboard/departments" },
            { title: "Add Reporting Officer(s)", href: "/dashboard/reporting" },
            { title: "Enabled Self-Services", href: "/dashboard/self-services" },
          ],
        },
        {
          title: "Performance Mgt.",
          icon: BarChart3,
          items: [
            { title: "Appraisal Form Builder", href: "/dashboard/appraisal-forms" },
            { title: "Appraisal Log(s)", href: "/dashboard/appraisal-logs" },
            { title: "Appraisal WorkFlow", href: "/dashboard/workflows" },
          ],
        },
        {
          title: "Data Migration",
          icon: Database,
          href: "/dashboard/data-migration",
        },
      ],
    },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => onOpenChange(false)} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-sidebar-foreground">FRIS PORTAL</h2>
                <p className="text-xs text-sidebar-foreground/60">ADMIN</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">
                  {section.title}
                </h3>
                {section.items.map((item) => (
                  <div key={item.title}>
                    {item.items ? (
                      <details className="group">
                        <summary className="flex items-center justify-between p-2 rounded-md hover:bg-sidebar-accent cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <item.icon className="w-4 h-4 text-sidebar-foreground/60" />
                            <span className="text-sm text-sidebar-foreground">{item.title}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-sidebar-foreground/60 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="ml-6 mt-1 space-y-1">
                          {item.items.map((subItem) => (
                            <Button
                              key={subItem.title}
                              variant="ghost"
                              className="w-full justify-start text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                              onClick={() => router.push(subItem.href)}
                            >
                              {subItem.title}
                            </Button>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:bg-sidebar-accent"
                        onClick={() => router.push(item.href!)}
                      >
                        <item.icon className="w-4 h-4 mr-2 text-sidebar-foreground/60" />
                        <span className="text-sm text-sidebar-foreground">{item.title}</span>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {auth?.user?.name?.charAt(0) || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {auth?.user?.name || "Admin User"}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {auth?.user?.email || "admin@company.com"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
