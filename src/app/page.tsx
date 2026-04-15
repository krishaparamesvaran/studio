
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TestimonialSection } from "@/components/testimonial-section";
import { CheckCircle2, ArrowRight, Zap, Shield, BarChart3, Users } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-dashboard");
  const logos = PlaceHolderImages.filter(img => img.id.startsWith("customer-logo"));

  const features = [
    {
      title: "Smart Automation",
      desc: "Remove tedious manual tasks with AI-powered workflow triggers.",
      icon: <Zap className="w-6 h-6 text-primary" />,
    },
    {
      title: "Enterprise Security",
      desc: "Bank-grade encryption and SOC2 compliance out of the box.",
      icon: <Shield className="w-6 h-6 text-primary" />,
    },
    {
      title: "Deep Analytics",
      desc: "Turn your business data into actionable growth insights.",
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
    },
    {
      title: "Team Collaboration",
      desc: "Built for teams of all sizes to stay aligned and move faster.",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 pb-20">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold animate-in fade-in slide-in-from-bottom-2 duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New: AI Workflow 2.0 is live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
              Empower Your Business <br />
              <span className="text-primary">Without the Complexity</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-900">
              Fortumars is the unified platform for teams to manage operations, automate workflows, and visualize success—all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto px-8 h-14 text-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-14 text-lg">
                  Book a Demo
                </Button>
              </Link>
            </div>

            <div className="relative mt-12 w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border bg-muted animate-in fade-in zoom-in duration-1000">
              <Image
                src={heroImage?.imageUrl || "https://picsum.photos/seed/fortumars1/1200/800"}
                alt={heroImage?.description || "Platform Dashboard"}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Customer Logos */}
        <section className="bg-muted/30 py-12 border-y">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              Trusted by 10,000+ Teams Worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {logos.map((logo, idx) => (
                <div key={idx} className="relative w-32 h-12">
                  <Image
                    src={logo.imageUrl}
                    alt={logo.description}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-24 container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Built for Peak Performance</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to scale your operations without outgrowing your software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-8 bg-white rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-foreground text-white overflow-hidden relative">
          <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 items-center gap-12">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                Designed to adapt to your growth.
              </h2>
              <p className="text-lg text-white/70">
                Unlike traditional CRM or ERP systems, Fortumars is built on a modular architecture. Start with what you need and expand as you scale.
              </p>
              <ul className="space-y-4">
                {["Zero deployment time", "Customizable modules", "Real-time sync"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-6 h-6" />
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/product">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  Discover Solutions <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative h-[500px] w-full bg-white/5 rounded-2xl border border-white/10 p-8 flex items-center justify-center">
              {/* Abstract graphic or feature visual */}
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto blur-3xl opacity-20 animate-pulse"></div>
                <p className="text-white/40 font-mono text-sm">SECURE ENVIRONMENT ACTIVE</p>
                <div className="flex gap-4 justify-center">
                    <div className="h-2 w-16 bg-primary/20 rounded-full"></div>
                    <div className="h-2 w-24 bg-primary/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Trust Section */}
        <section className="py-24 container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Hear From Our Partners</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fortumars empowers leaders across every industry. See how they use our platform.
            </p>
          </div>
          <TestimonialSection />
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5 border-t">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl space-y-8">
            <h2 className="text-4xl font-headline font-bold">Ready to transform your business?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of teams who trust Fortumars to power their daily operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="px-10 h-14 text-lg">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-10 h-14 text-lg">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
