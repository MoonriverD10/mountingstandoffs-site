import { useState } from 'react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    question: "What is a standoff and what is it used for?",
    answer: "A standoff is a hardware component used to mount signs, panels, or displays away from a wall or surface. Standoffs create a floating effect and add depth and dimension to signage. They're commonly used for ADA signs, lobby displays, wayfinding signage, and architectural features. Standoffs consist of two main parts: a cap (the visible decorative piece) and a barrel (the spacer that determines the distance from the wall)."
  },
  {
    question: "What's the difference between aluminum and stainless steel standoffs?",
    answer: "Aluminum standoffs are lighter, more affordable, and ideal for indoor applications. They come in various anodized finishes including satin clear, satin black, and satin gold. Stainless steel standoffs are heavier, more durable, and better suited for outdoor or high-traffic environments where corrosion resistance is important. Stainless steel has a polished mirror-like finish."
  },
  {
    question: "What size standoff do I need?",
    answer: "Standoff size depends on your sign thickness and desired projection from the wall. Common cap diameters range from 1/2\" to 2\". Barrel lengths (projection) typically range from 1/2\" to 3\". For most standard acrylic or glass signs (1/4\" thick), a 3/4\" or 1\" diameter cap with a 1\" barrel works well. For thicker signs or greater visual impact, larger sizes are recommended."
  },
  {
    question: "How do I install standoffs?",
    answer: "Basic standoff installation involves: 1) Drill holes in your sign at the mounting locations, 2) Drill corresponding holes in the wall and insert wall anchors, 3) Thread the barrel onto the wall stud, 4) Slide your sign over the barrels, 5) Screw the decorative caps onto the barrels to secure the sign. Most standoff kits include all necessary hardware and detailed instructions."
  },
  {
    question: "What is an Edge Grip standoff?",
    answer: "Edge Grip standoffs are a specialized type that clamp onto the edge of a panel rather than requiring holes drilled through the sign material. They're ideal for glass, acrylic, or composite panels where you don't want visible mounting holes. Edge Grip standoffs provide a clean, modern look and are popular for retail displays and architectural applications."
  },
  {
    question: "Do you offer volume discounts?",
    answer: "Yes! We offer competitive pricing for bulk orders. Contact us directly at sales@mountingstandoffs.com or call 314-369-8649 for a custom quote on larger quantities. We work with sign shops, contractors, and businesses of all sizes."
  },
  {
    question: "What is your shipping policy?",
    answer: "Orders placed before 2pm CT Monday-Friday ship the same day. We offer free standard shipping on orders over $150. Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout for faster delivery."
  },
  {
    question: "Are these genuine Gyford products?",
    answer: "Yes! Mounting Standoffs is an authorized Gyford Standoff Systems distributor. All products we sell are genuine Gyford products with full manufacturer warranty. Gyford is the industry leader in standoff systems, known for precision engineering and premium quality."
  },
  {
    question: "Can standoffs be used outdoors?",
    answer: "Yes, but material selection matters. For outdoor applications, we recommend stainless steel standoffs due to their superior corrosion resistance. Aluminum standoffs with anodized finishes can be used outdoors in covered or protected areas, but may show wear over time in harsh weather conditions."
  },
  {
    question: "What's included in a standoff kit?",
    answer: "A complete standoff kit typically includes: decorative caps, barrels (spacers), wall studs or screws, panel screws, wall anchors, and installation instructions. Kits are designed to mount one sign with four standoffs (one at each corner). Individual components are also available if you need specific pieces."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1e3a5f] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-200">
            Everything you need to know about standoffs and mounting hardware
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <span className="text-2xl text-gray-400">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h3 className="font-semibold text-lg mb-2">Still Have Questions?</h3>
            <p className="text-gray-600 mb-4">
              Our team has 27+ years of experience in signage and can help you find the right solution.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/contact" 
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Contact Us
              </Link>
              <a 
                href="tel:314-369-8649" 
                className="inline-block border border-orange-500 text-orange-500 px-6 py-2 rounded-lg hover:bg-orange-50 transition"
              >
                Call 314-369-8649
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema for SEO/GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </div>
  )
}
