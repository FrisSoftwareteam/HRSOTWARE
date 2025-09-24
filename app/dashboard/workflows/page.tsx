import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { WorkflowManagement } from "@/components/workflow/workflow-management"

export default function WorkflowsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <WorkflowManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
