"use client"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Copy, Globe, Laptop, Lock, Moon, Smartphone, Sun } from "lucide-react"
import { useState } from "react"

// Mock user data
const userData = {
    id: "user_1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=80&width=80",
    role: "admin",
    createdAt: "2023-01-15T10:30:00Z",
    company: "Acme Inc.",
    jobTitle: "Senior Developer",
}

// Mock notification settings
const notificationSettings = {
    email: {
        marketing: false,
        queueAlerts: true,
        securityAlerts: true,
        billingUpdates: true,
    },
    push: {
        queueAlerts: true,
        securityAlerts: true,
        billingUpdates: false,
    },
}

// Mock API keys
const apiKeys = [
    {
        id: "key_1",
        name: "Production API Key",
        key: "bq_prod_a1b2c3d4e5f6g7h8i9j0",
        createdAt: "2023-05-10T14:30:00Z",
        lastUsed: "2023-08-14T09:45:00Z",
    },
    {
        id: "key_2",
        name: "Development API Key",
        key: "bq_dev_z9y8x7w6v5u4t3s2r1q0",
        createdAt: "2023-06-22T11:15:00Z",
        lastUsed: "2023-08-13T16:20:00Z",
    },
]

const sessions = [
    {
        id: "session_1",
        device: "Edge on Windows",
        ip: "192.168.1.1",
        location: "São Paulo, BR",
        lastActive: "2024-02-15T10:30:00Z",
        current: true,
    },
    {
        id: "session_2",
        device: "Chrome on Windows",
        ip: "192.168.1.1",
        location: "New York, USA",
        lastActive: "2024-08-15T10:30:00Z",
        current: true,
    },
    {
        id: "session_3",
        device: "Safari on macOS",
        ip: "192.168.1.2",
        location: "San Francisco, USA",
        lastActive: "2024-08-14T15:45:00Z",
        current: false,
    },
    {
        id: "session_4",
        device: "Firefox on Ubuntu",
        ip: "192.168.1.3",
        location: "London, UK",
        lastActive: "2024-08-13T08:20:00Z",
        current: false,
    },
]

