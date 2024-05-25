"use client"

import { useEffect, useState } from "react";
import useCartService from "@/lib/hooks/useCartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const CartDetails = () => {
 
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const {items, itemsPrice, shippingPrice, taxPrice, increase, decrease} = useCartService()

    useEffect(() => (
        setMounted(true)
    ), [])

    if (!mounted) return <></>
    
  return (
    <>
    <h1 className="md:text-xl lg:text-2xl text-gray-100 mt-4 mb-4 font-bold">Shopping Cart</h1>

    {items.length === 0 ? 
    <div className="text-center">
      <p className="py-3">There are no product in the cart</p>
      <Link href='/' className="btn btn-warning text-white">Go Shopping</Link>
    </div> 
    :
    <div className="w-[90vw] mx-auto"> 
    <div className="grid md:grid-cols-4 md:gap-5 border-gray-500 max-h-fit">
      <div className="overflow-x-hidden md:col-span-3">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center"></th>
            <th className="">Item Name</th>
            <th className="">Price</th>
            <th className="">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.slug} className="">
              <Image src={item.image} alt={item.name} width={100} height={80}/>
              <td className="text-xs -pt-[-2]">{item.name}</td>
              <td>{item.price}</td>
              <td>
              <div className="flex align-middle">
              <button className="btn btn-square md:w-7 md:h-5 p-4 mr-2 sm:w-4 sm:h-4 sm:mr-1 max-w-fit" onClick={() => increase(item)}><span>+</span></button>
                <span className="text-center content-center">{item.qty}</span>
              <button className="btn btn-square md:w-7 md:h-5 md:ml-2 sm:w-4 sm:h-4 max-w-fit p-4 ml-2" onClick={() => decrease(item)}><span>-</span></button>
              </div>
                </td>
                
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="bg-base-300 card max-h-[24vh] mt-11">
        <div className="card-body max-h-">
          <div className="flex justify-between">
            <h1>Total Quantity: <span>{}</span></h1>
            <div><span>{items.reduce((acc,curr) => acc + curr.qty, 0)}</span></div>
          </div>
          <div className="flex justify-between">
            <h1>Total Price: <span>{}</span></h1>
            <div><span>$ </span>{itemsPrice}</div>
          </div>
          <button onClick={() => router.push(`/shipping`)}><span className="btn btn-warning mb-2 mt-4 text-gray-700">Proceed to checkout</span></button>
        </div>
      </div>
    </div>
    </div>
    }
    </>
  )
}

export default CartDetails
