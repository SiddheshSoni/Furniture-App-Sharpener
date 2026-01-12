import React, { useEffect} from 'react'
import "../CSS/ConfirmPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderThunk } from '../../Store/orderSlice';
import TopNavbar from '../UI/TopNav';


const OrderHistory = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector( state => state.order );

    useEffect(()=>{
        dispatch(getOrderThunk());
    },[dispatch]);

  return (
    <>
        <TopNavbar/>
        <div className="confirm-wrapper">
            <div className="confirm-container">
                    {orders && orders.map( order=>(
                        <div key={order.id} className='confirm-card'>
                            <div className='confirm-cart'>
                                {order.cartItems.map(item =>(
                                    <div className="confirm-cart-item" key={item.id} >
                                        <div className="checkout-cart-img">
                                            <img src={item.imgUrl} />
                                            <div className="checkout-cart-desc">
                                                <h4 className='cofirm-item-name'>{item.title}</h4>
                                                <p className='confirm-item-quantity'>Quantity: {item.quantity}</p>
                                            </div> 
                                        </div>
                                    </div>
                                ))}
                                <div className="confirm-total">
                                    <p>Total:</p>
                                    <p>₹{order.cartTotal}</p>
                                </div>
                            </div>
                            <div className="address">
                                <p className='fs-5 mb-2'>Status: {order.status}</p>
                                <p>Address:</p>
                                {order.address.street}
                                <p>{order.address.city} {order.address.state} {order.address.zip}</p>
                                <p>{order.address.phone}</p>
                                <br/>
                                {order.address.instructions && <p><strong>Instructions:</strong> {order.address.instructions}</p>}
                            </div>
                     </div>
                    ))}
            </div>
        </div>
    </>
  )
}

export default OrderHistory;