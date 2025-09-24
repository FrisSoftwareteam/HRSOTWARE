import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DepartmentManagement } from "@/components/employee/department-management"

export default function DepartmentsPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <DepartmentManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
