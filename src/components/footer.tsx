
import Link from "next/link";

export function Footer() {
  const sections = [
    {
      title: "Product",
      links: [
        { name: "Overview", href: "/product" },
        { name: "Features", href: "/features" },
        { name: "Solutions", href: "/product#solutions" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Community", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t py-12 md:py-20 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-headline font-bold tracking-tight">
                Fortumars
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              The modern SaaS platform designed to streamline your business workflows and boost productivity through AI-driven insights and automation.
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-6">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fortumars Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
