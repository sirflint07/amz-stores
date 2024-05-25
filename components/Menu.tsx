"use client"

import useCartService from "@/lib/hooks/useCartStore";
import { useState, useEffect } from "react";
import Link from "next/link";



export default function Menu() {
    const {items} = useCartService()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    return (

        <div className="flex items-stretch">
                <ul className="flex gap-4">
                    <li><Link className="btn rounded-btn" href='/cart'>Cart
                    {mounted && items.length !== 0 &&
                        (
                            <div className="badge badge-primary rounded-full w-[2.5px] text-[9px] text-white">
                            {items.reduce((a, b) => a + b.qty, 0)
                            }{''}
                            </div>
                        )
                    }
                    </Link></li>

                    <li><Link className="btn btn-ghost bg-base-200 rounded-btn" href='/cart'><button className="" type="button">Sign In</button></Link></li>
                    <li><Link className='btn' href=''><button>Shop Now</button></Link></li>
                </ul>
            </div>
        
    )
}