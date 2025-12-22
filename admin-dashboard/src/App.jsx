import { Route, Routes } from 'react-router'
import './App.css'
import Signup from './components/Pages/Signup'
import DashboardLayout from './components/Pages/Dashboard/DashboardLayout'
import Dashboard from './components/Pages/Dashboard/Dashboard'
import Category from './components/Pages/Dashboard/Category'
import Product from './components/Pages/Dashboard/Product'
import Subcategory from './components/Pages/Dashboard/Subcategories'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Signup />} />
        
        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path='category' element={<Category />} />
          <Route path='subcategory' element={<Subcategory />} />
          <Route path='product' element={<Product />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
