import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, ArrowUpDown, ShoppingCart } from "lucide-react";
import productsData from "@/data/products.json";

// Helper to format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export default function ProductList() {
  const [match, params] = useRoute("/category/:slug");
  const categorySlug = params?.slug;
  
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500]);
  
  // Convert slug back to category name (approximate)
  const categoryName = categorySlug 
    ? categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "All Products";

  useEffect(() => {
    let results = productsData;

    // Filter by category if present
    if (categorySlug) {
      // Handle special cases or fuzzy matching if needed
      // For now, simple string inclusion check
      const searchCat = categorySlug.replace(/-/g, ' ').toLowerCase();
      results = results.filter(p => {
        // Handle categories as array or string
        const cats = Array.isArray(p.categories) 
          ? p.categories.map((c: string) => c.toLowerCase()).join(' ') 
          : (String(p.categories) || '').toLowerCase();
          
        return cats.includes(searchCat) ||
          (searchCat === 'basic standoff kits' && cats.includes('standoff kits'));
      });
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.sku.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    // Filter by price
    results = results.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    if (sortBy === "price-asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(results);
  }, [categorySlug, searchTerm, sortBy, priceRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 mb-6">
        <a href="/" className="hover:text-primary">Home</a>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">{categoryName}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </h3>
            
            {/* Search */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-4 block">Price Range</label>
              <Slider 
                defaultValue={[0, 500]} 
                max={500} 
                step={10} 
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>

            {/* Categories List */}
            <div>
              <label className="text-sm font-medium mb-2 block">Categories</label>
              <div className="space-y-2">
                {[
                  "Basic Standoff Kits",
                  "Edge Grip Standoff Kits",
                  "Panel Clip Kits",
                  "Wire Kits",
                  "Panel Hinges",
                  "Edge Grips",
                  "LED Standoffs",
                  "StructureLite",
                  "Individual Pieces"
                ].map((cat) => (
                  <a 
                    key={cat} 
                    href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                    className={`block text-sm py-1 hover:text-primary transition-colors ${
                      categoryName === cat ? "text-primary font-medium" : "text-slate-600"
                    }`}
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-slate-900">{categoryName}</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">{filteredProducts.length} Products</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-lg border border-dashed border-slate-300">
              <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setPriceRange([0, 500]);
                }}
                className="mt-2"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="aspect-square bg-slate-50 relative overflow-hidden p-4 flex items-center justify-center">
                    <a href={`/product/${product.sku}`}>
                      <img 
                        src={`/images/products/${product.images[0]?.filename}`} 
                        alt={product.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/400x400/f1f5f9/94a3b8?text=No+Image";
                        }}
                      />
                    </a>
                    {product.gyford_cost && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        In Stock
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4 flex-grow">
                    <div className="text-xs text-slate-500 mb-1">{product.sku}</div>
                    <a href={`/product/${product.sku}`} className="block">
                      <h3 className="font-medium text-slate-900 line-clamp-2 hover:text-primary transition-colors h-10 mb-2">
                        {product.name}
                      </h3>
                    </a>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                      {product.old_price > product.price && (
                        <span className="text-sm text-slate-400 line-through">{formatPrice(product.old_price)}</span>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full gap-2 snipcart-add-item"
                      data-item-id={product.sku}
                      data-item-price={product.price}
                      data-item-url={`/product/${product.sku}`}
                      data-item-description={product.brief_description}
                      data-item-image={`/images/products/${product.images[0]?.filename}`}
                      data-item-name={product.name}
                    >
                      <ShoppingCart className="h-4 w-4" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
