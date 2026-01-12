
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getProductThunk } from '../../Store/catalogSlice';
import CardPreview from '../UI/CardPreview';
import "../CSS/Category.css"
import { addToCartThunk, updateCartItemThunk } from '../../Store/cartSlice';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [addingItemId, setAddingItemId] = useState(null); // specific btn disabled

    const Products = useSelector(state => state.catalog.products);
    const sortedProducts = Products.filter( item => ( item.category === categoryName));

    const { cartItems } = useSelector( state => state.cart);

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
        <div className="product-page">
        <p>{categoryName}s </p>
        <div className='product-wrapper' >
        {sortedProducts && sortedProducts.map( item => (
            <CardPreview 
                key={item.id}
                title={item.pname} 
                imgUrl={item.imgUrl}
                subcategory={item.subcategory}
                quantity={item.quantity}
                price={item.price}
                onAddToCart={() => addToCartHandler(item)}
                isLoading ={addingItemId === item.id}
                onClick ={ ()=> navigate(`/home/product/${item.id}`)}
            />)
        )}
        </div>
        </div>
    );
};

export default CategoryPage;
