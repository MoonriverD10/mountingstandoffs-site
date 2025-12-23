import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const categories = [
    { name: "Basic Standoff Kits", image: "/images/products/SOK-PEG9.jpg", link: "/category/basic-standoff-kits" },
    { name: "Edge Grip Standoff Kits", image: "/images/products/SOK-PEG9.jpg", link: "/category/edge-grip-standoff-kits" },
    { name: "Panel Clip Kits", image: "/images/products/HD-CP6.jpg", link: "/category/panel-clip-kits" },
    { name: "Wire Kits", image: "/images/products/WS-ASC-125.jpg", link: "/category/wire-kits" },
    { name: "Panel Hinges", image: "/images/products/HD-DP2.jpg", link: "/category/panel-hinges" },
    { name: "Edge Grips", image: "/images/products/SO-AEGC-500.jpg", link: "/category/edge-grips" },
    { name: "LED Standoffs", image: "/images/products/Signage___Awards_-_Gyford_StandOff_Systems.png", link: "/category/led-standoffs" },
    { name: "StructureLite", image: "/images/products/SL-A5FV.jpg", link: "/category/structurelite" },
    { name: "Individual Pieces", image: "/images/products/SO-CAP9.jpg", link: "/category/individual-pieces" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-slate-100 border border-slate-200 p-6 rounded-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome to Mounting Standoffs</h1>
        <p className="text-slate-600">
          Your authorized source for Gyford Standoff Systems. We offer a complete line of aircraft-grade aluminum mounting hardware for signage, displays, and architectural applications.
        </p>
      </div>

      {/* Category Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2 border-slate-200">
          Browse Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.link}>
              <div className="group border border-slate-200 bg-white hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col">
                <div className="aspect-[4/3] bg-white p-4 flex items-center justify-center border-b border-slate-100">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/400x300/f1f5f9/94a3b8?text=No+Image";
                    }}
                  />
                </div>
                <div className="p-4 bg-slate-50 group-hover:bg-white transition-colors flex-grow flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 group-hover:text-[#00a0a0] transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#00a0a0]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2 border-slate-200 mt-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Placeholder for featured items - populated dynamically in real app */}
          {[
            { name: "1\" Standoff Kit", price: "$65.99", img: "SOK-PEG9.jpg" },
            { name: "Wire Suspension Kit", price: "$124.50", img: "WS-ASC-125.jpg" },
            { name: "LED Standoff Red", price: "$45.00", img: "SO-LED-RED.jpg" },
            { name: "Panel Clip Set", price: "$28.95", img: "HD-CP6.jpg" }
          ].map((item, idx) => (
            <div key={idx} className="border border-slate-200 p-4 bg-white hover:shadow-sm">
              <div className="aspect-square mb-3 flex items-center justify-center">
                <img 
                  src={`/images/products/${item.img}`} 
                  alt={item.name}
                  className="max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/200x200/f1f5f9/94a3b8?text=Product";
                  }}
                />
              </div>
              <div className="text-sm font-medium text-slate-800 mb-1">{item.name}</div>
              <div className="text-[#00a0a0] font-bold">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
