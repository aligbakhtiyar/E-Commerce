import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import CartItem from './CartItem';

const CartItemsList = () => {
  const cartItems = useSelector((state)=> state.cartState.cartItems)
  return (
     <div>
      {cartItems.map((item) => (
        <CartItem key={item.cartID} cartItem={item} />
      ))}
    </div>
  )
}
export default CartItemsList
