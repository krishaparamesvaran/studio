
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutPage() {
  const teamImg = PlaceHolderImages.find(img => img.id === "about-team");

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <main className="flex-grow pt-32">
        <section className="container mx-auto px-4 md:px-6 mb-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold">Our Mission: <br /><span className="text-primary">Radical Efficiency.</span></h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Founded in 2023, Fortumars was born out of a frustration with bloated, fragmented software systems that hindered growth instead of fueling it.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 pb-24">
          <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl mb-24">
            <Image 
              src={teamImg?.imageUrl || "https://picsum.photos/seed/teamwork/1200/500"} 
              alt="The Fortumars Team" 
              fill 
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">The Vision</h3>
              <p className="text-muted-foreground">
                To create a world where business technology is as intuitive as the human mind, enabling teams to reach their full potential without friction.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">The Philosophy</h3>
              <p className="text-muted-foreground">
                We believe in modularity, security by design, and AI that empowers people rather than replacing them.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">The Promise</h3>
              <p className="text-muted-foreground">
                We stand by our software. We promise 99.99% uptime and a partnership approach to every client engagement.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 py-24 border-y">
            <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
                <h2 className="text-4xl font-headline font-bold mb-8">Join the journey.</h2>
                <p className="text-lg text-muted-foreground mb-12">
                    We are always looking for visionary partners and brilliant minds to help us build the future of work.
                </p>
                <div className="flex justify-center gap-12 text-center">
                    <div>
                        <div className="text-4xl font-bold text-primary">100+</div>
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Innovators</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-primary">15</div>
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Countries</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-primary">24/7</div>
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Dedication</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
