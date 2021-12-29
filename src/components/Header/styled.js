import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background-color: ${primaryColor};
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  h1 {
    margin-right: auto;
    color: white;
  }

  a {
    color: white;
    font-size: 17px;
    margin: 0 15px;
    transition: 300ms all;
    text-decoration: none;
  }

  a:hover {
    border-bottom: 1px solid white;
  }

  .mobile-menu {
    display: none;
  }

  .menu-bars {
    font-size: 30px;
    color: white;
    cursor: pointer;
  }

  .mobile-menu-box {
    width: 100%;
    position: absolute;
    top: -100%;
    left: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-color: ${primaryColor};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    transition: 600ms all;
  }

  .mobile-menu-box a {
    margin: 10px 0;
  }

  @media (max-width: 850px) {
    .desktop-menu {
      display: none;
    }
    .mobile-menu {
      display: block;
    }
  }
`;
