"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
    CalendarIcon,
    CheckCircle2,
    Clock,
    Eye,
    Filter,
    MoreHorizontal,
    RefreshCw,
    RotateCcw,
    Search,
    Trash2,
    XCircle,
} from "lucide-react"
import { useState } from "react"

const queues = [
  { id: "q_1", name: "order-processing" },
  { id: "q_2", name: "email-notifications" },
  { id: "q_3", name: "payment-webhooks" },
  { id: "q_4", name: "log-processing" },
  { id: "q_5", name: "analytics-events" },
]

const generateMockMessages = (count: number) => {
  const statuses = ["delivered", "processed", "failed", "pending"]
  const messages = []

  for (let i = 1; i <= count; i++) {
    const statusIndex = i % statuses.length
    const status = statuses[statusIndex]

    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setMinutes(date.getMinutes() - i * 30)

    const queueIndex = i % queues.length
    const queueId = queues[queueIndex].id

    messages.push({
      id: `msg_${i}`,
      queueId: queueId,
      body: JSON.stringify(
        {
          orderId: `ORD-${1000 + i}`,
          customer: `Customer ${i}`,
          amount: (i * 10.99).toFixed(2),
          items: (i % 5) + 1,
        },
        null,
        2,
      ),
      status,
      createdAt: date.toISOString(),
      processedAt: status !== "pending" ? new Date(date.getTime() + 60000).toISOString() : null,
      attempts: status === "failed" ? (i % 3) + 1 : 1,
    })
  }

  return messages
}

const mockMessages = generateMockMessages(50)

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "processed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "delivered":
      return <CheckCircle2 className="h-4 w-4 text-blue-500" />
    default:
      return null
  }
}

