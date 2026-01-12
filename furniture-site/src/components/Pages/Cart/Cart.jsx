import React, { useEffect } from 'react'
import "./Cart.css";
import CartCard from '../../UI/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { getCartThunk } from '../../../Store/cartSlice';
import TopNavbar from '../../UI/TopNav';



const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, totalPrice, totalQuantity} = useSelector(state => state.cart );
  
  console.log(cartItems);
  
  useEffect(()=>{
    dispatch(getCartThunk());
  },[dispatch])
  const navigate =  useNavigate('/checkout')
  
  return (
    <>
    <TopNavbar />
    <div className="cart-wrapper">
        <h1>Cart</h1>
        <div className="cart-content">
          {cartItems?.length > 0 && cartItems.map( item => (
            <CartCard 
            key={item.id}
            item={item}
            />
          ))}        
        </div>
        <div className="cart-total">
            <p>TotalQty: {totalQuantity}</p>
            <p>Total: ₹{totalPrice}</p>
            <Button variant='primary' onClick={()=> navigate('/checkout')}>Checkout</Button>
        </div>
    </div>
    </>
  )
};

export default Cart;
