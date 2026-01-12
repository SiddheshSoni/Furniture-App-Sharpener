import React, { useEffect } from 'react'
import CardStats from '../../UI/CardStats'
import "../../CSS/Dashboard.css";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryThunk, getProductThunk } from '../../../Store/catalogueSlice';
import { getOrderThunk } from '../../../Store/orderSlice';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, categories} = useSelector(state => state.catalogue);
    const { orders } = useSelector(state => state.order);

    const productLen = products.length;
    const catLen = categories.length;
    const orderLen = orders.length;
    const pending = orders.filter( ord => ord.status === 'Pending').length;
    
    useEffect(()=>{
        dispatch(getCategoryThunk())
        dispatch(getProductThunk())
        dispatch(getOrderThunk())
    },[dispatch]);

  return (
    <>
        <div className='dashboard-wrapper'>

            <CardStats 
                icon="fa-solid fa-tag"
                title="Category"
                value={catLen}
                linkTitle="View all categories"
                onClick={() => navigate('category')}
            />
            <CardStats 
                icon="fa-solid fa-tag"
                title="Product"
                value={productLen}
                linkTitle="View all products"
                onClick={() => navigate('product')}
            />
            <CardStats 
                icon="fa-solid fa-tag"
                title="Orders"
                value={orderLen}
                linkTitle="View all orders"
                onClick={() => navigate('orders')}
            />
            <CardStats 
                icon="fa-solid fa-tag"
                title="Pending"
                value={pending}
                linkTitle="View all Pending Orders"
                onClick={() => navigate('orders/Pending')}
            />
        </div>
    </>
  )
}

export default Dashboard