"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { ArrowDown, ArrowUp, ArrowUpDown, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data for queues
const mockQueues = [
  {
    id: "q_1",
    name: "order-processing",
    status: "active",
    messages: 12453,
    rate: "124/min",
    created: "2023-04-12",
    type: "standard",
    region: "us-east-1",
  },
  {
    id: "q_2",
    name: "email-notifications",
    status: "active",
    messages: 45231,
    rate: "89/min",
    created: "2023-05-01",
    type: "standard",
    region: "us-west-2",
  },
  {
    id: "q_3",
    name: "payment-webhooks",
    status: "active",
    messages: 8765,
    rate: "32/min",
    created: "2023-06-15",
    type: "fifo",
    region: "eu-west-1",
  },
  {
    id: "q_4",
    name: "log-processing",
    status: "paused",
    messages: 345678,
    rate: "0/min",
    created: "2023-03-22",
    type: "standard",
    region: "us-east-1",
  },
  {
    id: "q_5",
    name: "analytics-events",
    status: "active",
    messages: 70092,
    rate: "237/min",
    created: "2023-07-08",
    type: "fifo",
    region: "ap-southeast-1",
  },
  {
    id: "q_6",
    name: "user-notifications",
    status: "active",
    messages: 5432,
    rate: "28/min",
    created: "2023-08-10",
    type: "standard",
    region: "us-west-2",
  },
  {
    id: "q_7",
    name: "inventory-updates",
    status: "paused",
    messages: 9876,
    rate: "0/min",
    created: "2023-09-05",
    type: "fifo",
    region: "eu-west-1",
  },
  {
    id: "q_8",
    name: "audit-logs",
    status: "active",
    messages: 123456,
    rate: "156/min",
    created: "2023-10-01",
    type: "standard",
    region: "us-east-1",
  },
  {
    id: "q_9",
    name: "customer-feedback",
    status: "active",
    messages: 3210,
    rate: "12/min",
    created: "2023-11-15",
    type: "standard",
    region: "ap-southeast-1",
  },
  {
    id: "q_10",
    name: "system-alerts",
    status: "active",
    messages: 987,
    rate: "5/min",
    created: "2023-12-01",
    type: "priority",
    region: "us-east-1",
  },
]

type SortField = "name" | "messages" | "rate" | "created"
type SortDirection = "asc" | "desc"

export default function QueuesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter and sort queues
  const filteredQueues = mockQueues.filter((queue) => {
    const matchesSearch = queue.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || queue.status === statusFilter
    const matchesType = typeFilter === "all" || queue.type === typeFilter
    const matchesRegion = regionFilter === "all" || queue.region === regionFilter
    return matchesSearch && matchesStatus && matchesType && matchesRegion
  })

  const sortedQueues = [...filteredQueues].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortField === "messages") {
      return sortDirection === "asc" ? a.messages - b.messages : b.messages - a.messages
    } else if (sortField === "rate") {
      const aRate = Number.parseInt(a.rate.split("/")[0]) || 0
      const bRate = Number.parseInt(b.rate.split("/")[0]) || 0
      return sortDirection === "asc" ? aRate - bRate : bRate - aRate
    } else if (sortField === "created") {
      return sortDirection === "asc"
        ? new Date(a.created).getTime() - new Date(b.created).getTime()
        : new Date(b.created).getTime() - new Date(a.created).getTime()
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedQueues.length / itemsPerPage)
  const paginatedQueues = sortedQueues.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    return sortDirection === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
  }

  // Handle queue actions
  const handlePauseQueue = (queueId: string, queueName: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active"
    const action = currentStatus === "active" ? "paused" : "resumed"

    toast({
      title: `Queue ${action}`,
      description: `${queueName} has been ${action}.`,
    })
  }

  const handleDeleteQueue = (queueId: string, queueName: string) => {
    toast({
      title: "Queue deleted",
      description: `${queueName} has been deleted.`,
      variant: "destructive",
    })
  }

  const handlePurgeQueue = (queueId: string, queueName: string) => {
    toast({
      title: "Queue purged",
      description: `All messages in ${queueName} have been purged.`,
    })
  }

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setTypeFilter("all")
    setRegionFilter("all")
    setSortField("name")
    setSortDirection("asc")
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Queues</h1>
        <Link href="/dashboard/queues/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Queue
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Queue Management</CardTitle>
          <CardDescription>View and manage all your message queues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search queues..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="fifo">FIFO</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>

              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="us-east-1">US East</SelectItem>
                  <SelectItem value="us-west-2">US West</SelectItem>
                  <SelectItem value="eu-west-1">EU West</SelectItem>
                  <SelectItem value="ap-southeast-1">Asia Pacific</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={resetFilters} title="Reset filters">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Queue table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    <Button
                      variant="ghost"
                      className="p-0 font-medium hover:bg-transparent"
                      onClick={() => handleSort("name")}
                    >
                      Name
                      {getSortIcon("name")}
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 font-medium hover:bg-transparent"
                      onClick={() => handleSort("messages")}
                    >
                      Messages
                      {getSortIcon("messages")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 font-medium hover:bg-transparent"
                      onClick={() => handleSort("rate")}
                    >
                      Rate
                      {getSortIcon("rate")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      className="p-0 font-medium hover:bg-transparent"
                      onClick={() => handleSort("created")}
                    >
                      Created
                      {getSortIcon("created")}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedQueues.length > 0 ? (
                  paginatedQueues.map((queue) => (
                    <TableRow key={queue.id}>
                      <TableCell className="font-medium">
                        <Link href={`/dashboard/queues/${queue.id}`} className="hover:underline">
                          {queue.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant={queue.status === "active" ? "default" : "secondary"}>{queue.status}</Badge>
                      </TableCell>
                      <TableCell>{queue.type}</TableCell>
                      <TableCell>{queue.region}</TableCell>
                      <TableCell>{queue.messages.toLocaleString()}</TableCell>
                      <TableCell>{queue.rate}</TableCell>
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
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/queues/${queue.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/queues/${queue.id}/edit`}>Edit Queue</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePurgeQueue(queue.id, queue.name)}>
                              Purge Messages
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePauseQueue(queue.id, queue.name, queue.status)}>
                              {queue.status === "active" ? "Pause Queue" : "Resume Queue"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteQueue(queue.id, queue.name)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Queue
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No queues found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  let pageNumber: number

                  // Logic to show pages around current page
                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }

                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(pageNumber)
                        }}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(totalPages)
                        }}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
