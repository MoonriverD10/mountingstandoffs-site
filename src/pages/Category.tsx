import { useParams, Link } from 'react-router-dom'
import products from '../data/products.json'

const categoryMap: Record<string, string> = {
  'standoffs': 'Standoffs',
  'standoff-kits': 'Standoff Kits',
  'led-kits': 'LED Kits',
  'wire-suspension': 'Wire Suspension',
  'ez-rod-wire': 'EZ - Rod & Wire',
  'structurelite': 'StructureLite',
  'hardware': 'Hardware',
  'demo-kits': 'Demo Kits',
}

const categoryDescriptions: Record<string, string> = {
  'Standoffs': 'Individual standoff caps, barrels, and components for custom sign mounting solutions.',
  'Standoff Kits': 'Complete standoff kits including caps, barrels, and all necessary hardware for easy installation.',
  'LED Kits': 'Illuminated standoff systems with integrated LED lighting for eye-catching displays.',
  'Wire Suspension': 'Cable and wire systems for suspended signs, shelving, and displays.',
  'EZ - Rod & Wire': 'Easy-to-install rod and wire systems for versatile display applications.',
  'StructureLite': 'Lightweight aluminum shelving and display systems.',
  'Hardware': 'Screws, studs, spacers, and accessories for standoff installation.',
  'Demo Kits': 'Sample and demonstration kits for testing and showcasing.',
}

export default function Category() {
  const { slug } = useParams<{ slug: string }>()
  const categoryName = categoryMap[slug || ''] || 'Products'
  const description = categoryDescriptions[categoryName] || ''
  
  const categoryProducts = products.filter(p => p.category === categoryName)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#1e3a5f]">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/products" className="text-gray-500 hover:text-[#1e3a5f]">Products</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{categoryName}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>
        <p className="text-gray-600 text-lg">{description}</p>
        <p className="text-gray-500 mt-2">{categoryProducts.length} products</p>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition">
            <Link to={`/products/${product.id}`}>
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <img 
                  src="/images/standoff-cap-aluminum-satin-clear.png" 
                  alt={product.name}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/products/${product.id}`}>
                <h3 className="font-medium text-gray-900 mb-1 hover:text-orange-500">{product.sku}</h3>
              </Link>
              <p className="text-2xl font-bold text-[#1e3a5f] mb-4">${product.price.toFixed(2)}</p>
              <button
                className="snipcart-add-item w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                data-item-id={product.id}
                data-item-name={product.sku}
                data-item-price={product.price}
                data-item-url={`/products/${product.id}`}
                data-item-image="/images/standoff-cap-aluminum-satin-clear.png"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {categoryProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
          <Link to="/products" className="text-orange-500 hover:underline mt-4 inline-block">
            View all products
          </Link>
        </div>
      )}
    </div>
  )
}
