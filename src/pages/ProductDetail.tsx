import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import products from '../data/products.json'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  
  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-orange-500 hover:underline">
          Back to Products
        </Link>
      </div>
    )
  }

  // Find related products in same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-[#1e3a5f]">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/products" className="text-gray-500 hover:text-[#1e3a5f]">Products</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{product.sku}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
          <img 
            src="/images/standoff-cap-aluminum-satin-clear.png" 
            alt={product.name}
            className="max-w-full max-h-96 object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <span className="text-sm text-gray-500 uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold mb-4">{product.sku}</h1>
          
          <div className="mb-6">
            <span className="text-4xl font-bold text-[#1e3a5f]">${product.price.toFixed(2)}</span>
            <span className="text-gray-500 ml-2">/ {product.unit}</span>
          </div>

          <div className="mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? '✓ In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className="text-gray-600 mb-8">
            High-quality Gyford standoff component. Perfect for signage, displays, and architectural applications.
            Made from premium materials with precision engineering.
          </p>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border rounded-lg hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border rounded-lg py-2"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border rounded-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="snipcart-add-item w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition mb-4"
            data-item-id={product.id}
            data-item-name={product.sku}
            data-item-price={product.price}
            data-item-url={`/products/${product.id}`}
            data-item-image="/images/standoff-cap-aluminum-satin-clear.png"
            data-item-quantity={quantity}
          >
            Add to Cart - ${(product.price * quantity).toFixed(2)}
          </button>

          {/* Product Details */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold mb-4">Product Details</h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500">SKU</dt>
                <dd className="font-medium">{product.sku}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Category</dt>
                <dd className="font-medium">{product.category}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Unit</dt>
                <dd className="font-medium">{product.unit}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Brand</dt>
                <dd className="font-medium">Gyford</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <div key={relProduct.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition">
                <Link to={`/products/${relProduct.id}`}>
                  <div className="h-32 bg-gray-100 flex items-center justify-center">
                    <img 
                      src="/images/standoff-cap-aluminum-satin-clear.png" 
                      alt={relProduct.name}
                      className="max-h-full max-w-full object-contain p-4"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/products/${relProduct.id}`}>
                    <h3 className="font-medium text-gray-900 mb-1 hover:text-orange-500">{relProduct.sku}</h3>
                  </Link>
                  <p className="text-xl font-bold text-[#1e3a5f]">${relProduct.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
