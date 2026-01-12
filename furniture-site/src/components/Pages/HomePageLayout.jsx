import React from 'react'
import Header from '../UI/Header'
import Footer from '../UI/Footer'
import { Outlet } from 'react-router'

const HomePageLayout = () => {
  return (
    <>
        <Header />
        <div className='w-100'>
          <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default HomePageLayout;