import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ExternalLink, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Mock data for queues
const queues = [
  {
    id: "q_1",
    name: "order-processing",
    status: "active",
    messages: 12453,
    rate: "124/min",
    created: "2023-04-12",
  },
  {
    id: "q_2",
    name: "email-notifications",
    status: "active",
    messages: 45231,
    rate: "89/min",
    created: "2023-05-01",
  },
  {
    id: "q_3",
    name: "payment-webhooks",
    status: "active",
    messages: 8765,
    rate: "32/min",
    created: "2023-06-15",
  },
  {
    id: "q_4",
    name: "log-processing",
    status: "paused",
    messages: 345678,
    rate: "0/min",
    created: "2023-03-22",
  },
  {
    id: "q_5",
    name: "analytics-events",
    status: "active",
    messages: 70092,
    rate: "237/min",
    created: "2023-07-08",
  },
]

export function QueueList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                <span>Name</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Messages</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queues.map((queue) => (
            <TableRow key={queue.id}>
              <TableCell className="font-medium">{queue.name}</TableCell>
              <TableCell>
                <Badge variant={queue.status === "active" ? "default" : "secondary"}>{queue.status}</Badge>
              </TableCell>
              <TableCell className="text-right">{queue.messages.toLocaleString()}</TableCell>
              <TableCell className="text-right">{queue.rate}</TableCell>
              <TableCell>{queue.created}</TableCell>
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
                    <DropdownMenuItem>
                      <Link href={`/dashboard/queues/${queue.id}`} className="flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit Queue</DropdownMenuItem>
                    <DropdownMenuItem>Purge Messages</DropdownMenuItem>
                    <DropdownMenuItem>{queue.status === "active" ? "Pause Queue" : "Resume Queue"}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete Queue</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

