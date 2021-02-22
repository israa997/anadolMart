import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { Container } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {

  const [variantbackgroundcolor, setvariantbackgroundcolor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

useEffect(()=>{
  document.addEventListener("scroll", () => {
    const variantbackgroundcolor = window.scrollY < 100 ? "" : "black";
    const backgroundcolor = window.scrollY < 100 ? "" : "dark";

    setBackgroundColor(backgroundcolor);
    setvariantbackgroundcolor(variantbackgroundcolor);
  });
}, []);
const isMobile = window.innerWidth <= 500;

const dispatch = useDispatch()
const userLogin = useSelector((state) => state.userLogin)
const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (

    <header>
      <Container>
     <Navbar expand='md' collapseOnSelect className='p-3' fixed="top" style={{backgroundColor: isMobile? 'black': variantbackgroundcolor}} variant={isMobile ? 'dark' :backgroundColor}>
          
          <LinkContainer to='/' style={{marginLeft: isMobile? '32%':0}}>
            <Navbar.Brand >anadol<strong style={{color: "gold", WebkitTextStroke: "1px red", fontSize:'18px'}}>mart</strong></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav' >
            <Route className='w-100' render={({ history }) => <SearchBox history={history}  />} />
            <Nav className='justify-content-center' style={{marginLeft: isMobile? '42%':0 }}>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile Settings</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/favorites'>
                    <NavDropdown.Item>Favorites</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orders'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <hr></hr>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            {isMobile && (
              <>
              <LinkContainer to='/yeni-gelenler'>
              <Nav.Link>
                yeni gelenler
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/comfort-giyim'>
              <Nav.Link>
               comfort giyim
              </Nav.Link>
            </LinkContainer>
            </>
            )}
                
            </Nav>
          </Navbar.Collapse>
      </Navbar>
</Container>
          
    </header>
  )
}

export default Header