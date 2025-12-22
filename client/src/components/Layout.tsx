import { Link, useLocation } from "wouter";
import { ShoppingCart, Search, Menu, Phone, Mail, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [cartCount, setCartCount] = useState(0);

  // Categories for sidebar
  const categories = [
    "Basic Standoff Kits",
    "Edge Grip Standoff Kits",
    "Panel Clip Kits",
    "Wire Kits",
    "Panel Hinges",
    "Edge Grips",
    "LED Standoffs",
    "StructureLite",
    "Individual Pieces",
    "Caps",
    "Barrels",
    "Hardware",
    "Tools"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
      {/* Top Bar - Contact Info (Classic Style) */}
      <div className="bg-[#00a0a0] text-white text-sm py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 font-medium">
              <Phone className="h-4 w-4" /> (314) 369-8649
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> sales@mountingstandoffs.com
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs md:text-sm">
            <Link href="/account" className="hover:underline">My Account</Link>
            <span>|</span>
            <Link href="/cart" className="hover:underline">View Cart</Link>
            <span>|</span>
            <Link href="/checkout" className="hover:underline">Checkout</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-200 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-[#00a0a0] text-white p-2 rounded-sm">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight leading-none text-slate-900">MOUNTING</span>
              <span className="text-sm font-bold tracking-widest text-[#00a0a0] leading-none">STANDOFFS</span>
            </div>
          </Link>

          {/* Search Bar - Center */}
          <div className="w-full max-w-xl flex gap-2">
            <div className="relative flex-grow">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="w-full pl-4 pr-10 h-10 border-slate-300 focus:border-[#00a0a0] focus:ring-[#00a0a0]"
              />
              <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-10 w-10 text-slate-500 hover:text-[#00a0a0]">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Cart Button */}
          <div className="shrink-0">
            <Button className="bg-[#00a0a0] hover:bg-[#008080] text-white gap-2 h-10 px-6 snipcart-checkout">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-bold">Cart</span>
              <Badge className="bg-white text-[#00a0a0] hover:bg-white ml-1 snipcart-items-count">
                {cartCount}
              </Badge>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Navigation Bar */}
      <nav className="bg-slate-800 text-white py-3 hidden md:block">
        <div className="container mx-auto px-4 flex gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-[#00a0a0] transition-colors">Home</Link>
          <Link href="/products" className="hover:text-[#00a0a0] transition-colors">All Products</Link>
          <Link href="/installation" className="hover:text-[#00a0a0] transition-colors">Installation</Link>
          <Link href="/about" className="hover:text-[#00a0a0] transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-[#00a0a0] transition-colors">Contact Us</Link>
        </div>
      </nav>

      {/* Mobile Menu Trigger */}
      <div className="md:hidden bg-slate-100 p-2 border-b flex justify-between items-center px-4">
        <span className="font-bold text-slate-700">Menu</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="font-bold">Home</Link>
              <div className="font-bold text-slate-500 mt-2">Categories</div>
              {categories.map((cat) => (
                <Link key={cat} href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="pl-4 py-1 hover:text-[#00a0a0]">
                  {cat}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Sidebar - Persistent */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-md overflow-hidden">
              <div className="bg-slate-100 p-3 border-b border-slate-200 font-bold text-slate-800">
                Categories
              </div>
              <ul className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link 
                      href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-white hover:text-[#00a0a0] hover:pl-5 transition-all flex items-center justify-between group"
                    >
                      {cat}
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar Promo */}
            <div className="mt-6 bg-[#00a0a0] text-white p-4 rounded-md text-center">
              <h4 className="font-bold text-lg mb-2">Need Help?</h4>
              <p className="text-sm mb-4 opacity-90">Call our experts for installation advice.</p>
              <a href="tel:3143698649" className="inline-block bg-white text-[#00a0a0] font-bold py-2 px-4 rounded text-sm hover:bg-slate-100">
                (314) 369-8649
              </a>
            </div>
          </aside>

          {/* Center Content */}
          <main className="flex-grow min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">About Us</h3>
            <p className="mb-4">Authorized reseller of Gyford Standoff Systems. Providing professional mounting solutions since 1999.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2">
              <li>4511 Niagara Dr</li>
              <li>St. Louis, MO 63129</li>
              <li>(314) 369-8649</li>
              <li>sales@mountingstandoffs.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider">Secure Payment</h3>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-slate-700 rounded"></div>
              <div className="w-10 h-6 bg-slate-700 rounded"></div>
              <div className="w-10 h-6 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} Mounting Standoffs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
