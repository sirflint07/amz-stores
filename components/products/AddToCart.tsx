'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";



export default function AddToCart({item} : {item:OrderItem}) {
    const router = useRouter()
    const {items, increase, decrease} = useCartService()
    const [existItem, setExistItem] = useState<OrderItem | undefined>()
    
    useEffect(() => {
        setExistItem(items.find((x) => x.slug === item.slug))
    }, [item, items])

    const addToCartHandler = () => {
        increase(item)
    }
    
    return existItem ? (
            <div className="flex w-[20%] justify-center">
            <button className="btn btn-styles" type="button" onClick={() => decrease(existItem)}>-</button>
            <span className="text-center p-4 text-sm">{existItem?.qty}</span>
            <button className="btn btn-styles"
            type="button"
            onClick={() => increase(existItem)}
            >+</button>
        </div>) : 
        (<button
        className="card-actions bg-yellow-500 rounded-full w-11/12 p-4 mx-auto hover:scale-110 hover:opacity-80 justify-center capitalize font-bold text-lg"
        type="button"
        onClick={addToCartHandler}
        >Add to cart</button>)
}
