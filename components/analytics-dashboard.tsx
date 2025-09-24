"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, TrendingDown, Star } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

export function AnalyticsDashboard() {
  const metrics = [
    {
      title: "Total Employees",
      value: "301",
      change: "+4.2% from last month",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "New Hires",
      value: "20",
      change: "+25% from last month",
      changeType: "positive" as const,
      icon: UserPlus,
      color: "bg-green-500",
    },
    {
      title: "Turnover Rate",
      value: "2.7%",
      change: "+0.3% from last month",
      changeType: "negative" as const,
      icon: TrendingDown,
      color: "bg-red-500",
    },
    {
      title: "Avg Satisfaction",
      value: "8.1",
      change: "+0.3 from last month",
      changeType: "positive" as const,
      icon: Star,
      color: "bg-yellow-500",
    },
  ]

  const hiringTrendsData = [
    { month: "Jan", hires: 12, departures: 8 },
    { month: "Feb", hires: 15, departures: 4 },
    { month: "Mar", hires: 18, departures: 6 },
    { month: "Apr", hires: 22, departures: 9 },
    { month: "May", departures: 15, hires: 6 },
    { month: "Jun", hires: 19, departures: 8 },
  ]

  const departmentData = [
    { name: "Engineering", value: 85, color: "#3b82f6" },
    { name: "Sales", value: 45, color: "#10b981" },
    { name: "Operations", value: 38, color: "#8b5cf6" },
    { name: "Marketing", value: 32, color: "#f59e0b" },
    { name: "Finance", value: 25, color: "#ef4444" },
    { name: "HR", value: 18, color: "#06b6d4" },
  ]

  const satisfactionData = [
    { month: "Jan", score: 7.2 },
    { month: "Feb", score: 7.5 },
    { month: "Mar", score: 7.8 },
    { month: "Apr", score: 8.1 },
    { month: "May", score: 8.0 },
    { month: "Jun", score: 8.3 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">HR Project Management & Task</h1>
          <p className="text-muted-foreground">Analytics and reporting dashboard</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <p className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                    {metric.change}
                  </p>
                </div>
                <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="compensation">Compensation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hiring Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Hiring Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Monthly hiring and departure trends</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hiringTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={2} name="Hires" />
                    <Line type="monotone" dataKey="departures" stroke="#ef4444" strokeWidth={2} name="Departures" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
                <p className="text-sm text-muted-foreground">Employee count by department</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Employee Satisfaction Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Satisfaction Trend</CardTitle>
              <p className="text-sm text-muted-foreground">Monthly satisfaction scores (1-10 scale)</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[6, 10]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">87%</div>
                  <div className="text-sm text-muted-foreground">Average Performance Score</div>
                  <Badge className="bg-green-100 text-green-800">+3% from last quarter</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-muted-foreground">Active Appraisals</div>
                  <Badge className="bg-blue-100 text-blue-800">+5% from last month</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-muted-foreground">Pending Reviews</div>
                  <Badge className="bg-orange-100 text-orange-800">-2% from last month</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Demographics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">32.5</div>
                  <div className="text-sm text-muted-foreground">Average Age</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">52%</div>
                  <div className="text-sm text-muted-foreground">Female</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">48%</div>
                  <div className="text-sm text-muted-foreground">Male</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">3.2</div>
                  <div className="text-sm text-muted-foreground">Avg Tenure (years)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compensation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compensation Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">$75,000</div>
                  <div className="text-sm text-muted-foreground">Average Salary</div>
                  <Badge className="bg-green-100 text-green-800">+5% from last year</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">$95,000</div>
                  <div className="text-sm text-muted-foreground">Median Salary</div>
                  <Badge className="bg-blue-100 text-blue-800">+3% from last year</Badge>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">15%</div>
                  <div className="text-sm text-muted-foreground">Bonus Rate</div>
                  <Badge className="bg-purple-100 text-purple-800">+2% from last year</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
