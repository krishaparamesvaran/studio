
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, ArrowRight, Layers, BarChart, Database, ShieldCheck } from "lucide-react";

export default function ProductPage() {
  const productImg = PlaceHolderImages.find(img => img.id === "hero-dashboard");

  const solutions = [
    { title: "Unified CRM", desc: "Keep all your customer interactions in one secure vault accessible to every department.", icon: <Database /> },
    { title: "Advanced BI", desc: "Complex data modeling made simple with our drag-and-drop analytics builder.", icon: <BarChart /> },
    { title: "Project Engine", desc: "Manage projects from inception to delivery with integrated time tracking.", icon: <Layers /> },
    { title: "Compliance Suite", desc: "Automate your regulatory reporting and ensure data privacy by default.", icon: <ShieldCheck /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow pt-32">
        {/* Intro */}
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="grid lg:grid-cols-2 items-center gap-16">
            <div className="space-y-8">
              <Badge variant="outline" className="px-3 py-1 text-primary border-primary">The Operating System for Success</Badge>
              <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight">
                One Platform. <br />
                <span className="text-primary">Infinite Possibilities.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Fortumars eliminates silos by providing a single source of truth for your entire organization. From marketing to finance, everyone works in sync.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="px-8">Get Started</Button>
                <Button size="lg" variant="ghost">Watch the Tour</Button>
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border">
              <Image 
                src={productImg?.imageUrl || "https://picsum.photos/seed/fortumars1/800/800"} 
                alt="Product Dashboard" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted/30 py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-headline font-bold">Beyond the Standard</h2>
              <p className="text-muted-foreground text-lg">
                Discover why Fortune 500 companies are switching to Fortumars for their mission-critical operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutions.map((sol, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border hover:border-primary/50 transition-colors">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                    {sol.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{sol.title}</h3>
                  <p className="text-muted-foreground mb-6">{sol.desc}</p>
                  <Button variant="link" className="p-0 text-primary font-bold">Learn more <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-video">
                <Image src="https://picsum.photos/seed/comparison/800/450" alt="Workflow comparison" fill className="object-cover" />
            </div>
            <div className="space-y-8">
                <h2 className="text-4xl font-headline font-bold">Why Fortumars wins.</h2>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Check className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold">Zero Integration Debt</h4>
                            <p className="text-muted-foreground">Unlike cobbled-together solutions, Fortumars is natively integrated. No more broken API connections.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Check className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold">Lightning Performance</h4>
                            <p className="text-muted-foreground">Our distributed edge architecture ensures zero latency for global teams.</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${className}`}>
      {children}
    </span>
  );
}
