import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { EmployeeManagement } from "@/components/employee/employee-management"

export default function EmployeesPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <EmployeeManagement />
      </DashboardLayout>
    </AuthGuard>
  )
}
