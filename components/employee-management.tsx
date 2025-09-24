"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Download, UserPlus, Edit, Trash2 } from "lucide-react"

export function EmployeeManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  const [employees] = useState([
    {
      id: 53,
      staffId: "FRIS-200",
      name: "FRIS",
      email: "info@firstregistrarsnigeria.com",
      workflow: "ET-DM",
      appraisalQuestion: "Half Year Appraisal 2025",
      role: "HR Admin",
      avatar: "F",
      avatarColor: "bg-purple-500",
    },
    {
      id: 54,
      staffId: "FRIS-201",
      name: "INFO",
      email: "info@firstregistrarsnigeria.com",
      workflow: "ET-DM",
      appraisalQuestion: "Appraisal Form -June 2025",
      role: "User",
      avatar: "I",
      avatarColor: "bg-green-500",
    },
    {
      id: 341,
      staffId: "FRIS98",
      name: "OYELAMI OLUFEMI OLAWALE",
      email: "olufemi.oyelami@firstregistrarsnigeria.com",
      workflow: "",
      appraisalQuestion: "",
      role: "User",
      avatar: "OO",
      avatarColor: "bg-blue-500",
    },
    {
      id: 342,
      staffId: "FRIS170",
      name: "OLUWASEGUN ADESOLA ADEDOYIN",
      email: "adesola.oluwasegun@firstregistrarsnigeria.com",
      workflow: "",
      appraisalQuestion: "",
      role: "User",
      avatar: "OA",
      avatarColor: "bg-orange-500",
    },
    {
      id: 343,
      staffId: "FRIS79",
      name: "MEDAIYEDU TOLU ISAAC",
      email: "tolu.medaiyedu@firstregistrarsnigeria.com",
      workflow: "",
      appraisalQuestion: "",
      role: "User",
      avatar: "MT",
      avatarColor: "bg-purple-400",
    },
    {
      id: 344,
      staffId: "FRIS194",
      name: "UFOT VICTOR KINGSLEY",
      email: "victor.ufot@firstregistrarsnigeria.com",
      workflow: "",
      appraisalQuestion: "",
      role: "User",
      avatar: "UV",
      avatarColor: "bg-teal-500",
    },
    {
      id: 345,
      staffId: "FRIS40",
      name: "EFFIONG EMMANUEL IKODEM",
      email: "emmanuel.effiong@firstregistrarsnigeria.com",
      workflow: "",
      appraisalQuestion: "",
      role: "User",
      avatar: "EE",
      avatarColor: "bg-indigo-500",
    },
  ])

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "HR Admin":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 font-medium">HR Admin</Badge>
      case "User":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 font-medium">User</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.staffId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Employees Details</h1>
          <p className="text-muted-foreground">Manage your employees members and their information</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete All
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees' fullnames / email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Import CSV
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete All
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead>ID ↑</TableHead>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Workflow</TableHead>
                    <TableHead>Appraisal Question(s)</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <input type="checkbox" className="rounded" />
                      </TableCell>
                      <TableCell className="font-medium">{employee.id}</TableCell>
                      <TableCell className="font-medium">{employee.staffId}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className={`w-8 h-8 ${employee.avatarColor} text-white`}>
                            <AvatarFallback className={`${employee.avatarColor} text-white text-sm font-medium`}>
                              {employee.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{employee.email}</TableCell>
                      <TableCell>
                        {employee.workflow && (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                            {employee.workflow}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{employee.appraisalQuestion}</TableCell>
                      <TableCell>{getRoleBadge(employee.role)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                              <span className="text-blue-600 text-xs">👁</span>
                            </div>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>0 of 2 row(s) selected</span>
              <div className="flex items-center space-x-4">
                <span>Rows per page: 10</span>
                <span>Page 1 of 1</span>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" disabled>
                    ‹
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    ›
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    »
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
