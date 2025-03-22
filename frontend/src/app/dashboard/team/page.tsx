"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { format } from "date-fns"
import { AlertCircle, Check, Edit, FileText, MoreHorizontal, Plus, Settings, Shield, Trash2, UserPlus, Users } from 'lucide-react'
import { useState } from "react"

// Mock data for teams
const teams = [
  {
    id: "team_1",
    name: "Engineering",
    description: "Product engineering team",
    memberCount: 8,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-07-22T14:45:00Z",
  },
  {
    id: "team_2",
    name: "Operations",
    description: "DevOps and infrastructure team",
    memberCount: 5,
    createdAt: "2023-02-10T09:15:00Z",
    updatedAt: "2023-08-05T11:20:00Z",
  },
  {
    id: "team_3",
    name: "Product",
    description: "Product management and design",
    memberCount: 6,
    createdAt: "2023-03-05T13:45:00Z",
    updatedAt: "2023-07-30T16:10:00Z",
  },
]

// Mock data for team members
const teamMembers = [
  {
    id: "user_1",
    teamId: "team_1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "user_2",
    teamId: "team_1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "member",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-01-16T14:20:00Z",
  },
  {
    id: "user_3",
    teamId: "team_1",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "member",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-02-05T09:45:00Z",
  },
  {
    id: "user_4",
    teamId: "team_2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-02-10T09:15:00Z",
  },
  {
    id: "user_5",
    teamId: "team_2",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "member",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-02-12T11:30:00Z",
  },
  {
    id: "user_6",
    teamId: "team_3",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2023-03-05T13:45:00Z",
  },
]

// Mock data for team activity
const teamActivity = [
  {
    id: "activity_1",
    teamId: "team_1",
    userId: "user_1",
    userName: "John Doe",
    action: "created_queue",
    resource: "order-processing",
    timestamp: "2023-08-14T10:30:00Z",
  },
  {
    id: "activity_2",
    teamId: "team_1",
    userId: "user_2",
    userName: "Jane Smith",
    action: "updated_queue",
    resource: "email-notifications",
    timestamp: "2023-08-14T11:45:00Z",
  },
  {
    id: "activity_3",
    teamId: "team_1",
    userId: "user_3",
    userName: "Mike Johnson",
    action: "deleted_message",
    resource: "msg_12345",
    timestamp: "2023-08-14T13:20:00Z",
  },
  {
    id: "activity_4",
    teamId: "team_2",
    userId: "user_4",
    userName: "Sarah Williams",
    action: "added_member",
    resource: "David Brown",
    timestamp: "2023-08-13T15:10:00Z",
  },
  {
    id: "activity_5",
    teamId: "team_2",
    userId: "user_5",
    userName: "David Brown",
    action: "updated_settings",
    resource: "team settings",
    timestamp: "2023-08-13T16:30:00Z",
  },
  {
    id: "activity_6",
    teamId: "team_3",
    userId: "user_6",
    userName: "Emily Davis",
    action: "created_queue",
    resource: "analytics-events",
    timestamp: "2023-08-12T09:15:00Z",
  },
]

// Mock data for permissions
const permissions = [
  { id: "perm_1", name: "Create Queues", description: "Can create new queues" },
  { id: "perm_2", name: "Delete Queues", description: "Can delete existing queues" },
  { id: "perm_3", name: "Manage Messages", description: "Can view, send, and delete messages" },
  { id: "perm_4", name: "View Metrics", description: "Can view queue metrics and analytics" },
  { id: "perm_5", name: "Manage Team", description: "Can add/remove team members" },
  { id: "perm_6", name: "Billing Access", description: "Can view and manage billing information" },
]

// Mock data for role permissions
const rolePermissions = {
  admin: ["perm_1", "perm_2", "perm_3", "perm_4", "perm_5", "perm_6"],
  member: ["perm_1", "perm_3", "perm_4"],
  readonly: ["perm_4"],
}

