import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Truck, ShieldCheck, Award } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const categories = [
    { name: "Basic Standoff Kits", image: "/images/products/HD-WHS0.jpg", link: "/category/basic-standoff-kits" },
    { name: "Edge Grip Standoff Kits", image: "/images/products/SOK-PEG9.jpg", link: "/category/edge-grip-standoff-kits" },
    { name: "Panel Clip Kits", image: "/images/products/HD-CP6.jpg", link: "/category/panel-clip-kits" },
    { name: "Wire Kits", image: "/images/products/WS-ASC-125.jpg", link: "/category/wire-kits" },
    { name: "Panel Hinges", image: "/images/products/HD-DP2.jpg", link: "/category/panel-hinges" },
    { name: "Edge Grips", image: "/images/products/SO-AEGC-500.jpg", link: "/category/edge-grips" },
    { name: "LED Standoffs", image: "/images/products/Signage___Awards_-_Gyford_StandOff_Systems.png", link: "/category/led-standoffs" },
    { name: "StructureLite", image: "/images/products/SL-A5FV.jpg", link: "/category/structurelite" },
    { name: "Individual Pieces", image: "/images/products/SO-CAP9.jpg", link: "/category/individual-pieces" }
  ];

  const features = [
    { icon: Truck, title: "Fast Shipping", desc: "Most orders ship within 24 hours" },
    { icon: ShieldCheck, title: "Authorized Dealer", desc: "Genuine Gyford Standoff Systems" },
    { icon: Award, title: "Expert Support", desc: "25+ years industry experience" },
    { icon: CheckCircle2, title: "Quality Guaranteed", desc: "Precision machined aluminum" }
  ];

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 md:py-32 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-slate-950"></div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('/images/products/Signage___Awards_-_Gyford_StandOff_Systems.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Authorized Gyford Reseller
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Precision Mounting <br/>
              <span className="text-primary">Solutions</span> for Signage
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
              Elevate your displays with aircraft-grade aluminum standoffs. 
              The professional's choice for architectural signage, glass mounting, and modern displays.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/category/basic-standoff-kits">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-12 text-base">
                  Shop Standoff Kits
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-white/10 hover:text-white h-12 text-base">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <Card key={idx} className="border-none shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{feature.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Product Categories</h2>
            <p className="text-slate-500 mt-2">Browse our comprehensive selection of mounting hardware</p>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="hidden md:flex gap-2 text-primary hover:text-primary/80">
              View All Products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.link}>
              <div className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium flex items-center gap-2">
                      Browse Category <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    View full selection
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/products">
            <Button className="w-full gap-2">
              View All Products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/images/products/Signage___Awards_-_Gyford_StandOff_Systems.png')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need Custom Solutions?</h2>
            <p className="text-slate-300 mb-8 text-lg">
              We offer wholesale pricing for qualified sign shops and bulk orders. 
              Contact our team for project quotes and technical assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                  Request a Quote
                </Button>
              </Link>
              <a href="tel:3143698649">
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto">
                  Call (314) 369-8649
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
