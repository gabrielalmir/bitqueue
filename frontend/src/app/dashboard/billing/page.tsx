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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Check, CreditCard, Download } from "lucide-react"
import { useState } from "react"

const currentPlan = {
  name: "Pro",
  price: 49,
  billingCycle: "monthly",
  nextBillingDate: "2023-09-15",
  features: [
    "100,000 messages included",
    "Flexible usage ($0.001/msg over 100k)",
    "Advanced automations",
    "AI-powered features",
    "Priority support",
    "Team access (up to 5 members)",
  ],
  usage: {
    queues: {
      used: 12,
      limit: 20,
      percentage: 60,
    },
    messages: {
      used: 482219,
      limit: 1000000,
      percentage: 48,
    },
    storage: {
      used: 2.4,
      limit: 5,
      percentage: 48,
    },
  },
}

const plans = [
  {
    id: "free-trial",
    name: "Free Trial",
    price: 0,
    description: "Experience BitQueue risk-free",
    features: [
      "Up to 5,000 messages",
      "Full dashboard access",
      "Basic queue management",
      "Community support",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    description: "For growing businesses",
    features: [
      "100,000 messages included",
      "Flexible usage ($0.001/msg over 100k)",
      "Advanced automations",
      "AI-powered features",
      "Priority support",
      "Team access (up to 5 members)",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    description: "For larger organizations",
    features: [
      "Unlimited messages",
      "Custom integrations",
      "Advanced security features",
      "Dedicated account manager",
      "24/7 premium support",
      "Custom SLA",
    ],
    popular: false,
  },
]

const paymentMethods = [
  {
    id: "pm_1",
    type: "card",
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2024,
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "card",
    brand: "mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2025,
    isDefault: false,
  },
]

const invoices = [
  {
    id: "inv_1",
    date: "2023-08-15",
    amount: 49.0,
    status: "paid",
  },
  {
    id: "inv_2",
    date: "2023-07-15",
    amount: 49.0,
    status: "paid",
  },
  {
    id: "inv_3",
    date: "2023-06-15",
    amount: 49.0,
    status: "paid",
  },
  {
    id: "inv_4",
    date: "2023-05-15",
    amount: 49.0,
    status: "paid",
  },
  {
    id: "inv_5",
    date: "2023-04-15",
    amount: 49.0,
    status: "paid",
  },
]

export default function BillingPage() {
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState(currentPlan.name.toLowerCase())
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [isChangingPlan, setIsChangingPlan] = useState(false)
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvc: "",
    setAsDefault: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPaymentMethod((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setNewPaymentMethod((prev) => ({ ...prev, setAsDefault: checked }))
  }

  const handleAddPaymentMethod = () => {
    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
    })
    setIsAddingPaymentMethod(false)
    setNewPaymentMethod({
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvc: "",
      setAsDefault: false,
    })
  }

  const handleSetDefaultPaymentMethod = (id: string) => {
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    })
  }

  const handleDeletePaymentMethod = (id: string) => {
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed.",
    })
  }

  const handleChangePlan = () => {
    if (selectedPlan === currentPlan.name.toLowerCase()) {
      toast({
        title: "No change needed",
        description: "You are already on this plan.",
      })
      setIsChangingPlan(false)
      return
    }

    toast({
      title: "Plan updated",
      description: `Your subscription has been updated to the ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan.`,
    })
    setIsChangingPlan(false)
  }

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription canceled",
      description: "Your subscription has been canceled. You will have access until the end of your billing period.",
      variant: "destructive",
    })
    setIsCancelDialogOpen(false)
  }

  const getPrice = (price: number) => {
    if (billingCycle === "yearly") {
      return (price * 12 * 0.8).toFixed(2)
    }
    return price.toFixed(2)
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your current subscription details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                    <p className="text-muted-foreground">
                      ${currentPlan.price}/month, billed {currentPlan.billingCycle}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-primary">
                    Active
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Next billing date: {new Date(currentPlan.nextBillingDate).toLocaleDateString()}
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Plan Features</h4>
                  <ul className="space-y-1">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsChangingPlan(true)}>
                  Change Plan
                </Button>
                <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Cancel Subscription</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will cancel your subscription at the end of your current billing period. You will lose
                        access to premium features after {new Date(currentPlan.nextBillingDate).toLocaleDateString()}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelSubscription}>Cancel Subscription</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage</CardTitle>
                <CardDescription>Your current resource usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-primary" />
                      <span>
                        Queues ({currentPlan.usage.queues.used}/{currentPlan.usage.queues.limit})
                      </span>
                    </div>
                    <span className="font-medium">{currentPlan.usage.queues.percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${currentPlan.usage.queues.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-blue-500" />
                      <span>
                        Messages ({currentPlan.usage.messages.used.toLocaleString()}/
                        {currentPlan.usage.messages.limit.toLocaleString()})
                      </span>
                    </div>
                    <span className="font-medium">{currentPlan.usage.messages.percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${currentPlan.usage.messages.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full bg-green-500" />
                      <span>
                        Storage ({currentPlan.usage.storage.used} GB/{currentPlan.usage.storage.limit} GB)
                      </span>
                    </div>
                    <span className="font-medium">{currentPlan.usage.storage.percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${currentPlan.usage.storage.percentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Plans Tab */}
        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>Choose the plan that works best for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-end space-x-2">
                <span className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}>Monthly</span>
                <Switch
                  checked={billingCycle === "yearly"}
                  onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
                />
                <span className={billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}>
                  Yearly{" "}
                  <Badge variant="outline" className="ml-1 text-xs">
                    Save 20%
                  </Badge>
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan) => (
                  <Card key={plan.id} className={`relative overflow-hidden ${plan.popular ? "border-primary" : ""}`}>
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                        Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <span className="text-3xl font-bold">${getPrice(plan.price as number)}</span>
                        <span className="text-muted-foreground">{billingCycle === "monthly" ? "/month" : "/year"}</span>
                      </div>

                      <ul className="space-y-2 text-sm">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="mr-2 h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={plan.id === currentPlan.name.toLowerCase() ? "outline" : "default"}
                        className="w-full"
                        onClick={() => {
                          setSelectedPlan(plan.id)
                          setIsChangingPlan(true)
                        }}
                        disabled={plan.id === currentPlan.name.toLowerCase()}
                      >
                        {plan.id === currentPlan.name.toLowerCase() ? "Current Plan" : "Select Plan"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Change Plan Dialog */}
          <AlertDialog open={isChangingPlan} onOpenChange={setIsChangingPlan}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Change Subscription Plan</AlertDialogTitle>
                <AlertDialogDescription>
                  {selectedPlan === "free" && currentPlan.name.toLowerCase() !== "free"
                    ? "You are downgrading to the Free plan. You will lose access to premium features at the end of your current billing period."
                    : selectedPlan === "pro" && currentPlan.name.toLowerCase() === "business"
                      ? "You are downgrading to the Pro plan. Some features may no longer be available."
                      : selectedPlan === "business" && currentPlan.name.toLowerCase() !== "business"
                        ? "You are upgrading to the Business plan. You will be charged the difference immediately."
                        : "Are you sure you want to change your subscription plan?"}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{plans.find((p) => p.id === selectedPlan)?.name} Plan</p>
                    <p className="text-sm text-muted-foreground">
                      ${getPrice(plans.find((p) => p.id === selectedPlan)?.price || 0)}
                      {billingCycle === "monthly" ? "/month" : "/year"}
                    </p>
                  </div>
                  <RadioGroup
                    defaultValue={billingCycle}
                    onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yearly" id="yearly" />
                        <Label htmlFor="yearly">Yearly (Save 20%)</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleChangePlan}>Confirm Change</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-14 items-center justify-center rounded-md border bg-muted">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium capitalize">
                        {method.brand} •••• {method.last4}
                        {method.isDefault && (
                          <Badge variant="outline" className="ml-2">
                            Default
                          </Badge>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expMonth}/{method.expYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button variant="outline" size="sm" onClick={() => handleSetDefaultPaymentMethod(method.id)}>
                        Set as Default
                      </Button>
                    )}
                    {!method.isDefault && (
                      <Button variant="ghost" size="sm" onClick={() => handleDeletePaymentMethod(method.id)}>
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {!isAddingPaymentMethod ? (
                <Button onClick={() => setIsAddingPaymentMethod(true)}>Add Payment Method</Button>
              ) : (
                <div className="space-y-4 border rounded-lg p-4">
                  <h3 className="font-medium">Add New Payment Method</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        name="cardholderName"
                        placeholder="John Doe"
                        value={newPaymentMethod.cardholderName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        value={newPaymentMethod.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={newPaymentMethod.expiryDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                          value={newPaymentMethod.cvc}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="setAsDefault"
                        checked={newPaymentMethod.setAsDefault}
                        onCheckedChange={handleSwitchChange}
                      />
                      <Label htmlFor="setAsDefault">Set as default payment method</Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddingPaymentMethod(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === "paid" ? "outline" : "secondary"}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