export default function MessagesPage() {
  const { toast } = useToast()
  const [selectedQueue, setSelectedQueue] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null)
  const itemsPerPage = 10

  const filteredMessages = mockMessages.filter((message) => {
    const matchesQueue = selectedQueue === "all" || message.queueId === selectedQueue
    const matchesSearch =
      message.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || message.status === statusFilter

    let matchesDate = true
    if (dateFrom) {
      const messageDate = new Date(message.createdAt)
      dateFrom.setHours(0, 0, 0, 0)
      matchesDate = matchesDate && messageDate >= dateFrom
    }
    if (dateTo) {
      const messageDate = new Date(message.createdAt)
      dateTo.setHours(23, 59, 59, 999)
      matchesDate = matchesDate && messageDate <= dateTo
    }

    return matchesQueue && matchesSearch && matchesStatus && matchesDate
  })

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage)
  const paginatedMessages = filteredMessages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM d, yyyy h:mm a")
  }

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message)
    setIsViewDialogOpen(true)
  }

  const handleRequeueMessage = (messageId: string) => {
    toast({
      title: "Message requeued",
      description: `Message ${messageId} has been requeued.`,
    })
  }

  const handleDeleteMessage = (messageId: string) => {
    setMessageToDelete(messageId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteMessage = () => {
    if (messageToDelete) {
      toast({
        title: "Message deleted",
        description: `Message ${messageToDelete} has been deleted.`,
        variant: "destructive",
      })
      setMessageToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const resetFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setDateFrom(undefined)
    setDateTo(undefined)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <Button className="gap-2" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Message Management</CardTitle>
          <CardDescription>View and manage messages across your queues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Queue selector and filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedQueue} onValueChange={setSelectedQueue}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select queue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Queues</SelectItem>
                  {queues.map((queue) => (
                    <SelectItem key={queue.id} value={queue.id}>
                      {queue.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[130px] justify-start text-left font-normal",
                      !dateFrom && !dateTo && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom && dateTo ? (
                      format(dateFrom, "MMM d") + " - " + format(dateTo, "MMM d")
                    ) : (
                      <span>Date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex flex-col sm:flex-row">
                    <div className="border-r p-2">
                      <div className="px-1 py-2 text-center text-sm font-medium">From</div>
                      <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                    </div>
                    <div className="p-2">
                      <div className="px-1 py-2 text-center text-sm font-medium">To</div>
                      <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="outline" size="icon" onClick={resetFilters} title="Reset filters">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages table */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="processed">Processed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Queue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Processed</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMessages.length > 0 ? (
                      paginatedMessages.map((message) => (
                        <TableRow key={message.id}>
                          <TableCell className="font-medium">{message.id}</TableCell>
                          <TableCell>{queues.find((q) => q.id === message.queueId)?.name || message.queueId}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <StatusIcon status={message.status} />
                              <span className="capitalize">{message.status}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(message.createdAt)}</TableCell>
                          <TableCell>{message.processedAt ? formatDate(message.processedAt) : "-"}</TableCell>
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
                                <DropdownMenuItem onClick={() => handleViewMessage(message)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleRequeueMessage(message.id)}>
                                  <RotateCcw className="mr-2 h-4 w-4" />
                                  Requeue Message
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => handleDeleteMessage(message.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Message
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No messages found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="processed" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Queue</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Processed</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMessages.filter((m) => m.status === "processed").length > 0 ? (
                      paginatedMessages
                        .filter((m) => m.status === "processed")
                        .map((message) => (
                          <TableRow key={message.id}>
                            <TableCell className="font-medium">{message.id}</TableCell>
                            <TableCell>
                              {queues.find((q) => q.id === message.queueId)?.name || message.queueId}
                            </TableCell>
                            <TableCell>{formatDate(message.createdAt)}</TableCell>
                            <TableCell>{formatDate(message.processedAt!)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewMessage(message)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No processed messages found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Queue</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMessages.filter((m) => m.status === "pending").length > 0 ? (
                      paginatedMessages
                        .filter((m) => m.status === "pending")
                        .map((message) => (
                          <TableRow key={message.id}>
                            <TableCell className="font-medium">{message.id}</TableCell>
                            <TableCell>
                              {queues.find((q) => q.id === message.queueId)?.name || message.queueId}
                            </TableCell>
                            <TableCell>{formatDate(message.createdAt)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleViewMessage(message)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteMessage(message.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No pending messages found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="failed" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Queue</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Attempts</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMessages.filter((m) => m.status === "failed").length > 0 ? (
                      paginatedMessages
                        .filter((m) => m.status === "failed")
                        .map((message) => (
                          <TableRow key={message.id}>
                            <TableCell className="font-medium">{message.id}</TableCell>
                            <TableCell>
                              {queues.find((q) => q.id === message.queueId)?.name || message.queueId}
                            </TableCell>
                            <TableCell>{formatDate(message.createdAt)}</TableCell>
                            <TableCell>{message.attempts}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleViewMessage(message)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleRequeueMessage(message.id)}>
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No failed messages found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

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

      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>Detailed information about message {selectedMessage?.id}</DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Message ID</h4>
                  <p className="text-sm">{selectedMessage.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Queue</h4>
                  <p className="text-sm">
                    {queues.find((q) => q.id === selectedMessage.queueId)?.name || selectedMessage.queueId}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Status</h4>
                  <div className="flex items-center gap-2">
                    <StatusIcon status={selectedMessage.status} />
                    <span className="text-sm capitalize">{selectedMessage.status}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Created At</h4>
                  <p className="text-sm">{formatDate(selectedMessage.createdAt)}</p>
                </div>
                {selectedMessage.processedAt && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Processed At</h4>
                    <p className="text-sm">{formatDate(selectedMessage.processedAt)}</p>
                  </div>
                )}
                {selectedMessage.status === "failed" && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Attempts</h4>
                    <p className="text-sm">{selectedMessage.attempts}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Message Body</h4>
                <pre className="bg-muted p-4 rounded-md overflow-auto text-xs font-mono">{selectedMessage.body}</pre>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            {selectedMessage?.status === "failed" && (
              <Button
                variant="outline"
                onClick={() => {
                  handleRequeueMessage(selectedMessage.id)
                  setIsViewDialogOpen(false)
                }}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Requeue Message
              </Button>
            )}
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteMessage}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