export default function SettingsPage() {
    const { toast } = useToast()
    const [profile, setProfile] = useState({ ...userData })
    const [notifications, setNotifications] = useState({ ...notificationSettings })
    const [newApiKey, setNewApiKey] = useState({ name: "" })
    const [isCreatingApiKey, setIsCreatingApiKey] = useState(false)
    const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false)
    const [theme, setTheme] = useState("system")
    const [is2FAEnabled, setIs2FAEnabled] = useState(false)
    const [is2FADialogOpen, setIs2FADialogOpen] = useState(false)
    const [verificationCode, setVerificationCode] = useState("")

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString() + " " + date.toLocaleTimeString()
    }

    const handleProfileUpdate = () => {
        toast({
            title: "Profile updated",
            description: "Your profile information has been updated.",
        })
    }

    const handleNotificationUpdate = () => {
        toast({
            title: "Notification settings updated",
            description: "Your notification preferences have been saved.",
        })
    }

    // Handle email notification toggle
    const handleEmailNotificationToggle = (key: keyof typeof notifications.email) => {
        setNotifications({
            ...notifications,
            email: {
                ...notifications.email,
                [key]: !notifications.email[key],
            },
        })
    }

    const handlePushNotificationToggle = (key: keyof typeof notifications.push) => {
        setNotifications({
            ...notifications,
            push: {
                ...notifications.push,
                [key]: !notifications.push[key],
            },
        })
    }

    const handleCreateApiKey = () => {
        if (!newApiKey.name.trim()) return

        toast({
            title: "API key created",
            description: `Your new API key "${newApiKey.name}" has been created.`,
        })

        setNewApiKey({ name: "" })
        setIsCreatingApiKey(false)
    }

    const handleRevokeApiKey = (keyId: string) => {
        const key = apiKeys.find((k) => k.id === keyId)

        toast({
            title: "API key revoked",
            description: `The API key "${key?.name}" has been revoked.`,
            variant: "destructive",
        })
    }

    const handleCopyApiKey = (key: string) => {
        navigator.clipboard.writeText(key)

        toast({
            title: "API key copied",
            description: "The API key has been copied to your clipboard.",
        })
    }

    const handleRevokeSession = (sessionId: string) => {
        const session = sessions.find((s) => s.id === sessionId)

        toast({
            title: "Session revoked",
            description: `The session on ${session?.device} has been revoked.`,
        })
    }

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme)

        toast({
            title: "Theme updated",
            description: `Theme has been set to ${newTheme}.`,
        })
    }

    const handleToggle2FA = () => {
        if (is2FAEnabled) {
            setIs2FAEnabled(false)
            toast({
                title: "Two-factor authentication disabled",
                description: "Two-factor authentication has been disabled for your account.",
                variant: "destructive",
            })
        } else {
            setIs2FADialogOpen(true)
        }
    }

    const handleSetup2FA = () => {
        if (verificationCode.trim().length !== 6) return

        setIs2FAEnabled(true)
        setIs2FADialogOpen(false)
        setVerificationCode("")

        toast({
            title: "Two-factor authentication enabled",
            description: "Two-factor authentication has been enabled for your account.",
        })
    }

    const handleDeleteAccount = () => {
        toast({
            title: "Account deleted",
            description: "Your account has been scheduled for deletion.",
            variant: "destructive",
        })

        setIsDeleteAccountDialogOpen(false)
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="api">API Keys</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your account profile information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex flex-col items-center gap-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={profile.avatar} alt={profile.name} />
                                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" size="sm">
                                        Change Avatar
                                    </Button>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="company">Company</Label>
                                            <Input
                                                id="company"
                                                value={profile.company}
                                                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="jobTitle">Job Title</Label>
                                            <Input
                                                id="jobTitle"
                                                value={profile.jobTitle}
                                                onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" placeholder="Tell us a little about yourself" className="min-h-[100px]" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={handleProfileUpdate}>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Manage how and when you receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-marketing">Marketing</Label>
                                            <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                                        </div>
                                        <Switch
                                            id="email-marketing"
                                            checked={notifications.email.marketing}
                                            onCheckedChange={() => handleEmailNotificationToggle("marketing")}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-queue-alerts">Queue Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about queue status changes and alerts
                                            </p>
                                        </div>
                                        <Switch
                                            id="email-queue-alerts"
                                            checked={notifications.email.queueAlerts}
                                            onCheckedChange={() => handleEmailNotificationToggle("queueAlerts")}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-security-alerts">Security Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about security events and suspicious activity
                                            </p>
                                        </div>
                                        <Switch
                                            id="email-security-alerts"
                                            checked={notifications.email.securityAlerts}
                                            onCheckedChange={() => handleEmailNotificationToggle("securityAlerts")}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-billing-updates">Billing Updates</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about billing and subscription changes
                                            </p>
                                        </div>
                                        <Switch
                                            id="email-billing-updates"
                                            checked={notifications.email.billingUpdates}
                                            onCheckedChange={() => handleEmailNotificationToggle("billingUpdates")}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="push-queue-alerts">Queue Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive push notifications about queue status changes and alerts
                                            </p>
                                        </div>
                                        <Switch
                                            id="push-queue-alerts"
                                            checked={notifications.push.queueAlerts}
                                            onCheckedChange={() => handlePushNotificationToggle("queueAlerts")}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="push-security-alerts">Security Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive push notifications about security events and suspicious activity
                                            </p>
                                        </div>
                                        <Switch
                                            id="push-security-alerts"
                                            checked={notifications.push.securityAlerts}
                                            onCheckedChange={() => handlePushNotificationToggle("securityAlerts")}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="push-billing-updates">Billing Updates</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive push notifications about billing and subscription changes
                                            </p>
                                        </div>
                                        <Switch
                                            id="push-billing-updates"
                                            checked={notifications.push.billingUpdates}
                                            onCheckedChange={() => handlePushNotificationToggle("billingUpdates")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={handleNotificationUpdate}>Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>Change your password</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Update Password</Button>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Two-Factor Authentication</CardTitle>
                                <CardDescription>Add an extra layer of security to your account</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="2fa">Two-Factor Authentication</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Protect your account with an additional verification step
                                        </p>
                                    </div>
                                    <Switch id="2fa" checked={is2FAEnabled} onCheckedChange={handleToggle2FA} />
                                </div>

                                {is2FAEnabled && (
                                    <div className="rounded-md bg-muted p-4">
                                        <div className="flex items-start">
                                            <Lock className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                                            <div>
                                                <h4 className="font-medium">Two-Factor Authentication is enabled</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Your account is protected with an additional verification step.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                {is2FAEnabled ? (
                                    <Button variant="outline" onClick={handleToggle2FA}>
                                        Disable Two-Factor Authentication
                                    </Button>
                                ) : (
                                    <Button onClick={() => setIs2FADialogOpen(true)}>Enable Two-Factor Authentication</Button>
                                )}
                            </CardFooter>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Active Sessions</CardTitle>
                                <CardDescription>Manage your active sessions across devices</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {sessions.map((session) => (
                                        <div key={session.id} className="flex items-center justify-between p-4 rounded-lg border">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                                    {session.device.includes("Chrome") ? (
                                                        <Globe className="h-5 w-5" />
                                                    ) : session.device.includes("Safari") ? (
                                                        <Laptop className="h-5 w-5" />
                                                    ) : (
                                                        <Smartphone className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">
                                                        {session.device}
                                                        {session.current && (
                                                            <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                                                Current
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {session.ip} • {session.location}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">Last active: {formatDate(session.lastActive)}</p>
                                                </div>
                                            </div>
                                            {!session.current && (
                                                <Button variant="outline" size="sm" onClick={() => handleRevokeSession(session.id)}>
                                                    Revoke
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Delete Account</CardTitle>
                                <CardDescription>Permanently delete your account and all associated data</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md bg-destructive/10 p-4 text-destructive">
                                    <div className="flex items-start">
                                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium">Warning: This action is irreversible</h4>
                                            <p className="text-sm">
                                                Deleting your account will permanently remove all your data, including queues, messages, and
                                                settings. This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="destructive" onClick={() => setIsDeleteAccountDialogOpen(true)}>
                                    Delete Account
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                {/* API Keys Tab */}
                <TabsContent value="api">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>API Keys</CardTitle>
                                <CardDescription>Manage your API keys for programmatic access</CardDescription>
                            </div>
                            <Button onClick={() => setIsCreatingApiKey(true)}>Create API Key</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {apiKeys.map((apiKey) => (
                                    <div key={apiKey.id} className="flex items-center justify-between p-4 rounded-lg border">
                                        <div>
                                            <p className="font-medium">{apiKey.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                                    {apiKey.key.substring(0, 8)}••••••••••••
                                                </code>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => handleCopyApiKey(apiKey.key)}
                                                >
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Created: {formatDate(apiKey.createdAt)} • Last used: {formatDate(apiKey.lastUsed)}
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => handleRevokeApiKey(apiKey.id)}>
                                            Revoke
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>Customize the appearance of the application</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <Label>Theme</Label>
                                <div className="grid grid-cols-3 gap-4">
                                    <div
                                        className={`flex flex-col items-center gap-2 rounded-md border p-4 cursor-pointer ${theme === "light" ? "border-primary bg-primary/5" : ""
                                            }`}
                                        onClick={() => handleThemeChange("light")}
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                                            <Sun className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-medium">Light</span>
                                    </div>

                                    <div
                                        className={`flex flex-col items-center gap-2 rounded-md border p-4 cursor-pointer ${theme === "dark" ? "border-primary bg-primary/5" : ""
                                            }`}
                                        onClick={() => handleThemeChange("dark")}
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                                            <Moon className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-medium">Dark</span>
                                    </div>

                                    <div
                                        className={`flex flex-col items-center gap-2 rounded-md border p-4 cursor-pointer ${theme === "system" ? "border-primary bg-primary/5" : ""
                                            }`}
                                        onClick={() => handleThemeChange("system")}
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                                            <Laptop className="h-5 w-5" />
                                        </div>
                                        <span className="text-sm font-medium">System</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <Label>Language</Label>
                                <Select defaultValue="en">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                        <SelectItem value="de">German</SelectItem>
                                        <SelectItem value="ja">Japanese</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <Label>Time Zone</Label>
                                <Select defaultValue="utc">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select time zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="utc">UTC</SelectItem>
                                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* 2FA Setup Dialog */}
            <Dialog open={is2FADialogOpen} onOpenChange={setIs2FADialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
                        <DialogDescription>
                            Scan the QR code with your authenticator app and enter the verification code.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="flex justify-center">
                            <div className="border p-4 rounded-md bg-muted">
                                <div className="h-40 w-40 bg-muted-foreground/20 flex items-center justify-center">
                                    <p className="text-xs text-center text-muted-foreground">QR Code Placeholder</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="verification-code">Verification Code</Label>
                            <Input
                                id="verification-code"
                                placeholder="Enter 6-digit code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIs2FADialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSetup2FA}>Verify and Enable</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Account Dialog */}
            <AlertDialog open={isDeleteAccountDialogOpen} onOpenChange={setIsDeleteAccountDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                        <div className="rounded-md bg-destructive/10 p-4 text-destructive">
                            <div className="flex items-start">
                                <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                                <div>
                                    <h4 className="font-medium">Warning: This action is irreversible</h4>
                                    <p className="text-sm">
                                        All your data will be permanently deleted, including queues, messages, and settings. You will not be
                                        able to recover your account after this action.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="confirm-delete">Type "DELETE" to confirm</Label>
                            <Input id="confirm-delete" className="mt-2" />
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Create API Key Dialog */}
            <Dialog open={isCreatingApiKey} onOpenChange={setIsCreatingApiKey}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create API Key</DialogTitle>
                        <DialogDescription>Create a new API key for programmatic access to your account.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="api-key-name">API Key Name</Label>
                            <Input
                                id="api-key-name"
                                placeholder="e.g., Production API Key"
                                value={newApiKey.name}
                                onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
                            />
                            <p className="text-sm text-muted-foreground">
                                Give your API key a descriptive name to help you identify it later.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreatingApiKey(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateApiKey}>Create API Key</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
