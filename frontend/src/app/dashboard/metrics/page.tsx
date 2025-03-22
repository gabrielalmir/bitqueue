"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { format, subDays } from "date-fns"
import { ArrowDownToLine, BarChart3, CalendarIcon, Clock, Download, PieChart, RefreshCcw, Save, Share2 } from 'lucide-react'
import { useState } from "react"
import { LineChart } from "recharts"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const generateMetricsData = (days: number) => {
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = subDays(now, i)
    const formattedDate = format(date, "MMM dd")

    // Generate deterministic but varying data
    const messagesSent = 5000 + Math.floor(Math.sin(i * 0.5) * 2000) + i * 100
    const messagesProcessed = messagesSent - Math.floor(Math.cos(i * 0.5) * 500) - 200
    const errors = Math.max(0, Math.floor(Math.sin(i * 0.8) * 100) + 50)
    const avgLatency = Math.max(10, Math.floor(Math.cos(i * 0.3) * 20) + 40)

    data.push({
      date: formattedDate,
      messagesSent,
      messagesProcessed,
      errors,
      avgLatency,
      successRate: ((messagesProcessed - errors) / messagesProcessed * 100).toFixed(2),
    })
  }

  return data
}

const queueMetrics = [
  {
    id: "q_1",
    name: "order-processing",
    messagesSent: 1245300,
    messagesProcessed: 1244800,
    errors: 500,
    avgLatency: 42,
    successRate: 99.96,
  },
  {
    id: "q_2",
    name: "email-notifications",
    messagesSent: 452310,
    messagesProcessed: 451900,
    errors: 410,
    avgLatency: 38,
    successRate: 99.91,
  },
  {
    id: "q_3",
    name: "payment-webhooks",
    messagesSent: 87650,
    messagesProcessed: 87500,
    errors: 150,
    avgLatency: 56,
    successRate: 99.83,
  },
  {
    id: "q_4",
    name: "log-processing",
    messagesSent: 3456780,
    messagesProcessed: 3455000,
    errors: 1780,
    avgLatency: 28,
    successRate: 99.95,
  },
  {
    id: "q_5",
    name: "analytics-events",
    messagesSent: 700920,
    messagesProcessed: 700100,
    errors: 820,
    avgLatency: 35,
    successRate: 99.88,
  },
]

