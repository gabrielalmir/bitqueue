import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowDownToLine,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CheckIcon,
  ChevronRightIcon,
  Database,
  Lock,
  MessageSquare,
  Play,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Database className="h-5 w-5 text-primary" />
            <span>BitQueue</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:flex">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E\")",
                backgroundRepeat: "repeat",
              }}
            ></div>
          </div>

          <div className="container px-4 md:px-6 flex flex-col lg:flex-row py-16 md:py-24 lg:py-32 gap-8 lg:gap-16 items-center">
            <div className="flex flex-col gap-6 lg:w-1/2">
              <Badge className="w-fit" variant="outline">
                Automation Made Simple
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Automate Your Workflows <span className="text-primary">Without Code</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                BitQueue helps businesses automate repetitive tasks and connect their favorite apps without writing a
                single line of code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link href="/register">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Start Free Trial <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                    <Play className="h-4 w-4" /> Watch Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-lg border shadow-xl overflow-hidden bg-background">
                <Image
                  src="/screenshots/dashboard.jpg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="BitQueue Dashboard"
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-secondary/90 p-4 rounded-lg border shadow-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">Task Completed</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-lg border shadow-lg">
                <div className="flex items-center gap-2">
                  <ArrowDownToLine className="h-5 w-5 text-primary" />
                  <span className="font-medium">98% Time Saved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Brands Section */}
          <div className="container px-4 md:px-6 py-8 border-t">
            <p className="text-center text-sm text-muted-foreground mb-6">TRUSTED BY INNOVATIVE COMPANIES</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {["Acme Inc", "Globex", "Initech", "Umbrella Corp", "Stark Industries"].map((brand) => (
                <div key={brand} className="text-xl font-semibold text-muted-foreground/60">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <Badge className="w-fit" variant="outline">
                Features
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">
                Everything You Need to Automate Your Business
              </h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                BitQueue provides powerful automation tools that are easy to use, flexible, and reliable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-background border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">No-Code Builder</h3>
                  <p className="text-muted-foreground">
                    Create complex automations with our intuitive drag-and-drop interface. No technical skills required.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered</h3>
                  <p className="text-muted-foreground">
                    Leverage AI to generate personalized content, analyze data, and make intelligent decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Workflow className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Flexible Workflows</h3>
                  <p className="text-muted-foreground">
                    Design workflows with conditional logic, loops, and parallel processing for any business scenario.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Multi-Channel</h3>
                  <p className="text-muted-foreground">
                    Connect with customers across email, SMS, WhatsApp, Slack, and more from a single platform.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Advanced Analytics</h3>
                  <p className="text-muted-foreground">
                    Gain insights into your automation performance with detailed metrics and customizable dashboards.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Enterprise Security</h3>
                  <p className="text-muted-foreground">
                    Rest easy with SOC 2 compliance, end-to-end encryption, and role-based access controls.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 border-y">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <Badge className="w-fit" variant="outline">
                How It Works
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">Automate in Three Simple Steps</h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                BitQueue makes automation accessible to everyone, regardless of technical background.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                  <span className="text-2xl font-bold text-primary">1</span>
                  <div className="absolute h-16 w-16 rounded-full border-2 border-primary/30 animate-ping opacity-20"></div>
                </div>
                <h3 className="text-xl font-bold">Choose a Trigger</h3>
                <p className="text-muted-foreground">
                  Select what starts your automation: a form submission, scheduled time, webhook, or database change.
                </p>
                <Image
                  src="/screenshots/dashboard.jpg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Choose a Trigger"
                  className="rounded-lg border shadow-sm mt-4"
                />
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                  <span className="text-2xl font-bold text-primary">2</span>
                  <div className="absolute h-16 w-16 rounded-full border-2 border-primary/30 animate-ping opacity-20 animation-delay-200"></div>
                </div>
                <h3 className="text-xl font-bold">Add Actions</h3>
                <p className="text-muted-foreground">
                  Define what happens next: send emails, update spreadsheets, post to Slack, or use AI to generate
                  content.
                </p>
                <Image
                  src="/screenshots/dashboard.jpg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Add Actions"
                  className="rounded-lg border shadow-sm mt-4"
                />
              </div>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                  <span className="text-2xl font-bold text-primary">3</span>
                  <div className="absolute h-16 w-16 rounded-full border-2 border-primary/30 animate-ping opacity-20 animation-delay-400"></div>
                </div>
                <h3 className="text-xl font-bold">Activate & Monitor</h3>
                <p className="text-muted-foreground">
                  Turn on your automation and track its performance with real-time analytics and detailed logs.
                </p>
                <Image
                  src="/screenshots/dashboard.jpg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Activate and Monitor"
                  className="rounded-lg border shadow-sm mt-4"
                />
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Link href="#demo">
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="h-4 w-4" /> Watch Full Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <Badge className="w-fit" variant="outline">
                Use Cases
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">Solutions for Every Department</h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                See how BitQueue can transform operations across your entire organization.
              </p>
            </div>

            <Tabs defaultValue="marketing" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="customer-service">Customer Service</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
              </TabsList>
              <TabsContent value="marketing" className="mt-0">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Streamline Your Marketing Workflows</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Automated Lead Nurturing</p>
                          <p className="text-muted-foreground">
                            Create personalized email sequences that adapt based on recipient behavior.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Social Media Management</p>
                          <p className="text-muted-foreground">
                            Schedule and publish content across multiple platforms from a single dashboard.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Campaign Analytics</p>
                          <p className="text-muted-foreground">
                            Automatically collect and visualize performance data from all your marketing channels.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Link href="/use-cases/marketing">
                        <Button variant="outline" className="gap-2">
                          Learn More <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <Image
                      src="/screenshots/dashboard.jpg?height=400&width=600"
                      width={600}
                      height={400}
                      alt="Marketing Automation"
                      className="rounded-lg border shadow-md"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="sales" className="mt-0">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Accelerate Your Sales Process</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Lead Qualification</p>
                          <p className="text-muted-foreground">
                            Automatically score and route leads to the right sales representatives.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Proposal Generation</p>
                          <p className="text-muted-foreground">
                            Create customized proposals with AI-powered content based on client requirements.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Follow-up Sequences</p>
                          <p className="text-muted-foreground">
                            Never miss a follow-up with automated reminders and personalized messages.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Link href="/use-cases/sales">
                        <Button variant="outline" className="gap-2">
                          Learn More <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <Image
                      src="/screenshots/dashboard.jpg?height=400&width=600"
                      width={600}
                      height={400}
                      alt="Sales Automation"
                      className="rounded-lg border shadow-md"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="customer-service" className="mt-0">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Enhance Customer Support</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Ticket Routing</p>
                          <p className="text-muted-foreground">
                            Automatically assign support tickets to the right team members based on expertise.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">AI-Powered Responses</p>
                          <p className="text-muted-foreground">
                            Generate personalized support responses with AI to resolve issues faster.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Customer Satisfaction Surveys</p>
                          <p className="text-muted-foreground">
                            Automatically send and analyze feedback to improve service quality.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Link href="/use-cases/customer-service">
                        <Button variant="outline" className="gap-2">
                          Learn More <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <Image
                      src="/screenshots/dashboard.jpg?height=400&width=600"
                      width={600}
                      height={400}
                      alt="Customer Service Automation"
                      className="rounded-lg border shadow-md"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="operations" className="mt-0">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Optimize Business Operations</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Inventory Management</p>
                          <p className="text-muted-foreground">
                            Automate stock alerts and reordering processes to prevent shortages.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Approval Workflows</p>
                          <p className="text-muted-foreground">
                            Streamline approvals for purchases, time off, and other business processes.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckIcon className="h-6 w-6 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">Reporting Automation</p>
                          <p className="text-muted-foreground">
                            Generate and distribute key business reports on schedule to stakeholders.
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <Link href="/use-cases/operations">
                        <Button variant="outline" className="gap-2">
                          Learn More <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <Image
                      src="/screenshots/dashboard.jpg?height=400&width=600"
                      width={600}
                      height={400}
                      alt="Operations Automation"
                      className="rounded-lg border shadow-md"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* For Developers Section */}
        <section className="py-16 md:py-24 bg-muted/30 border-y">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <Badge className="w-fit" variant="outline">
                For Developers
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">Powerful API & Developer Tools</h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                Integrate BitQueue into your applications with our comprehensive API and developer resources.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">RESTful API</h3>
                      <p className="text-muted-foreground mt-1">
                        Our comprehensive REST API gives you full programmatic access to queues, messages, and
                        automations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Webhooks</h3>
                      <p className="text-muted-foreground mt-1">
                        Subscribe to real-time events with webhooks to keep your systems in sync with BitQueue.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.29 7 12 12 20.71 7"></polyline>
                        <line x1="12" x2="12" y1="22" y2="12"></line>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">SDKs & Libraries</h3>
                      <p className="text-muted-foreground mt-1">
                        Official client libraries for JavaScript, Python, Ruby, and more to accelerate your integration.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <circle cx="18" cy="18" r="3"></circle>
                        <circle cx="6" cy="6" r="3"></circle>
                        <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
                        <line x1="6" x2="6" y1="9" y2="21"></line>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Custom Integrations</h3>
                      <p className="text-muted-foreground mt-1">
                        Build custom integrations to connect BitQueue with your internal systems and third-party
                        services.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/developers">
                    <Button variant="outline" className="gap-2">
                      Explore Developer Docs <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-6 -left-6 bg-background p-4 rounded-lg border shadow-lg z-10">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium ml-1">bitqueue-api.js</span>
                  </div>
                </div>

                <div className="rounded-lg border bg-black text-white font-mono text-sm overflow-hidden shadow-xl">
                  <div className="p-4 space-y-4">
                    <div className="text-blue-400">// Initialize the BitQueue client</div>
                    <div>
                      <span className="text-purple-400">const</span> <span className="text-green-400">bitqueue</span> ={" "}
                      <span className="text-purple-400">new</span> <span className="text-yellow-400">BitQueue</span>(
                      {"{"}
                      <br />
                      <span className="pl-4">
                        apiKey: <span className="text-orange-400">'YOUR_API_KEY'</span>,
                      </span>
                      <br />
                      <span className="pl-4">
                        version: <span className="text-orange-400">'v1'</span>
                      </span>
                      <br />
                      {"}"});
                    </div>
                    <div className="text-blue-400">// Create a new queue</div>
                    <div>
                      <span className="text-purple-400">async function</span>{" "}
                      <span className="text-yellow-400">createQueue</span>() {"{"}
                      <br />
                      <span className="pl-4">
                        <span className="text-purple-400">const</span> <span className="text-green-400">queue</span> ={" "}
                        <span className="text-purple-400">await</span> bitqueue.queues.create({"{"}
                      </span>
                      <br />
                      <span className="pl-8">
                        name: <span className="text-orange-400">'order-processing'</span>,
                      </span>
                      <br />
                      <span className="pl-8">
                        description: <span className="text-orange-400">'Processes incoming orders'</span>
                      </span>
                      <br />
                      <span className="pl-4">{"}"});</span>
                      <br />
                      <span className="pl-4">
                        <span className="text-purple-400">return</span> queue;
                      </span>
                      <br />
                      {"}"}
                    </div>
                    <div className="text-blue-400">// Send a message to the queue</div>
                    <div>
                      <span className="text-purple-400">async function</span>{" "}
                      <span className="text-yellow-400">sendMessage</span>(queueId, data) {"{"}
                      <br />
                      <span className="pl-4">
                        <span className="text-purple-400">const</span> <span className="text-green-400">message</span> ={" "}
                        <span className="text-purple-400">await</span> bitqueue.messages.send({"{"}
                      </span>
                      <br />
                      <span className="pl-8">queueId,</span>
                      <br />
                      <span className="pl-8">body: data</span>
                      <br />
                      <span className="pl-4">{"}"});</span>
                      <br />
                      <span className="pl-4">
                        <span className="text-purple-400">return</span> message;
                      </span>
                      <br />
                      {"}"}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
                      >
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <span className="text-xs font-medium mt-1">JavaScript</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-blue-600 dark:text-blue-400"
                      >
                        <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z"></path>
                        <path d="M12 2v10l4.5 7"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium mt-1">Python</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-green-600 dark:text-green-400"
                      >
                        <path d="M16 16h-3a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path>
                        <path d="M8 8h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5H8"></path>
                      </svg>
                    </div>
                    <span className="text-xs font-medium mt-1">Ruby</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-background border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 h-full">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-primary"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"></path>
                          <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">API Reference</h3>
                        <p className="text-muted-foreground mt-2">
                          Comprehensive documentation of all API endpoints, request parameters, and response formats.
                        </p>
                      </div>
                      <div className="mt-auto pt-4">
                        <Link href="/developers/api-reference">
                          <Button variant="outline" className="w-full">
                            View API Reference
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 h-full">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-primary"
                        >
                          <line x1="4" x2="20" y1="12" y2="12"></line>
                          <line x1="4" x2="20" y1="6" y2="6"></line>
                          <line x1="4" x2="20" y1="18" y2="18"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Getting Started</h3>
                        <p className="text-muted-foreground mt-2">
                          Step-by-step guides to help you set up your developer account, obtain API keys, and build your
                          first integration.
                        </p>
                      </div>
                      <div className="mt-auto pt-4">
                        <Link href="/developers/getting-started">
                          <Button variant="outline" className="w-full">
                            Read Guide
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 h-full">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-primary"
                        >
                          <path d="M12 2H2v10h10V2z"></path>
                          <path d="M12 12H2v10h10V12z"></path>
                          <path d="M22 2h-10v10h10V2z"></path>
                          <path d="M22 12h-10v10h10V12z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Code Examples</h3>
                        <p className="text-muted-foreground mt-2">
                          Ready-to-use code samples in multiple languages for common integration scenarios and use
                          cases.
                        </p>
                      </div>
                      <div className="mt-auto pt-4">
                        <Link href="/developers/examples">
                          <Button variant="outline" className="w-full">
                            Browse Examples
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 p-6 rounded-lg border bg-background">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-2">Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Secure your API requests with API keys or OAuth 2.0. All requests must be made over HTTPS.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Rate Limits</h4>
                  <p className="text-sm text-muted-foreground">
                    Pro plans include 10,000 API requests per day. Enterprise plans offer customizable limits.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Error Handling</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed error responses with status codes, error types, and helpful messages for troubleshooting.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Versioning</h4>
                  <p className="text-sm text-muted-foreground">
                    API versions are date-based. We maintain backward compatibility and provide migration guides.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Create Developer Account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <Badge className="w-fit" variant="outline">
                Testimonials
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">Loved by Businesses Worldwide</h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                See what our customers have to say about how BitQueue has transformed their operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-background border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-lg italic">
                      "BitQueue has saved our marketing team 15+ hours per week. We've automated our entire lead
                      nurturing process and the results have been incredible."
                    </blockquote>
                    <div className="flex items-center gap-4 mt-4">
                      <Image
                        src="/screenshots/dashboard.jpg?height=50&width=50"
                        width={50}
                        height={50}
                        alt="Sarah Johnson"
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">Marketing Director, TechCorp</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-lg italic">
                      "The AI capabilities in BitQueue are game-changing. We're now generating personalized responses
                      for customer inquiries that are indistinguishable from our support team."
                    </blockquote>
                    <div className="flex items-center gap-4 mt-4">
                      <Image
                        src="/screenshots/dashboard.jpg?height=50&width=50"
                        width={50}
                        height={50}
                        alt="Michael Chen"
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">Michael Chen</p>
                        <p className="text-sm text-muted-foreground">Customer Success Manager, Retail Plus</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-lg italic">
                      "As a non-technical founder, I was skeptical about automation tools. BitQueue proved me wrong -
                      it's incredibly intuitive and has transformed how we operate."
                    </blockquote>
                    <div className="flex items-center gap-4 mt-4">
                      <Image
                        src="/screenshots/dashboard.jpg?height=50&width=50"
                        width={50}
                        height={50}
                        alt="Jessica Rodriguez"
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">Jessica Rodriguez</p>
                        <p className="text-sm text-muted-foreground">Founder & CEO, GreenStart</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium">
                <span className="text-muted-foreground mr-2">Average rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 font-bold">4.9/5</span>
                <span className="ml-2 text-muted-foreground">(200+ reviews)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <Badge className="w-fit" variant="outline">
                Pricing
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">Simple, Transparent Pricing</h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                Choose the plan that works best for your business needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-background border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-5">
                      <h3 className="text-2xl font-bold">Free Trial</h3>
                      <p className="text-muted-foreground">Experience BitQueue risk-free</p>
                    </div>
                    <div className="mb-5">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-muted-foreground ml-1">for 14 days</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Up to 5,000 messages</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Full dashboard access</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Basic queue management</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Community support</span>
                      </li>
                    </ul>
                    <Link href="/register" className="w-full mt-auto">
                      <Button className="w-full">Start Free Trial</Button>
                    </Link>
                    <p className="text-xs text-center text-muted-foreground mt-3">No credit card required</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border shadow-sm relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-5">
                      <h3 className="text-2xl font-bold">Pro</h3>
                      <p className="text-muted-foreground">For growing businesses</p>
                    </div>
                    <div className="mb-5">
                      <span className="text-4xl font-bold">$49</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>100,000 messages included</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Flexible usage ($0.001/msg over 100k)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Advanced automations</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>AI-powered features</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Team access (up to 5 members)</span>
                      </li>
                    </ul>
                    <Link href="/register" className="w-full mt-auto">
                      <Button className="w-full">Subscribe to Pro</Button>
                    </Link>
                    <p className="text-xs text-center text-muted-foreground mt-3">14-day free trial included</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-5">
                      <h3 className="text-2xl font-bold">Enterprise</h3>
                      <p className="text-muted-foreground">For larger organizations</p>
                    </div>
                    <div className="mb-5">
                      <span className="text-4xl font-bold">Custom</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Unlimited messages</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Custom integrations</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Advanced security features</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Dedicated account manager</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>24/7 premium support</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Custom SLA</span>
                      </li>
                    </ul>
                    <Link href="/contact-sales" className="w-full mt-auto">
                      <Button variant="outline" className="w-full">
                        Contact Sales
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-muted-foreground mt-3">Custom pricing for your needs</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">All plans include:</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-3xl mx-auto">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Data encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Regular updates</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-6">Ready to Automate Your Business?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Join thousands of businesses that use BitQueue to save time, reduce errors, and grow faster with
                powerful automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Start Your Free Trial <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                    Schedule a Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                No credit card required. 14-day free trial. Cancel anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Database className="h-5 w-5 text-primary" />
                <span>BitQueue</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Powerful automation for businesses of all sizes. Connect your apps, automate workflows, and focus on
                what matters.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-muted-foreground hover:text-foreground transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="text-muted-foreground hover:text-foreground transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/customers" className="text-muted-foreground hover:text-foreground transition-colors">
                    Customers
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="text-muted-foreground hover:text-foreground transition-colors">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} BitQueue. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
