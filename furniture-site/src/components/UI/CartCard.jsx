import React from 'react'
import "./CartCard.css";
import { useDispatch } from 'react-redux';
import { deleteCartItemThunk, updateCartItemThunk } from '../../Store/cartSlice';


const CartCard = ({item}) => {
  const dispatch = useDispatch();

  const increaseQtyHandler = () =>{
    const newQty = item.quantity + 1;
    const totalPrice = newQty* item.price;
    const updatedItem = {
      ...item,
      quantity: newQty,
      totalPrice: totalPrice,
    };

    dispatch(updateCartItemThunk(updatedItem));
  };
  const decreaseQtyHandler = () =>{
    if(item.quantity <= 1){
      return;
    }
    const newQty = item.quantity - 1;
    const totalPrice = newQty * item.price;
    const updatedItem = {
      ...item,
      quantity: newQty,
      totalPrice: totalPrice,
    };

    dispatch(updateCartItemThunk(updatedItem));
  };
  const deleteItemHandler = (id) =>{
    dispatch(deleteCartItemThunk(id));
    console.log("deleted");
  };

  return (
    <div className="cart-card" key={item.id}>
      <div className="cart-card-left">
        <div className=" card-img">
          <img src={item.imgUrl} />
        </div>
        <div className="card-title">
          {item.title}
        </div>
      </div>
      <div className="cart-card-right">
        <div className="cart-quantity">
            <button onClick={increaseQtyHandler} >+</button>
            <span>{ item.quantity} </span>
            <button onClick={decreaseQtyHandler} >-</button>
        </div>
        <div className="price">
          ₹{item.totalPrice}
        </div>
        <div className="delete-item">
            <i onClick={ () => deleteItemHandler(item.id) } className="fa-regular fa-trash-can"></i>
        </div>
      </div>
    </div>
  )
}

export default CartCard