export default function TeamPage() {
  const { toast } = useToast()
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [isCreateTeamDialogOpen, setIsCreateTeamDialogOpen] = useState(false)
  const [isInviteMemberDialogOpen, setIsInviteMemberDialogOpen] = useState(false)
  const [isEditTeamDialogOpen, setIsEditTeamDialogOpen] = useState(false)
  const [isDeleteTeamDialogOpen, setIsDeleteTeamDialogOpen] = useState(false)
  const [isEditPermissionsDialogOpen, setIsEditPermissionsDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [newTeam, setNewTeam] = useState({ name: "", description: "" })
  const [editTeam, setEditTeam] = useState({ id: "", name: "", description: "" })
  const [inviteDetails, setInviteDetails] = useState({ email: "", role: "member" })
  const [memberPermissions, setMemberPermissions] = useState<string[]>([])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM d, yyyy h:mm a")
  }

  // Get team by ID
  const getTeamById = (teamId: string) => {
    return teams.find(team => team.id === teamId)
  }

  // Get team members
  const getTeamMembers = (teamId: string) => {
    return teamMembers.filter(member => member.teamId === teamId)
  }

  // Get team activity
  const getTeamActivity = (teamId: string) => {
    return teamActivity.filter(activity => activity.teamId === teamId)
  }

  // Handle team selection
  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId)
  }

  // Handle create team
  const handleCreateTeam = () => {
    if (!newTeam.name.trim()) return

    toast({
      title: "Team created",
      description: `Team "${newTeam.name}" has been created successfully.`,
    })

    setNewTeam({ name: "", description: "" })
    setIsCreateTeamDialogOpen(false)
  }

  // Handle edit team
  const handleEditTeam = () => {
    if (!editTeam.name.trim()) return

    toast({
      title: "Team updated",
      description: `Team "${editTeam.name}" has been updated successfully.`,
    })

    setIsEditTeamDialogOpen(false)
  }

  // Handle delete team
  const handleDeleteTeam = () => {
    const team = getTeamById(selectedTeam!)

    toast({
      title: "Team deleted",
      description: `Team "${team?.name}" has been deleted.`,
      variant: "destructive",
    })

    setSelectedTeam(null)
    setIsDeleteTeamDialogOpen(false)
  }

  // Handle invite member
  const handleInviteMember = () => {
    if (!inviteDetails.email.trim()) return

    toast({
      title: "Invitation sent",
      description: `Invitation sent to ${inviteDetails.email} with ${inviteDetails.role} role.`,
    })

    setInviteDetails({ email: "", role: "member" })
    setIsInviteMemberDialogOpen(false)
  }

  // Handle remove member
  const handleRemoveMember = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId)

    toast({
      title: "Member removed",
      description: `${member?.name} has been removed from the team.`,
    })
  }

  // Handle change member role
  const handleChangeMemberRole = (memberId: string, newRole: string) => {
    const member = teamMembers.find(m => m.id === memberId)

    toast({
      title: "Role updated",
      description: `${member?.name}'s role has been updated to ${newRole}.`,
    })
  }

  // Handle edit permissions
  const handleEditPermissions = () => {
    toast({
      title: "Permissions updated",
      description: "Member permissions have been updated successfully.",
    })

    setIsEditPermissionsDialogOpen(false)
  }

  // Get action icon
  const getActionIcon = (action: string) => {
    switch (action) {
      case "created_queue":
        return <Plus className="h-4 w-4 text-green-500" />
      case "updated_queue":
        return <Edit className="h-4 w-4 text-blue-500" />
      case "deleted_message":
        return <Trash2 className="h-4 w-4 text-red-500" />
      case "added_member":
        return <UserPlus className="h-4 w-4 text-green-500" />
      case "updated_settings":
        return <Settings className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  // Open edit permissions dialog
  const openEditPermissionsDialog = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId)
    if (!member) return

    setSelectedMember(memberId)
    setMemberPermissions(rolePermissions[member.role as keyof typeof rolePermissions] || [])
    setIsEditPermissionsDialogOpen(true)
  }

  // Toggle permission
  const togglePermission = (permId: string) => {
    setMemberPermissions(prev =>
      prev.includes(permId)
        ? prev.filter(id => id !== permId)
        : [...prev, permId]
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
        <Button onClick={() => setIsCreateTeamDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Teams List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Teams</CardTitle>
            <CardDescription>Manage your teams and members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teams.map(team => (
                <div
                  key={team.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                    selectedTeam === team.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => handleTeamSelect(team.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      selectedTeam === team.id ? 'bg-primary-foreground text-primary' : 'bg-muted-foreground/20'
                    }`}>
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{team.name}</p>
                      <p className={`text-xs ${
                        selectedTeam === team.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {team.memberCount} members
                      </p>
                    </div>
                  </div>
                  {selectedTeam === team.id && (
                    <Check className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Details */}
        <Card className="md:col-span-2">
          {selectedTeam ? (
            <>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>{getTeamById(selectedTeam)?.name}</CardTitle>
                  <CardDescription>{getTeamById(selectedTeam)?.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Team Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => {
                      const team = getTeamById(selectedTeam)
                      setEditTeam({
                        id: team!.id,
                        name: team!.name,
                        description: team!.description
                      })
                      setIsEditTeamDialogOpen(true)
                    }}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Team
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsInviteMemberDialogOpen(true)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite Member
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => setIsDeleteTeamDialogOpen(true)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Team
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="members">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>

                  {/* Members Tab */}
                  <TabsContent value="members" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Team Members</h3>
                      <Button size="sm" onClick={() => setIsInviteMemberDialogOpen(true)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite
                      </Button>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getTeamMembers(selectedTeam).map(member => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={member.role === "admin" ? "default" : "outline"}>
                                  {member.role === "admin" ? "Admin" : "Member"}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatDate(member.joinedAt)}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Member Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => openEditPermissionsDialog(member.id)}>
                                      <Shield className="mr-2 h-4 w-4" />
                                      Edit Permissions
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => handleChangeMemberRole(member.id, member.role === "admin" ? "member" : "admin")}
                                    >
                                      <Settings className="mr-2 h-4 w-4" />
                                      {member.role === "admin" ? "Make Member" : "Make Admin"}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => handleRemoveMember(member.id)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Remove Member
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>

                  {/* Activity Tab */}
                  <TabsContent value="activity" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Recent Activity</h3>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Actions</SelectItem>
                          <SelectItem value="created_queue">Created Queue</SelectItem>
                          <SelectItem value="updated_queue">Updated Queue</SelectItem>
                          <SelectItem value="deleted_message">Deleted Message</SelectItem>
                          <SelectItem value="added_member">Added Member</SelectItem>
                          <SelectItem value="updated_settings">Updated Settings</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      {getTeamActivity(selectedTeam).map(activity => (
                        <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            {getActionIcon(activity.action)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">
                                {activity.userName}
                                <span className="font-normal text-muted-foreground">
                                  {' '}
                                  {activity.action.replace('_', ' ')}
                                  {' '}
                                  <span className="font-medium text-foreground">
                                    {activity.resource}
                                  </span>
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(activity.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No Team Selected</h3>
              <p className="text-muted-foreground mb-4">
                Select a team from the list or create a new one to get started.
              </p>
              <Button onClick={() => setIsCreateTeamDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Team
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Create Team Dialog */}
      <Dialog open={isCreateTeamDialogOpen} onOpenChange={setIsCreateTeamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>
              Create a new team to collaborate with your colleagues.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="team-name" className="text-sm font-medium">
                Team Name
              </label>
              <Input
                id="team-name"
                placeholder="Engineering, Marketing, etc."
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="team-description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="team-description"
                placeholder="What does this team do?"
                value={newTeam.description}
                onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateTeamDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTeam}>Create Team</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Team Dialog */}
      <Dialog open={isEditTeamDialogOpen} onOpenChange={setIsEditTeamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>
              Update your team's information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="edit-team-name" className="text-sm font-medium">
                Team Name
              </label>
              <Input
                id="edit-team-name"
                value={editTeam.name}
                onChange={(e) => setEditTeam({ ...editTeam, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-team-description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="edit-team-description"
                value={editTeam.description}
                onChange={(e) => setEditTeam({ ...editTeam, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTeamDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTeam}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Team Dialog */}
      <Dialog open={isDeleteTeamDialogOpen} onOpenChange={setIsDeleteTeamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this team? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <div className="rounded-md bg-destructive/10 p-4 text-destructive">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Warning</h4>
                  <p className="text-sm">
                    Deleting this team will remove all members and their access to team resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteTeamDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTeam}>
              Delete Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Member Dialog */}
      <Dialog open={isInviteMemberDialogOpen} onOpenChange={setIsInviteMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="invite-email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="invite-email"
                type="email"
                placeholder="colleague@example.com"
                value={inviteDetails.email}
                onChange={(e) => setInviteDetails({ ...inviteDetails, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="invite-role" className="text-sm font-medium">
                Role
              </label>
              <Select
                value={inviteDetails.role}
                onValueChange={(value) => setInviteDetails({ ...inviteDetails, role: value })}
              >
                <SelectTrigger id="invite-role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="readonly">Read Only</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Admins can manage team members and all resources. Members can create and manage queues. Read-only users can only view data.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteMemberDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteMember}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Permissions Dialog */}
      <Dialog open={isEditPermissionsDialogOpen} onOpenChange={setIsEditPermissionsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Permissions</DialogTitle>
            <DialogDescription>
              Customize permissions for this team member.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <div className="space-y-4">
              {permissions.map(permission => (
                <div key={permission.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={memberPermissions.includes(permission.id)}
                    onCheckedChange={() => togglePermission(permission.id)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={permission.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission.name}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {permission.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPermissionsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPermissions}>Save Permissions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
