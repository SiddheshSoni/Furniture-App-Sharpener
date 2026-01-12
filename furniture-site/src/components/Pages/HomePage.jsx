import React, { useEffect, useState } from 'react'
import "../CSS/HomePage.css"
import { useDispatch, useSelector } from 'react-redux'
import CardPreview from '../UI/CardPreview';
import { addToCartThunk, updateCartItemThunk } from '../../Store/cartSlice';
import { getProductThunk } from '../../Store/catalogSlice';
import Carousel from './Carousel';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector(state => state.catalog);
    const { cartItems } = useSelector( state => state.cart);
    const [addingItemId, setAddingItemId] = useState(null); // specific btn disabled

    useEffect(()=>{
        dispatch(getProductThunk());
    }, [dispatch]);

    const addToCartHandler = async (newItem) =>{
            
            setAddingItemId(newItem.id);
            
            const existingItem = cartItems.find(item => item.id === newItem.id);
            
            const cartQty = existingItem? Number(existingItem.quantity) + 1 : 1; //if exists increase qty
            const totalPrice = existingItem? Number(cartQty) * Number(existingItem.price): newItem.price; //
            const payload = { id: newItem.id, title: newItem.pname, imgUrl:newItem.imgUrl, price:newItem.price, quantity: cartQty, totalPrice};
            
            try {
                if (existingItem) {
                    payload._id = existingItem._id;
                    await dispatch(updateCartItemThunk(payload)).unwrap();
                } else {
                    await dispatch(addToCartThunk(payload)).unwrap();
                }
            } catch (err) {
                console.error(err);
            } finally {
                setAddingItemId(null);
            }
        };
    return (
    <>
        <div className="homepage-wrapper">
            {/* //Swiper card */}
            <div className="cara">
            <Carousel />
            </div>
            {/* Offer Card */}
            <div className="announcement-card my-2">
                <img className='banner' src='https://www.nilkamalfurniture.com/cdn/shop/files/Desktop_Timer-Banner_NYS.gif?v=1766731191' />
                <div className="logo-overlap">
                    <img src='/no_bg.png '/>
                </div>
            </div>
            {/* //// */}
            
            {/* Catalogue / Best Sellers */}
            <div className="bestsellers">
                <div className="title">Best Sellers <i className="fa-solid fa-hand-peace"></i></div>
                <div className="bestsellers-catalog">
                    {products?.length > 0 && products.slice(0,4).map(item =>(<CardPreview 
                        key={item.id}
                        title={item.pname} 
                        imgUrl={item.imgUrl}
                        subcategory={item.subcategory}
                        quantity={item.quantity}
                        price={item.price}
                        onClick ={ ()=> navigate(`/home/product/${item.id}`)}
                        onAddToCart={() => addToCartHandler(item)}
                        isLoading ={addingItemId === item.id}
                    />) )}
                </div>
            </div>
        </div>
    </>
  )
}

export default HomePage