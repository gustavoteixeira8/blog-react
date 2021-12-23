import React from 'react';
import { Nav } from './styled';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <Nav>
        <h1>Blog</h1>

        <Link to="/" title="Home">
          Home
        </Link>

        <Link to="/account" title="Account">
          Account
        </Link>

        <Link to="/login" title="Login">
          Login
        </Link>
      </Nav>
    </>
  );
};
