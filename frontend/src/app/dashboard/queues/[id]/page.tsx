"use client"

import { NumberUtils } from "@/common/number"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, BarChart3, Clock, MessageSquare, Pause, Play, RefreshCcw, Send, Trash2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

const queueData = {
  id: "q_1",
  name: "order-processing",
  description: "Processes incoming orders from the e-commerce platform",
  status: "active",
  created: "April 12, 2023",
  messages: {
    total: 12453,
    processed: 12441,
    failed: 12,
    pending: 0,
  },
  metrics: {
    processingRate: "124/min",
    averageLatency: "45ms",
    successRate: "99.9%",
  },
}

export default function QueueDetailPage() {
  const params = useParams()
  const queueId = params.id as string
  const { toast } = useToast()
  const [messageContent, setMessageContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!messageContent.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent",
      description: "Your message has been added to the queue.",
    })

    setMessageContent("")
    setIsLoading(false)
  }

  const handlePauseQueue = async () => {
    toast({
      title: "Queue paused",
      description: "The queue has been paused successfully.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/queues">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{queueData.name}</h1>
        <Badge variant={queueData.status === "active" ? "default" : "secondary"}>{queueData.status}</Badge>
      </div>

      <p className="text-muted-foreground">{queueData.description}</p>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{NumberUtils.value(queueData.messages.total)}</div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Processed</p>
                <p className="font-medium">{NumberUtils.value(queueData.messages.processed)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Failed</p>
                <p className="font-medium">{NumberUtils.value(queueData.messages.failed)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pending</p>
                <p className="font-medium">{NumberUtils.value(queueData.messages.pending)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueData.metrics.processingRate}</div>
            <p className="text-xs text-muted-foreground">Average over the last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Latency</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queueData.metrics.averageLatency}</div>
            <p className="text-xs text-muted-foreground">From enqueue to processing</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          variant={queueData.status === "active" ? "outline" : "default"}
          className="gap-2"
          onClick={handlePauseQueue}
        >
          {queueData.status === "active" ? (
            <>
              <Pause className="h-4 w-4" /> Pause Queue
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> Resume Queue
            </>
          )}
        </Button>
        <Button variant="outline" className="gap-2">
          <RefreshCcw className="h-4 w-4" /> Purge Messages
        </Button>
        <Button variant="destructive" className="gap-2">
          <Trash2 className="h-4 w-4" /> Delete Queue
        </Button>
      </div>

      <Tabs defaultValue="send" className="space-y-4">
        <TabsList>
          <TabsTrigger value="send">Send Message</TabsTrigger>
          <TabsTrigger value="messages">Recent Messages</TabsTrigger>
          <TabsTrigger value="settings">Queue Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Add a new message to this queue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message Content (JSON)</Label>
                <Textarea
                  id="message"
                  placeholder='{"orderId": "12345", "customer": "John Doe", "amount": 99.99}'
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="min-h-[150px] font-mono"
                />
              </div>
              <Button onClick={handleSendMessage} disabled={isLoading} className="gap-2">
                <Send className="h-4 w-4" />
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>The most recent messages in this queue</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No messages to display.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Queue Settings</CardTitle>
              <CardDescription>Configure how this queue operates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Queue Name</Label>
                <Input id="name" defaultValue={queueData.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={queueData.description} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="retention">Message Retention (days)</Label>
                <Input id="retention" type="number" defaultValue={7} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeout">Processing Timeout (seconds)</Label>
                <Input id="timeout" type="number" defaultValue={30} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

