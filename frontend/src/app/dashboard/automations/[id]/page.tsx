"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Activity, AlertCircle, ArrowLeft, Brain, Calendar, Check, Copy, Database, Edit, ExternalLink, FileSpreadsheet, Globe, Mail, MessageSquare, Pause, Play, Slack, Trash2, XCircle } from 'lucide-react'
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

const automationData = {
  id: "auto_1",
  name: "Order Notification",
  description: "Sends notifications when a new order is received",
  trigger: {
    type: "http",
    config: {
      endpoint: "/webhook/orders",
      method: "POST",
      authType: "api_key",
    }
  },
  actions: [
    {
      type: "email",
      config: {
        to: "{{order.customerEmail}}",
        subject: "Your order #{{order.id}} has been received",
        body: "Thank you for your order! We'll process it shortly."
      }
    },
    {
      type: "whatsapp",
      config: {
        to: "{{order.customerPhone}}",
        message: "Thank you for your order #{{order.id}}! We'll process it shortly."
      }
    }
  ],
  ai: {
    enabled: true,
    provider: "openai",
    model: "gpt-4",
    prompt: "Create a personalized thank you message for the customer, mentioning their order number and purchased products."
  },
  status: "active",
  createdAt: "2023-07-15T10:30:00Z",
  updatedAt: "2023-08-10T14:20:00Z",
  lastRun: "2023-08-14T15:45:00Z",
  runs: 342,
  successRate: 98.5
}

const executionLogs = [
  {
    id: "log_1",
    timestamp: "2023-08-14T15:45:00Z",
    status: "success",
    duration: "1.2s",
    trigger: "HTTP POST /webhook/orders",
    triggerData: {
      orderId: "ORD-12345",
      customer: "John Doe",
      email: "john@example.com",
      items: [
        { name: "Product A", quantity: 2, price: 29.99 },
        { name: "Product B", quantity: 1, price: 49.99 }
      ],
      total: 109.97
    },
    actions: [
      { type: "email", status: "success", recipient: "john@example.com" },
      { type: "whatsapp", status: "success", recipient: "+1234567890" }
    ]
  },
  {
    id: "log_2",
    timestamp: "2023-08-14T14:30:00Z",
    status: "success",
    duration: "1.5s",
    trigger: "HTTP POST /webhook/orders",
    triggerData: {
      orderId: "ORD-12344",
      customer: "Jane Smith",
      email: "jane@example.com",
      items: [
        { name: "Product C", quantity: 1, price: 19.99 }
      ],
      total: 19.99
    },
    actions: [
      { type: "email", status: "success", recipient: "jane@example.com" },
      { type: "whatsapp", status: "success", recipient: "+0987654321" }
    ]
  },
  {
    id: "log_3",
    timestamp: "2023-08-14T12:15:00Z",
    status: "error",
    duration: "0.8s",
    trigger: "HTTP POST /webhook/orders",
    triggerData: {
      orderId: "ORD-12343",
      customer: "Bob Johnson",
      email: "bob@example.com",
      items: [
        { name: "Product D", quantity: 3, price: 15.99 }
      ],
      total: 47.97
    },
    actions: [
      { type: "email", status: "success", recipient: "bob@example.com" },
      { type: "whatsapp", status: "error", recipient: "+1122334455", error: "Invalid phone number format" }
    ]
  }
]

// Mock data for analytics
const analyticsData = {
  daily: [
    { date: "Aug 08", runs: 42, success: 41, failed: 1 },
    { date: "Aug 09", runs: 38, success: 36, failed: 2 },
    { date: "Aug 10", runs: 45, success: 44, failed: 1 },
    { date: "Aug 11", runs: 53, success: 52, failed: 1 },
    { date: "Aug 12", runs: 49, success: 48, failed: 1 },
    { date: "Aug 13", runs: 51, success: 50, failed: 1 },
    { date: "Aug 14", runs: 64, success: 63, failed: 1 },
  ],
  performance: [
    { name: "Avg. Duration", value: "1.3s" },
    { name: "Success Rate", value: "98.5%" },
    { name: "Failed Runs", value: "5 (last 7 days)" },
    { name: "Total Runs", value: "342" }
  ],
  actionPerformance: [
    { name: "Email", success: 340, failed: 2 },
    { name: "WhatsApp", success: 335, failed: 7 }
  ]
}

