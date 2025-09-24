"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, Edit, Trash2, Eye } from "lucide-react"

export function DepartmentManagement() {
  const [departmentName, setDepartmentName] = useState("")
  const [departmentDescription, setDepartmentDescription] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const [existingDepartments] = useState([
    {
      id: 1,
      name: "Human Resources",
      description: "Manages employee relations, recruitment, and organizational development",
      employeeCount: 12,
      headOfDepartment: "Sarah Johnson",
      status: "Active",
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Engineering",
      description: "Software development, system architecture, and technical innovation",
      employeeCount: 45,
      headOfDepartment: "Michael Chen",
      status: "Active",
      createdDate: "2024-01-10",
    },
    {
      id: 3,
      name: "Sales",
      description: "Revenue generation, client relationships, and market expansion",
      employeeCount: 28,
      headOfDepartment: "Emily Rodriguez",
      status: "Active",
      createdDate: "2024-01-20",
    },
    {
      id: 4,
      name: "Marketing",
      description: "Brand management, digital marketing, and customer acquisition",
      employeeCount: 18,
      headOfDepartment: "David Kim",
      status: "Active",
      createdDate: "2024-02-01",
    },
    {
      id: 5,
      name: "Finance",
      description: "Financial planning, accounting, and budget management",
      employeeCount: 15,
      headOfDepartment: "Lisa Thompson",
      status: "Active",
      createdDate: "2024-01-25",
    },
  ])

  const handleCreateDepartment = async () => {
    if (!departmentName.trim() || !departmentDescription.trim()) {
      return
    }

    setIsCreating(true)

    // Mock department creation
    setTimeout(() => {
      console.log("[v0] Creating department:", { departmentName, departmentDescription })
      setDepartmentName("")
      setDepartmentDescription("")
      setIsCreating(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">HR Project Management & Task Tracking</h1>
          <p className="text-muted-foreground">Manage departments and organizational structure</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="create">Create Department</TabsTrigger>
          <TabsTrigger value="logs">Department Log(s)</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Department</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="department-name" className="text-base font-medium">
                    Department
                  </Label>
                  <Input
                    id="department-name"
                    placeholder="KYC"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department-description" className="text-base font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="department-description"
                    placeholder="Placeholder"
                    value={departmentDescription}
                    onChange={(e) => setDepartmentDescription(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                </div>

                <Button
                  onClick={handleCreateDepartment}
                  disabled={!departmentName.trim() || !departmentDescription.trim() || isCreating}
                  className="w-full bg-black hover:bg-gray-800 text-white h-12"
                >
                  {isCreating ? "Creating..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {existingDepartments.map((department) => (
                  <Card key={department.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{department.name}</h3>
                            {getStatusBadge(department.status)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{department.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Employees:</span>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{department.employeeCount}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Head:</span>
                          <span className="font-medium">{department.headOfDepartment}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Created:</span>
                          <span>{new Date(department.createdDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
