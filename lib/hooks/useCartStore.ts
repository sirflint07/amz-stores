import { create } from "zustand";
import { round } from "../utils";
import { OrderItem } from "../models/OrderModel";
import { persist } from "zustand/middleware";

type Cart = {
   items: OrderItem[]
   itemsPrice: number
   taxPrice: number 
   shippingPrice: number
   totalPrice: number
}

const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    taxPrice: 0
 }

 export const cartStore = create <Cart>() (
   persist(() => initialState, {
      name: 'cartStore'
   })
 )

 export default function useCartService() {
    const {items, itemsPrice, shippingPrice, taxPrice, totalPrice} = cartStore()

    return {
      items,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      increase: (item: OrderItem) => {
         const exist = items.find((x) => x.slug === item.slug)
         const updatedCart = exist ? items.map((order) => order.slug === item.slug ? {...exist, qty: exist.qty + 1} : order) : [...items, {...item, qty: 1}]
         const {itemsPrice, taxPrice, shippingPrice, totalPrice} = calcPrice(updatedCart)
         cartStore.setState({
            items: updatedCart,
            itemsPrice,
            totalPrice,
            shippingPrice,
            taxPrice
         })
      },

      // decrease: (item: OrderItem) => {
      //    const exist = items.find((x) => x.slug === item.slug)

      //    if(!exist) return
      //     const updatedCartItem = 
      //     exist.qty === 1 ? 
      //       items.filter((x: OrderItem) => x.slug !== item.slug) : 
      //       items.map((x) => 
      //          item.slug ?
      //          {...exist, qty: exist.qty - 1} :
      //          x
      //       )
      //       const { itemsPrice, totalPrice, shippingPrice, taxPrice } = 
      //       calcPrice(updatedCartItem)
      //       cartStore.setState({
      //          items: updatedCartItem,
      //          itemsPrice,
      //          shippingPrice,
      //          totalPrice,
      //          taxPrice
      //       })
      // }


      decrease: (item: OrderItem) => {
         const exist = items.find((x) => x.slug === item.slug);
       
         if (!exist) return;
       
         const updatedCartItem =
           exist.qty === 1
             ? items.filter((x: OrderItem) => x.slug !== item.slug)
             : items.map((x) => (x.slug === item.slug ? { ...x, qty: x.qty - 1 } : x)); // Use x instead of exist
         const { itemsPrice, totalPrice, shippingPrice, taxPrice } = calcPrice(updatedCartItem);
         cartStore.setState({
           items: updatedCartItem,
           itemsPrice,
           shippingPrice,
           totalPrice,
           taxPrice,
         });
       }
       
    }
 }

 const calcPrice = (items: OrderItem[]) => {
   const itemsPrice = round(
      items.reduce((acc, item) => acc + item.price * item.qty, 0)
   );
   const shippingPrice = round(itemsPrice > 100 ? 0.1 * itemsPrice : 0);
   const taxPrice = round(Number(itemsPrice > 200 ? 0.20 * itemsPrice : 10)),
   totalPrice = round(itemsPrice + shippingPrice + taxPrice)
   return { itemsPrice, taxPrice, shippingPrice, totalPrice}
 }








// import { create } from 'zustand'
// import { round } from '../utils'
// import { OrderItem } from '../models/OrderModel'
// import { persist } from 'zustand/middleware'

// type Cart = {
//   items: OrderItem[]
//   itemsPrice: number
//   taxPrice: number
//   shippingPrice: number
//   totalPrice: number

  
// }
// const initialState: Cart = {
//   items: [],
//   itemsPrice: 0,
//   taxPrice: 0,
//   shippingPrice: 0,
//   totalPrice: 0,
// }

// export const cartStore = create<Cart>()(
//   persist(() => initialState, {
//     name: 'cartStore',
//   })
// )

// export default function useCartService() {
//   const {
//     items,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice
//   } = cartStore()
//   return {
//     items,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//     increase: (item: OrderItem) => {
//       const exist = items.find((x) => x.slug === item.slug)
//       const updatedCartItems = exist
//         ? items.map((x) =>
//             x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
//           )
//         : [...items, { ...item, qty: 1 }]
//       const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
//         calcPrice(updatedCartItems)
//       cartStore.setState({
//         items: updatedCartItems,
//         itemsPrice,
//         shippingPrice,
//         taxPrice,
//         totalPrice,
//       })
//     },
//     decrease: (item: OrderItem) => {
//       const exist = items.find((x) => x.slug === item.slug)
//       if (!exist) return
//       const updatedCartItems =
//         exist.qty === 1
//           ? items.filter((x: OrderItem) => x.slug !== item.slug)
//           : items.map((x) => (item.slug ? { ...exist, qty: exist.qty - 1 } : x))
//       const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
//         calcPrice(updatedCartItems)
//       cartStore.setState({
//         items: updatedCartItems,
//         itemsPrice,
//         shippingPrice,
//         taxPrice,
//         totalPrice,
//       })
//     },
   
//     init: () => cartStore.setState(initialState),
//   }
// }

// const calcPrice = (items: OrderItem[]) => {
//   const itemsPrice = round(
//       items.reduce((acc, item) => acc + item.price * item.qty, 0)
//     ),
//     shippingPrice = round(itemsPrice > 100 ? 0 : 100),
//     taxPrice = round(Number(0.15 * itemsPrice)),
//     totalPrice = round(itemsPrice + shippingPrice + taxPrice)
//   return { itemsPrice, shippingPrice, taxPrice, totalPrice }
// }