import React, { useState } from 'react';
import { Nav } from './styled';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import * as authActions from '../../store/modules/auth/actions';

export const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(true);

  const handleMenuMobileClick = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);

    const mobileMenuBox = document.querySelector('.mobile-menu-box');
    mobileMenuBox.style.top = isOpenMobileMenu ? '60px' : '-100%';
  };

  const handleLogoutClick = () => {
    dispatch(authActions.createLogoutRequest());
  };

  const loggedInLinks = (
    <>
      <Link to="/account" title="Articles">
        My account
      </Link>

      <Link to="/register" title="Register an user">
        Register an user
      </Link>

      <Link to="/article" title="Articles">
        Articles
      </Link>

      <Link to="/category" title="Categories">
        Categories
      </Link>

      <Link to="/" title="Logout" onClick={handleLogoutClick}>
        Logout
      </Link>
    </>
  );

  const notLoggedInLinks = (
    <>
      <Link to="/about" title="About me">
        About me
      </Link>
      <Link to="/login" title="Login">
        Login
      </Link>
    </>
  );

  return (
    <>
      <Nav>
        <h1>Blog</h1>

        <div className="desktop-menu">
          <Link to="/" title="Home">
            Home
          </Link>

          {isLoggedIn ? loggedInLinks : notLoggedInLinks}
        </div>

        <div className="mobile-menu">
          <FaBars className="menu-bars" onClick={handleMenuMobileClick} />

          <div className="mobile-menu-box">
            <Link to="/" title="Home">
              Home
            </Link>

            {isLoggedIn ? loggedInLinks : notLoggedInLinks}
          </div>
        </div>
      </Nav>
    </>
  );
};
