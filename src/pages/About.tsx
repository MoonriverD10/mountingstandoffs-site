import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1e3a5f] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Mounting Standoffs</h1>
          <p className="text-xl text-gray-200">
            Your trusted source for premium Gyford standoff systems since 1997
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Who We Are</h2>
            <p className="text-gray-600 mb-6">
              Mounting Standoffs is a division of Moon River Signs & Graphics, a full-service sign company 
              based in St. Louis, Missouri. With over 27 years of experience in the signage industry, 
              we understand the importance of quality hardware in creating professional, lasting installations.
            </p>
            
            <p className="text-gray-600 mb-6">
              As an authorized Gyford Standoff Systems distributor, we offer the complete line of premium 
              aluminum and stainless steel standoffs, mounting hardware, and display systems. Our expertise 
              in signage gives us unique insight into what products work best for different applications.
            </p>

            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6 mt-12">Why Choose Us?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">✓ Authorized Dealer</h3>
                <p className="text-gray-600">
                  We're an official Gyford distributor, ensuring you get genuine products with full warranty support.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">✓ Industry Expertise</h3>
                <p className="text-gray-600">
                  27+ years in signage means we can help you choose the right products for your specific application.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">✓ Fast Shipping</h3>
                <p className="text-gray-600">
                  Orders placed before 2pm CT ship same day. Free shipping on orders over $150.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">✓ Competitive Pricing</h3>
                <p className="text-gray-600">
                  We offer fair pricing on all products with volume discounts available for larger orders.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Our Products</h2>
            <p className="text-gray-600 mb-6">
              We carry the complete Gyford product line including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Standoff caps and barrels in aluminum and stainless steel</li>
              <li>Complete standoff kits with all hardware included</li>
              <li>LED illuminated standoff systems</li>
              <li>Wire and cable suspension systems</li>
              <li>StructureLite shelving and display systems</li>
              <li>All necessary hardware and accessories</li>
            </ul>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Not sure which standoffs are right for your project? Contact us for expert guidance.
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
