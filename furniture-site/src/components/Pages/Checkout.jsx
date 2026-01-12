import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../API/CartAPI';
import "../CSS/Checkout.css";
import { Button, Col, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { getCartThunk } from '../../Store/cartSlice';
import { sendOrderThunk } from '../../Store/orderSlice';
import { fetchAddress, saveAddress,} from '../../API/UserAPI';
import TopNavbar from '../UI/TopNav';


const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems , totalPrice } = useSelector(state => state.cart);
    const [toSaveAddress, setSaveAddress] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);


    useEffect(()=>{
       dispatch(getCartThunk());
    }, [dispatch]);

    useEffect(()=>{
        const loadAddresses = async () => {
            const res = await fetchAddress();
            if (res.ok && res.data) {
                const arr = Object.keys(res.data).map(id => ({
                    id,
                    ...res.data[id]
                }));
                setSavedAddresses(arr);
            }
        };
        loadAddresses();
    },[]);

    const submitHandler = async (e) =>{
        e.preventDefault();

        let address;

        if(selectedAddressId) {
            address = savedAddresses.find(a => a.id === selectedAddressId);
        }else {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            address = {
                street: data.street,
                city: data.city,
                state: data.state,
                zip: data.zip,
                phone: data.phone,
                instructions: data.instructions,
            };
        }

        if (!selectedAddressId && toSaveAddress) {
            await saveAddress(address);
        }
        
        const userId = localStorage.getItem('user');

        const order = {
            address, cartItems:[...cartItems], cartTotal:totalPrice, status:"Pending", user: userId,
        };
        console.log(order);

        dispatch(sendOrderThunk(order));
        await clearCart();
        
        navigate("/confirm");

    }
    return (
    <>  
        <TopNavbar />
        <div className="checkout-wrapper">
            <div className='title'><p>Checkout</p></div>
            <div className="checkout-container">
                <div className="checkout-cart-items">
                    {cartItems?.length > 0 ? (cartItems.map((item)=>(
                    <div className="checkout-cart-item" key={item.id} >
                        <div className="checkout-cart-img">
                            <img src={item.imgUrl} />
                            <div className="checkout-cart-desc">
                                <h4 className='item-name'>{item.title}</h4>
                                <p className='item-quantity'>Quantity: {item.quantity}</p>
                            </div> 
                        </div>
                        <div className="checkout-cart-right">
                            <p className='item-price'>₹{item.totalPrice}</p>
                        </div>
                    </div>
                    )))
                    : 
                    <h1>Add Items to cart!</h1>
                    }
                </div>
                <div className="checkout-total">
                    <p>Total:</p>
                    <p>₹{totalPrice}</p>
                </div>
                {/* Delivery Address Saved */}
                <div className="saved-address">

                    {savedAddresses && savedAddresses.map( add => (
                        <div className="address-card">
                            <div className="select-address-checkbox">
                                <input  type='checkbox'
                                checked={selectedAddressId === add.id}
                                onChange={() => setSelectedAddressId(prev => prev === add.id ? null : add.id)}
                                />
                            </div>
                            <p>{add.street},</p>
                            <span>{add.city}, </span>
                            <span>{add.zip}</span>
                            <p>{add.state}</p>
                            <p>{add.phone}</p>
                        </div>
                    ))}
                </div>
                {/* Delivery Address FORM */}
                <div className="checkout-form">
                    <div className="form-top">
                        <h3>Delivery Address</h3>
                        <div className="save-add-check">
                            <input type='checkbox' onChange={() =>setSaveAddress(prev => !prev)}/>
                            <span >Save Address</span>
                        </div>
                    </div>
                    <Form onSubmit={submitHandler}>
                        <FormGroup className='mb-1' controlId='street'>
                            <FormLabel>Street Address:</FormLabel>
                            <FormControl type='text' name='street'/>
                        </FormGroup>

                        <Row className='mb-1'>
                            <Col>
                                <FormGroup controlId='city'>
                                    <FormLabel>City:</FormLabel>
                                    <FormControl type='text' name='city' />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId='state'>
                                    <FormLabel>State:</FormLabel>
                                    <FormControl type='text' name='state'/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId='zip'>
                                    <FormLabel>ZIP Code:</FormLabel>
                                    <FormControl type='number' name='zip' />
                                </FormGroup>                                
                            </Col>
                        </Row>

                        <FormGroup className='mb-1' controlId='phone'>
                            <FormLabel>Phone Number:</FormLabel>
                            <FormControl type='tel' name='phone' />
                        </FormGroup>

                        <FormGroup className='mb-2' controlId='instructions'>
                            <FormLabel>Delivery Instructions: (Optional)</FormLabel>
                            <FormControl type='text' size='lg' name='instructions'/>
                        </FormGroup>     

                        <Button className='w-100 mt-2' variant='primary' type='submit' >Submit</Button>                                     
                    </Form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout;