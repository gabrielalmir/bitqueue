"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateQueuePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Queue created",
      description: "Your new queue has been created successfully.",
    })

    router.push("/dashboard/queues")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/queues">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Queue</h1>
      </div>

      <Card>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Queue Details</CardTitle>
            <CardDescription>Configure your new message queue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Queue Name</Label>
              <Input id="name" placeholder="e.g., order-processing" required />
              <p className="text-xs text-muted-foreground">
                Use lowercase letters, numbers, and hyphens only. No spaces.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe the purpose of this queue" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Queue Type</Label>
                <Select defaultValue="standard">
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select queue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="fifo">FIFO (First In, First Out)</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="visibility">Default Visibility Timeout (seconds)</Label>
                <Input id="visibility" type="number" defaultValue={30} min={1} max={43200} />
                <p className="text-xs text-muted-foreground">How long a message is invisible after being received</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="retention">Message Retention Period (days)</Label>
                <Input id="retention" type="number" defaultValue={7} min={1} max={14} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delay">Delivery Delay (seconds)</Label>
                <Input id="delay" type="number" defaultValue={0} min={0} max={900} />
                <p className="text-xs text-muted-foreground">Delay before messages are delivered (0 for immediate)</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard/queues")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Queue"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

