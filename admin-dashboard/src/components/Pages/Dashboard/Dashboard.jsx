import React from 'react'
import CardStats from '../../UI/CardStats'
import "../../CSS/Dashboard.css";
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const navigate = useNavigate();

  return (
    <>
        <div className='dashboard-wrapper'>

            <CardStats 
                icon="fa-solid fa-tag"
                title="Category"
                value="4"
                linkTitle="View all categories"
                onClick={() => navigate('category')}
            />
            <CardStats 
                icon="fa-solid fa-tag"
                title="Product"
                value="4"
                linkTitle="View all products"
                onClick={() => navigate('product')}
            />
            <CardStats 
                icon="fa-solid fa-tag"
                title="Orders"
                value="4"
                linkTitle="View all orders"
                onClick={() => navigate('orders')}
            />
            <CardStats 
                icon="fa-solid fa-tag"
                title="Pending"
                value="4"
                linkTitle="View all Pending Orders"
                onClick={() => navigate('orders/pending')}
            />
        </div>
    </>
  )
}

export default Dashboard