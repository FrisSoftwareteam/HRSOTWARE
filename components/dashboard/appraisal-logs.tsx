"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, UserPlus, MoreHorizontal } from "lucide-react"
import { db, Appraisal } from "@/lib/database"

interface AppraisalWithEmployee extends Appraisal {
  employeeName?: string
}

export function AppraisalLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [appraisals, setAppraisals] = useState<AppraisalWithEmployee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAppraisals = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all appraisals and employees to match them
        const [appraisalsData, employees] = await Promise.all([
          db.getAllAppraisals(),
          db.getAllEmployees()
        ])

        // Create a map of employee ID to employee name for quick lookup
        const employeeMap = new Map(employees.map(emp => [emp.id, emp]))

        // Add employee names to appraisals
        const appraisalsWithNames: AppraisalWithEmployee[] = appraisalsData.map(appraisal => ({
          ...appraisal,
          employeeName: employeeMap.get(appraisal.appraisee_id)?.user_id
            ? `Employee ${appraisal.appraisee_id}` // In real app, you'd join with users table
            : `Employee ${appraisal.appraisee_id}`
        }))

        setAppraisals(appraisalsWithNames)
      } catch (err) {
        console.error("Error fetching appraisals:", err)
        setError("Failed to load appraisals")
        // Fallback to static data
        setAppraisals([
          {
            id: 1,
            form_id: 1,
            workflow_id: 1,
            appraisee_id: 1,
            appraisee_status: "SUBMITTED",
            hod_status: "SUBMITTED",
            divisional_head_status: "PENDING",
            group_head_status: "SUBMITTED",
            committee_status: "",
            score: 30,
            reasons: "Leadership Development Program",
            created_at: new Date("2025-06-11T17:43:29.215Z"),
            employeeName: "FRIS"
          },
          {
            id: 2,
            form_id: 1,
            workflow_id: 1,
            appraisee_id: 1,
            appraisee_status: "SUBMITTED",
            hod_status: "SUBMITTED",
            divisional_head_status: "PENDING",
            group_head_status: "SUBMITTED",
            committee_status: "",
            score: 30,
            reasons: "Promotion",
            created_at: new Date("2025-06-11T12:33:47.397Z"),
            employeeName: "FRIS"
          },
        ] as AppraisalWithEmployee[])
      } finally {
        setLoading(false)
      }
    }

    fetchAppraisals()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">SUBMITTED</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">PENDING</Badge>
      default:
        return null
    }
  }

  const getScoreBadge = (score: number, type: "positive" | "negative") => {
    return (
      <Badge
        className={
          type === "negative"
            ? "bg-red-100 text-red-800 hover:bg-red-100"
            : "bg-orange-100 text-orange-800 hover:bg-orange-100"
        }
      >
        {score}
      </Badge>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Appraisal Logs</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" disabled>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" disabled className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Appraisal Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Appraisal Logs</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appraisals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded" />
                  </TableHead>
                  <TableHead>Appraisee Name</TableHead>
                  <TableHead>Appraisee Status</TableHead>
                  <TableHead>HOD Status</TableHead>
                  <TableHead>Divisional Head</TableHead>
                  <TableHead>Group Head</TableHead>
                  <TableHead>Committee</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Reasons</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appraisals.map((appraisal) => (
                  <TableRow key={appraisal.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {(appraisal.employeeName || "U")[0].toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium">{appraisal.employeeName || "Unknown"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(appraisal.appraisee_status)}</TableCell>
                    <TableCell>{getStatusBadge(appraisal.hod_status)}</TableCell>
                    <TableCell>{getStatusBadge(appraisal.divisional_head_status)}</TableCell>
                    <TableCell>{getStatusBadge(appraisal.group_head_status)}</TableCell>
                    <TableCell>{appraisal.committee_status || "-"}</TableCell>
                    <TableCell>{getScoreBadge(appraisal.score || 0, (appraisal.score || 0) < 50 ? "negative" : "positive")}</TableCell>
                    <TableCell>
                      <span className="text-blue-600 hover:underline cursor-pointer">{appraisal.reasons || "N/A"}</span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {appraisal.created_at.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0 of {appraisals.length} row(s) selected</span>
            <div className="flex items-center space-x-2">
              <span>Rows per page: 10</span>
              <span>Page 1 of {Math.ceil(appraisals.length / 10) || 1}</span>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled={appraisals.length <= 10}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
