import { Link } from 'react-router-dom'
import products from '../data/products.json'

const categories = [
  { 
    name: 'Standoff Kits', 
    slug: 'standoff-kits',
    image: '/images/basic-standoff-kits.png',
    description: 'Complete kits with caps, barrels, and hardware'
  },
  { 
    name: 'Standoffs', 
    slug: 'standoffs',
    image: '/images/standoff-cap-aluminum-satin-clear.png',
    description: 'Individual caps, barrels, and components'
  },
  { 
    name: 'LED Kits', 
    slug: 'led-kits',
    image: '/images/led-standoff-kit.jpg',
    description: 'Illuminated standoff systems'
  },
  { 
    name: 'Wire Suspension', 
    slug: 'wire-suspension',
    image: '/images/WS-KIT-1-2.jpg',
    description: 'Cable and wire display systems'
  },
  { 
    name: 'StructureLite', 
    slug: 'structurelite',
    image: '/images/Rod-Wire-Shelves-Archer-StructureLite.jpg',
    description: 'Lightweight shelving and display systems'
  },
  { 
    name: 'Hardware', 
    slug: 'hardware',
    image: '/images/individual-pieces.png',
    description: 'Screws, studs, and accessories'
  },
]

// Get featured products (first 8 from Standoff Kits)
const featuredProducts = products
  .filter(p => p.category === 'Standoff Kits')
  .slice(0, 8)

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Premium Standoff Systems for Professional Signage
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Authorized Gyford distributor offering high-quality aluminum and stainless steel 
                standoffs for signs, displays, and architectural applications.
              </p>
              <div className="flex gap-4">
                <Link 
                  to="/products" 
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Shop All Products
                </Link>
                <Link 
                  to="/contact" 
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1e3a5f] transition"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/images/standoff-kit-banner.png" 
                alt="Standoff Systems" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $150</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-semibold text-lg mb-2">Authorized Dealer</h3>
              <p className="text-gray-600">Official Gyford distributor</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Same-day processing</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
              <p className="text-gray-600">27+ years experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link 
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition">
                    {cat.name}
                  </h3>
                  <p className="text-gray-600">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Standoff Kits</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <img 
                    src="/images/basic-standoff-kits.png" 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{product.sku}</h3>
                  <p className="text-2xl font-bold text-[#1e3a5f] mb-4">${product.price.toFixed(2)}</p>
                  <button
                    className="snipcart-add-item w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                    data-item-id={product.id}
                    data-item-name={product.name}
                    data-item-price={product.price}
                    data-item-url={`/products/${product.id}`}
                    data-item-image="/images/basic-standoff-kits.png"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/products" 
              className="inline-block bg-[#1e3a5f] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2d5a8a] transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1e3a5f] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Choosing the Right Standoffs?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Our team has 27+ years of experience in signage and display systems. 
            Contact us for expert guidance on your project.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Contact Us
            </Link>
            <a 
              href="tel:314-369-8649" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1e3a5f] transition"
            >
              Call 314-369-8649
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
