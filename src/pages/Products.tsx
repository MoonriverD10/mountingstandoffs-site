import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'

const categories = [
  'All',
  'Standoffs',
  'Standoff Kits',
  'LED Kits',
  'Wire Suspension',
  'EZ - Rod & Wire',
  'StructureLite',
  'Hardware',
  'Demo Kits',
]

export default function Products() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by search
    if (search) {
      filtered = filtered.filter(p => 
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    } else {
      filtered = [...filtered].sort((a, b) => a.sku.localeCompare(b.sku))
    }

    return filtered
  }, [search, selectedCategory, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#1e3a5f]">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">Products</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by SKU or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-4">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Product Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {filteredProducts.slice(0, 48).map((product) => (
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
              <span className="text-xs text-gray-500 uppercase">{product.category}</span>
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

      {filteredProducts.length > 48 && (
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Showing 48 of {filteredProducts.length} products. Use search or filters to narrow results.
          </p>
        </div>
      )}
    </div>
  )
}
