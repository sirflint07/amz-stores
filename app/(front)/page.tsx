import ProductItem from "@/components/products/ProductItem";
import { data } from '@/lib/models/data/data'
import { Product } from "@/lib/models/ProductModel";

export default function Home() {
  return (
    <>
    <h2 className="text-2xl font-bold mb-8 mt-3">Latest Products</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.products.map((product: Product) => (<ProductItem key={product.slug} product={product}/>))}
    </div>
    </>
  );
}
