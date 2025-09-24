import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DataMigration } from "@/components/analytics/data-migration"

export default function DataMigrationPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <DataMigration />
      </DashboardLayout>
    </AuthGuard>
  )
}
