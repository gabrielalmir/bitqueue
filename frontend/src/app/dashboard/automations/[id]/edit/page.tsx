"use client"

import type React from "react"

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
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
    ArrowLeft,
    Brain,
    Calendar,
    Database,
    FileSpreadsheet,
    Globe,
    Info,
    Mail,
    MessageSquare,
    Slack,
    Sparkles,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Mock data for the automation
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
    },
  },
  actions: [
    {
      type: "email",
      config: {
        to: "{{order.customerEmail}}",
        subject: "Your order #{{order.id}} has been received",
        body: "Thank you for your order! We'll process it shortly.",
        spreadsheetId: undefined,
        sheetName: undefined,
        range: undefined,
        channel: undefined,
      },
    },
    {
      type: "whatsapp",
      config: {
        to: "{{order.customerPhone}}",
        message: "Thank you for your order #{{order.id}}! We'll process it shortly.",
        spreadsheetId: undefined,
        sheetName: undefined,
        range: undefined,
        channel: undefined,
      },
    },
  ],
  ai: {
    enabled: true,
    provider: "openai",
    model: "gpt-4",
    prompt:
      "Create a personalized thank you message for the customer, mentioning their order number and purchased products.",
  },
  status: "active",
  createdAt: "2023-07-15T10:30:00Z",
  updatedAt: "2023-08-10T14:20:00Z",
}

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
]

// AI providers
const aiProviders = [
  { id: "openai", name: "OpenAI" },
  { id: "anthropic", name: "Anthropic" },
  { id: "cohere", name: "Cohere" },
]

// AI models
const aiModels = {
  openai: [
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  ],
  anthropic: [
    { id: "claude-3-opus", name: "Claude 3 Opus" },
    { id: "claude-3-sonnet", name: "Claude 3 Sonnet" },
    { id: "claude-3-haiku", name: "Claude 3 Haiku" },
  ],
  cohere: [
    { id: "command", name: "Command" },
    { id: "command-light", name: "Command Light" },
  ],
}

