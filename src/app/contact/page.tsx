
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, Mail, Building, Phone, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contact_submissions"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "One of our specialists will reach out shortly.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-headline font-bold">Let's Talk Growth.</h1>
                <p className="text-xl text-muted-foreground">
                  Our team is ready to help you find the perfect setup for your organization's unique workflows.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Mail />
                  </div>
                  <div>
                    <h4 className="font-bold">Sales & Inquiries</h4>
                    <p className="text-muted-foreground text-sm">sales@fortumars.com</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm border">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Building />
                  </div>
                  <div>
                    <h4 className="font-bold">Global Headquarters</h4>
                    <p className="text-muted-foreground text-sm">123 Innovator Way, San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-foreground text-white rounded-3xl space-y-4">
                <h3 className="text-2xl font-bold">Request a Custom Demo</h3>
                <p className="text-white/70">
                  See Fortumars in action with a tailored walkthrough focusing on your industry's specific challenges.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <span>Discover bottlenecks in your current system.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                  <span>Visualize your ideal workflow.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  <span>Get a dedicated success plan.</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="shadow-2xl border-none rounded-3xl overflow-hidden sticky top-32">
                <CardContent className="p-10 bg-white">
                  {submitted ? (
                    <div className="text-center py-20 space-y-6 animate-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                        <CheckCircle2 size={40} />
                      </div>
                      <h2 className="text-3xl font-bold">Request Received!</h2>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. A Fortumars specialist will contact you at {formData.email} within 24 hours.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline">
                        Send another message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Work Email</Label>
                          <Input id="email" type="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" placeholder="Acme Inc." value={formData.company} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input id="website" placeholder="https://..." value={formData.website} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">How can we help you?</Label>
                        <Textarea id="message" placeholder="Tell us about your project requirements..." rows={5} value={formData.message} onChange={handleChange} required />
                      </div>
                      <Button type="submit" className="w-full h-14 text-lg font-bold" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Submit Inquiry"}
                      </Button>
                      <p className="text-center text-xs text-muted-foreground">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
