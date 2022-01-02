import styled, { css } from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Button = styled.button`
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 3px;
  color: ${primaryColor};
  border: 2px solid ${primaryColor};
  cursor: pointer;
  transition: 500ms all;
  font-weight: bold;
  font-size: 17px;
  margin: 0 8px;

  :hover {
    background-color: ${primaryColor};
    color: white;
    /* transform: scale(1.05, 1.05); */
    a {
      color: white;
    }
  }

  a {
    color: ${primaryColor};
    font-weight: bold;
    font-size: 17px;
  }

  ${(props) =>
    props.big &&
    css`
      width: 100%;
      padding: 25px 0;
      font-size: 30px;
      margin-top: 20px;
    `}

  ${(props) =>
    props.medium &&
    css`
      width: 50%;
      font-size: 20px;
      padding: 15px 0;
      margin: 20px auto 0 auto;
    `}
`;
