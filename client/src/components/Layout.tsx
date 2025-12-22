import { Link, useLocation } from "wouter";
import { ShoppingCart, Search, Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Categories for navigation
  const categories = [
    "Basic Standoff Kits",
    "Edge Grip Standoff Kits",
    "Panel Clip Kits",
    "Wire Kits",
    "Panel Hinges",
    "Edge Grips",
    "LED Standoffs",
    "StructureLite",
    "Individual Pieces"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Top Bar - Contact Info */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="h-3 w-3" /> (314) 369-8649
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-3 w-3" /> sales@mountingstandoffs.com
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <MapPin className="h-3 w-3" /> St. Louis, MO
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://standoffsystems.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Wholesale: standoffsystems.com
            </a>
            <span>|</span>
            <Link href="/account" className="hover:text-white transition-colors">My Account</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        isScrolled ? "bg-white/95 backdrop-blur shadow-sm border-slate-200 py-2" : "bg-white border-slate-100 py-4"
      } dark:bg-slate-900 dark:border-slate-800`}>
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-semibold">Home</Link>
                <div className="text-lg font-semibold text-slate-500 mt-2">Products</div>
                {categories.map((cat) => (
                  <Link key={cat} href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="pl-4 py-1 hover:text-primary transition-colors">
                    {cat}
                  </Link>
                ))}
                <div className="border-t my-2"></div>
                <Link href="/installation" className="text-lg font-semibold">Installation Videos</Link>
                <Link href="/about" className="text-lg font-semibold">About Us</Link>
                <Link href="/contact" className="text-lg font-semibold">Contact Us</Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-1.5 rounded-sm group-hover:bg-primary/90 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none text-slate-900 dark:text-white">MOUNTING</span>
              <span className="text-sm font-medium tracking-widest text-primary leading-none">STANDOFFS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            <Link href="/" className={`hover:text-primary transition-colors ${location === '/' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-primary transition-colors text-slate-600 dark:text-slate-300 py-2">
                Products <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700 rounded-md p-2 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
                {categories.map((cat) => (
                  <Link key={cat} href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-sm text-sm text-slate-700 dark:text-slate-200">
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/installation" className="hover:text-primary transition-colors text-slate-600 dark:text-slate-300">
              Installation Videos
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors text-slate-600 dark:text-slate-300">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors text-slate-600 dark:text-slate-300">
              Contact
            </Link>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex relative w-64">
              <Input 
                type="search" 
                placeholder="Search items..." 
                className="pr-10 h-9 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              />
              <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-9 w-9 text-slate-400 hover:text-primary">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button size="icon" variant="ghost" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative border-slate-200 hover:border-primary hover:text-primary transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white border-2 border-white text-[10px]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">MOUNTING</span>
                <span className="text-sm font-medium tracking-widest text-primary">STANDOFFS</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Quality • Service • Dependability
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Authorized reseller of Gyford Standoff Systems since 1999. Providing professional mounting solutions for signage and displays.
              </p>
              <div className="flex gap-4 pt-2">
                {/* Social Icons Placeholder */}
                <div className="h-8 w-8 bg-slate-800 rounded flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="font-bold text-xs">FB</span>
                </div>
                <div className="h-8 w-8 bg-slate-800 rounded flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="font-bold text-xs">IG</span>
                </div>
                <div className="h-8 w-8 bg-slate-800 rounded flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="font-bold text-xs">LI</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Products</h3>
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat}>
                    <Link href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="hover:text-primary transition-colors">
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/account" className="hover:text-primary transition-colors">My Account</Link></li>
                <li><Link href="/orders" className="hover:text-primary transition-colors">Order History</Link></li>
                <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <span>4511 Niagara Dr<br />St. Louis, MO 63129</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <a href="tel:3143698649" className="hover:text-white transition-colors">(314) 369-8649</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <a href="mailto:sales@mountingstandoffs.com" className="hover:text-white transition-colors">sales@mountingstandoffs.com</a>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-500">
                  Wholesale Inquiries:<br />
                  <a href="https://standoffsystems.com" target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors">
                    www.standoffsystems.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="bg-slate-950 py-4 border-t border-slate-900">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2018 - {new Date().getFullYear()} Mounting Standoffs. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Powered by Moon River D10 LLC</span>
              <div className="flex gap-2">
                {/* Payment Icons */}
                <div className="w-8 h-5 bg-slate-800 rounded"></div>
                <div className="w-8 h-5 bg-slate-800 rounded"></div>
                <div className="w-8 h-5 bg-slate-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
