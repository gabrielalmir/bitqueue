import { CheckCircle2Icon, CheckIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function PricingSection() {
    return (
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
                  <CheckCircle2Icon className="h-5 w-5 text-primary" />
                  <span>99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="h-5 w-5 text-primary" />
                  <span>Data encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="h-5 w-5 text-primary" />
                  <span>Regular updates</span>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}
