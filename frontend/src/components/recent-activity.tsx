import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

// Mock data for recent activity
const activities = [
  {
    id: "act_1",
    queue: "order-processing",
    action: "message_processed",
    status: "success",
    timestamp: "2023-08-15T14:32:21Z",
    user: "system",
  },
  {
    id: "act_2",
    queue: "email-notifications",
    action: "message_enqueued",
    status: "success",
    timestamp: "2023-08-15T14:30:45Z",
    user: "api_key_1",
  },
  {
    id: "act_3",
    queue: "payment-webhooks",
    action: "message_processed",
    status: "failed",
    timestamp: "2023-08-15T14:28:12Z",
    user: "system",
  },
  {
    id: "act_4",
    queue: "analytics-events",
    action: "message_enqueued",
    status: "success",
    timestamp: "2023-08-15T14:25:33Z",
    user: "api_key_2",
  },
  {
    id: "act_5",
    queue: "order-processing",
    action: "queue_paused",
    status: "success",
    timestamp: "2023-08-15T14:20:19Z",
    user: "john.doe@example.com",
  },
  {
    id: "act_6",
    queue: "order-processing",
    action: "queue_resumed",
    status: "success",
    timestamp: "2023-08-15T14:15:02Z",
    user: "john.doe@example.com",
  },
  {
    id: "act_7",
    queue: "log-processing",
    action: "message_processed",
    status: "pending",
    timestamp: "2023-08-15T14:10:45Z",
    user: "system",
  },
]

// Format timestamp to readable format
function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

// Get status icon based on status
function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />
    default:
      return null
  }
}

export function RecentActivity() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Queue</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-medium">{activity.queue}</TableCell>
              <TableCell>
                <Badge variant="outline">{activity.action.replace("_", " ")}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <StatusIcon status={activity.status} />
                  <span className="capitalize">{activity.status}</span>
                </div>
              </TableCell>
              <TableCell>{formatTimestamp(activity.timestamp)}</TableCell>
              <TableCell>{activity.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

