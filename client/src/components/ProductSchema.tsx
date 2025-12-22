import { Helmet } from "react-helmet";

interface ProductSchemaProps {
  product: {
    name: string;
    description: string;
    sku: string;
    price: number;
    images: { filename: string }[];
    categories: string | string[];
  };
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images.map(img => `https://mountingstandoffs.com/images/products/${img.filename}`),
    "description": product.description,
    "sku": product.sku,
    "mpn": product.sku,
    "brand": {
      "@type": "Brand",
      "name": "Gyford Standoff Systems"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://mountingstandoffs.com/product/${product.sku}`,
      "priceCurrency": "USD",
      "price": product.price,
      "priceValidUntil": "2025-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Mounting Standoffs"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
