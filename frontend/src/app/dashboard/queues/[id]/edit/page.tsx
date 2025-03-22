"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Info } from 'lucide-react'
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

// Mock queue data
const queueData = {
  id: "q_1",
  name: "order-processing",
  description: "Processes incoming orders from the e-commerce platform",
  type: "standard",
  region: "us-east-1",
  visibilityTimeout: 30,
  messageRetention: 7,
  deliveryDelay: 0,
  maxMessageSize: 256,
  receiveMessageWaitTime: 0,
  dlqEnabled: true,
  dlqMaxReceives: 3,
  encryption: "server-side",
  accessPolicy: "private",
  tags: [
    { key: "environment", value: "production" },
    { key: "department", value: "ecommerce" }
  ]
}

export default function EditQueuePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const queueId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: queueData.name,
    description: queueData.description,
    visibilityTimeout: queueData.visibilityTimeout,
    messageRetention: queueData.messageRetention,
    deliveryDelay: queueData.deliveryDelay,
    maxMessageSize: queueData.maxMessageSize,
    receiveMessageWaitTime: queueData.receiveMessageWaitTime,
    dlqEnabled: queueData.dlqEnabled,
    dlqMaxReceives: queueData.dlqMaxReceives,
    encryption: queueData.encryption,
    accessPolicy: queueData.accessPolicy,
    tags: queueData.tags
  })

  const [newTagKey, setNewTagKey] = useState("")
  const [newTagValue, setNewTagValue] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }))
  }

  const addTag = () => {
    if (newTagKey.trim() && newTagValue.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, { key: newTagKey, value: newTagValue }]
      }))
      setNewTagKey("")
      setNewTagValue("")
    }
  }

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Queue updated",
        description: "Your queue settings have been updated successfully.",
      })

      router.push(`/dashboard/queues/${queueId}`)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update queue settings. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/queues/${queueId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Queue</h1>
      </div>

      <p className="text-muted-foreground">
        Configure settings for <span className="font-medium">{queueData.name}</span>
      </p>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Basic configuration for your queue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Queue Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., order-processing"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Use lowercase letters, numbers, and hyphens only. No spaces.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the purpose of this queue"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="visibilityTimeout">Visibility Timeout (seconds)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80">
                              The period of time during which a message is invisible to other consumers after being received.
                              If the message is not deleted before the visibility timeout expires, it becomes visible again.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="visibilityTimeout"
                      name="visibilityTimeout"
                      type="number"
                      value={formData.visibilityTimeout}
                      onChange={handleNumberChange}
                      min={1}
                      max={43200}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="messageRetention">Message Retention (days)</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-80">
                              The number of days that messages will be kept in the queue before being automatically deleted.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      id="messageRetention"
                      name="messageRetention"
                      type="number"
                      value={formData.messageRetention}
                      onChange={handleNumberChange}
                      min={1}
                      max={14}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="deliveryDelay">Delivery Delay (seconds)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">
                            The time in seconds that the delivery of all messages in the queue will be delayed.
                            Set to 0 for immediate delivery.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="deliveryDelay"
                    name="deliveryDelay"
                    type="number"
                    value={formData.deliveryDelay}
                    onChange={handleNumberChange}
                    min={0}
                    max={900}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Configure advanced queue behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="maxMessageSize">Maximum Message Size (KB)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">
                            The maximum size of a message that can be sent to this queue, in kilobytes.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="pt-4 pb-2">
                    <Slider
                      defaultValue={[formData.maxMessageSize]}
                      max={1024}
                      min={1}
                      step={1}
                      onValueChange={(value) => handleSliderChange("maxMessageSize", value)}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 KB</span>
                    <span>{formData.maxMessageSize} KB</span>
                    <span>1024 KB</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="receiveMessageWaitTime">Receive Message Wait Time (seconds)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-80">
                            The duration (in seconds) for which the receive call will wait for a message to arrive
                            before returning. Set to 0 for short polling.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="receiveMessageWaitTime"
                    name="receiveMessageWaitTime"
                    type="number"
                    value={formData.receiveMessageWaitTime}
                    onChange={handleNumberChange}
                    min={0}
                    max={20}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="dlqEnabled">Dead Letter Queue</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-80">
                                A dead-letter queue is a queue that other queues can target for messages that cannot be
                                processed successfully. Enable this to move failed messages to a separate queue.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Move failed messages to a dead letter queue
                      </p>
                    </div>
                    <Switch
                      id="dlqEnabled"
                      checked={formData.dlqEnabled}
                      onCheckedChange={(checked) => handleSwitchChange("dlqEnabled", checked)}
                    />
                  </div>

                  {formData.dlqEnabled && (
                    <div className="space-y-2 pl-6 border-l-2 border-muted">
                      <Label htmlFor="dlqMaxReceives">Maximum Receives</Label>
                      <Input
                        id="dlqMaxReceives"
                        name="dlqMaxReceives"
                        type="number"
                        value={formData.dlqMaxReceives}
                        onChange={handleNumberChange}
                        min={1}
                        max={1000}
                      />
                      <p className="text-xs text-muted-foreground">
                        Number of times a message can be received before being sent to the dead letter queue
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="encryption">Encryption</Label>
                  <Select
                    value={formData.encryption}
                    onValueChange={(value) => handleSelectChange("encryption", value)}
                  >
                    <SelectTrigger id="encryption">
                      <SelectValue placeholder="Select encryption type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="server-side">Server-Side Encryption (SSE)</SelectItem>
                      <SelectItem value="kms">AWS KMS Encryption</SelectItem>
                      <SelectItem value="none">No Encryption</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessPolicy">Access Policy</Label>
                  <Select
                    value={formData.accessPolicy}
                    onValueChange={(value) => handleSelectChange("accessPolicy", value)}
                  >
                    <SelectTrigger id="accessPolicy">
                      <SelectValue placeholder="Select access policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private (Account Only)</SelectItem>
                      <SelectItem value="public">Public (Anyone)</SelectItem>
                      <SelectItem value="custom">Custom Policy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.accessPolicy === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="customPolicy">Custom Policy (JSON)</Label>
                    <Textarea
                      id="customPolicy"
                      name="customPolicy"
                      placeholder='{"Version": "2012-10-17", "Statement": [...]}'
                      className="font-mono text-sm"
                      rows={8}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tags */}
          <TabsContent value="tags">
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add metadata tags to your queue for organization and filtering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="newTagKey">Key</Label>
                    <Input
                      id="newTagKey"
                      value={newTagKey}
                      onChange={(e) => setNewTagKey(e.target.value)}
                      placeholder="e.g., environment"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newTagValue">Value</Label>
                    <Input
                      id="newTagValue"
                      value={newTagValue}
                      onChange={(e) => setNewTagValue(e.target.value)}
                      placeholder="e.g., production"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTag}
                      className="w-full"
                      disabled={!newTagKey.trim() || !newTagValue.trim()}
                    >
                      Add Tag
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md">
                  {formData.tags.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">Key</th>
                          <th className="text-left p-2 font-medium">Value</th>
                          <th className="text-right p-2 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.tags.map((tag, index) => (
                          <tr key={index} className="border-b last:border-0">
                            <td className="p-2">{tag.key}</td>
                            <td className="p-2">{tag.value}</td>
                            <td className="p-2 text-right">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTag(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No tags added yet. Add a tag to help organize your resources.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/queues/${queueId}`)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Tabs>
      </form>
    </div>
  )
}
