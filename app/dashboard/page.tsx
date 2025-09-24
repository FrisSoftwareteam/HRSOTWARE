"use client"

import { AuthGuard } from "@/components/auth/auth-guard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { AppraisalLogs } from "@/components/dashboard/appraisal-logs"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    staff_id: "",
    fullnames: "",
    date_of_birth: "",
    age: "",
    date_employed: "",
    yearofentry: "",
    grade: "",
    designate: "",
    category: "",
    department: "",
    educational_qualification: "",
    additional_qualification: "",
    date_confirmed: "",
    gender: "",
    lastdatepromoted: "",
    nextofkin: "",
    leavedays: "",
    genotype: "",
    blood: "",
    bank_num: "",
    bank_name: "",
    pfacustodian: "",
    pfa: "",
    pension_num: "",
    state: "",
    lga: "",
    religion: "",
    phone: "",
    town: "",
    address: "",
    EmailAddress: "",
    services: "",
    ranking: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Employee data added successfully!");
        setIsModalOpen(false);
        setFormData({
          staff_id: "",
          fullnames: "",
          date_of_birth: "",
          age: "",
          date_employed: "",
          yearofentry: "",
          grade: "",
          designate: "",
          category: "",
          department: "",
          educational_qualification: "",
          additional_qualification: "",
          date_confirmed: "",
          gender: "",
          lastdatepromoted: "",
          nextofkin: "",
          leavedays: "",
          genotype: "",
          blood: "",
          bank_num: "",
          bank_name: "",
          pfacustodian: "",
          pfa: "",
          pension_num: "",
          state: "",
          lga: "",
          religion: "",
          phone: "",
          town: "",
          address: "",
          EmailAddress: "",
          services: "",
          ranking: "",
        });
      } else {
        alert("Failed to add employee data.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">HR Project Management & Task</h1>
              <p className="text-muted-foreground">Manage your employees members and their information</p>
            </div>
            <div className="flex items-center space-x-2" onClick={() => setIsModalOpen(true)}>
              <Button variant="default">Add New Employee</Button>
            </div>
          </div>

          <DashboardMetrics />
          <AppraisalLogs />

          {isModalOpen && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                  {Object.keys(formData).map((key) => (
                    <div key={key} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                      <input
                        type={
                          key.includes("date") ? "date" : key.includes("Email") ? "email" : "text"
                        }
                        name={key}
                        value={formData[key as keyof typeof formData]}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border rounded-md"
                        required
                      />
                    </div>
                  ))}
                  <div className="col-span-2 flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 rounded-md"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
