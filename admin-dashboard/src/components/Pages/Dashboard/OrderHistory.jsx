import React, { useEffect} from 'react'
import "../../CSS/OrderHistory.css";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderThunk, updateOrderThunk } from '../../../Store/orderSlice';
import { useParams } from 'react-router';


const OrderHistory = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector( state => state.order );
    const { status } = useParams();

    useEffect(()=>{
        dispatch(getOrderThunk());
    },[dispatch]);

    const statusUpdate = async (id, status) =>{
        const result = await dispatch(updateOrderThunk({id, status}));
        if(updateOrderThunk.fulfilled.match(result)){
            console.log("updated");
        }else{
            console.log("err");
        }
    };
    const filteredOrders = status? orders.filter(item => item.status === status): orders;
    
  return (
    <>
        <div className="confirm-wrapper">
            <div className="confirm-container">
                
                    {filteredOrders && filteredOrders.map( order=>(
                        <div key={order.id} className='confirm-card'>
                            <div className='order-status'>
                                Status: <select onChange={(e) => statusUpdate(order.id, e.target.value)}>
                                    <option>{order.status}</option>
                                    <option>Preparing</option>
                                    <option>Pending</option>
                                    <option>In Transit</option>
                                    <option>Delivered</option>
                                    </select>
                            </div>
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