const distributionData = [
  { name: "order-processing", value: 25 },
  { name: "email-notifications", value: 15 },
  { name: "payment-webhooks", value: 10 },
  { name: "log-processing", value: 35 },
  { name: "analytics-events", value: 15 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

export default function MetricsPage() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "custom">("7d")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const [selectedQueue, setSelectedQueue] = useState<string>("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showRealtime, setShowRealtime] = useState(false)

  const getDaysFromTimeRange = () => {
    switch (timeRange) {
      case "24h": return 1
      case "7d": return 7
      case "30d": return 30
      case "custom": {
        const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      }
      default: return 7
    }
  }

  const metricsData = generateMetricsData(getDaysFromTimeRange())

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleExport = (format: string) => {
    console.log(`Exporting metrics in ${format} format`)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Metrics & Analytics</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCcw className={cn("mr-2 h-4 w-4", isRefreshing && "animate-spin")} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="end">
              <div className="flex flex-col gap-1">
                <Button variant="ghost" size="sm" onClick={() => handleExport("csv")}>
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Export as CSV
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleExport("json")}>
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Export as JSON
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleExport("pdf")}>
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="queue-select" className="text-sm">Queue:</Label>
          <Select value={selectedQueue} onValueChange={setSelectedQueue}>
            <SelectTrigger id="queue-select" className="w-[180px]">
              <SelectValue placeholder="Select queue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Queues</SelectItem>
              {queueMetrics.map(queue => (
                <SelectItem key={queue.id} value={queue.id}>
                  {queue.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="time-range" className="text-sm">Time Range:</Label>
          <Select value={timeRange} onValueChange={(value: "24h" | "7d" | "30d" | "custom") => setTimeRange(value)}>
            <SelectTrigger id="time-range" className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {timeRange === "custom" && (
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange({ from: range.from, to: range.to })
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div className="flex items-center space-x-2 ml-auto">
          <Switch
            id="realtime"
            checked={showRealtime}
            onCheckedChange={setShowRealtime}
          />
          <Label htmlFor="realtime" className="text-sm">Real-time updates</Label>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(metricsData.reduce((sum, day) => sum + day.messagesSent, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              +{formatNumber(metricsData[metricsData.length - 1].messagesSent - metricsData[0].messagesSent)} from previous period
            </p>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricsData}>
                  <defs>
                    <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="messagesSent"
                    stroke="#0088FE"
                    fillOpacity={1}
                    fill="url(#sentGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages Processed</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(metricsData.reduce((sum, day) => sum + day.messagesProcessed, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              +{formatNumber(metricsData[metricsData.length - 1].messagesProcessed - metricsData[0].messagesProcessed)} from previous period
            </p>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metricsData}>
                  <defs>
                    <linearGradient id="processedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00C49F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="messagesProcessed"
                    stroke="#00C49F"
                    fillOpacity={1}
                    fill="url(#processedGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Latency</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(metricsData.reduce((sum, day) => sum + day.avgLatency, 0) / metricsData.length)}ms
            </div>
            <p className="text-xs text-muted-foreground">
              {metricsData[metricsData.length - 1].avgLatency < metricsData[0].avgLatency ? "-" : "+"}
              {Math.abs(metricsData[metricsData.length - 1].avgLatency - metricsData[0].avgLatency)}ms from previous period
            </p>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metricsData}>
                  <Line
                    type="monotone"
                    dataKey="avgLatency"
                    stroke="#FFBB28"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metricsData.reduce((sum, day) => sum + parseFloat(day.successRate), 0) / metricsData.length).toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {parseFloat(metricsData[metricsData.length - 1].successRate) < parseFloat(metricsData[0].successRate) ? "-" : "+"}
              {Math.abs(parseFloat(metricsData[metricsData.length - 1].successRate) - parseFloat(metricsData[0].successRate)).toFixed(2)}% from previous period
            </p>
            <div className="mt-4 h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metricsData}>
                  <Line
                    type="monotone"
                    dataKey="successRate"
                    stroke="#8884D8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Charts */}
      <Tabs defaultValue="throughput" className="space-y-4">
        <TabsList>
          <TabsTrigger value="throughput">Throughput</TabsTrigger>
          <TabsTrigger value="latency">Latency</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        {/* Throughput Tab */}
        <TabsContent value="throughput">
          <Card>
            <CardHeader>
              <CardTitle>Message Throughput</CardTitle>
              <CardDescription>
                Number of messages sent and processed over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="messagesSent"
                      name="Messages Sent"
                      stroke="#0088FE"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="messagesProcessed"
                      name="Messages Processed"
                      stroke="#00C49F"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Latency Tab */}
        <TabsContent value="latency">
          <Card>
            <CardHeader>
              <CardTitle>Average Latency</CardTitle>
              <CardDescription>
                Average processing time in milliseconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <defs>
                      <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFBB28" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FFBB28" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="avgLatency"
                      name="Average Latency (ms)"
                      stroke="#FFBB28"
                      fillOpacity={1}
                      fill="url(#latencyGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Errors Tab */}
        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <CardTitle>Error Rate</CardTitle>
              <CardDescription>
                Number of errors and success rate over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#FF8042" />
                    <YAxis yAxisId="right" orientation="right" stroke="#8884D8" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="errors"
                      name="Errors"
                      fill="#FF8042"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="successRate"
                      name="Success Rate (%)"
                      stroke="#8884D8"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution Tab */}
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Queue Distribution</CardTitle>
              <CardDescription>
                Distribution of messages across queues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Queue Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Queue Performance</CardTitle>
          <CardDescription>
            Detailed metrics for individual queues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Queue Name</TableHead>
                  <TableHead className="text-right">Messages Sent</TableHead>
                  <TableHead className="text-right">Messages Processed</TableHead>
                  <TableHead className="text-right">Errors</TableHead>
                  <TableHead className="text-right">Avg. Latency</TableHead>
                  <TableHead className="text-right">Success Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queueMetrics.map(queue => (
                  <TableRow key={queue.id}>
                    <TableCell className="font-medium">{queue.name}</TableCell>
                    <TableCell className="text-right">{formatNumber(queue.messagesSent)}</TableCell>
                    <TableCell className="text-right">{formatNumber(queue.messagesProcessed)}</TableCell>
                    <TableCell className="text-right">{formatNumber(queue.errors)}</TableCell>
                    <TableCell className="text-right">{queue.avgLatency}ms</TableCell>
                    <TableCell className="text-right">{queue.successRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Custom Dashboard */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Custom Dashboard</CardTitle>
            <CardDescription>
              Create and save custom metric views
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 text-center border rounded-md">
            <div className="flex flex-col items-center max-w-md">
              <BarChart3 className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">Create Custom Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop metrics to create your own custom dashboard view. Save and share with your team.
              </p>
              <Button>Get Started</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
