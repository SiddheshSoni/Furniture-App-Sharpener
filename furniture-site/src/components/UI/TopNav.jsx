import React from 'react';
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { NavLink } from 'react-router';

const TopNavbar = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>

        <NavbarBrand className=' fw-bold text-dark ' href='/home'>HomeEssence</NavbarBrand>
        <Nav className='ms-auto gap-3'>
          {/* <NavLink to='/home'>Home</NavLink>         */}
          <NavLink to='/cart'><i className="fa-solid fa-cart-shopping"></i></NavLink>
          <NavLink to='/OrderHistory'><i className="fa-solid fa-clock-rotate-left"></i></NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default TopNavbar;