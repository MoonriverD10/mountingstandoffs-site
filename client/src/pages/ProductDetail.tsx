import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Check, Truck, ShieldCheck, ArrowLeft, Minus, Plus } from "lucide-react";
import productsData from "@/data/products.json";
import ProductSchema from "@/components/ProductSchema";

// Helper to format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:sku");
  const sku = params?.sku;
  
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    if (sku) {
      const found = productsData.find(p => p.sku === sku);
      if (found) {
        setProduct(found);
        setActiveImage(0);
      }
    }
  }, [sku]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link href="/products">
          <Button>Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  // Calculate savings if any
  const savings = product.old_price > product.price 
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductSchema product={product} />
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-white border border-slate-200 rounded-lg p-8 flex items-center justify-center relative overflow-hidden">
            <img 
              src={`/images/products/${product.images[activeImage]?.filename}`} 
              alt={product.name}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/600x600/f1f5f9/94a3b8?text=No+Image";
              }}
            />
            {savings > 0 && (
              <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white border-none text-sm px-3 py-1">
                Save {savings}%
              </Badge>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img: any, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 border rounded-md p-2 flex-shrink-0 bg-white ${
                    activeImage === idx ? "border-primary ring-1 ring-primary" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img 
                    src={`/images/products/${img.filename}`} 
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
          <div className="text-sm text-slate-500 mb-6">SKU: {product.sku}</div>
          
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.old_price > product.price && (
              <span className="text-xl text-slate-400 line-through">{formatPrice(product.old_price)}</span>
            )}
          </div>

          <div className="prose prose-slate max-w-none mb-8 text-slate-600">
            <p>{product.brief_description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center border border-slate-300 rounded-md bg-white w-32">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-slate-100 text-slate-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center border-none focus:ring-0 p-0 text-slate-900 font-medium"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-slate-100 text-slate-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <Button size="lg" className="flex-1 gap-2 h-auto py-3 text-lg snipcart-add-item"
              data-item-id={product.sku}
              data-item-price={product.price}
              data-item-url={`/product/${product.sku}`}
              data-item-description={product.brief_description}
              data-item-image={`/images/products/${product.images[0]?.filename}`}
              data-item-name={product.name}
              data-item-quantity={quantity}
            >
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600 mb-8">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" /> In Stock & Ready to Ship
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Ships within 24 Hours
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Genuine Gyford Product
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" /> Volume Pricing Available
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger 
            value="description" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-6 text-base"
          >
            Description
          </TabsTrigger>
          <TabsTrigger 
            value="specifications" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-6 text-base"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger 
            value="installation" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-6 text-base"
          >
            Installation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="py-8">
          <div className="prose prose-slate max-w-4xl">
            <h3 className="text-xl font-bold mb-4">Product Overview</h3>
            <p className="whitespace-pre-line">{product.description}</p>
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="py-8">
          <div className="max-w-2xl">
            <table className="w-full text-sm text-left">
              <tbody>
                <tr className="border-b">
                  <th className="py-3 font-medium text-slate-900 w-1/3">SKU</th>
                  <td className="py-3 text-slate-600">{product.sku}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-3 font-medium text-slate-900">Material</th>
                  <td className="py-3 text-slate-600">Aircraft Grade Aluminum</td>
                </tr>
                <tr className="border-b">
                  <th className="py-3 font-medium text-slate-900">Finish</th>
                  <td className="py-3 text-slate-600">Clear Anodized (Standard)</td>
                </tr>
                <tr className="border-b">
                  <th className="py-3 font-medium text-slate-900">Brand</th>
                  <td className="py-3 text-slate-600">Gyford Standoff Systems</td>
                </tr>
                <tr className="border-b">
                  <th className="py-3 font-medium text-slate-900">Origin</th>
                  <td className="py-3 text-slate-600">Made in USA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="installation" className="py-8">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 max-w-3xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" /> Installation Guide
            </h3>
            <p className="mb-4 text-slate-600">
              Professional installation is recommended for all standoff systems. Ensure your mounting surface is capable of supporting the weight of your signage.
            </p>
            <Button variant="outline" className="gap-2">
              Download Installation PDF
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
