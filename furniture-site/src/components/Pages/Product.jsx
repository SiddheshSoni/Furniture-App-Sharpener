import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProductThunk } from '../../Store/catalogSlice';
import { addToCartThunk, updateCartItemThunk } from '../../Store/cartSlice';
import "../CSS/Product.css";
import { Button } from 'react-bootstrap';

const ProductPage = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);

    const Products = useSelector(state => state.catalog.products);
    // const selectedProduct = Products.filter( item => ( item.id === productId));
    const selectedProduct = Products?.find( item => ( String(item.id) === productId));
    
    const { cartItems } = useSelector( state => state.cart);
    
    useEffect(()=>{
        dispatch(getProductThunk());
    }, [dispatch]);

    const addToCartHandler = async (newItem) =>{
        const existingItem = cartItems.find(item => item.id === newItem.id);
        
        const cartQty = existingItem? Number(existingItem.quantity) + 1 : qty; //if exists increase qty
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
            // setAddingItemId(null);
        }
    };
  return (
    <div className="product-display">
        <div className="product-section-left">
            <img src={selectedProduct.imgUrl} alt='defa'/>

            <img id='utilp1' src='/pic1.png' />
        </div>
        <div className="product-section-right">
            <p className='prod-title'>{selectedProduct.pname}</p>

            <div className="wrapper">

                <div className="price-card">
                    <div>
                        <p>SALE PRICE:</p>
                        <p className='price'>₹ {selectedProduct.price}</p>
                    </div>
                    <div>
                        <p>MRP:</p>
                        <p className='price mrp'>₹ {Number(selectedProduct.price) + 5000} </p>
                    </div>
                </div>
            </div>

            <div className="line1">
                <span>PINCODE: </span>
                <input id='pincode' maxLength={6}/>
            </div>

            <div className="line2">
                <span >Quantity: </span>
                <div className="buttonQty">
                    <button className='qty' onClick={()=> setQty(prev => prev+1)} >+</button>
                    <span className='num'>{qty}</span>
                    <button className='qty' onClick={()=> setQty(prev => prev-1)} >-</button>
                </div>
            </div>
            <div className="line3">
                <Button variant='primary' id='atc' onClick={()=> addToCartHandler(selectedProduct)} >Add to cart</Button>
            </div>

            <div className="highlights">
                {/* hardcoded */}
                <div>
                    <ul className="dim-list">
                        <li>Highlights</li>
                        <hr/>
                        <li>Practical and modern triple-door Willy Wardrobe from Nilkamal</li>
                        <li>Crafted from high-quality particleboard for a graceful design</li>
                        <li>Seven roomy shelves with enough space to house your clothing</li>
                        <li>One hanging rod lines up your favourite apparel for easy access</li>
                        <li>The pleasant new wenge shade complements modern spaces</li>
                        <li>A security lock on the exterior keeps your belongings safe</li>
                        <li>Designed to meet the storage requirements of Indian families</li>
                        <li>Please know that the Willy Wardrobe does not have a mirror</li>
                    </ul>
                </div>
                <div>
                    <ul className="dim-list">
                    <li>Dimensions</li>
                        <hr/>
                    <li><strong>Width</strong> — 112.5 cm (44.3" Inch)</li>
                    <li><strong>Depth</strong> — 45 cm (17.7" Inch)</li>
                    <li><strong>Height</strong> — 184 cm (72.4" Inch)</li>
                    <li><strong>Weight</strong> — 79 kg</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPage