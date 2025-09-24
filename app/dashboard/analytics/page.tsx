import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <AnalyticsDashboard />
      </DashboardLayout>
    </AuthGuard>
  )
}
