import { data } from '@/lib/models/data/data'
import Link from 'next/link'
import Image from 'next/image'
import AddToCart from '@/components/products/AddToCart'


export default function ProductDetails({params}: {params :{slug: string}}) {
    const product = data.products.find(x=>x.slug === params.slug)
    if (!product) {
        return <div>Product not found</div>
    }
    
  return (
    <div className='mt-5'>
      <div className='py-4'>
      <Link href='/' className='text-white '><span className='font-bold'>Back to Products</span></Link>
      </div>
      <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3'>
        <div>
          <Image
          src={product.image}
          alt={product.slug}
          width={550}
          height={500}
          style={{
            width: '100%',
            height: 'auto'
          }}
          />
        </div>
        <div className='lg:pl-6 md:pl-5 sm:pl-0'>
            <p className='text-2xl lg:p-0 sm:p-0 md:p-0 pt-0'>{product.name}</p>
            <p className='mt-4'>{product.rating} of {product.numReviews} reviews</p>
            <p className='mt-2'>{product.brand}</p>
            <h2>Description</h2>
            <p>{product.description}</p>
           </div>

           <div className='card flex bg-base-300 mt-5 lg:mt-0 h-fit pb-10'>
            <div className='card-body'>
              <div className='flex justify-between'>
                <p>Status</p>
                <p className='text-end'>{product.countInStock > 0 ? 'Available' : 'Not in stock'}</p>
              </div>
              <div className='flex justify-between'>
                <p>Pricing</p>
                <p className='text-end'>$ {product.price}</p>
              </div>
            </div>
            {product.countInStock !== 0 && (
            <div className='card-actions justify-center'>
              <AddToCart 
              item={{...product, qty:0, color: '', size: ''}}
              />
            </div>
           )}
           </div>
      </div>
    </div>
  )
}
