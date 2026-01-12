import React, { useEffect } from 'react'
import "../CSS/ConfirmPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderThunk } from '../../Store/orderSlice';
import Header from '../UI/Header';
import Footer from '../UI/Footer';
import TopNavbar from '../UI/TopNav';

const ConfirmationPage = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(getOrderThunk());
  }, [dispatch]);

  const order = allOrders.length > 0 ? allOrders[allOrders.length - 1] : null;

  if (!order) {
    return (
      <div className="confirm-wrapper">
        <h3>Loading your order...</h3>
      </div>
    );
  }

  return (
    <>
    <TopNavbar/>
    <div className="thankyou-banner">
        <h1>Thankyou for ordering!</h1>
        <h3>your order is confirmed!</h3>

        <a href='/home'>continue shopping!</a>
    </div>
    <div className="confirm-wrapper">
      <div className="confirm-container">
        <div className="confirm-card">
          <div className="confirm-cart">
            {order.cartItems?.map((item) => (
              <div className="confirm-cart-item" key={item.id}>
                <div className="checkout-cart-img">
                  <img src={item.imgUrl} />
                  <div className="checkout-cart-desc">
                    <h4>{item.title}</h4>
                    <p>Quantity: {item.quantity}</p>
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
            <p>Status: {order.status}</p>
            <p>Address:</p>
            <p>{order.address.street}</p>
            <p>
              {order.address.city} {order.address.state} {order.address.zip}
            </p>
            <p>{order.address.phone}</p>

            {order.address.instructions && (
              <p>
                <strong>Instructions:</strong> {order.address.instructions}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};


export default ConfirmationPage;