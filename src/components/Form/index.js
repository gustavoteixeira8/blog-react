import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-weight: bold;
    width: 100%;
    max-width: 500px;
  }

  input[type='text'],
  input[type='email'],
  input[type='password'],
  select {
    padding-left: 9px;
    margin-top: 6px;
    border-radius: 3px;
    border: 1px solid ${primaryDarkColor};
    height: 40px;
    font-size: 17px;
    background-color: white;
  }

  button {
    padding: 10px 80px;
  }

  input[type='text']:focus,
  input[type='email']:focus,
  input[type='password']:focus,
  select:focus {
    box-shadow: 0px 0px 7px 0px ${primaryDarkColor};
  }

  small {
    margin-top: 5px;
  }

  a {
    color: black;
    font-size: 14px;
  }

  .divisor {
    margin: 0 8px;
  }

  small p {
    color: black;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
  }

  small a:hover,
  small p:hover {
    border-bottom: 1px solid black;
  }
`;

export const FormFile = styled.form`
  label {
    width: 100%;
    max-width: 500px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${primaryColor};
    border: 5px solid ${primaryColor};
    margin: 30px auto;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: 500ms all;

    img {
      width: 100%;
      transition: 100ms all;
    }

    p {
      color: white;
    }
  }

  input {
    display: none;
  }
`;
