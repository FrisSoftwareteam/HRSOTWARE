import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AppraisalFormBuilder } from "@/components/appraisal/appraisal-form-builder"

export default function AppraisalFormsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <AppraisalFormBuilder />
      </DashboardLayout>
    </AuthGuard>
  )
}