// Helper function to get trigger icon
const getTriggerIcon = (triggerType: string) => {
  switch (triggerType) {
    case "http":
      return <Globe className="h-5 w-5" />;
    case "queue":
      return <Database className="h-5 w-5" />;
    case "schedule":
      return <Calendar className="h-5 w-5" />;
    default:
      return <Activity className="h-5 w-5" />;
  }
}

// Helper function to get action icon
const getActionIcon = (actionType: string) => {
  switch (actionType) {
    case "email":
      return <Mail className="h-5 w-5" />;
    case "whatsapp":
      return <MessageSquare className="h-5 w-5" />;
    case "excel":
      return <FileSpreadsheet className="h-5 w-5" />;
    case "slack":
      return <Slack className="h-5 w-5" />;
    default:
      return <Activity className="h-5 w-5" />;
  }
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
}

export default function AutomationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const automationId = params.id as string;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isLogDetailsOpen, setIsLogDetailsOpen] = useState(false);

  // Handle toggle automation status
  const handleToggleStatus = () => {
    const newStatus = automationData.status === "active" ? "paused" : "active";
    const action = automationData.status === "active" ? "paused" : "activated";

    toast({
      title: `Automation ${action}`,
      description: `The automation "${automationData.name}" has been ${action}.`,
    });
  }

  // Handle duplicate automation
  const handleDuplicateAutomation = () => {
    toast({
      title: "Automation duplicated",
      description: `A copy of "${automationData.name}" has been created.`,
    });
  }

  // Handle delete automation
  const handleDeleteAutomation = () => {
    toast({
      title: "Automation deleted",
      description: `The automation "${automationData.name}" has been deleted.`,
      variant: "destructive",
    });
    router.push("/dashboard/automations");
  }

  // Handle view log details
  const handleViewLogDetails = (log: any) => {
    setSelectedLog(log);
    setIsLogDetailsOpen(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/automations">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{automationData.name}</h1>
        <Badge variant={automationData.status === "active" ? "default" : "secondary"}>
          {automationData.status === "active" ? "Active" : "Paused"}
        </Badge>
      </div>

      <p className="text-muted-foreground">{automationData.description}</p>

      <div className="flex flex-wrap gap-4">
        <Button
          variant={automationData.status === "active" ? "outline" : "default"}
          className="gap-2"
          onClick={handleToggleStatus}
        >
          {automationData.status === "active" ? (
            <>
              <Pause className="h-4 w-4" /> Pause Automation
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> Activate Automation
            </>
          )}
        </Button>
        <Link href={`/dashboard/automations/${automationId}/edit`}>
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" /> Edit Automation
          </Button>
        </Link>
        <Button variant="outline" className="gap-2" onClick={handleDuplicateAutomation}>
          <Copy className="h-4 w-4" /> Duplicate
        </Button>
        <Button variant="destructive" className="gap-2" onClick={() => setIsDeleteDialogOpen(true)}>
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Automation Configuration</CardTitle>
            <CardDescription>How this automation is configured to work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Trigger</h3>
              <div className="flex items-start gap-4 p-4 rounded-lg border">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {getTriggerIcon(automationData.trigger.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium capitalize">
                      {automationData.trigger.type === "http" ? "HTTP Webhook" : automationData.trigger.type}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {automationData.trigger.type === "http" && (
                      <>
                        Endpoint: <code className="bg-muted px-1 py-0.5 rounded text-sm">{automationData.trigger.config.endpoint}</code>
                        <br />
                        Method: {automationData.trigger.config.method}
                        <br />
                        Authentication: {automationData.trigger.config.authType}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-2">Actions</h3>
              <div className="space-y-4">
                {automationData.actions.map((action, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {getActionIcon(action.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium capitalize">
                          {action.type === "email" ? "Send Email" :
                           action.type === "whatsapp" ? "Send WhatsApp Message" :
                           action.type}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {action.type === "email" && (
                          <>
                            To: <code className="bg-muted px-1 py-0.5 rounded text-sm">{action.config.to}</code>
                            <br />
                            Subject: {action.config.subject}
                          </>
                        )}
                        {action.type === "whatsapp" && (
                          <>
                            To: <code className="bg-muted px-1 py-0.5 rounded text-sm">{action.config.to}</code>
                            <br />
                            Message: {action.config.message}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {automationData.ai.enabled && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium mb-2">AI Integration</h3>
                  <div className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">AI-Enhanced Content</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Provider: {automationData.ai.provider}
                        <br />
                        Model: {automationData.ai.model}
                        <br />
                        Prompt: {automationData.ai.prompt}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Key metrics for this automation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="text-sm font-medium">{automationData.successRate}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${automationData.successRate}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Total Runs</div>
                <div className="text-2xl font-bold">{automationData.runs}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Last Run</div>
                <div className="text-sm font-medium">{new Date(automationData.lastRun).toLocaleDateString()}</div>
                <div className="text-xs text-muted-foreground">{new Date(automationData.lastRun).toLocaleTimeString()}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Created</div>
                <div className="text-sm font-medium">{new Date(automationData.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Last Updated</div>
                <div className="text-sm font-medium">{new Date(automationData.updatedAt).toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="logs">Execution Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Execution Logs</CardTitle>
              <CardDescription>Recent execution history for this automation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Trigger</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {executionLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{formatDate(log.timestamp)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {log.status === "success" ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="capitalize">{log.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{log.duration}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{log.trigger}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewLogDetails(log)}>
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Load More Logs</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Execution statistics and performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Daily Execution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.daily}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="runs"
                        name="Total Runs"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="success"
                        name="Successful"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.2}
                      />
                      <Area
                        type="monotone"
                        dataKey="failed"
                        name="Failed"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Action Performance</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.actionPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="success" name="Successful" fill="#10b981" />
                      <Bar dataKey="failed" name="Failed" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {analyticsData.performance.map((metric, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">{metric.name}</div>
                      <div className="text-2xl font-bold mt-1">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Automation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this automation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <div className="rounded-md bg-destructive/10 p-4 text-destructive">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Warning</h4>
                  <p className="text-sm">
                    Deleting this automation will remove all associated logs and analytics data.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAutomation}>Delete Automation</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Log Details Dialog */}
      {selectedLog && (
        <AlertDialog open={isLogDetailsOpen} onOpenChange={setIsLogDetailsOpen}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Execution Log Details</AlertDialogTitle>
              <AlertDialogDescription>
                Detailed information about this automation execution
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Execution ID</h4>
                  <p className="text-sm">{selectedLog.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Timestamp</h4>
                  <p className="text-sm">{formatDate(selectedLog.timestamp)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Status</h4>
                  <div className="flex items-center gap-2">
                    {selectedLog.status === "success" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm capitalize">{selectedLog.status}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Duration</h4>
                  <p className="text-sm">{selectedLog.duration}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Trigger</h4>
                <p className="text-sm">{selectedLog.trigger}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Trigger Data</h4>
                <pre className="bg-muted p-4 rounded-md overflow-auto text-xs font-mono">
                  {JSON.stringify(selectedLog.triggerData, null, 2)}
                </pre>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Actions</h4>
                <div className="space-y-2">
                  {selectedLog.actions.map((action: any, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-2 rounded-md bg-muted">
                      <div>
                        {action.status === "success" ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize">{action.type}</p>
                        <p className="text-xs text-muted-foreground">
                          Recipient: {action.recipient}
                          {action.error && (
                            <>
                              <br />
                              Error: {action.error}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
