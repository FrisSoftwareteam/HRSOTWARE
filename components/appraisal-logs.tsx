"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, UserPlus, MoreHorizontal } from "lucide-react"

export function AppraisalLogs() {
  const [searchQuery, setSearchQuery] = useState("")

  const appraisals = [
    {
      id: 1,
      appraisee: "FRIS",
      appraiseeStatus: "SUBMITTED",
      hodStatus: "SUBMITTED",
      divisionalHead: "PENDING",
      groupHead: "SUBMITTED",
      committee: "",
      score: 30,
      scoreType: "negative" as const,
      reasons: "Leadership Development Program",
      date: "2025-06-11T17:43:29.215Z",
    },
    {
      id: 2,
      appraisee: "FRIS",
      appraiseeStatus: "SUBMITTED",
      hodStatus: "SUBMITTED",
      divisionalHead: "PENDING",
      groupHead: "SUBMITTED",
      committee: "",
      score: 30,
      scoreType: "negative" as const,
      reasons: "Promotion",
      date: "2025-06-11T12:33:47.397Z",
    },
  ]

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
                          <span className="text-sm font-medium text-white">F</span>
                        </div>
                        <span className="font-medium">{appraisal.appraisee}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(appraisal.appraiseeStatus)}</TableCell>
                    <TableCell>{getStatusBadge(appraisal.hodStatus)}</TableCell>
                    <TableCell>{getStatusBadge(appraisal.divisionalHead)}</TableCell>
                    <TableCell>{getStatusBadge(appraisal.groupHead)}</TableCell>
                    <TableCell>{appraisal.committee || "-"}</TableCell>
                    <TableCell>{getScoreBadge(appraisal.score, appraisal.scoreType)}</TableCell>
                    <TableCell>
                      <span className="text-blue-600 hover:underline cursor-pointer">{appraisal.reasons}</span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(appraisal.date).toLocaleString()}
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
            <span>0 of 2 row(s) selected</span>
            <div className="flex items-center space-x-2">
              <span>Rows per page: 10</span>
              <span>Page 1 of 1</span>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
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
