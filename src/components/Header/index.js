import React from 'react';
import { Nav } from './styled';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Nav>
        <h1>Blog</h1>

        <Link to="/" title="Home">
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/user/me" title="Articles">
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
          </>
        ) : (
          <>
            <Link to="/about" title="About me">
              About me
            </Link>
            <Link to="/login" title="Login">
              Login
            </Link>
          </>
        )}
      </Nav>
    </>
  );
};
