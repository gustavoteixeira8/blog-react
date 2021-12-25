import styled from 'styled-components';
import { primaryDarkColor } from '../../config/colors';

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

  input {
    padding-left: 9px;
    margin-top: 6px;
    border-radius: 3px;
    border: 1px solid ${primaryDarkColor};
    height: 40px;
    font-size: 17px;
  }

  button {
    padding: 10px 80px;
  }

  input:focus {
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

  p {
    color: black;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
  }

  a:hover,
  p:hover {
    border-bottom: 1px solid black;
  }
`;