export default function EditAutomationPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const automationId = params.id as string
  const [isUnsavedChangesDialogOpen, setIsUnsavedChangesDialogOpen] = useState(false)
  const [destinationPath, setDestinationPath] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  // Form state
  interface ActionConfig {
    spreadsheetId: string | number | readonly string[] | undefined
    sheetName: string | number | readonly string[] | undefined
    range: string | number | readonly string[] | undefined
    channel: string | number | readonly string[] | undefined
    to: string;
    subject?: string;
    body?: string;
    message?: string;
  }

  interface Action {
    type: string;
    config: ActionConfig;
  }

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    trigger: {
      type: string;
      config: {
        endpoint?: string;
        method?: string;
        authType?: string;
        queueName?: string;
        messageFilter?: string;
        frequency?: string;
        time?: string;
        days?: string[];
      };
    };
    actions: Action[];
    ai: {
      enabled: boolean;
      provider: string;
      model: string;
      prompt: string;
    };
    status: string;
  }>({
    name: automationData.name,
    description: automationData.description,
    trigger: {
      type: automationData.trigger.type,
      config: { ...automationData.trigger.config },
    },
    actions: [...automationData.actions],
    ai: {
      enabled: automationData.ai.enabled,
      provider: automationData.ai.provider,
      model: automationData.ai.model,
      prompt: automationData.ai.prompt,
    },
    status: automationData.status,
  })

  // Track changes
  useEffect(() => {
    setHasChanges(true)
  }, [formData])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle trigger type change
  const handleTriggerTypeChange = (type: string) => {
    let config = {}

    // Set default config based on trigger type
    if (type === "http") {
      config = { endpoint: "/webhook/custom", method: "POST", authType: "api_key" }
    } else if (type === "queue") {
      config = { queueName: "", messageFilter: "" }
    } else if (type === "schedule") {
      config = { frequency: "daily", time: "09:00", days: [] }
    }

    setFormData((prev) => ({
      ...prev,
      trigger: {
        type,
        config: {
          ...prev.trigger.config,
          ...config,
        },
      },
    }))
  }

  // Handle trigger config change
  const handleTriggerConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      trigger: {
        ...prev.trigger,
        config: {
          ...prev.trigger.config,
          [name]: value,
        },
      },
    }))
  }

  // Handle add action
  const handleAddAction = (type: string) => {
    let config = {}

    // Set default config based on action type
    if (type === "email") {
      config = { to: "", subject: "", body: "" }
    } else if (type === "whatsapp") {
      config = { to: "", message: "" }
    } else if (type === "excel") {
      config = { spreadsheetId: "", sheetName: "", range: "" }
    } else if (type === "slack") {
      config = { channel: "", message: "" }
    }

    setFormData((prev) => ({
      ...prev,
      actions: [...prev.actions, { type, config: config as ActionConfig }],
    }))
  }

  // Handle remove action
  const handleRemoveAction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index),
    }))
  }

  // Handle action config change
  const handleActionConfigChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updatedActions = [...prev.actions]
      updatedActions[index] = {
        ...updatedActions[index],
        config: {
          ...updatedActions[index].config,
          [name]: value,
        },
      }
      return { ...prev, actions: updatedActions }
    })
  }

  // Handle AI toggle
  const handleAIToggle = (enabled: boolean) => {
    setFormData((prev) => ({
      ...prev,
      ai: {
        ...prev.ai,
        enabled,
      },
    }))
  }

  // Handle AI provider change
  const handleAIProviderChange = (provider: string) => {
    // Set default model for the selected provider
    const defaultModel = aiModels[provider as keyof typeof aiModels][0].id

    setFormData((prev) => ({
      ...prev,
      ai: {
        ...prev.ai,
        provider,
        model: defaultModel,
      },
    }))
  }

  // Handle AI model change
  const handleAIModelChange = (model: string) => {
    setFormData((prev) => ({
      ...prev,
      ai: {
        ...prev.ai,
        model,
      },
    }))
  }

  // Handle AI prompt change
  const handleAIPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      ai: {
        ...prev.ai,
        prompt: e.target.value,
      },
    }))
  }

  // Handle status toggle
  const handleStatusToggle = (status: boolean) => {
    setFormData((prev) => ({
      ...prev,
      status: status ? "active" : "paused",
    }))
  }

  // Handle save
  const handleSave = () => {
    // Validate form
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Automation name is required",
        variant: "destructive",
      })
      return
    }

    if (formData.actions.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one action is required",
        variant: "destructive",
      })
      return
    }

    // Validate trigger config
    if (formData.trigger.type === "http" && !formData.trigger.config.endpoint) {
      toast({
        title: "Validation Error",
        description: "HTTP endpoint is required",
        variant: "destructive",
      })
      return
    }

    // Validate AI config
    if (formData.ai.enabled && !formData.ai.prompt) {
      toast({
        title: "Validation Error",
        description: "AI prompt is required when AI is enabled",
        variant: "destructive",
      })
      return
    }

    // Save automation (in a real app, this would be an API call)
    toast({
      title: "Automation updated",
      description: "Your automation has been updated successfully",
    })

    setHasChanges(false)
    router.push(`/dashboard/automations/${automationId}`)
  }

  // Handle cancel
  const handleCancel = (path: string) => {
    if (hasChanges) {
      setDestinationPath(path)
      setIsUnsavedChangesDialogOpen(true)
    } else {
      router.push(path)
    }
  }

  // Handle discard changes
  const handleDiscardChanges = () => {
    setIsUnsavedChangesDialogOpen(false)
    router.push(destinationPath)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => handleCancel(`/dashboard/automations/${automationId}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Automation</h1>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="trigger">Trigger</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="ai">AI Integration</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Configure the basic details of your automation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Automation Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="E.g., Order Notification"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what this automation does"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="status" checked={formData.status === "active"} onCheckedChange={handleStatusToggle} />
                <Label htmlFor="status">Automation is active</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleCancel(`/dashboard/automations/${automationId}`)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Trigger Tab */}
        <TabsContent value="trigger">
          <Card>
            <CardHeader>
              <CardTitle>Trigger Configuration</CardTitle>
              <CardDescription>Define when this automation should run</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Trigger Type</Label>
                <div className="grid gap-4 sm:grid-cols-3">
                  {triggerTypes.map((trigger) => (
                    <div
                      key={trigger.id}
                      className={`flex flex-col rounded-lg border p-4 cursor-pointer transition-colors ${
                        formData.trigger.type === trigger.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => handleTriggerTypeChange(trigger.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <trigger.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{trigger.name}</h4>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{trigger.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* HTTP Trigger Config */}
              {formData.trigger.type === "http" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">HTTP Webhook Configuration</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="endpoint">Endpoint Path</Label>
                      <div className="flex items-center">
                        <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 text-muted-foreground">
                          /api/webhooks/
                        </span>
                        <Input
                          id="endpoint"
                          name="endpoint"
                          value={(formData.trigger.config.endpoint as string).replace("/webhook/", "")}
                          onChange={handleTriggerConfigChange}
                          className="rounded-l-none"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This will be the URL path where external systems can send data
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="method">HTTP Method</Label>
                      <Select
                        value={formData.trigger.config.method as string}
                        onValueChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            trigger: {
                              ...prev.trigger,
                              config: {
                                ...prev.trigger.config,
                                method: value,
                              },
                            },
                          }))
                        }}
                      >
                        <SelectTrigger id="method">
                          <SelectValue placeholder="Select HTTP method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="authType">Authentication Type</Label>
                    <Select
                      value={formData.trigger.config.authType as string}
                      onValueChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          trigger: {
                            ...prev.trigger,
                            config: {
                              ...prev.trigger.config,
                              authType: value,
                            },
                          },
                        }))
                      }}
                    >
                      <SelectTrigger id="authType">
                        <SelectValue placeholder="Select authentication type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="api_key">API Key</SelectItem>
                        <SelectItem value="basic_auth">Basic Auth</SelectItem>
                        <SelectItem value="none">No Authentication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Queue Trigger Config */}
              {formData.trigger.type === "queue" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Queue Configuration</h3>
                  <div className="space-y-2">
                    <Label htmlFor="queueName">Queue Name</Label>
                    <Select
                      value={formData.trigger.config.queueName as string}
                      onValueChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          trigger: {
                            ...prev.trigger,
                            config: {
                              ...prev.trigger.config,
                              queueName: value,
                            },
                          },
                        }))
                      }}
                    >
                      <SelectTrigger id="queueName">
                        <SelectValue placeholder="Select a queue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order-processing">order-processing</SelectItem>
                        <SelectItem value="email-notifications">email-notifications</SelectItem>
                        <SelectItem value="payment-webhooks">payment-webhooks</SelectItem>
                        <SelectItem value="analytics-events">analytics-events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="messageFilter">Message Filter (Optional)</Label>
                    <Input
                      id="messageFilter"
                      name="messageFilter"
                      value={formData.trigger.config.messageFilter as string}
                      onChange={handleTriggerConfigChange}
                      placeholder="E.g., $.type == 'order.created'"
                    />
                    <p className="text-xs text-muted-foreground">
                      JSONPath expression to filter messages. Leave empty to process all messages.
                    </p>
                  </div>
                </div>
              )}

              {/* Schedule Trigger Config */}
              {formData.trigger.type === "schedule" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Schedule Configuration</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select
                        value={formData.trigger.config.frequency as string}
                        onValueChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            trigger: {
                              ...prev.trigger,
                              config: {
                                ...prev.trigger.config,
                                frequency: value,
                              },
                            },
                          }))
                        }}
                      >
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.trigger.config.time as string}
                        onChange={handleTriggerConfigChange}
                      />
                    </div>
                  </div>
                  {formData.trigger.config.frequency === "weekly" && (
                    <div className="space-y-2">
                      <Label>Days of Week</Label>
                      <div className="flex flex-wrap gap-2">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                          <Button
                            key={day}
                            type="button"
                            variant={(formData.trigger.config.days as string[])?.includes(day) ? "default" : "outline"}
                            className="rounded-full"
                            onClick={() => {
                              const days = [...((formData.trigger.config.days as string[]) || [])]
                              if (days.includes(day)) {
                                const index = days.indexOf(day)
                                days.splice(index, 1)
                              } else {
                                days.push(day)
                              }
                              setFormData((prev) => ({
                                ...prev,
                                trigger: {
                                  ...prev.trigger,
                                  config: {
                                    ...prev.trigger.config,
                                    days,
                                  },
                                },
                              }))
                            }}
                          >
                            {day.substring(0, 3)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleCancel(`/dashboard/automations/${automationId}`)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Actions Tab */}
        <TabsContent value="actions">
          <Card>
            <CardHeader>
              <CardTitle>Action Configuration</CardTitle>
              <CardDescription>Define what happens when the automation is triggered</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Current Actions</Label>
                  <Select onValueChange={handleAddAction}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Add action" />
                    </SelectTrigger>
                    <SelectContent>
                      {actionTypes.map((action) => (
                        <SelectItem key={action.id} value={action.id}>
                          {action.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.actions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
                    <p className="text-muted-foreground">No actions configured yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Add an action using the dropdown above</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {formData.actions.map((action, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              {action.type === "email" && <Mail className="h-4 w-4" />}
                              {action.type === "whatsapp" && <MessageSquare className="h-4 w-4" />}
                              {action.type === "excel" && <FileSpreadsheet className="h-4 w-4" />}
                              {action.type === "slack" && <Slack className="h-4 w-4" />}
                            </div>
                            <h4 className="font-medium capitalize">
                              {action.type === "email"
                                ? "Send Email"
                                : action.type === "whatsapp"
                                  ? "Send WhatsApp Message"
                                  : action.type === "excel"
                                    ? "Update Spreadsheet"
                                    : action.type === "slack"
                                      ? "Send Slack Message"
                                      : action.type}
                            </h4>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAction(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            Remove
                          </Button>
                        </div>

                        {/* Email Action Config */}
                        {action.type === "email" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor={`email-to-${index}`}>To</Label>
                              <Input
                                id={`email-to-${index}`}
                                name="to"
                                value={action.config.to}
                                onChange={(e) => handleActionConfigChange(index, e)}
                                placeholder="recipient@example.com or {{data.email}}"
                              />
                              <p className="text-xs text-muted-foreground">
                                Use {"{{ variable }}"} syntax to insert dynamic data
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`email-subject-${index}`}>Subject</Label>
                              <Input
                                id={`email-subject-${index}`}
                                name="subject"
                                value={action.config.subject}
                                onChange={(e) => handleActionConfigChange(index, e)}
                                placeholder="Email subject"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`email-body-${index}`}>Body</Label>
                              <Textarea
                                id={`email-body-${index}`}
                                name="body"
                                value={action.config.body}
                                onChange={(e) => handleActionConfigChange(index, e)}
                                placeholder="Email body content"
                                rows={4}
                              />
                            </div>
                          </div>
                        )}

                        {/* WhatsApp Action Config */}
                        {action.type === "whatsapp" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor={`whatsapp-to-${index}`}>To</Label>
                              <Input
                                id={`whatsapp-to-${index}`}
                                name="to"
                                value={action.config.to}
                                onChange={(e) => handleActionConfigChange(index, e)}
                                placeholder="+1234567890 or {{data.phone}}"
                              />
                              <p className="text-xs text-muted-foreground">
                                Use {"{{ variable }}"} syntax to insert dynamic data
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`whatsapp-message-${index}`}>Message</Label>
                              <Textarea
                                id={`whatsapp-message-${index}`}
                                name="message"
                                value={action.config.message}
                                onChange={(e) => handleActionConfigChange(index, e)}
                                placeholder="WhatsApp message content"
                                rows={4}
                              />
                            </div>
                          </div>
                        )}

                        {/* Excel Action Config */}
                        {action.type === "excel" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor={`excel-spreadsheetId-${index}`}>Spreadsheet ID</Label>
                              <Input
                                id={`excel-spreadsheetId-${index}`}
                                name="spreadsheetId"
                                value={action.config.spreadsheetId}
                                onChange={(e) => handleActionConfigChange(index, e)}
                                placeholder="Google Sheets ID or Excel Online ID"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`excel-sheetName-${index}`}>Sheet Name</Label>
                              <Input
                                id={`excel-sheetName-${index}`}
                                name="sheetName"
                                value={action.config.sheetName}
                                onChange={(e) => handleActionConfigChange(index, e)}
                                placeholder="Sheet1"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`excel-range-${index}`}>Range</Label>
                              <Input
                                id={`excel-range-${index}`}
                                name="range"
                                value={action.config.range}
                                onChange={(e) => handleActionConfigChange(index, e)}
                                placeholder="A1:D1"
                              />
                            </div>
                          </div>
                        )}

                        {/* Slack Action Config */}
                        {action.type === "slack" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor={`slack-channel-${index}`}>Channel</Label>
                              <Input
                                id={`slack-channel-${index}`}
                                name="channel"
                                value={action.config.channel}
                                onChange={(e) => handleActionConfigChange(index, e)}
                                placeholder="#general or @username"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`slack-message-${index}`}>Message</Label>
                              <Textarea
                                id={`slack-message-${index}`}
                                name="message"
                                value={action.config.message}
                                onChange={(e) => handleActionConfigChange(index, e)}
                                placeholder="Slack message content"
                                rows={4}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleCancel(`/dashboard/automations/${automationId}`)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* AI Integration Tab */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Integration</CardTitle>
              <CardDescription>Configure AI to enhance your automation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-enabled">Enable AI</Label>
                  <p className="text-sm text-muted-foreground">
                    Use AI to generate personalized content for your messages
                  </p>
                </div>
                <Switch id="ai-enabled" checked={formData.ai.enabled} onCheckedChange={handleAIToggle} />
              </div>

              {formData.ai.enabled && (
                <div className="rounded-lg border p-4 space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      <Brain className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI Configuration</h4>
                      <p className="text-sm text-muted-foreground">
                        AI can generate personalized content for your messages, analyze data, and more
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ai-provider">AI Provider</Label>
                      <Select value={formData.ai.provider} onValueChange={handleAIProviderChange}>
                        <SelectTrigger id="ai-provider">
                          <SelectValue placeholder="Select AI provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {aiProviders.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ai-model">AI Model</Label>
                      <Select value={formData.ai.model} onValueChange={handleAIModelChange}>
                        <SelectTrigger id="ai-model">
                          <SelectValue placeholder="Select AI model" />
                        </SelectTrigger>
                        <SelectContent>
                          {aiModels[formData.ai.provider as keyof typeof aiModels]?.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ai-prompt">AI Instruction</Label>
                    <Textarea
                      id="ai-prompt"
                      value={formData.ai.prompt}
                      onChange={handleAIPromptChange}
                      placeholder="E.g., Create a personalized welcome message"
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Describe what you want the AI to do with the received data
                    </p>
                  </div>

                  <div className="rounded-md bg-muted p-3">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 mt-0.5 text-primary" />
                      <div className="text-sm">
                        <span className="font-medium">Example:</span> "Create a personalized welcome message for the
                        customer, mentioning their order number and purchased products."
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-muted p-3">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 text-primary" />
                      <div className="text-sm">
                        <span className="font-medium">Available variables:</span> You can reference trigger data using
                        variable names like{" "}
                        <code className="bg-background px-1 py-0.5 rounded text-xs">{"{{order.id}}"}</code>,{" "}
                        <code className="bg-background px-1 py-0.5 rounded text-xs">{"{{customer.name}}"}</code>, etc.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleCancel(`/dashboard/automations/${automationId}`)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={isUnsavedChangesDialogOpen} onOpenChange={setIsUnsavedChangesDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay on Page</AlertDialogCancel>
            <AlertDialogAction onClick={handleDiscardChanges}>Discard Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
