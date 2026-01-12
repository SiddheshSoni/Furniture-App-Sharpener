
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Signup from './components/Pages/Signup'
import HomePage from './components/Pages/HomePage'
import CategoryPage from './components/Pages/Category'
import Cart from './components/Pages/Cart/Cart'
import HomePageLayout from './components/Pages/HomePageLayout'
import Checkout from './components/Pages/Checkout'
import ConfirmationPage from './components/Pages/ConfirmPage'
import OrderHistory from './components/Pages/OrderHistory'
import { useSelector } from 'react-redux'
import ProductPage from './components/Pages/Product'

function App() {
  
  const { isLoggedIn } = useSelector(state => state.auth);
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup />} />

      {isLoggedIn && <>
        <Route path="/home" element={<HomePageLayout/>} >
          <Route index element={<HomePage />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/OrderHistory' element={<OrderHistory />} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='confirm' element={<ConfirmationPage />}/>
        </>
      }
      <Route path='*' element={<Navigate to='/' replace />} />
      
    </Routes>  
    </>
  )
}

export default App;
