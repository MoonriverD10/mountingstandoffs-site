import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

const categories = [
  { name: 'Standoffs', slug: 'standoffs' },
  { name: 'Standoff Kits', slug: 'standoff-kits' },
  { name: 'LED Kits', slug: 'led-kits' },
  { name: 'Wire Suspension', slug: 'wire-suspension' },
  { name: 'EZ - Rod & Wire', slug: 'ez-rod-wire' },
  { name: 'StructureLite', slug: 'structurelite' },
  { name: 'Hardware', slug: 'hardware' },
]

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Load Snipcart script
    if (!document.getElementById('snipcart-script')) {
      const script = document.createElement('script')
      script.id = 'snipcart-script'
      script.src = 'https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-[#1e3a5f] text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="tel:314-369-8649" className="hover:text-orange-400">
              📞 314-369-8649
            </a>
            <a href="mailto:sales@mountingstandoffs.com" className="hover:text-orange-400">
              ✉️ sales@mountingstandoffs.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Free Shipping on Orders $150+</span>
            <button className="snipcart-checkout hover:text-orange-400">
              🛒 Cart (<span className="snipcart-items-count">0</span>)
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logo_mounting_standoffs_logo1.png" 
                alt="Mounting Standoffs" 
                className="h-12"
              />
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-[#1e3a5f] font-medium">
                Home
              </Link>
              <div className="relative group">
                <Link to="/products" className="text-gray-700 hover:text-[#1e3a5f] font-medium">
                  Products ▼
                </Link>
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#1e3a5f]"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/about" className="text-gray-700 hover:text-[#1e3a5f] font-medium">
                About
              </Link>
              <Link to="/faq" className="text-gray-700 hover:text-[#1e3a5f] font-medium">
                FAQ
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#1e3a5f] font-medium">
                Contact
              </Link>
            </nav>

            <button className="snipcart-checkout bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
              🛒 Cart (<span className="snipcart-items-count">0</span>)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Mounting Standoffs</h3>
              <p className="text-gray-300">
                Premium Gyford standoff systems for signage, displays, and architectural applications.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                {categories.slice(0, 4).map((cat) => (
                  <li key={cat.slug}>
                    <Link to={`/category/${cat.slug}`} className="text-gray-300 hover:text-orange-400">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-300 hover:text-orange-400">FAQ</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-orange-400">Contact Us</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-orange-400">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📞 314-369-8649</li>
                <li>✉️ sales@mountingstandoffs.com</li>
                <li>St. Louis, MO</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Mounting Standoffs. All rights reserved.</p>
            <p className="mt-2">Authorized Gyford Standoff Systems Distributor</p>
          </div>
        </div>
      </footer>

      {/* Snipcart Container */}
      <div 
        hidden 
        id="snipcart" 
        data-api-key="YOUR_SNIPCART_API_KEY"
        data-config-modal-style="side"
      ></div>
    </div>
  )
}
