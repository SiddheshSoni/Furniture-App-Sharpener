import React, { useEffect } from 'react'
import "./Header.css";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/authSlice';
import { NavLink, useNavigate } from 'react-router';
import { getCategoryThunk } from '../../Store/catalogSlice';


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = useSelector(state => state.catalog.categories);

    useEffect(()=>{
        dispatch(getCategoryThunk());
    },[dispatch]);

    const LogoutHandler = async ()=>{
        await dispatch( authActions.onLogout());
        localStorage.removeItem('idToken');
        localStorage.removeItem('user');
        console.log("user logged out successfully!")
        navigate('/');
    };

    const categoryClickHandler = (categoryName) => {
        navigate(`/home/category/${categoryName}`);
    };


  return (
    <div className='header'>
        <div className="header-title-bar">
            <div className='section-A'>

                <div className="logo">
                    <img src='/no_bg.png' onClick={() => navigate('/home')} alt="Logo" />
                </div>
                <div className="search-bar">
                    <input placeholder='Search' />
                </div>
            </div>
            <div className="utility">
                <NavLink to='/OrderHistory'><i className="fas fa-history"></i></NavLink>
                <NavLink to='/cart' ><i className="fa-solid fa-cart-shopping cart"></i></NavLink>
                <button onClick={()=>LogoutHandler()}>Logout</button>
            </div>
        </div>
        {/* category */}
        <div className="category-list">
            {categories && categories.map(cat => (

                <div className="cat-wrapper" key={cat.id}>

                    <Button onClick={()=> categoryClickHandler(cat.name) } key={cat.id}>
                        {cat.name}
                    </Button>

                    <div className="sub-menu">
                        <div className="submenu-content">
                            {cat.subcategory && 
                            Object.values(cat.subcategory).map((sub, idx) =>(
                                <p key={idx}>{sub.name}</p>
                            ))}
                            
                        </div>
                    </div>

                </div>
            ))}
        </div>
    </div>
  )
}
export default Header