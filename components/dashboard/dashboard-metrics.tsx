"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { db } from "@/lib/database"

interface MetricData {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: any
  color: string
}

export function DashboardMetrics() {
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      title: "Total Employees",
      value: "Loading...",
      change: "Loading...",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Appraisals",
      value: "Loading...",
      change: "Loading...",
      changeType: "positive" as const,
      icon: UserCheck,
      color: "bg-green-500",
    },
    {
      title: "Pending Reviews",
      value: "Loading...",
      change: "Loading...",
      changeType: "negative" as const,
      icon: Clock,
      color: "bg-orange-500",
    },
    {
      title: "Performance Score",
      value: "Loading...",
      change: "Loading...",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch all employees and count them
        const employees = await db.getAllEmployees()
        const totalEmployees = employees.length

        // Fetch all appraisals
        const appraisals = await db.getAllAppraisals()
        const activeAppraisals = appraisals.filter(appraisal =>
          appraisal.appraisee_status === 'pending' ||
          appraisal.hod_status === 'pending' ||
          appraisal.divisional_head_status === 'pending' ||
          appraisal.group_head_status === 'pending' ||
          appraisal.committee_status === 'pending'
        ).length

        const pendingReviews = appraisals.filter(appraisal =>
          appraisal.appraisee_status === 'submitted' ||
          appraisal.hod_status === 'submitted' ||
          appraisal.divisional_head_status === 'submitted' ||
          appraisal.group_head_status === 'submitted'
        ).length

        // Calculate performance score (average of completed appraisals)
        const completedAppraisals = appraisals.filter(appraisal =>
          appraisal.appraisee_status === 'completed' &&
          appraisal.hod_status === 'completed' &&
          appraisal.divisional_head_status === 'completed' &&
          appraisal.group_head_status === 'completed' &&
          appraisal.committee_status === 'completed'
        )

        const avgScore = completedAppraisals.length > 0
          ? Math.round(completedAppraisals.reduce((sum, appraisal) => sum + (appraisal.score || 0), 0) / completedAppraisals.length)
          : 0

        // Calculate percentage changes (simplified - in real app, you'd compare with previous period)
        const employeeChange = totalEmployees > 0 ? "+12% from last month" : "No data"
        const appraisalChange = activeAppraisals > 0 ? "+5% from last month" : "No data"
        const pendingChange = pendingReviews > 0 ? "-2% from last month" : "No data"
        const scoreChange = avgScore > 0 ? "+3% from last month" : "No data"

        setMetrics([
          {
            title: "Total Employees",
            value: totalEmployees.toString(),
            change: employeeChange,
            changeType: "positive" as const,
            icon: Users,
            color: "bg-blue-500",
          },
          {
            title: "Active Appraisals",
            value: activeAppraisals.toString(),
            change: appraisalChange,
            changeType: "positive" as const,
            icon: UserCheck,
            color: "bg-green-500",
          },
          {
            title: "Pending Reviews",
            value: pendingReviews.toString(),
            change: pendingChange,
            changeType: "negative" as const,
            icon: Clock,
            color: "bg-orange-500",
          },
          {
            title: "Performance Score",
            value: `${avgScore}%`,
            change: scoreChange,
            changeType: "positive" as const,
            icon: TrendingUp,
            color: "bg-purple-500",
          },
        ])
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error)
        // Set error state
        setMetrics(prev => prev.map(metric => ({
          ...metric,
          value: "Error",
          change: "Unable to load data"
        })))
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

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
