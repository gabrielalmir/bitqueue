"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { Activity, Brain, Calendar, Copy, Database, Edit, ExternalLink, FileSpreadsheet, Globe, Mail, MessageSquare, MoreHorizontal, Pause, Play, Plus, Search, Slack, Sparkles, Trash2, Wand2 } from 'lucide-react'
import Link from "next/link"
import React, { useState } from "react"

const automations = [
  {
    id: "auto_1",
    name: "Order Notification",
    description: "Sends notifications when a new order is received",
    trigger: "http",
    actions: ["email", "whatsapp"],
    status: "active",
    createdAt: "2023-07-15T10:30:00Z",
    lastRun: "2023-08-14T15:45:00Z",
    runs: 342,
    usesAI: true,
  },
  {
    id: "auto_2",
    name: "Inventory Update",
    description: "Updates inventory spreadsheet when products are sold",
    trigger: "queue",
    actions: ["excel"],
    status: "active",
    createdAt: "2023-06-22T14:15:00Z",
    lastRun: "2023-08-14T16:20:00Z",
    runs: 128,
    usesAI: false,
  },
  {
    id: "auto_3",
    name: "Daily Report",
    description: "Sends daily sales report to the team",
    trigger: "schedule",
    actions: ["email", "slack"],
    status: "paused",
    createdAt: "2023-05-10T09:45:00Z",
    lastRun: "2023-08-10T18:00:00Z",
    runs: 92,
    usesAI: true,
  },
  {
    id: "auto_4",
    name: "Low Stock Alert",
    description: "Notifies when inventory is below minimum",
    trigger: "queue",
    actions: ["slack", "whatsapp"],
    status: "active",
    createdAt: "2023-08-01T11:20:00Z",
    lastRun: "2023-08-14T10:15:00Z",
    runs: 17,
    usesAI: false,
  },
]

const automationRuns = [
  {
    id: "run_1",
    automationId: "auto_1",
    automationName: "Order Notification",
    status: "success",
    startedAt: "2023-08-14T15:45:00Z",
    duration: "1.2s",
    trigger: "HTTP POST /webhook/orders",
    actions: ["Email sent to customer@example.com", "WhatsApp sent to +1234567890"],
  },
  {
    id: "run_2",
    automationId: "auto_1",
    automationName: "Order Notification",
    status: "success",
    startedAt: "2023-08-14T14:30:00Z",
    duration: "1.5s",
    trigger: "HTTP POST /webhook/orders",
    actions: ["Email sent to another@example.com", "WhatsApp sent to +0987654321"],
  },
  {
    id: "run_3",
    automationId: "auto_2",
    automationName: "Inventory Update",
    status: "success",
    startedAt: "2023-08-14T16:20:00Z",
    duration: "2.3s",
    trigger: "Message in queue 'inventory-updates'",
    actions: ["Updated spreadsheet 'Inventory-2023.xlsx'"],
  },
  {
    id: "run_4",
    automationId: "auto_4",
    automationName: "Low Stock Alert",
    status: "error",
    startedAt: "2023-08-14T10:15:00Z",
    duration: "0.8s",
    trigger: "Message in queue 'inventory-alerts'",
    actions: ["Error sending message to Slack: Invalid token"],
    error: "Authentication failure with Slack API",
  },
]

// Trigger types
const triggerTypes = [
  {
    id: "http",
    name: "Receive data via HTTP",
    description: "Creates an HTTP endpoint that can be called by external systems",
    icon: Globe,
  },
  {
    id: "queue",
    name: "Message in queue",
    description: "Executes when a message is received in a specific queue",
    icon: Database,
  },
  {
    id: "schedule",
    name: "Schedule",
    description: "Executes at scheduled times (daily, weekly, etc.)",
    icon: Calendar,
  },
]

