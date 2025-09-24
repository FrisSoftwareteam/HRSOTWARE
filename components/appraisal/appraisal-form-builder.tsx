"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Download, Upload, Trash2, Eye } from "lucide-react"

export function AppraisalFormBuilder() {
  const [formTitle, setFormTitle] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const [existingForms] = useState([
    {
      id: 1,
      title: "Annual Performance Review 2025",
      description: "Comprehensive annual performance evaluation for all employees",
      department: "All Departments",
      status: "Active",
      createdDate: "2025-01-15",
      responses: 45,
    },
    {
      id: 2,
      title: "Leadership Development Assessment",
      description: "Assessment form for leadership development program participants",
      department: "Management",
      status: "Draft",
      createdDate: "2025-02-20",
      responses: 12,
    },
    {
      id: 3,
      title: "Quarterly Goal Review",
      description: "Quarterly review of individual and team goals",
      department: "Sales",
      status: "Active",
      createdDate: "2025-03-01",
      responses: 23,
    },
  ])

  const departments = [
    "All Departments",
    "Human Resources",
    "Engineering",
    "Sales",
    "Marketing",
    "Finance",
    "Operations",
    "Management",
  ]

  const handleCreateForm = async () => {
    if (!formTitle.trim() || !formDescription.trim() || !selectedDepartment) {
      return
    }

    setIsCreating(true)

    // Mock form creation
    setTimeout(() => {
      console.log("[v0] Creating form:", { formTitle, formDescription, selectedDepartment })
      setFormTitle("")
      setFormDescription("")
      setSelectedDepartment("")
      setIsCreating(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "Draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>
      case "Archived":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Archived</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Task for Appraisal Form creation</h1>
          <p className="text-muted-foreground">Manage your employees members and their information</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete All
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Form Creation Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="w-full">
              <div className="flex items-center justify-center mb-6">
                <Button
                  className="w-full max-w-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create Appraisal Form"}
                </Button>
              </div>
              <div className="text-right">
                <Button variant="link" className="text-blue-600 hover:text-blue-700">
                  Appraisal Form Log(s)
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              Please provide the form/appraisal description and assign it to the appropriate department.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <Label htmlFor="form-title" className="text-base font-medium">
                Form Title
              </Label>
              <Input
                id="form-title"
                placeholder="Enter form title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="form-description" className="text-base font-medium">
                Form Description
              </Label>
              <Textarea
                id="form-description"
                placeholder="Enter detailed description of the appraisal form"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="min-h-32 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-base font-medium">
                Assign to Department
              </Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCreateForm}
              disabled={!formTitle.trim() || !formDescription.trim() || !selectedDepartment || isCreating}
              className="w-full bg-black hover:bg-gray-800 text-white h-12"
            >
              {isCreating ? "Creating Form..." : "Submit"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Forms Section */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Appraisal Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {existingForms.map((form) => (
              <div key={form.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">{form.title}</h3>
                      {getStatusBadge(form.status)}
                    </div>
                    <p className="text-muted-foreground">{form.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Department: {form.department}</span>
                      <span>Created: {new Date(form.createdDate).toLocaleDateString()}</span>
                      <span>Responses: {form.responses}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
