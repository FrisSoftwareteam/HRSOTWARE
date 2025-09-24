import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react"

export function DashboardMetrics() {
  const metrics = [
    {
      title: "Total Employees",
      value: "156",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Appraisals",
      value: "23",
      change: "+5% from last month",
      changeType: "positive" as const,
      icon: UserCheck,
      color: "bg-green-500",
    },
    {
      title: "Pending Reviews",
      value: "8",
      change: "-2% from last month",
      changeType: "negative" as const,
      icon: Clock,
      color: "bg-orange-500",
    },
    {
      title: "Performance Score",
      value: "87%",
      change: "+3% from last month",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change}
                </p>
              </div>
              <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
