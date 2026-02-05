
"use client";

import { useEffect, useState } from "react";
import { generateDynamicTestimonials, type GenerateDynamicTestimonialsOutput } from "@/ai/flows/dynamic-testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Quote } from "lucide-react";

export function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<GenerateDynamicTestimonialsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const result = await generateDynamicTestimonials({
          industry: "Technology and Software",
          useCase: "Enterprise Workflow Automation",
        });
        setTestimonials(result);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  const items = [
    { text: testimonials?.testimonial1, author: "Sarah Jenkins", role: "CTO, TechFlow", initial: "SJ" },
    { text: testimonials?.testimonial2, author: "Marcus Aurelius", role: "Product Manager, Innovate", initial: "MA" },
    { text: testimonials?.testimonial3, author: "Elena Rodriguez", role: "Operations Lead, GlobalOps", initial: "ER" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white rounded-2xl overflow-hidden group">
          <CardContent className="p-8 relative">
            <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
            <p className="text-muted-foreground italic mb-8 relative z-10">
              "{item.text}"
            </p>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {item.initial}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-foreground">{item.author}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
