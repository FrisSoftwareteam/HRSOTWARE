"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Eye, Edit } from "lucide-react"

interface WorkflowStep {
  id: string
  level: string
  designation: string
}

export function WorkflowManagement() {
  const [workflowTitle, setWorkflowTitle] = useState("")
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([{ id: "1", level: "", designation: "" }])
  const [isCreating, setIsCreating] = useState(false)

  const [existingWorkflows] = useState([
    {
      id: 1,
      title: "Standard Performance Review Workflow",
      steps: 4,
      status: "Active",
      createdDate: "2025-01-15",
      lastUsed: "2025-03-01",
    },
    {
      id: 2,
      title: "Leadership Assessment Workflow",
      steps: 6,
      status: "Draft",
      createdDate: "2025-02-10",
      lastUsed: "2025-02-28",
    },
    {
      id: 3,
      title: "Quarterly Review Workflow",
      steps: 3,
      status: "Active",
      createdDate: "2025-01-20",
      lastUsed: "2025-03-05",
    },
  ])

  const levels = [
    "Entry Level",
    "Junior Level",
    "Mid Level",
    "Senior Level",
    "Lead Level",
    "Manager Level",
    "Director Level",
    "Executive Level",
  ]

  const designations = [
    "Employee",
    "Team Lead",
    "Supervisor",
    "Manager",
    "Senior Manager",
    "Director",
    "Vice President",
    "President",
    "CEO",
  ]

  const addWorkflowStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      level: "",
      designation: "",
    }
    setWorkflowSteps([...workflowSteps, newStep])
  }

  const removeWorkflowStep = (id: string) => {
    if (workflowSteps.length > 1) {
      setWorkflowSteps(workflowSteps.filter((step) => step.id !== id))
    }
  }

  const updateWorkflowStep = (id: string, field: keyof WorkflowStep, value: string) => {
    setWorkflowSteps(workflowSteps.map((step) => (step.id === id ? { ...step, [field]: value } : step)))
  }

  const handleCreateWorkflow = async () => {
    if (!workflowTitle.trim() || workflowSteps.some((step) => !step.level || !step.designation)) {
      return
    }

    setIsCreating(true)

    // Mock workflow creation
    setTimeout(() => {
      console.log("[v0] Creating workflow:", { workflowTitle, workflowSteps })
      setWorkflowTitle("")
      setWorkflowSteps([{ id: "1", level: "", designation: "" }])
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
          <h1 className="text-2xl font-bold text-foreground">HR Project Management & Task</h1>
          <p className="text-muted-foreground">Create and manage appraisal workflows</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="create">Create Workflow</TabsTrigger>
          <TabsTrigger value="logs">Workflow Log(s)</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Appraisal Workflow</h2>
                <p className="text-sm text-muted-foreground">Sort items' workflow in the vertical direction.</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="workflow-title" className="text-base font-medium">
                  Workflow Title
                </Label>
                <Input
                  id="workflow-title"
                  placeholder=""
                  value={workflowTitle}
                  onChange={(e) => setWorkflowTitle(e.target.value)}
                  className="h-12 bg-gray-50"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </div>
                  <h3 className="text-lg font-medium">Workflows Chain of Command</h3>
                </div>

                <div className="space-y-6">
                  {workflowSteps.map((step, index) => (
                    <div key={step.id} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Select Level</Label>
                          <Select
                            value={step.level}
                            onValueChange={(value) => updateWorkflowStep(step.id, "level", value)}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {levels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Select Designation</Label>
                          <Select
                            value={step.designation}
                            onValueChange={(value) => updateWorkflowStep(step.id, "designation", value)}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {designations.map((designation) => (
                                <SelectItem key={designation} value={designation}>
                                  {designation}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {workflowSteps.length > 1 && (
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeWorkflowStep(step.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={addWorkflowStep}
                  className="w-full bg-transparent border-dashed h-12"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Field Array
                </Button>
              </div>

              <Button
                onClick={handleCreateWorkflow}
                disabled={
                  !workflowTitle.trim() || workflowSteps.some((step) => !step.level || !step.designation) || isCreating
                }
                className="w-full bg-black hover:bg-gray-800 text-white h-12 text-base font-medium"
              >
                {isCreating ? "Creating..." : "Submit"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Existing Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {existingWorkflows.map((workflow) => (
                  <div key={workflow.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-lg">{workflow.title}</h3>
                          {getStatusBadge(workflow.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Steps: {workflow.steps}</span>
                          <span>Created: {new Date(workflow.createdDate).toLocaleDateString()}</span>
                          <span>Last Used: {new Date(workflow.lastUsed).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
