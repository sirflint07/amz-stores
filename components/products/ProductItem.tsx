import { Product } from '@/lib/models/ProductModel';
import  Link  from 'next/link';
import React from 'react';
import Image from 'next/image';

const ProductItem = ({product}: {product: Product}) => {
  return (
    <div className='card bg-base-300 shadow-xl mb-4 mt-4 border border-white border-opacity-25'>
      <figure>
       <Link href={`products/${product.slug}`}>
        <Image 
        src={`${product.image}`}
        alt={`${product.slug}`}
        width={300}
        height={300}
        className='object-cover w-full h-64'
        quality={100}
        />
       </Link>
      </figure>
      <div className='card body'>
        <Link href={`products/${product.slug}`}>
          <h2 className='card-title px-4 font-bold opacity-80 text-2xl mt-2'>{product.name}</h2>
        </Link>
        <div className='flex flex-col px-4'>
          <p className='text-sm font-normal'>{product.brand}</p>
          <div className='flex justify-between w-full py-4'>
            <p className='text-yellow-500'>${product.price}</p>
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
