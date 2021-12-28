import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Button = styled.button`
  background-color: transparent;
  border: 0;
  padding: 10px 20px;
  border-radius: 3px;
  color: ${primaryColor};
  border: 2px solid ${primaryColor};
  cursor: pointer;
  transition: 500ms all;
  font-weight: bold;
  font-size: 17px;

  :hover {
    background-color: ${primaryColor};
    color: white;
    /* transform: scale(1.05, 1.05); */
  }
`;
