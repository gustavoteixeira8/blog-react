import styled, { createGlobalStyle } from 'styled-components';
import { primaryColor, primaryDarkColor } from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: 'Courier New', Courier, monospace;
    background-color: ${primaryDarkColor};
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast {
    background-color: ${primaryDarkColor};
    color: white;
    font-size: 15px;
    padding: 20px;

    svg {
      color: white;
    }
  }
`;

export const Wrapper = styled.div`
  min-height: 100%;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  background-color: white;
  box-shadow: 0px 0px 15px 0px #010101;
  border-radius: 7px;
  border-bottom: 5px solid ${primaryColor};
`;
