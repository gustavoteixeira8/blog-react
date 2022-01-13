import React, { useState } from 'react';
import { Nav } from './styled';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import * as authActions from '../../store/modules/auth/actions';
import { browserHistory } from '../../services/browserHistory';

export const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(true);

  const handleMenuMobileClick = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);

    const mobileMenuBox = document.querySelector('.mobile-menu-box');
    mobileMenuBox.style.top = isOpenMobileMenu ? '60px' : '-100%';

    browserHistory.listen(() => {
      setIsOpenMobileMenu(true);
      mobileMenuBox.style.top = '-100%';
    });
  };

  const handleLogoutClick = () => {
    dispatch(authActions.createLogoutRequest());
  };

  const loggedInLinks = (
    <>
      <Link className="nav-link" to="/account" title="My account">
        My account
      </Link>

      <Link className="nav-link" to="/dashboard" title="Dashboard">
        Dashboard
      </Link>

      <Link className="nav-link" to="/login" title="Logout" onClick={handleLogoutClick}>
        Logout
      </Link>
    </>
  );

  const notLoggedInLinks = (
    <>
      <Link className="nav-link" to="/about" title="About">
        About
      </Link>
      <Link className="nav-link" to="/login" title="Login">
        Login
      </Link>
    </>
  );

  return (
    <>
      <Nav>
        <h1 className="logo">
          <Link to="/">Gustavo Teixeira</Link>
        </h1>

        <div className="desktop-menu">
          <Link className="nav-link" to="/" title="Home">
            Home
          </Link>

          {isLoggedIn ? loggedInLinks : notLoggedInLinks}
        </div>

        <div className="mobile-menu">
          <FaBars className="menu-bars" onClick={handleMenuMobileClick} />

          <div className="mobile-menu-box">
            <Link className="nav-link" to="/" title="Home">
              Home
            </Link>

            {isLoggedIn ? loggedInLinks : notLoggedInLinks}
          </div>
        </div>
      </Nav>
    </>
  );
};
