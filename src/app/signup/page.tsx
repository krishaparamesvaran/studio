
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: "Account created!", description: "Welcome to the Fortumars family." });
      router.push("/");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Signup Failed", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-24 pb-20 px-4">
        <div className="grid lg:grid-cols-2 max-w-5xl w-full items-center gap-12">
          <div className="hidden lg:block space-y-8">
            <h1 className="text-5xl font-headline font-bold leading-tight">Join the next generation of <span className="text-primary">high-performing teams.</span></h1>
            <div className="space-y-4">
                {[
                    "Unlimited access for 14 days",
                    "No credit card required",
                    "Full AI suite included",
                    "Enterprise-grade security"
                ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <Check className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-lg">{item}</span>
                    </div>
                ))}
            </div>
            <div className="p-6 bg-white rounded-2xl border shadow-sm italic text-muted-foreground">
                "Fortumars transformed how we handle our backend operations. It's the only tool my team actually enjoys using." — CTO @ InnovateCorp
            </div>
          </div>
          
          <Card className="w-full shadow-2xl border-none rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="p-10 pb-4">
              <CardTitle className="text-3xl font-headline font-bold">Get Started Free</CardTitle>
              <CardDescription>Setup your business engine in minutes.</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Create Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="h-12 rounded-xl"
                  />
                </div>
                <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin mr-2" /> : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 p-10 border-t bg-muted/5 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