// Action types
const actionTypes = [
  {
    id: "email",
    name: "Send Email",
    description: "Sends an email to specific recipients",
    icon: Mail,
  },
  {
    id: "whatsapp",
    name: "Send WhatsApp",
    description: "Sends a WhatsApp message via Twilio API",
    icon: MessageSquare,
  },
  {
    id: "excel",
    name: "Update Excel/Spreadsheet",
    description: "Updates a spreadsheet in Google Sheets or Excel Online",
    icon: FileSpreadsheet,
  },
  {
    id: "slack",
    name: "Send Slack message",
    description: "Sends a message to a Slack channel",
    icon: Slack,
  },
  {
    id: "gdrive",
    name: "Create/Edit Google Drive file",
    description: "Creates or edits files in Google Drive",
    icon: FileSpreadsheet,
  },
]

export default function AutomationsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreatingAutomation, setIsCreatingAutomation] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    description: "",
    trigger: "",
    actions: [] as string[],
    useAI: false,
    aiKey: "",
    aiPrompt: "",
  })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MM/dd/yyyy HH:mm")
  }

  // Filter automations
  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || automation.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Get trigger icon
  const getTriggerIcon = (triggerId: string) => {
    const trigger = triggerTypes.find(t => t.id === triggerId)
    if (!trigger) return Globe
    return trigger.icon
  }

  // Get action icon
  const getActionIcon = (actionId: string) => {
    const action = actionTypes.find(a => a.id === actionId)
    if (!action) return Mail
    return action.icon
  }

  // Handle toggle automation status
  const handleToggleStatus = (automationId: string, currentStatus: string) => {
    const automation = automations.find(a => a.id === automationId)
    if (!automation) return

    const newStatus = currentStatus === "active" ? "paused" : "active"
    const action = currentStatus === "active" ? "paused" : "activated"

    toast({
      title: `Automation ${action}`,
      description: `The automation "${automation.name}" has been ${action}.`,
    })
  }

  // Handle delete automation
  const handleDeleteAutomation = (automationId: string) => {
    const automation = automations.find(a => a.id === automationId)
    if (!automation) return

    toast({
      title: "Automation deleted",
      description: `The automation "${automation.name}" has been deleted.`,
      variant: "destructive",
    })
  }

  // Handle duplicate automation
  const handleDuplicateAutomation = (automationId: string) => {
    const automation = automations.find(a => a.id === automationId)
    if (!automation) return

    toast({
      title: "Automation duplicated",
      description: `A copy of "${automation.name}" has been created.`,
    })
  }

  // Handle create automation
  const handleCreateAutomation = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      return
    }

    toast({
      title: "Automation created",
      description: `The automation "${newAutomation.name}" has been created successfully.`,
    })

    // Reset form and close modal
    setNewAutomation({
      name: "",
      description: "",
      trigger: "",
      actions: [],
      useAI: false,
      aiKey: "",
      aiPrompt: "",
    })
    setCurrentStep(1)
    setIsCreatingAutomation(false)
  }

  // Handle select trigger
  const handleSelectTrigger = (triggerId: string) => {
    setNewAutomation({
      ...newAutomation,
      trigger: triggerId,
    })
  }

  // Handle select action
  const handleSelectAction = (actionId: string) => {
    const actions = newAutomation.actions.includes(actionId)
      ? newAutomation.actions.filter(a => a !== actionId)
      : [...newAutomation.actions, actionId]

    setNewAutomation({
      ...newAutomation,
      actions,
    })
  }

  // Handle toggle AI
  const handleToggleAI = (enabled: boolean) => {
    setNewAutomation({
      ...newAutomation,
      useAI: enabled,
    })
  }

  // Render create automation wizard
  const renderCreateAutomationWizard = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>New Automation</CardTitle>
            <CardDescription>
              Create an automation in a few simple steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step indicator */}
            <div className="mb-6">
              <div className="flex justify-between">
                <div className="text-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    currentStep >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted"
                  }`}>
                    1
                  </div>
                  <div className="mt-1 text-xs">Information</div>
                </div>
                <div className="relative flex-1 mx-4 mt-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`h-0.5 w-full ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    currentStep >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted"
                  }`}>
                    2
                  </div>
                  <div className="mt-1 text-xs">Trigger</div>
                </div>
                <div className="relative flex-1 mx-4 mt-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`h-0.5 w-full ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    currentStep >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted"
                  }`}>
                    3
                  </div>
                  <div className="mt-1 text-xs">Actions</div>
                </div>
                <div className="relative flex-1 mx-4 mt-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`h-0.5 w-full ${currentStep >= 4 ? "bg-primary" : "bg-muted"}`}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    currentStep >= 4 ? "border-primary bg-primary text-primary-foreground" : "border-muted"
                  }`}>
                    4
                  </div>
                  <div className="mt-1 text-xs">AI (Optional)</div>
                </div>
              </div>
            </div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="automation-name" className="text-sm font-medium">
                    Automation Name
                  </label>
                  <Input
                    id="automation-name"
                    placeholder="E.g., Order Notification"
                    value={newAutomation.name}
                    onChange={(e) => setNewAutomation({ ...newAutomation, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="automation-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input
                    id="automation-description"
                    placeholder="E.g., Sends notifications when a new order is received"
                    value={newAutomation.description}
                    onChange={(e) => setNewAutomation({ ...newAutomation, description: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Select Trigger */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select a Trigger</h3>
                <p className="text-sm text-muted-foreground">
                  The trigger determines when your automation will run
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {triggerTypes.map(trigger => (
                    <div
                      key={trigger.id}
                      className={`flex flex-col rounded-lg border p-4 cursor-pointer transition-colors ${
                        newAutomation.trigger === trigger.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => handleSelectTrigger(trigger.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <trigger.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{trigger.name}</h4>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {trigger.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Select Actions */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Actions</h3>
                <p className="text-sm text-muted-foreground">
                  Actions determine what will happen when the trigger is activated
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {actionTypes.map(action => (
                    <div
                      key={action.id}
                      className={`flex flex-col rounded-lg border p-4 cursor-pointer transition-colors ${
                        newAutomation.actions.includes(action.id)
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => handleSelectAction(action.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <action.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{action.name}</h4>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: AI Configuration (Optional) */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Artificial Intelligence</h3>
                    <p className="text-sm text-muted-foreground">
                      Use AI to enhance your automations (optional)
                    </p>
                  </div>
                  <Switch
                    checked={newAutomation.useAI}
                    onCheckedChange={handleToggleAI}
                  />
                </div>

                {newAutomation.useAI && (
                  <div className="rounded-lg border p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Brain className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">AI Configuration</h4>
                        <p className="text-sm text-muted-foreground">
                          AI can generate personalized content for your messages, analyze data, and more
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="ai-key" className="text-sm font-medium">
                        ChatGPT API Key
                      </label>
                      <Input
                        id="ai-key"
                        type="password"
                        placeholder="sk-..."
                        value={newAutomation.aiKey}
                        onChange={(e) => setNewAutomation({ ...newAutomation, aiKey: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Your key is stored securely and never shared
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="ai-prompt" className="text-sm font-medium">
                        AI Instruction
                      </label>
                      <Input
                        id="ai-prompt"
                        placeholder="E.g., Create a personalized welcome message"
                        value={newAutomation.aiPrompt}
                        onChange={(e) => setNewAutomation({ ...newAutomation, aiPrompt: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Describe what you want the AI to do with the received data
                      </p>
                    </div>

                    <div className="rounded-md bg-muted p-3">
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 mt-0.5 text-primary" />
                        <div className="text-sm">
                          <span className="font-medium">Example:</span> "Create a personalized welcome message for the customer, mentioning their order number and purchased products."
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1)
                } else {
                  setIsCreatingAutomation(false)
                }
              }}
            >
              {currentStep > 1 ? "Back" : "Cancel"}
            </Button>
            <Button
              onClick={handleCreateAutomation}
              disabled={
                (currentStep === 1 && !newAutomation.name) ||
                (currentStep === 2 && !newAutomation.trigger) ||
                (currentStep === 3 && newAutomation.actions.length === 0) ||
                (currentStep === 4 && newAutomation.useAI && (!newAutomation.aiKey || !newAutomation.aiPrompt))
              }
            >
              {currentStep < 4 ? "Next" : "Create Automation"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Automations</h1>
        <Button onClick={() => setIsCreatingAutomation(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Automation
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">
          Create automations to connect your systems and simplify your processes
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search automations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="automations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="runs">Execution History</TabsTrigger>
        </TabsList>

        {/* Automations Tab */}
        <TabsContent value="automations">
          <Card>
            <CardHeader>
              <CardTitle>Your Automations</CardTitle>
              <CardDescription>
                Manage your existing automations or create new ones
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredAutomations.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Trigger</TableHead>
                        <TableHead>Actions</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Runs</TableHead>
                        <TableHead>Last Run</TableHead>
                        <TableHead className="text-right">Options</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAutomations.map(automation => (
                        <TableRow key={automation.id}>
                          <TableCell>
                            <div className="font-medium">{automation.name}</div>
                            <div className="text-xs text-muted-foreground">{automation.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {React.createElement(getTriggerIcon(automation.trigger), { className: "h-4 w-4" })}
                              <span className="capitalize">{automation.trigger}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {automation.actions.map(action => (
                                <Badge key={action} variant="outline" className="flex items-center gap-1">
                                  {React.createElement(getActionIcon(action), { className: "h-3 w-3" })}
                                  <span className="capitalize">{action}</span>
                                </Badge>
                              ))}
                              {automation.usesAI && (
                                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 flex items-center gap-1">
                                  <Wand2 className="h-3 w-3" />
                                  <span>AI</span>
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={automation.status === "active" ? "default" : "secondary"}>
                              {automation.status === "active" ? "Active" : "Paused"}
                            </Badge>
                          </TableCell>
                          <TableCell>{automation.runs}</TableCell>
                          <TableCell>{formatDate(automation.lastRun)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => {
                                  window.location.href = `/dashboard/automations/${automation.id}/edit`
                                }}>
                                  <Edit className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDuplicateAutomation(automation.id)}>
                                  <Copy className="mr-2 h-4 w-4" />
                                  <span>Duplicate</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(automation.id, automation.status)}>
                                  {automation.status === "active" ? (
                                    <>
                                      <Pause className="mr-2 h-4 w-4" />
                                      <span>Pause</span>
                                    </>
                                  ) : (
                                    <>
                                      <Play className="mr-2 h-4 w-4" />
                                      <span>Activate</span>
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteAutomation(automation.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Activity className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No automations found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You haven't created any automations yet or your search returned no results.
                  </p>
                  <Button className="mt-4" onClick={() => setIsCreatingAutomation(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Create Automation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Runs Tab */}
        <TabsContent value="runs">
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
              <CardDescription>
                View the execution history of your automations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Automation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Started at</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Trigger</TableHead>
                      <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {automationRuns.map(run => (
                      <TableRow key={run.id}>
                        <TableCell>
                          <div className="font-medium">{run.automationName}</div>
                          <div className="text-xs text-muted-foreground">{run.id}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={run.status === "success" ? "default" : "destructive"}>
                            {run.status === "success" ? "Success" : "Error"}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(run.startedAt)}</TableCell>
                        <TableCell>{run.duration}</TableCell>
                        <TableCell>
                          <div className="text-sm truncate max-w-[200px]">{run.trigger}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                            <Link href={`/dashboard/automations/${run.automationId}`}><span className="sr-only">View details</span></Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Automation Wizard */}
      {isCreatingAutomation && renderCreateAutomationWizard()}
    </div>
  )
}
