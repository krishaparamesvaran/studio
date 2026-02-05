
"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      desc: "Perfect for startups and small teams getting started.",
      features: [
        "Up to 5 Users",
        "10GB Storage",
        "Basic Automation",
        "Email Support",
        "Core Analytics",
      ],
      cta: "Start Free Trial",
      variant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro",
      price: "$99",
      desc: "Everything you need for scaling operations smoothly.",
      features: [
        "Up to 25 Users",
        "100GB Storage",
        "Advanced AI Automation",
        "Priority 24/7 Support",
        "Custom Dashboards",
        "Third-party Integrations",
      ],
      cta: "Go Pro",
      variant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Advanced compliance and dedicated resources for big teams.",
      features: [
        "Unlimited Users",
        "Unlimited Storage",
        "White-label Branding",
        "Dedicated Manager",
        "SSO & Advanced Security",
        "Custom Development",
      ],
      cta: "Contact Sales",
      variant: "outline" as const,
      popular: false,
    },
  ];

  const comparison = [
    { feature: "Users", basic: "5", pro: "25", enterprise: "Unlimited" },
    { feature: "Automations", basic: "10/mo", pro: "Unlimited", enterprise: "Unlimited" },
    { feature: "Integrations", basic: true, pro: true, enterprise: true },
    { feature: "AI Explanations", basic: false, pro: true, enterprise: true },
    { feature: "Custom Branding", basic: false, font: false, enterprise: true },
    { feature: "Support", basic: "Email", pro: "Priority", enterprise: "Dedicated" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow pt-32">
        <section className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-headline font-bold">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your current needs and scale when you're ready. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                  plan.popular
                    ? "bg-white shadow-2xl scale-105 border-primary ring-2 ring-primary/20 z-10"
                    : "bg-white/50 shadow-lg hover:shadow-xl border-border"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white">
                    Most Popular
                  </Badge>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                  </div>
                  <p className="text-muted-foreground">{plan.desc}</p>
                </div>
                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" variant={plan.variant} className="w-full h-12 text-md font-bold">
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="max-w-4xl mx-auto py-20">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">Feature Comparison</h2>
            <div className="rounded-2xl border overflow-hidden bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="p-6 text-left font-bold text-sm uppercase">Feature</th>
                    <th className="p-6 text-center font-bold text-sm uppercase">Basic</th>
                    <th className="p-6 text-center font-bold text-sm uppercase">Pro</th>
                    <th className="p-6 text-center font-bold text-sm uppercase">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {comparison.map((row) => (
                    <tr key={row.feature} className="hover:bg-muted/20 transition-colors">
                      <td className="p-6 text-sm font-medium">{row.feature}</td>
                      <td className="p-6 text-center">
                        {typeof row.basic === "boolean" ? (
                          row.basic ? <Check className="w-5 h-5 mx-auto text-primary" /> : <X className="w-5 h-5 mx-auto text-muted-foreground/30" />
                        ) : <span className="text-sm font-semibold">{row.basic}</span>}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? <Check className="w-5 h-5 mx-auto text-primary" /> : <X className="w-5 h-5 mx-auto text-muted-foreground/30" />
                        ) : <span className="text-sm font-semibold">{row.pro}</span>}
                      </td>
                      <td className="p-6 text-center">
                        {typeof row.enterprise === "boolean" ? (
                          row.enterprise ? <Check className="w-5 h-5 mx-auto text-primary" /> : <X className="w-5 h-5 mx-auto text-muted-foreground/30" />
                        ) : <span className="text-sm font-semibold">{row.enterprise}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
