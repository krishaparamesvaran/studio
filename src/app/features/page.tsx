
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generatePersonalizedFeatureExplanations } from "@/ai/flows/personalized-feature-explanations";
import { Zap, Shield, BarChart3, Users, Settings, Smartphone, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FeaturesPage() {
  const [email, setEmail] = useState("");
  const [loadingFeature, setLoadingFeature] = useState<string | null>(null);
  const [personalExplanations, setPersonalExplanations] = useState<Record<string, string>>({});

  const features = [
    { id: "automation", title: "Workflow Automation", icon: <Zap className="w-8 h-8" /> },
    { id: "security", title: "Identity & Security", icon: <Shield className="w-8 h-8" /> },
    { id: "analytics", title: "Predictive Analytics", icon: <BarChart3 className="w-8 h-8" /> },
    { id: "teams", title: "Team Management", icon: <Users className="w-8 h-8" /> },
    { id: "customization", title: "Custom Modules", icon: <Settings className="w-8 h-8" /> },
    { id: "mobile", title: "Native Mobile App", icon: <Smartphone className="w-8 h-8" /> },
  ];

  const handlePersonalize = async (featureName: string) => {
    if (!email) {
      alert("Please enter your work email to see personalized benefits!");
      return;
    }
    setLoadingFeature(featureName);
    try {
      const result = await generatePersonalizedFeatureExplanations({
        email,
        featureName,
      });
      setPersonalExplanations(prev => ({ ...prev, [featureName]: result.explanation }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFeature(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <main className="flex-grow pt-32">
        <section className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-6xl font-headline font-bold">Unmatched Capabilities</h1>
              <p className="text-xl text-muted-foreground">
                Fortumars isn't just another SaaS tool. It's an extensible engine built for your business evolution.
              </p>
            </div>
            <Card className="w-full max-w-md bg-white border-primary shadow-xl p-6">
              <h3 className="font-bold mb-4">Unlock Personalized Insights</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Enter your work email to see how our features specifically benefit your business type.
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted"
                />
                <Button onClick={() => handlePersonalize("Fortumars Suite")} size="sm">
                  Personalize
                </Button>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {features.map((feature) => (
              <Card key={feature.id} className="group border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white">
                <CardHeader className="p-8 pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-6">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-6">
                    {personalExplanations[feature.title] ? (
                      <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 animate-in fade-in slide-in-from-top-2">
                        <p className="text-sm leading-relaxed text-foreground italic">
                          "{personalExplanations[feature.title]}"
                        </p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        Explore how our {feature.title.toLowerCase()} suite can transform your daily operations and long-term strategy.
                      </p>
                    )}
                    
                    <Button 
                      variant="link" 
                      className="p-0 text-primary font-bold h-auto flex items-center gap-1 group-hover:gap-2 transition-all"
                      onClick={() => handlePersonalize(feature.title)}
                      disabled={loadingFeature === feature.title}
                    >
                      {loadingFeature === feature.title ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Tailoring for you...
                        </>
                      ) : (
                        personalExplanations[feature.title] ? "Regenerate Analysis" : "Show personalized benefits →"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
